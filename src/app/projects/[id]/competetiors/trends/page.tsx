"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportGenerationModal from "@/components/competetiors/report-generate";

type Metric = "SEO Keywords" | "Ad Creatives" | "Social Media Posts" | "Website Updates";

const generateMockData = (competitors: string[], days: number) => {
  return competitors.map((competitor) => ({
    name: competitor,
    data: Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      seoRank: Math.floor(Math.random() * 100) + 1,
      adSpend: Math.floor(Math.random() * 10000),
      socialEngagement: Math.floor(Math.random() * 1000),
      websiteUpdates: Math.floor(Math.random() * 10),
    })),
  }));
};

const competitors = ["Competitor A", "Competitor B", "Competitor C", "Competitor D"];
const metrics: Metric[] = ["SEO Keywords", "Ad Creatives", "Social Media Posts", "Website Updates"];

export default function EnhancedHistoricalDataTrends() {
  const [selectedMetrics, setSelectedMetrics] = useState<Record<Metric, boolean>>({
    "SEO Keywords": true,
    "Ad Creatives": true,
    "Social Media Posts": true,
    "Website Updates": false,
  });
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([competitors[0] || ""]);
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [activeTab, setActiveTab] = useState<Metric>("SEO Keywords");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [trackingFrequency, setTrackingFrequency] = useState("weekly");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const generatedData = generateMockData(selectedCompetitors, 30);
    setData(generatedData);
  }, [selectedCompetitors]);

  const handleMetricToggle = (metric: Metric) => {
    setSelectedMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  const renderChart = () => {
    if (!data || data.length === 0 || !data[0]?.data?.length) {
      return <div>No data available</div>; 
    }

    switch (activeTab) {
      case "SEO Keywords":
      case "Social Media Posts":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data[0].data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                tick={{ fontSize: 12 }}  
                interval="preserveStartEnd"  
                angle={-45}  
                textAnchor="end"  
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ccc' }} 
                itemStyle={{ color: '#666' }} 
              />
              <Legend />
              {data.map((competitor, index) => (
                <Line
                  key={competitor.name}
                  type="monotone"
                  dataKey={activeTab === "SEO Keywords" ? "seoRank" : "socialEngagement"}
                  data={competitor.data}
                  name={competitor.name}
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  isAnimationActive={true}  
                  animationDuration={800}
                  dot={{ r: 5 }}  
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case "Ad Creatives":
      case "Website Updates":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data[0].data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                tick={{ fontSize: 12 }}  
                interval="preserveStartEnd"  
                angle={-45}  
                textAnchor="end"  
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.map((competitor, index) => (
                <Bar
                  key={competitor.name}
                  dataKey={activeTab === "Ad Creatives" ? "adSpend" : "websiteUpdates"}
                  name={competitor.name}
                  fill={`hsl(${index * 60}, 70%, 50%)`}
                  isAnimationActive={true} 
                  animationDuration={800} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Historical Data & Trends</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Metrics Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric} className="flex items-center justify-between">
              <Label htmlFor={metric} className="text-lg">
                {metric}
              </Label>
              <Switch
                id={metric}
                checked={selectedMetrics[metric]}
                onCheckedChange={() => handleMetricToggle(metric)}
              />
            </div>
          ))}

          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="w-full justify-between"
            >
              Advanced Customization
              {isAdvancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {isAdvancedOpen && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="competitors">Competitors</Label>
                  <Select
                    value={selectedCompetitors.join(", ")}
                    onValueChange={(value: any) => setSelectedCompetitors(value.split(", "))}
                  >
                    <SelectTrigger id="competitors">
                      <SelectValue placeholder="Select competitors" />
                    </SelectTrigger>
                    <SelectContent>
                      {competitors.map((competitor) => (
                        <SelectItem key={competitor} value={competitor}>
                          {competitor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <DatePickerWithRange
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range.from && range.to) {
                        setDateRange({ from: range.from, to: range.to });
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="trackingFrequency">Tracking Frequency</Label>
            <Select value={trackingFrequency} onValueChange={setTrackingFrequency}>
              <SelectTrigger id="trackingFrequency">
                <SelectValue placeholder="Select tracking frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Metric)}>
        <TabsList className="grid w-full grid-cols-4">
          {metrics.map((metric) => (
            <TabsTrigger key={metric} value={metric} disabled={!selectedMetrics[metric]}>
              {metric}
            </TabsTrigger>
          ))}
        </TabsList>
        {metrics.map((metric) => (
          <TabsContent key={metric} value={metric}>
            <Card>
              <CardHeader>
                <CardTitle>{metric}</CardTitle>
              </CardHeader>
              <CardContent>{renderChart()}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 flex justify-between">
        <Button
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => setIsModalOpen(true)} 
        >
          Generate Report
        </Button>

        <Button
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => console.log("Save and Continue")}
        >
          Save & Continue
        </Button>
      </div>

      {isModalOpen && (
        <ReportGenerationModal open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </div>
  );
}
