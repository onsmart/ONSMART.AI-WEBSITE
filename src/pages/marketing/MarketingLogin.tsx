/**
 * Marketing login page: email + password, redirect to dashboard on success.
 * Usa redirect com reload (window.location) e delay para o navegador gravar
 * os cookies antes de carregar /marketing, evitando voltar para o login.
 */

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarketingAuth } from '@/contexts/MarketingAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';

export default function MarketingLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useMarketingAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/marketing';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      await new Promise((r) => setTimeout(r, 600));
      window.location.assign(redirect);
      return;
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : 'Credenciais inválidas';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-brand-blue/5 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/10 via-transparent to-transparent pointer-events-none" />
      <Card className="w-full max-w-md relative rounded-xl border-gray-200/80 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-brand-blue to-blue-600" />
        <CardHeader className="text-center pb-2">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-3">
            <Lock className="h-6 w-6 text-brand-blue" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Área de Marketing
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Faça login para continuar
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="pl-9 rounded-lg border-gray-200 dark:border-gray-600 focus-visible:ring-brand-blue/30"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="rounded-lg border-gray-200 dark:border-gray-600 focus-visible:ring-brand-blue/30"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white font-medium shadow-md hover:shadow-lg transition-all h-11"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
