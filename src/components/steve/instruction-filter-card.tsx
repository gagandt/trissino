"use client";
import React, { useMemo } from "react";
import type { ChangeEvent, ReactNode } from "react"; // Use import type for types

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SearchableSelect from "../ui/searchable-select";
import type { Option } from "../ui/searchable-select"; // Use import type for types
import { MultiSelect } from "../ui/multi-select";
import CriteriaPanel from "./criteria-panel";

import usCities from "@/contants/us_states_wise_cities.json";
import { cn } from "@/lib/utils";
import { useSteveAnalysisQueryStore } from "@/stores/steve-analysis-query-store";

const keywordsList = [
  {
    label: "Vegan",
    value: "Vegan",
  },
  {
    label: "Ethically Sourced",
    value: "Ethically Sourced",
  },
  {
    label: "Gluten-Free",
    value: "Gluten-Free",
  },
  {
    label: "Organic",
    value: "Organic",
  },
  {
    label: "Non-GMO",
    value: "Non-GMO",
  },
  {
    label: "Healthy",
    value: "Healthy",
  }
];

const InstructionFilterCard = (props: { setIsOpen: (isOpen: boolean) => void, handleSubmitClick: () => void }) => {
  const { setIsOpen, handleSubmitClick } = props;

  const steveAnalysisQueryStore = useSteveAnalysisQueryStore(state => state);
  const { term, city, keywords, criterias } = steveAnalysisQueryStore;

  const US_CITIES = useMemo(() => {
    return usCities?.reduce((acc: Option[], city: string) => {
      acc?.push({
        label: city,
        value: city,
      });
      return acc;
    }, []);
  }, []);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Start Research</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormFieldContainer className="w-full" label="Search Term">
              <Input
                value={term}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  steveAnalysisQueryStore.setTerm(e.target.value);
                }}
                className="flex-1"
              />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1" label="Select City">
              <SearchableSelect
                label="Select City"
                value={city}
                handleChange={(value: string) => {
                  steveAnalysisQueryStore.setCity(value);
                }}
                optionsData={US_CITIES}
              />
            </FormFieldContainer>
          </div>

          <FormFieldContainer label="Enter/Select Keywords">
            <MultiSelect
              options={keywordsList}
              onValueChange={steveAnalysisQueryStore.setKeywords}
              defaultValue={keywords}
              placeholder="Select Keywords"
              variant="inverted"
              animation={2}
              maxCount={10}
              inputPlaceholder="Enter keyword"
            />
          </FormFieldContainer>
          <CriteriaPanel
            criterias={criterias}
            setCriterias={steveAnalysisQueryStore.setCriterias}
          />
        </div>
      </CardContent>
      <CardFooter className="">
        <Button className="w-full" onClick={handleSubmitClick}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

interface FormFieldContainerProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const FormFieldContainer = (props: FormFieldContainerProps) => {
  const { label, children, className } = props;
  return (
    <div className={cn("flex flex-col items-start space-y-2", className)}>
      <Label className="text-slate-600">{label}</Label>
      {children}
    </div>
  );
};

export default InstructionFilterCard;
