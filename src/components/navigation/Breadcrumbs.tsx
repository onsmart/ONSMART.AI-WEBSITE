
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  className?: string;
}

const routeNames: Record<string, string> = {
  "": "Início",
  "produtos": "Produtos",
  "servicos": "Serviços",
  "case-de-sucesso": "Cases de Sucesso",
  "conteudo": "Conteúdo",
  "blog": "Blog",
  "contato": "Contato",
  "diagnostico": "Diagnóstico",
};

const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(path => path);
  
  // Se estiver na página inicial, não mostrar breadcrumbs
  if (paths.length === 0) return null;
  
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="py-3 px-4 bg-gray-50 dark:bg-gray-800/30 rounded-md">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-1" />
              <span>Início</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {paths.map((path, index) => {
          const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          
          return (
            <div key={path}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{routeNames[path] || path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={routeTo}>{routeNames[path] || path}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
