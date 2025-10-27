
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadialBarChart, RadialBar, Cell } from "recharts";
import { marketResponseData } from "./data";

const MarketResponseChart = () => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">Resposta ao Mercado</h3>
        <div className="h-64">
          <ChartContainer 
            className="h-full"
            config={{
              response: { color: "#ec4899" }
            }}
          >
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="10%" 
              outerRadius="80%" 
              barSize={20} 
              data={marketResponseData}
            >
              <RadialBar
                background
                dataKey="valor"
              >
                {marketResponseData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? "#d1d5db" : "var(--color-response)"}
                  />
                ))}
              </RadialBar>
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadialBarChart>
          </ChartContainer>
        </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Capacidade de resposta ao mercado multiplicada
        </p>
      </CardContent>
    </Card>
  );
};

export default MarketResponseChart;
