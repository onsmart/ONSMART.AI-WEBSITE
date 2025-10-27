
import React from "react";
import ResultsHeader from "./results/ResultsHeader";
import ProductivityChart from "./results/ProductivityChart";
import InnovationChart from "./results/InnovationChart";
import EngagementChart from "./results/EngagementChart";
import MarketResponseChart from "./results/MarketResponseChart";
import ResultsFooter from "./results/ResultsFooter";

const ResultsVisuals = () => {
  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl">
        <ResultsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductivityChart />
          <InnovationChart />
          <EngagementChart />
          <MarketResponseChart />
        </div>

        <ResultsFooter />
      </div>
    </section>
  );
};

export default ResultsVisuals;
