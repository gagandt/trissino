"use client";

import React, { useState } from "react";
import FilterCard from "@/components/steve/filter-card";
import AnalysisLoader from "@/components/ui/analysis-loader";
import SteveUrls from "@/components/steve/urls-panel";

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center">
      {isLoading && <AnalysisLoader isLoading={isLoading} />}
      <FilterCard setIsOpen={setIsOpen} />
      <SteveUrls isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default page;
