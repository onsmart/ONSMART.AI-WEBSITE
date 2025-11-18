
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContentManager from '@/components/admin/ContentManager';
import CaseManager from '@/components/admin/CaseManager';
import BlogManager from '@/components/admin/BlogManager';
import EvolutionApiConfig from '@/components/admin/EvolutionApiConfig';
import { Shield, FileText, Briefcase, BookOpen, MessageCircle } from 'lucide-react';

const Admin = () => {
  const { t } = useTranslation(['admin', 'common']);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-brand-blue" />
            <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          </div>
          <p className="text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t('tabs.content')}
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {t('tabs.cases')}
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t('tabs.blog')}
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>{t('sections.content.title')}</CardTitle>
                <CardDescription>
                  {t('sections.content.description')}
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
                <CardTitle>{t('sections.cases.title')}</CardTitle>
                <CardDescription>
                  {t('sections.cases.description')}
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
                <CardTitle>{t('sections.blog.title')}</CardTitle>
                <CardDescription>
                  {t('sections.blog.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp">
            <EvolutionApiConfig />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
