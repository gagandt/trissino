import React from "react";
import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon, Minus, Plus, Trash2 } from "lucide-react";
import { FormFieldContainer } from "./instruction-filter-card";
import { Button } from "../ui/button";
import type { CriteriaType } from "@/stores/steve-analysis-query-store";

interface PropTypes {
  idx: number;
  handleCriteriaInput: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleIncrementDivisions: (index: number) => void;
  handleDecrementDivisions: (index: number) => void;
  criteria: CriteriaType;
}

const Criteria = (props: PropTypes) => {
  const {
    idx,
    criteria,
    handleCriteriaInput,
    handleIncrementDivisions,
    handleDecrementDivisions,
  } = props;
  return (
    <div
      key={idx}
      className="relative flex w-full items-end justify-start gap-8 pr-8"
    >
      <FormFieldContainer className="flex flex-[3]" label="Enter Criteria">
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleCriteriaInput(e, idx);
          }}
          value={criteria?.criteriaType}
          className="w-full"
          name="criteriaType"
          autoComplete="off"
        />
      </FormFieldContainer>

      <div className="flex flex-col gap-2 flex-1">
        <Label className="text-slate-600">Enter Ends</Label>

        <div className="flex gap-2 items-center">
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.ends?.[0]}
            className="min-w-24 flex-1"
            name="end1"
            autoComplete="off"
          />
          <ArrowRightIcon className="h-4" />
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.ends?.[1]}
            className="min-w-24 flex-1"
            name="end2"
            autoComplete="off"
          />
        </div>
      </div>

      <FormFieldContainer label="No. of Divisions" className="flex-1">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (criteria?.noOfDivisions <= 0) return;
              handleDecrementDivisions(idx);
            }}
            size="icon"
            variant="secondary"
            className="rounded-full w-8 h-8"
          >
            <Minus className="h-5" />
          </Button>
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.noOfDivisions}
            className="w-[40px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            name="noOfDivisions"
            type="number"
          />
          <Button
            onClick={() => {
              handleIncrementDivisions(idx);
            }}
            size="icon"
            variant="secondary"
            className="rounded-full w-8 h-8"
          >
            <Plus className="h-5" />
          </Button>

          <div
            data-action="delete"
            data-type="criteria"
            data-index={idx}
            className="absolute -right-2 bottom-0 top-0 my-auto flex h-full translate-y-[15%] cursor-pointer items-center"
          >
            <Trash2 className="h-5" />
          </div>
        </div>
      </FormFieldContainer>
    </div>
  );
};

export default Criteria;
