import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon, Minus, Plus, X } from "lucide-react";
import { CriteriaType, FormFieldContainer } from "./filter-card";
import { Button } from "../ui/button";

interface PropTypes {
  idx: number;
  handleCriteriaInput: Function;
  handleIncrementDivisions: Function;
  handleDecrementDivisions: Function;
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
      className="relative flex w-full items-end justify-start gap-4 pr-8"
    >
      <FormFieldContainer className="flex-1" label="Enter Criteria">
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
      <div className="flex flex-1 flex-col gap-2">
        <Label className="text-slate-600">Enter Ends</Label>
        <div className="flex gap-2">
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.ends?.[0]}
            className="min-w-20 flex-1"
            name="end1"
            autoComplete="off"
          />
          <ArrowRightIcon className="h-8" />
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.ends?.[1]}
            className="min-w-20 flex-1"
            name="end2"
            autoComplete="off"
          />
        </div>
      </div>
      <FormFieldContainer className="flex-1" label="No. of Divisions">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (criteria?.noOfDivisions <= 0) return;
              handleDecrementDivisions(idx);
            }}
            variant="secondary"
          >
            <Minus className="h-5" />
          </Button>
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.noOfDivisions}
            className="w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            name="noOfDivisions"
            type="number"
          />
          <Button
            onClick={() => {
              handleIncrementDivisions(idx);
            }}
            variant="secondary"
          >
            <Plus className="h-5" />
          </Button>
        </div>
      </FormFieldContainer>
      <div
        data-action="delete"
        data-type="criteria"
        data-index={idx}
        className="absolute -right-2 bottom-0 top-0 my-auto flex h-full translate-y-[15%] cursor-pointer items-center"
      >
        <X className="h-5" />
      </div>
    </div>
  );
};

export default Criteria;
