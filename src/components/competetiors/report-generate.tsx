import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const competitors = [
  { label: "Competitor A", value: "competitor-a" },
  { label: "Competitor B", value: "competitor-b" },
  { label: "Competitor C", value: "competitor-c" },
  { label: "Competitor D", value: "competitor-d" },
];

const metrics = [
  { id: "seo", label: "SEO" },
  { id: "ads", label: "Ads" },
  { id: "social", label: "Social Media" },
  { id: "website", label: "Website Updates" },
];

export default function ReportGenerationModal({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [includeTrends, setIncludeTrends] = useState(false);
  const [reportLayout, setReportLayout] = useState("visual");
  const [saveReport, setSaveReport] = useState(false);

  const handleGenerateReport = async () => {
    console.log("Generating report with:", {
      competitors: selectedCompetitors,
      metrics: selectedMetrics,
      dateRange,
      includeTrends,
      reportLayout,
      saveReport,
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    const blob = new Blob(["Report content goes here"], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "competitor-insights-report.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Competitor Insights Report</DialogTitle>
          <DialogDescription>
            Customize your report by selecting competitors, metrics, and date range.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Select Competitors</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedCompetitors.length > 0
                    ? `${selectedCompetitors.length} selected`
                    : "Select competitors..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search competitors..." />
                  <CommandEmpty>No competitor found.</CommandEmpty>
                  <CommandGroup>
                    {competitors.map((competitor) => (
                      <CommandItem
                        key={competitor.value}
                        onSelect={() => {
                          setSelectedCompetitors((prev) =>
                            prev.includes(competitor.value)
                              ? prev.filter((item) => item !== competitor.value)
                              : [...prev, competitor.value]
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCompetitors.includes(competitor.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {competitor.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Select Metrics</h4>
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-center space-x-2">
                <Checkbox
                  id={metric.id}
                  checked={selectedMetrics.includes(metric.id)}
                  onCheckedChange={(checked) => {
                    setSelectedMetrics((prev) =>
                      checked
                        ? [...prev, metric.id]
                        : prev.filter((id) => id !== metric.id)
                    );
                  }}
                />
                <label
                  htmlFor={metric.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {metric.label}
                </label>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Select Date Range</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="include-trends"
              checked={includeTrends}
              onCheckedChange={setIncludeTrends}
            />
            <label
              htmlFor="include-trends"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include historical data and trend charts
            </label>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Report Layout</h4>
            <RadioGroup
              defaultValue="visual"
              value={reportLayout}
              onValueChange={setReportLayout}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visual" id="visual" />
                <label htmlFor="visual">Visual Summary (with charts)</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <label htmlFor="text">Text-heavy Summary</label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="save-report"
              checked={saveReport}
              onCheckedChange={setSaveReport}
            />
            <label
              htmlFor="save-report"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Save report for future reference
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
