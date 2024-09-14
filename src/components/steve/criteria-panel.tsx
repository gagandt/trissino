"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Criteria from "./criteria";
import { CriteriaType } from "./instruction-filter-card";
import { Plus, PlusCircle } from "lucide-react";

interface PropsTypes {
  criterias: CriteriaType[];
  setCriterias: Function;
}

const CriteriaPanel = (props: PropsTypes) => {
  const { criterias, setCriterias } = props;

  const handleAddCriteria = () => {
    const newCriteria = {
      criteriaType: "",
      ends: ["low", "high"],
      noOfDivisions: 4,
    };
    setCriterias((prev: any) => {
      if (prev?.[0] && !prev?.[0]?.criteriaType) return prev;
      return [newCriteria, ...prev!];
    });
  };

  const handleCriteriaInput = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const { value, name } = e.target;
    console.log(value, name);
    setCriterias((prev: any) => {
      return prev?.map((ele: CriteriaType, index: number) => {
        if (index === idx) {
          if (name === "end1") {
            ele.ends[0] = value;
            return ele;
          } else if (name === "end2") {
            ele.ends[1] = value;
            return ele;
          } else {
            return {
              ...ele,
              [name]: value,
            };
          }
        }
        return ele;
      });
    });
  };

  const handleCriteriaClick = (e: any) => {
    const closesDiv = e.target.closest("div");
    if (
      closesDiv.dataset.type === "criteria" &&
      closesDiv.dataset.action === "delete"
    ) {
      setCriterias((prev: any) => {
        return prev?.filter((k: CriteriaType, idx: number) => {
          return idx !== parseInt(closesDiv.dataset.index, 10);
        });
      });
    }
  };

  const handleIncrementDivisions = (idx: number) => {
    setCriterias((prev: any) => {
      return prev?.map((ele: CriteriaType, index: number) => {
        if (index === idx) {
          return {
            ...ele,
            noOfDivisions: ele?.noOfDivisions + 1,
          };
        }
        return ele;
      });
    });
  };

  const handleDecrementDivisions = (idx: number) => {
    setCriterias((prev: any) => {
      return prev?.map((ele: CriteriaType, index: number) => {
        if (index === idx) {
          return {
            ...ele,
            noOfDivisions: ele?.noOfDivisions - 1,
          };
        }
        return ele;
      });
    });
  };

  return (
    <div className="flex w-full flex-col items-start gap-6 rounded-lg">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold">Criteria</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddCriteria}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Criteria
        </Button>
      </div>
      {!!criterias?.length && (
        <div onClick={handleCriteriaClick} className="flex flex-col gap-7">
          {criterias?.map((ele: CriteriaType, idx: number) => {
            return (
              <Criteria
                idx={idx}
                criteria={ele}
                handleCriteriaInput={handleCriteriaInput}
                handleIncrementDivisions={handleIncrementDivisions}
                handleDecrementDivisions={handleDecrementDivisions}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CriteriaPanel;
