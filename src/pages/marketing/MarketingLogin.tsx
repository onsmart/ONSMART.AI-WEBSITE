/**
 * Marketing login page: email + password, redirect to dashboard on success.
 * Fundo com ColorBends (React Bits) + identidade visual onsmart.
 */

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarketingAuth } from '@/contexts/MarketingAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Lock, Mail, HelpCircle } from 'lucide-react';
import { MarketingTutorialModal } from '@/components/marketing/MarketingTutorialModal';
import ColorBends from '@/components/ColorBends';

export default function MarketingLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const { login } = useMarketingAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/marketing';
  const redirectTo = (redirect && redirect.startsWith('/')) ? redirect : `/${redirect}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      await new Promise((r) => setTimeout(r, 600));
      window.location.assign(redirectTo);
      return;
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : 'Credenciais inválidas';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-slate-50 dark:bg-gray-950">
      {/* Fundo ColorBends - bloco que você enviou, cobrindo a tela com cores da marca */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ColorBends
          rotation={10}
          speed={0.5}
          colors={['#0091ff', '#000000', '#85baff', '#58b6fe']}
          transparent
          autoRotate={0}
          scale={0.7}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1.6}
          parallax={0.5}
          noise={0.1}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <MarketingTutorialModal open={tutorialOpen} onOpenChange={setTutorialOpen} />

      <div className="w-full max-w-md relative z-10 rounded-2xl overflow-hidden transition-[box-shadow] duration-300 hover:shadow-[0_0_50px_-10px_rgba(121,185,234,0.35)] dark:hover:shadow-[0_0_50px_-10px_rgba(121,185,234,0.2)]">
        <Card className="w-full rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xl shadow-gray-200/30 dark:shadow-none bg-white dark:bg-gray-800 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-brand-blue to-blue-600" />
          <CardHeader className="text-center pb-2 pt-6 sm:pt-8 px-6 sm:px-8">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-3">
              <Lock className="h-6 w-6 text-brand-blue" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Área de Marketing
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Faça login para continuar
          </p>
          <button
            type="button"
            onClick={() => setTutorialOpen(true)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm text-brand-blue hover:text-blue-600 dark:text-brand-blue dark:hover:text-blue-400 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Como usar a área de marketing
          </button>
        </CardHeader>
        <CardContent className="pt-4 pb-6 sm:pb-8 px-6 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="pl-10 rounded-xl border-gray-200 dark:border-gray-600 focus-visible:ring-brand-blue/30 h-11"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="rounded-xl border-gray-200 dark:border-gray-600 focus-visible:ring-brand-blue/30 h-11"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-xl">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-medium shadow-md hover:shadow-lg transition-all h-11 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2"
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
    </div>
  );
}
