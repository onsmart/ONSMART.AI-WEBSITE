import { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import BlogCard from "./BlogCard";
import { Pagination } from "@/components/ui/pagination";
import { 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { blogPosts, blogCategories, allTags, BlogPost } from "./data/blogData";

const BlogCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('recentes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const postsPerPage = 6;

  // Listen for search events from BlogHero
  useEffect(() => {
    const handleBlogSearch = (event: CustomEvent) => {
      setSearchTerm(event.detail.searchTerm);
      setCurrentPage(1);
    };

    window.addEventListener('blogSearch', handleBlogSearch as EventListener);
    return () => {
      window.removeEventListener('blogSearch', handleBlogSearch as EventListener);
    };
  }, []);

  // Filter posts based on search term, category, and tags
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by search term
    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (activeTab !== 'recentes') {
      posts = posts.filter(post => post.category === activeTab);
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      posts = posts.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    // Sort by date (most recent first) if "recentes" tab
    if (activeTab === 'recentes') {
      posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return posts;
  }, [searchTerm, activeTab, selectedTags]);

  // Calculate pagination
  const getPaginatedPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  };
  
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    setSearchTerm('');
    setSelectedTags([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedTags.length > 0;

  return (
    <section className="py-8 px-4 md:px-6" data-search-target>
      <div className="container mx-auto max-w-6xl">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Buscar por título, conteúdo ou tags..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" variant="default">
              Buscar
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </form>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              {searchTerm && (
                <Badge variant="secondary">
                  Busca: "{searchTerm}"
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setSearchTerm('')}
                  />
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => toggleTag(tag)}
                  />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            </div>
          )}

          {/* Results count */}
          <div className="text-sm text-gray-600">
            {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
          </div>
        </div>

        <Tabs defaultValue="recentes" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {Object.entries(blogCategories).map(([key, label]) => (
              <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(blogCategories).map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              {getPaginatedPosts().length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getPaginatedPosts().map((post, idx) => (
                      <BlogCard 
                        key={post.id} 
                        id={post.slug}
                        featured={post.featured && currentPage === 1 && idx === 0} 
                        title={post.title}
                        excerpt={post.excerpt}
                        date={new Date(post.date).toLocaleDateString('pt-BR')}
                        readTime={post.readTime}
                        author={post.author}
                        tags={post.tags}
                      />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className="mt-8">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => {
                            const currentPageBuffer = 2;
                            return (
                              page === 1 || 
                              page === totalPages || 
                              (page >= currentPage - currentPageBuffer && page <= currentPage + currentPageBuffer)
                            );
                          })
                          .map((page, idx, array) => (
                            <>
                              {idx > 0 && array[idx - 1] !== page - 1 && (
                                <PaginationItem key={`ellipsis-${page}`}>
                                  <span className="px-2">...</span>
                                </PaginationItem>
                              )}
                              <PaginationItem key={page}>
                                <PaginationLink 
                                  onClick={() => setCurrentPage(page)}
                                  isActive={page === currentPage}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            </>
                          ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum artigo encontrado com os filtros selecionados.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Limpar filtros
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default BlogCategories;
