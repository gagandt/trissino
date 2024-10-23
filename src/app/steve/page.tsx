"use client";

import React, { useState } from "react";
import SteveUrls from "@/components/steve/urls-panel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InstructionFilterCard from "@/components/steve/instruction-filter-card";
import PromptFilterCard from "@/components/steve/prompt-filter-card";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useSteveAnalysisResult } from "@/stores/steve-analysis-result-store";
import { useSteveAnalysisQueryStore } from "@/stores/steve-analysis-query-store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSteveBrands } from "@/stores/steve-query-brands";
import { toast } from "sonner";

export type PromptTypes = 'PROMPT' | 'INSTRUCTION';

const loadingStates = [
  { text: 'Analyzing URLs' },
  { text: 'Filtering Prompts' },
  { text: 'Web scraping brand websites' },
  { text: 'Analyzing product information' },
  { text: 'Evaluating brand positioning' },
  { text: 'Assessing marketing strategies' },
  { text: 'Compiling comprehensive brand report' }
];

const Page = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [promptType, setPromptType] = useState<PromptTypes>('PROMPT');

  const setBrands = useSteveBrands((state) => state.setBrands);
  const steveAnalysisQueryStore = useSteveAnalysisQueryStore(state => state);

  const { term, keywords, criterias, city } = steveAnalysisQueryStore;

  const mutation = useMutation(
    {
      mutationFn: async () => {
        setIsLoading(true);
        const response = await fetch('/api/brand-ai-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            term: term,
            keywords: keywords,
            criteria: criterias,
            city,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        return response.json();
      },
      onSuccess: (data) => {
        setIsLoading(false);
        setIsOpen(true);
        setBrands(data.data);
        const urlsPanel = document.getElementById('urls-panel');
        if (urlsPanel) {
          urlsPanel.scrollIntoView({ behavior: 'smooth' });
        }
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('There was a problem with the fetch operation:', error);
      },
    }
  );

  
  const handleSubmitClick = () => {
    if (!term) {
      toast("Please Enter Search Term", {
        className: 'mt-4 bg-red-500',
      });
      return;
    }
    if (!city) {
      toast("Please Select a City", {
        className: 'mt-4 bg-red-500',
      });
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="flex min-h-screen flex-col items-center pb-32">
      <MultiStepLoader duration={500} loadingStates={loadingStates} loading={isLoading} />
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
          <InstructionFilterCard handleSubmitClick={handleSubmitClick} setIsOpen={setIsOpen} />
        )}
        <SteveUrls isLoading={isLoading} setIsLoading={setIsLoading} isOpen={isOpen} setIsOpen={setIsOpen} promptType={promptType} />
      </div>
    </div>
  );
};

export default Page;
