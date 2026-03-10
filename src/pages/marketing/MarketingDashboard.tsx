/**
 * Marketing dashboard: tabs Blog/Artigos, Ferramentas, Materiais Gratuitos.
 * CRUD + upload PDF/imagem + status draft/published.
 * Lists all content (including backfilled).
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketingAuth } from '@/contexts/MarketingAuthContext';
import { trpc } from '@/trpc';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MarketingTutorialModal } from '@/components/marketing/MarketingTutorialModal';
import { MoreHorizontal, Plus, LogOut, Search, FileText, LayoutGrid, BookOpen, HelpCircle } from 'lucide-react';

const TYPES = [
  { value: 'blog_artigos', label: 'Blog / Artigos', icon: FileText },
  { value: 'ferramentas', label: 'Ferramentas', icon: LayoutGrid },
  { value: 'materiais_gratuitos', label: 'Materiais Gratuitos', icon: BookOpen },
] as const;

export default function MarketingDashboard() {
  const { user, logout } = useMarketingAuth();
  const [activeTab, setActiveTab] = useState<string>('blog_artigos');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [tutorialOpen, setTutorialOpen] = useState(false);

  const { data, isLoading } = trpc.marketing.content.list.useQuery({
    type: activeTab,
    status: statusFilter || undefined,
    search: search || undefined,
    page: 1,
    limit: 100,
  });

  const utils = trpc.useUtils();
  const deleteMutation = trpc.marketing.content.delete.useMutation({
    onSuccess: () => utils.marketing.content.list.invalidate(),
  });

  const handleLogout = async () => {
    await logout();
    window.location.href = '/marketing/login';
  };

  const contents = data?.rows ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <MarketingTutorialModal open={tutorialOpen} onOpenChange={setTutorialOpen} />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link
                to="/"
                className="text-base sm:text-lg font-bold bg-gradient-to-r from-brand-blue to-blue-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity truncate"
              >
                OnSmart.AI
              </Link>
              <Badge variant="secondary" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 font-medium shrink-0 max-sm:hidden">
                Marketing
              </Badge>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTutorialOpen(true)}
                className="rounded-lg border-gray-200 dark:border-gray-600 hover:border-brand-blue/50 hover:bg-brand-blue/5 text-gray-600 dark:text-gray-400 hover:text-brand-blue"
              >
                <HelpCircle className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Tutorial</span>
              </Button>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px] sm:max-w-[200px] md:max-w-none" title={user?.email ?? ''}>
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg">
                <LogOut className="h-4 w-4 mr-1.5" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
        <Card className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-xl shadow-gray-200/20 dark:shadow-none bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="pb-4 sm:pb-5 pt-6 sm:pt-7 px-4 sm:px-6 md:px-8 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/80 to-white dark:from-gray-800/50 dark:to-gray-800">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Conteúdos
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                  Os artigos do site são carregados automaticamente em produção. Edite, exclua ou crie novos aqui; as alterações aparecem no site na hora.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 p-1 h-10 sm:h-11 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
                {TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-lg text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-brand-blue data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-brand-blue font-medium transition-all py-2"
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 opacity-70 shrink-0" />
                      <span className="truncate">{t.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 sm:mb-6">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Input
                    placeholder="Buscar por título ou resumo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 rounded-xl border-gray-200 dark:border-gray-600 focus-visible:ring-brand-blue/30 h-10 sm:h-11"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/50 h-10 sm:h-11 min-w-[140px]"
                >
                  <option value="">Todos os status</option>
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                <Button asChild className="rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md hover:shadow-lg transition-all h-10 sm:h-11 w-full sm:w-auto">
                  <Link to={`/marketing/content/new?type=${activeTab}`}>
                    <Plus className="h-4 w-4 mr-2 shrink-0" />
                    Novo
                  </Link>
                </Button>
              </div>

              {TYPES.map((type) => (
                <TabsContent key={type.value} value={type.value} className="mt-0">
                  {isLoading ? (
                    <div className="py-16 flex flex-col items-center justify-center text-gray-500">
                      <div className="h-10 w-10 rounded-full border-2 border-brand-blue border-t-transparent animate-spin mb-3" />
                      <span>Carregando...</span>
                    </div>
                  ) : contents.length === 0 ? (
                    <div className="py-12 sm:py-16 px-4 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-blue-50/50 dark:from-brand-blue/10 dark:to-gray-800 border border-brand-blue/10">
                      <div className="max-w-sm mx-auto text-center">
                        <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                          {(() => {
                            const Icon = TYPES.find((t) => t.value === activeTab)?.icon ?? FileText;
                            return <Icon className="h-7 w-7 text-brand-blue" />;
                          })()}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Nenhum conteúdo nesta aba
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                          {activeTab === 'blog_artigos'
                            ? 'Em produção os artigos são carregados ao subir o servidor. Crie um manualmente com o botão abaixo se quiser.'
                            : 'Clique em "Novo" para criar o primeiro.'}
                        </p>
                        <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl shadow-md">
                          <Link to={`/marketing/content/new?type=${activeTab}`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Criar conteúdo
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 min-w-[140px]">Título</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell min-w-[100px]">Slug</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell w-24">Tipo</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 w-24">Status</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell w-28">Atualizado</TableHead>
                            <TableHead className="w-12" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contents.map((row) => (
                            <TableRow
                              key={row.id}
                              className="hover:bg-brand-blue/5 dark:hover:bg-brand-blue/10 transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                            >
                              <TableCell className="font-medium text-gray-900 dark:text-white py-3 sm:py-4 min-w-0">
                                <span className="line-clamp-2">{row.titulo}</span>
                              </TableCell>
                              <TableCell className="text-muted-foreground font-mono text-xs py-3 sm:py-4 hidden md:table-cell truncate max-w-[120px]">
                                {row.slug}
                              </TableCell>
                              <TableCell className="py-3 sm:py-4 hidden lg:table-cell">
                                {(row as { post_source?: string }).post_source === 'linkedin' ? (
                                  <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 dark:bg-blue-950/30">
                                    LinkedIn
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-gray-600 bg-gray-100 dark:bg-gray-700">
                                    Site
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="py-3 sm:py-4">
                                <Badge
                                  variant={row.status === 'published' ? 'default' : 'secondary'}
                                  className={row.status === 'published' ? 'bg-green-600 hover:bg-green-600 text-xs' : 'text-xs'}
                                >
                                  {row.status === 'published' ? 'Publicado' : 'Rascunho'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-500 py-3 sm:py-4 hidden sm:table-cell">
                                {new Date(row.updated_at).toLocaleDateString('pt-BR')}
                              </TableCell>
                              <TableCell className="py-3 sm:py-4">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="rounded-lg shadow-lg">
                                    <DropdownMenuItem asChild>
                                      <Link to={`/marketing/content/${row.id}`}>Editar</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
                                      onClick={() => {
                                        if (window.confirm('Excluir este conteúdo?')) {
                                          deleteMutation.mutate(row.id);
                                        }
                                      }}
                                    >
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
