"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, SearchIcon } from "lucide-react";

export interface Option {
  label: string;
  value: any;
  parent?: string;
}

interface PropsTypes {
  className?: string;
  optionsData?: Option[];
  value: any;
  handleChange: Function;
}

const SearchableSelect = (props: PropsTypes) => {
  const { optionsData, className, handleChange = () => {}, value } = props;

  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        handleChange(value);
      }}
    >
      <SelectTrigger className={`w-full ${className}`}>
        <div className="flex items-center justify-between">
          <SelectValue placeholder="Select an option" />
          <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            placeholder="Search"
            className="border-b border-b-muted px-9 py-2 focus:outline-none"
          />
        </div>
        <SelectGroup>
          {optionsData
            ?.filter((ele: Option) => {
              const condition1 = ele?.value?.includes(searchQuery);
              return condition1;
            })
            ?.map((ele: Option) => {
              return <SelectItem value={ele?.value}>{ele?.label}</SelectItem>;
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SearchableSelect;
