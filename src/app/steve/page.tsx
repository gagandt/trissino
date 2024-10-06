"use client";

import React, { useState } from "react";
import AnalysisLoader from "@/components/ui/analysis-loader";
import SteveUrls from "@/components/steve/urls-panel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InstructionFilterCard from "@/components/steve/instruction-filter-card";
import PromptFilterCard from "@/components/steve/prompt-filter-card";

export type PromptTypes = 'PROMPT' | 'INSTRUCTION';

const page = () => {
  const [isLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false)
  const [promptType, setPromptType] = useState<PromptTypes>('PROMPT');


  return (
    <div className="flex min-h-screen flex-col items-center pb-32">
      {isLoading && <AnalysisLoader isLoading={isLoading} />}
      <div className="w-full mt-16 max-w-3xl flex flex-col gap-3">

        <Tabs value={promptType} onValueChange={(value) => {
          setPromptType(value as PromptTypes);
        }} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="PROMPT">Prompt</TabsTrigger>
            <TabsTrigger value="INSTRUCTION">Instructions</TabsTrigger>
          </TabsList>
        </Tabs>
        {promptType === 'PROMPT' ? (
          <PromptFilterCard setIsOpen={setIsOpen} />
        ) : (
          <InstructionFilterCard setIsOpen={setIsOpen} />
        )}
        <SteveUrls isOpen={isOpen} setIsOpen={setIsOpen} promptType={promptType} />
      </div>
    </div>
  );
};

export default page;
