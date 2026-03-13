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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/90 to-indigo-50/80 dark:from-gray-950 dark:via-blue-950/30 dark:to-gray-950 relative overflow-hidden">
      {/* Detalhe de fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <MarketingTutorialModal open={tutorialOpen} onOpenChange={setTutorialOpen} />

      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link
                to="/"
                className="text-base sm:text-lg font-bold bg-gradient-to-r from-brand-blue via-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity truncate"
              >
                OnSmart.AI
              </Link>
              <Badge className="bg-gradient-to-r from-brand-blue to-blue-600 text-white border-0 font-medium shrink-0 max-sm:hidden shadow-sm">
                Marketing
              </Badge>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTutorialOpen(true)}
                className="rounded-xl border-brand-blue/30 bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue dark:border-brand-blue/40 dark:bg-brand-blue/10 dark:hover:bg-brand-blue/20 transition-all"
              >
                <HelpCircle className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Tutorial</span>
              </Button>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate max-w-[120px] sm:max-w-[200px] md:max-w-none" title={user?.email ?? ''}>
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors">
                <LogOut className="h-4 w-4 mr-1.5" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6 relative z-0">
        <Card className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-xl shadow-brand-blue/10 dark:shadow-brand-blue/5 bg-white dark:bg-gray-800 overflow-hidden animate-scale-up">
          <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-blue-500 to-indigo-500" />
          <CardHeader className="pb-4 sm:pb-5 pt-6 sm:pt-7 px-4 sm:px-6 md:px-8 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-sky-50/80 via-white to-blue-50/50 dark:from-gray-800/80 dark:via-gray-800 dark:to-gray-800/80">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent tracking-tight">
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
              <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 p-1.5 h-11 sm:h-12 bg-gray-100 dark:bg-gray-700/50 rounded-xl border border-gray-200/80 dark:border-gray-600/50">
                {TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-lg text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-blue data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-0 dark:data-[state=active]:from-brand-blue dark:data-[state=active]:to-blue-600 font-semibold transition-all duration-200 py-2.5 data-[state=inactive]:hover:bg-gray-200/80 dark:data-[state=inactive]:hover:bg-gray-600/50"
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 opacity-90 shrink-0" />
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
                    className="pl-10 rounded-xl border-gray-200 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:border-brand-blue/50 h-10 sm:h-11 transition-shadow"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue/50 h-10 sm:h-11 min-w-[140px] transition-colors"
                >
                  <option value="">Todos os status</option>
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                <Button asChild className="rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 h-10 sm:h-11 w-full sm:w-auto font-semibold">
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
                    <div className="py-12 sm:py-16 px-4 rounded-2xl bg-gradient-to-br from-brand-blue/10 via-blue-50/60 to-indigo-50/40 dark:from-brand-blue/15 dark:via-gray-800 dark:to-gray-800 border border-brand-blue/20 animate-fade-in">
                      <div className="max-w-sm mx-auto text-center">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4 animate-bounce-light">
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
                        <Button asChild className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white rounded-xl shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold">
                          <Link to={`/marketing/content/new?type=${activeTab}`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Criar conteúdo
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700 overflow-x-auto overflow-hidden shadow-inner bg-gray-50/50 dark:bg-gray-800/30">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 min-w-[140px]">Título</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell min-w-[100px]">Slug</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell w-24">Tipo</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 w-24">Status</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell w-28">Atualizado</TableHead>
                            <TableHead className="w-12" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contents.map((row, index) => (
                            <TableRow
                              key={row.id}
                              className="animate-fade-in-up hover:bg-blue-50/70 dark:hover:bg-blue-950/20 hover:shadow-sm transition-all duration-200 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                              style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'backwards' }}
                            >
                              <TableCell className="font-medium text-gray-900 dark:text-white py-3 sm:py-4 min-w-0">
                                <span className="line-clamp-2">{row.titulo}</span>
                              </TableCell>
                              <TableCell className="text-muted-foreground font-mono text-xs py-3 sm:py-4 hidden md:table-cell truncate max-w-[120px]">
                                {row.slug}
                              </TableCell>
                              <TableCell className="py-3 sm:py-4 hidden lg:table-cell">
                                {(row as { post_source?: string }).post_source === 'linkedin' ? (
                                  <Badge variant="outline" className="text-[#0091ff] border-[#0091ff]/40 bg-[#0091ff]/10 dark:bg-[#0091ff]/20 font-medium">
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
                                  className={row.status === 'published' ? 'bg-emerald-500 hover:bg-emerald-600 text-white text-xs shadow-sm shadow-emerald-500/30' : 'text-xs'}
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
