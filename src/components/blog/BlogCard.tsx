import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Heart } from 'lucide-react';

interface BlogCardProps {
  id?: string;
  title?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readTime?: string;
  featured?: boolean;
  tags?: string[];
  views?: number;
  likes?: number;
  image?: string;
}

const DEFAULT_TECH_IMAGE =
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80';

const BlogCard = ({ 
  id = 'sample-post', 
  title = 'Como implementar agentes de IA em sua empresa', 
  excerpt = 'Descubra como os agentes de inteligência artificial podem revolucionar seus processos empresariais e aumentar a eficiência operacional.', 
  author = 'Equipe OnSmartAI', 
  date = '10/05/2023', 
  readTime = '5 min de leitura',
  featured = false,
  tags = ['IA', 'Negócios'],
  views = 0,
  likes = 0,
  image
}: BlogCardProps) => {
  const imageUrl = image || DEFAULT_TECH_IMAGE;
  return (
    <Link to={`/blog/${id}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${featured ? 'md:col-span-2 border-primary/50' : 'hover:shadow-md'}`}>
        {/* Imagem de tecnologia no topo */}
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-40 object-cover ${featured ? 'md:h-56' : ''}`}
          style={{ display: 'block' }}
          loading="lazy"
        />
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-white">
              Destaque
            </Badge>
          </div>
        )}
        {/* Date badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300">
            {date}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <h3 className={`font-bold ${featured ? 'text-2xl' : 'text-lg'} line-clamp-2 hover:text-primary transition-colors`}>
            {title}
          </h3>
        </CardHeader>
        <CardContent className="pb-2 space-y-3">
          <p className={`text-muted-foreground ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>{excerpt}</p>
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="font-medium">{author}</span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {readTime}
            </div>
          </div>
          {/* Engagement metrics */}
          <div className="flex items-center gap-3">
            {views > 0 && (
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {views}
              </div>
            )}
            {likes > 0 && (
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {likes}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
