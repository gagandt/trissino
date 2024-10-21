"use client"

import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from 'date-fns';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DatePickerWithRangeProps {
  selected: DateRange;
  onSelect: (range: DateRange) => void;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({ selected, onSelect }) => {

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    onSelect({ from: start, to: end });
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <DatePicker
          selected={selected.from} 
          onChange={handleDateChange}
          startDate={selected.from ?? undefined}  
          endDate={selected.to ?? undefined}     
          selectsRange
          isClearable
          className="w-full border border-gray-300 rounded-md px-2 py-2"
          placeholderText="Select date range"
        />
        <Button className="ml-2 p-2" variant="outline">
          <Calendar className="w-4 h-4" />
        </Button>
      </div>
      <div className="mt-2 text-gray-600 text-sm">
        {selected.from && selected.to ? (
          <span>{`Selected range: ${format(selected.from, 'yyyy-MM-dd')} to ${format(selected.to, 'yyyy-MM-dd')}`}</span>
        ) : (
          <span>Select a date range</span>
        )}
      </div> 
    </div>
  );
};
