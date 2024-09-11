"use client";
import React, { ChangeEvent, ReactNode, useMemo, useState } from "react";

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
import SearchableSelect, { Option } from "../ui/searchable-select";
import { MultiSelect } from "../ui/multi-select";
import CriteriaPanel from "./criteria-panel";

import usCities from "@/contants/us_states_wise_cities.json";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export interface CriteriaType {
  criteriaType: string;
  ends: string[];
  noOfDivisions: number;
}

export interface StateType {
  term: string;
  city: string;
}

const keywordsList = [
  {
    label: "Keyword 1",
    value: "keyword1",
  },
  {
    label: "Keyword 2",
    value: "keyword2",
  },
];

const FilterCard = (props: { setIsOpen: (isOpen: boolean) => void }) => {
  const { setIsOpen } = props;

  const { toast } = useToast();

  const [state, setState] = useState<StateType>({
    term: "",
    city: "",
  });
  const [selectedKeywords, setSelectedkeywords] = useState<string[]>([]);
  const [selectedCriterias, setSelectedCriterias] = useState<CriteriaType[]>([
    {
      criteriaType: "",
      ends: ["low", "high"],
      noOfDivisions: 4,
    },
  ]);

  const US_CITIES = useMemo(() => {
    return usCities?.reduce((acc: Option[], city: string) => {
      acc?.push({
        label: city,
        value: city,
      });
      return acc;
    }, []);
  }, [usCities]);

  const handleSubmitClick = () => {
    if (!state.term) {
      toast({
        variant: "default",
        title: "Please Enter Search Term",
        description: "",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    if (!state.city) {
      toast({
        variant: "default",
        title: "Please Select a City",
        description: "",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    setIsOpen(true);

    const urlsPanel = document.getElementById('urls-panel');
    if (urlsPanel) {
      urlsPanel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card className="mt-16 w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Start Research</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormFieldContainer className="w-full" label="Search Term">
              <Input
                value={state?.term}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setState((prev: StateType) => {
                    return {
                      ...prev,
                      term: e.target.value,
                    };
                  });
                }}
                className="flex-1"
              />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1" label="Select City">
              <SearchableSelect
                label="Select City"
                value={state?.city}
                handleChange={(value: string) => {
                  setState({
                    ...state,
                    city: value,
                  });
                }}
                optionsData={US_CITIES}
                className="flex-1"
              />
            </FormFieldContainer>
          </div>

          <FormFieldContainer label="Enter/Select Keywords">
            <MultiSelect
              options={keywordsList}
              onValueChange={setSelectedkeywords}
              defaultValue={selectedKeywords}
              placeholder="Select Keywords"
              variant="inverted"
              animation={2}
              maxCount={10}
              inputPlaceholder="Enter keyword"
            />
          </FormFieldContainer>
          <CriteriaPanel
            criterias={selectedCriterias}
            setCriterias={setSelectedCriterias}
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

export default FilterCard;
