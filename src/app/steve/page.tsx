"use client";

import React, { useState } from "react";
import FilterCard from "@/components/steve/filter-card";
import AnalysisLoader from "@/components/ui/analysis-loader";

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen flex-col items-center">
      {isLoading && <AnalysisLoader isLoading={isLoading} />}
      <FilterCard setIsLoading={setIsLoading} />
    </div>
  );
};

export default page;
