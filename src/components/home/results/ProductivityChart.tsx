
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { productivityData } from "./data";

const ProductivityChart = () => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">Produtividade +300%</h3>
        <div className="h-64">
          <ChartContainer 
            className="h-full"
            config={{
              antes: { color: "#d1d5db" },
              depois: { color: "#4f46e5" }
            }}
          >
            <BarChart data={productivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="valor" fill="var(--color-antes)" radius={[4, 4, 0, 0]}>
                {productivityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? "var(--color-antes)" : "var(--color-depois)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Aumento significativo de produtividade com Agentes de IA
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductivityChart;
