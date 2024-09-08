import React, { ChangeEvent } from "react";
import FormFieldContainer from "../FormFieldContainer/FormFieldContainer";
import { CriteriaType } from "../steve/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon, X } from "lucide-react";

interface PropTypes {
  idx: number;
  handleCriteriaInput: Function;
  criteria: CriteriaType;
}

const Criteria = (props: PropTypes) => {
  const { idx, criteria, handleCriteriaInput } = props;
  return (
    <div key={idx} className="relative flex justify-center gap-2">
      <FormFieldContainer label="Enter Criteria">
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleCriteriaInput(e, idx);
          }}
          value={criteria?.criteriaType}
          className="w-[150px]"
          name="criteriaType"
        />
      </FormFieldContainer>
      <div className="flex flex-col gap-2">
        <Label>Enter Ends</Label>
        <div className="flex gap-2">
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.ends?.[0]}
            className="w-20"
            name="end1"
          />
          <ArrowRightIcon className="h-8" />
          <Input
            onChange={(e) => {
              handleCriteriaInput(e, idx);
            }}
            value={criteria?.ends?.[1]}
            className="w-20"
            name="end2"
          />
        </div>
      </div>
      <FormFieldContainer label="Enter No of Divisions">
        <Input
          onChange={(e) => {
            handleCriteriaInput(e, idx);
          }}
          value={criteria?.noOfDivisions}
          className="w-[150px]"
          name="noOfDivisions"
        />
      </FormFieldContainer>
      <div
        data-action="delete"
        data-type="criteria"
        data-index={idx}
        className="flex h-full cursor-pointer items-center p-1"
      >
        <X className="text-red-600" />
      </div>
    </div>
  );
};

export default Criteria;
