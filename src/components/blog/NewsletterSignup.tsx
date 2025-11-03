
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Gift, TrendingUp, Users } from "lucide-react";
import { useState } from 'react';

const NewsletterSignup = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, informe seu email para assinar a newsletter.",
        variant: "destructive"
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Aceite os termos",
        description: "Você precisa aceitar os termos para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Newsletter sign up:", { email, name });
    
    toast({
      title: "🎉 Inscrição realizada com sucesso!",
      description: "Você receberá nosso e-book gratuito e nossos melhores conteúdos sobre IA.",
      variant: "default"
    });
    
    setEmail('');
    setName('');
    setAcceptTerms(false);
    setIsLoading(false);
  };

  return (
    <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 dark:from-primary/10 dark:via-primary/20 dark:to-accent/10 py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Benefits */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Receba conteúdos exclusivos sobre <span className="text-primary">Agentes de IA</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a mais de 5.000 profissionais que recebem insights semanais sobre implementação de IA, cases de sucesso e tendências do mercado.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">E-book Gratuito</h3>
                  <p className="text-sm text-muted-foreground">Guia completo: "10 Agentes de IA para Transformar sua Empresa"</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Conteúdo Exclusivo</h3>
                  <p className="text-sm text-muted-foreground">Cases reais, ROI detalhado e estratégias de implementação</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Comunidade VIP</h3>
                  <p className="text-sm text-muted-foreground">Acesso ao grupo exclusivo no LinkedIn com especialistas</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span>+5.000 profissionais já inscritos</span>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Comece agora!</h3>
              <p className="text-muted-foreground">Receba seu e-book gratuito imediatamente</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label 
                  htmlFor="terms" 
                  className="text-xs text-muted-foreground leading-tight cursor-pointer"
                >
                  Aceito receber emails com conteúdos, novidades e ofertas da OnSmartAI. Posso cancelar a qualquer momento.
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : "Quero meu e-book gratuito! "}
              </Button>
            </form>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              🔒 Seus dados estão seguros. Não compartilhamos com terceiros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
