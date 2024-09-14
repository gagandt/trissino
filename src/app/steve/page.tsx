"use client";

import React, { useState } from "react";
import FilterCard from "@/components/steve/filter-card";
import AnalysisLoader from "@/components/ui/analysis-loader";
import SteveUrls from "@/components/steve/urls-panel";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-vanish-input";

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const onSubmitPrompt = () => {
    console.log(prompt)
  }

  return (
    <div className="flex min-h-screen flex-col items-center pb-32">
      {isLoading && <AnalysisLoader isLoading={isLoading} />}
      <PlaceholdersAndVanishInput
        placeholders={["Research about burger joints in Austin Texas and categorize on pricing", "Search for a job"]}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={onSubmitPrompt}
      />
      <FilterCard setIsOpen={setIsOpen} />
      <SteveUrls isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default page;
