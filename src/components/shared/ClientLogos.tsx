
import React from 'react';
import { 
  Briefcase, 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  ShoppingBag, 
  Truck, 
  Zap, 
  Users 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ClientLogos: React.FC = () => {
  // Lista de clientes com logos e setores
  const clients = [
    { 
      name: "TechCorp", 
      industry: "Tecnologia", 
      icon: Briefcase, 
      color: "blue",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png" 
    },
    { 
      name: "FinanceGroup", 
      industry: "Finanças", 
      icon: Building2, 
      color: "green",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png" 
    },
    { 
      name: "HealthPlus", 
      industry: "Saúde", 
      icon: Stethoscope, 
      color: "red",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png"  
    },
    { 
      name: "EduSmart", 
      industry: "Educação", 
      icon: GraduationCap, 
      color: "amber",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png" 
    },
    { 
      name: "RetailMaster", 
      industry: "Varejo", 
      icon: ShoppingBag, 
      color: "purple",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png" 
    },
    { 
      name: "LogisticsPro", 
      industry: "Logística", 
      icon: Truck, 
      color: "cyan",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png" 
    },
    { 
      name: "EnergyCorp", 
      industry: "Energia", 
      icon: Zap, 
      color: "yellow",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png" 
    },
    { 
      name: "ConsultingGroup", 
      industry: "Consultoria", 
      icon: Users, 
      color: "indigo",
      image: "/images/322d9a61-815d-4b8e-970b-3f14dfbac815.png" 
    },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800 dark:via-blue-900/10 dark:to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-gray-800 dark:text-gray-200 px-4 sm:px-0">
          Empresas que confiam na nossa solução
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 min-h-[120px] sm:min-h-[130px] md:min-h-[140px]"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg overflow-hidden mb-2 sm:mb-3 flex items-center justify-center flex-shrink-0">
                <div className={`absolute inset-0 bg-${client.color}-100 dark:bg-${client.color}-900/30 flex items-center justify-center`}>
                  <client.icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-${client.color}-600 dark:text-${client.color}-400`} />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center w-full min-w-0">
                <h3 className="font-semibold text-xs sm:text-sm text-center mb-1 leading-tight line-clamp-2 w-full break-words">
                  {client.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center leading-tight line-clamp-2 w-full break-words">
                  {client.industry}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-10 md:mt-12 text-center px-4 sm:px-0">
          <p className="inline-block text-center py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-brand-blue/10 to-blue-600/10 border border-brand-blue/20 rounded-full text-brand-blue dark:text-blue-300 text-sm sm:text-base font-medium shadow-sm">
            +350 empresas transformadas
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
