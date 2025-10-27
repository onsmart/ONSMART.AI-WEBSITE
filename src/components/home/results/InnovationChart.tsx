
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { innovationData } from "./data";

const InnovationChart = () => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">Inovação Acelerada</h3>
        <div className="h-64">
          <ChartContainer 
            className="h-full"
            config={{
              innovation: { color: "#8b5cf6" }
            }}
          >
            <LineChart data={innovationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="valor" 
                stroke="var(--color-innovation)" 
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Taxa de inovação em constante crescimento
        </p>
      </CardContent>
    </Card>
  );
};

export default InnovationChart;
