
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { engagementData, COLORS } from "./data";

const EngagementChart = () => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">Engajamento Superior</h3>
        <div className="h-64">
          <ChartContainer 
            className="h-full"
            config={{
              engagement: { color: "#0088FE" }
            }}
          >
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="valor"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Colaboradores mais satisfeitos e engajados
        </p>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
