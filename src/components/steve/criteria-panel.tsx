"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, useMemo, useState } from "react";
import { Button } from '../ui/button';
import Criteria from './criterias';
import { CriteriaType, StateType } from '@/app/steve/page';

const CriteriaPanel = () => {

  const [state, setState] = useState<StateType>({
    term: "",
    city: "",
    keywords: ["somethign", "something 2"],
    criterias: [],
  });

  const handleAddCriteria = () => {
    const newCriteria = {
      criteriaType: "",
      ends: ["low", "high"],
      noOfDivisions: 4,
    };
    setState((prev: StateType) => {
      if (prev?.criterias?.[0] && !prev?.criterias?.[0]?.criteriaType)
        return prev;
      return {
        ...prev,
        criterias: [newCriteria, ...prev?.criterias!],
      };
    });
  };

  const handleCriteriaInput = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const { value, name } = e.target;
    console.log(value, name);
    setState((prev: StateType) => {
      return {
        ...prev,
        criterias: prev?.criterias?.map((ele: CriteriaType, index: number) => {
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
        }),
      };
    });
  };

  const handleCriteriaClick = (e: any) => {
    const closesDiv = e.target.closest("div");
    if (
      closesDiv.dataset.type === "criteria" &&
      closesDiv.dataset.action === "delete"
    ) {
      setState((prev: StateType) => {
        return {
          ...prev,
          criterias: prev?.criterias?.filter((k: CriteriaType, idx: number) => {
            return idx !== parseInt(closesDiv.dataset.index, 10);
          }),
        };
      });
    }
  };
  
  return (
    <div className="flex w-fit flex-col items-start gap-2 rounded-lg border border-slate-200 p-2">
          <Button onClick={handleAddCriteria} className="w-[200px]">
            Add Criteria
          </Button>
          {!!state?.criterias?.length && (
            <div className="flex flex-col gap-2">
              <Label>Criterias</Label>
              <div
                onClick={handleCriteriaClick}
                className="flex flex-col gap-2"
              >
                {state?.criterias?.map((ele: CriteriaType, idx: number) => {
                  return (
                    <Criteria
                      idx={idx}
                      criteria={ele}
                      handleCriteriaInput={handleCriteriaClick}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
  )
}

export default CriteriaPanel