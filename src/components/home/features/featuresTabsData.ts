
import { 
  Network, 
  Activity, 
  Layers, 
  BookOpen, 
  Smartphone, 
  ChartBarIncreasing, 
  TrendingUp 
} from "lucide-react";
import { TabData } from "@/components/navigation";

export const featuresTabsData: TabData[] = [
  { value: "orquestracao", label: "Orquestração Multi-Agente", icon: Network },
  { value: "cognicao", label: "Cognição Distribuída", icon: Activity },
  { value: "interoperabilidade", label: "Interoperabilidade", icon: Layers },
  { value: "aprendizagem", label: "Aprendizagem", icon: BookOpen },
  { value: "interfaces", label: "Interfaces Adaptativas", icon: Smartphone },
  { value: "otimizacao", label: "Auto-otimização", icon: ChartBarIncreasing },
  { value: "escalabilidade", label: "Escalabilidade", icon: TrendingUp }
];
