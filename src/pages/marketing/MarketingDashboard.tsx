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
import { MoreHorizontal, Plus, LogOut, Search } from 'lucide-react';

const TYPES = [
  { value: 'blog_artigos', label: 'Blog / Artigos' },
  { value: 'ferramentas', label: 'Ferramentas' },
  { value: 'materiais_gratuitos', label: 'Materiais Gratuitos' },
] as const;

export default function MarketingDashboard() {
  const { user, logout } = useMarketingAuth();
  const [activeTab, setActiveTab] = useState<string>('blog_artigos');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

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
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold text-gray-900 dark:text-white">
            OnSmart.AI
          </Link>
          <span className="text-sm text-gray-500">Marketing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Conteúdos</h1>
            <p className="text-sm text-gray-500">
              Os artigos atuais do site são carregados automaticamente em produção. Edite, exclua ou crie novos aqui; as alterações aparecem no site na hora. Em desenvolvimento use um Supabase separado no .env para não afetar a produção.
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                {TYPES.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por título ou resumo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                >
                  <option value="">Todos os status</option>
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                <Button asChild>
                  <Link to={`/marketing/content/new?type=${activeTab}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo
                  </Link>
                </Button>
              </div>

              {TYPES.map((type) => (
                <TabsContent key={type.value} value={type.value} className="mt-0">
                  {isLoading ? (
                    <div className="py-8 text-center text-gray-500">Carregando...</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Atualizado</TableHead>
                          <TableHead className="w-12" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contents.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              {activeTab === 'blog_artigos'
                                ? 'Nenhum artigo. Em produção os artigos do site são carregados ao subir o servidor (MARKETING_BACKFILL_FROM_SITE=true). Crie um com "Novo" se quiser.'
                                : 'Nenhum conteúdo. Clique em "Novo" para criar.'}
                            </TableCell>
                          </TableRow>
                        ) : (
                          contents.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell className="font-medium">{row.titulo}</TableCell>
                              <TableCell className="text-muted-foreground font-mono text-xs">
                                {row.slug}
                              </TableCell>
                              <TableCell>
                                {(row as { post_source?: string }).post_source === 'linkedin' ? (
                                  <Badge variant="outline" className="text-blue-600 border-blue-300">
                                    LinkedIn
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-gray-600">
                                    Site
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge variant={row.status === 'published' ? 'default' : 'secondary'}>
                                  {row.status === 'published' ? 'Publicado' : 'Rascunho'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-500">
                                {new Date(row.updated_at).toLocaleDateString('pt-BR')}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link to={`/marketing/content/${row.id}`}>Editar</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
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
                          ))
                        )}
                      </TableBody>
                    </Table>
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
