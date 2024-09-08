"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchableSelect, { Option } from "@/components/ui/searchableSelect";
import React, { ChangeEvent, useMemo, useState } from "react";

import usCities from "@/contants/us_states_wise_cities.json";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FormFieldContainer from "../FormFieldContainer/FormFieldContainer";
import Criteria from "../Criterias/Criterias";

export interface CriteriaType {
  criteriaType: string;
  ends: string[];
  noOfDivisions: number;
}

interface StateType {
  term: string;
  city: string;
  keywords: string[];
  criterias: CriteriaType[];
}

const keywordsList = [
  "Keyword 1",
  "Keyword 2",
  "Keyword 3",
  "Keyword 4",
  "Keyword 5",
];

const page = () => {
  const [state, setState] = useState<StateType>({
    term: "",
    city: "",
    keywords: ["somethign", "something 2"],
    criterias: [],
  });
  const [keywordInput, setKeywordInput] = useState<string>("");

  const US_CITIES = useMemo(() => {
    return usCities?.reduce((acc: Option[], city: string) => {
      acc?.push({
        label: city,
        value: city,
      });
      return acc;
    }, []);
  }, [usCities]);

  const handleKeywordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(event.target.value);
  };

  const handleAddKeyword = () => {
    if (!keywordInput?.length) return;
    setState((prev: StateType) => {
      const keywords = [...prev?.keywords];
      if (!keywords?.includes(keywordInput)) {
        keywords.unshift(keywordInput);
      }
      return {
        ...prev,
        keywords,
      };
    });
    setKeywordInput("");
  };

  const deleteKeyword = (event: any) => {
    const closesDiv = event.target.closest("div");
    if (closesDiv.dataset.action === "delete") {
      setState((prev: StateType) => {
        return {
          ...prev,
          keywords: prev?.keywords?.filter((k: string, idx: number) => {
            return idx !== parseInt(closesDiv.dataset.index, 10);
          }),
        };
      });
    }
  };

  const isValidKeyword = useMemo(() => {
    return keywordsList?.some((ele: string) => {
      return (
        keywordInput &&
        ele?.toLowerCase()?.includes(keywordInput?.toLowerCase())
      );
    });
  }, [keywordInput]);

  const handleKeywordClick = (event: any) => {
    const dataset = event.target.dataset;
    setState((prev: StateType) => {
      const keywords = [...prev?.keywords];
      if (!keywords?.includes(keywordInput)) {
        keywords.unshift(dataset.value);
      }
      return {
        ...prev,
        keywords,
      };
    });
    setKeywordInput("");
  };

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
        criterias: [newCriteria, ...prev?.criterias],
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
    <div className="flex min-h-screen flex-col items-center justify-start px-4">
      <div className="my-4 flex w-full flex-col gap-2 rounded-lg border border-slate-300 p-2">
        <div className="flex gap-3">
          <FormFieldContainer label="Search Term">
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
              className="w-[200px]"
            />
          </FormFieldContainer>
          <FormFieldContainer label="Select City">
            <SearchableSelect
              value={state?.city}
              handleChange={(value: string) => {
                setState((prev: StateType) => {
                  return {
                    ...prev,
                    city: value,
                  };
                });
              }}
              className="w-[200px]"
              optionsData={US_CITIES}
            />
          </FormFieldContainer>
        </div>

        <div className="flex flex-col">
          <FormFieldContainer label="Enter/Select Keywords">
            <div className="flex flex-col gap-2">
              <div className="relative flex flex-col">
                <Popover open={isValidKeyword}>
                  <PopoverTrigger>
                    <div className="flex items-center gap-2">
                      <Input
                        value={keywordInput}
                        onChange={handleKeywordInput}
                        className="w-[200px]"
                      />
                      <Button onClick={handleAddKeyword}>
                        <PlusIcon className="w-12" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    onOpenAutoFocus={(e: any) => {
                      e.preventDefault();
                    }}
                    onCloseAutoFocus={(e: any) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="flex flex-col pt-2">
                      <Label className="pl-1">Select Keyword</Label>
                      <div
                        onClick={handleKeywordClick}
                        className="flex max-h-[250px] flex-col overflow-auto pt-2"
                      >
                        {keywordsList?.map((ele: string) => {
                          return (
                            <div
                              data-value={ele}
                              className="cursor-pointer rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100"
                            >
                              {ele}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </FormFieldContainer>
          <div onClick={deleteKeyword} className="mt-3 flex items-center gap-2">
            {state?.keywords?.map((keyword: string, idx: number) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-md border border-slate-400 py-1 pl-3 pr-2"
                >
                  <p className="text-sm">{keyword}</p>
                  <div
                    data-action="delete"
                    data-index={idx}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 p-1"
                  >
                    <TrashIcon className="h-4 text-white" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default page;
