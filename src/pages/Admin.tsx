
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContentManager from '@/components/admin/ContentManager';
import CaseManager from '@/components/admin/CaseManager';
import BlogManager from '@/components/admin/BlogManager';
import { Shield, FileText, Briefcase, BookOpen } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-brand-blue" />
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          </div>
          <p className="text-gray-600">
            Gerencie conteúdos, cases de sucesso e posts do blog
          </p>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Conteúdos
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Cases de Sucesso
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Conteúdos</CardTitle>
                <CardDescription>
                  Adicione, edite e gerencie e-books, artigos, vídeos e outros materiais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Cases de Sucesso</CardTitle>
                <CardDescription>
                  Adicione e edite estudos de caso por setor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CaseManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Blog</CardTitle>
                <CardDescription>
                  Crie e publique artigos para o blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
