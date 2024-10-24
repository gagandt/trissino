"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { dummyData, Trendcompetitor } from "@/ data/mock-data"; 

const calculateBenchmarks = (data: any[], selectedCompetitors: string[]) => {
  const averages = data.map((entry) => {
    const values = selectedCompetitors.map((competitor) => entry[competitor]);
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      ...entry,
      average: sum / values.length,
    };
  });

  const allValues = data.flatMap((entry) =>
    selectedCompetitors.map((competitor) => entry[competitor])
  );
  const topPerformer = Math.max(...allValues);
  const lowestPerformer = Math.min(...allValues);

  return { averages, topPerformer, lowestPerformer };
};

export default function EnhancedHistoricalDataTrends() {
  const [selectedMetric, setSelectedMetric] = useState("SEO Keywords");
  const [showBenchmarks, setShowBenchmarks] = useState(false);
  const [selectedCompetitors, setSelectedCompetitors] = useState(["DJI", "Autel Robotics", "Matternet"]);

  const handleCompetitorSelection = (competitor: string) => {
    setSelectedCompetitors((prev) =>
      prev.includes(competitor)
        ? prev.filter((c) => c !== competitor)
        : [...prev, competitor]
    );
  };

  const data = useMemo(() => dummyData[selectedMetric as keyof typeof dummyData], [selectedMetric]);
  const { averages, topPerformer, lowestPerformer } = useMemo(
    () => calculateBenchmarks(data, selectedCompetitors),
    [data, selectedCompetitors]
  );

  const colors = [
    "#1f77b4", 
    "#ff7f0e", 
    "#2ca02c", 
    "#d62728", 
    "#9467bd", 
    "#8c564b", 
    "#17becf", 
];


  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-semibold mb-4">Activity Analysis</h1>

      <div className="flex flex-wrap justify-between mb-8 gap-4">
        <Card className="bg-card p-4 rounded-lg shadow-md flex-1 min-w-[250px]">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Top Competitor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">DJI</p>
            <p className="text-center text-sm text-muted-foreground">Most active in the last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card p-4 rounded-lg shadow-md flex-1 min-w-[250px]">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Overall Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">SEO Increasing</p>
            <p className="text-center text-sm text-muted-foreground">15% growth in the last quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-card p-4 rounded-lg shadow-md flex-1 min-w-[250px]">
          <CardHeader>
            <CardTitle className="text-center text-xl font-medium">Key Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">Ad Campaigns</p>
            <p className="text-center text-sm text-muted-foreground">50% of all activities</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Activity Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SEO Keywords">SEO Keywords</SelectItem>
            <SelectItem value="Ad Creatives">Ad Creatives</SelectItem>
            <SelectItem value="Social Media Posts">Social Media Posts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Select Competitors:</h4>
        <div className="flex flex-wrap gap-4">
          {Trendcompetitor.map((competitor) => (
            <label key={competitor} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCompetitors.includes(competitor)}
                onChange={() => handleCompetitorSelection(competitor)}
                className="form-checkbox h-4 w-4"
              />
              <span>{competitor}</span>
            </label>
          ))}
        </div>
      </div>

      <Card className="bg-card shadow-lg rounded-lg p-6">
        <CardHeader className="mb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{selectedMetric} Trends</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-benchmarks"
                checked={showBenchmarks}
                onCheckedChange={setShowBenchmarks}
              />
              <Label htmlFor="show-benchmarks" className="text-sm">Show Benchmarks</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={averages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedCompetitors.map((competitor, index) => (
                  <Line
                    key={competitor}
                    type="monotone"
                    dataKey={competitor}
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
                {showBenchmarks && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#ff7300"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                    />
                    <ReferenceLine y={topPerformer} label="Top" stroke="green" strokeDasharray="3 3" />
                    <ReferenceLine y={lowestPerformer} label="Lowest" stroke="red" strokeDasharray="3 3" />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end space-x-4">
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => console.log("Generate Report")}
        >
          Generate Report
        </Button>
        <Button variant="outline" onClick={() => console.log("Save and Continue")}>
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
