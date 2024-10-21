"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, BarChart, Zap, Share2, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

interface Metric {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const metrics: Metric[] = [
  { key: "seoKeywords", label: "SEO Keywords", description: "Track competitor SEO keywords", icon: <BarChart className="h-5 w-5" /> },
  { key: "adCreatives", label: "Ad Creatives", description: "Track competitor ad creatives", icon: <Zap className="h-5 w-5" /> },
  { key: "socialMediaPosts", label: "Social Media Posts", description: "Track competitor social media posts", icon: <Share2 className="h-5 w-5" /> },
  { key: "websiteUpdates", label: "Website Updates", description: "Track competitor website updates", icon: <Globe className="h-5 w-5" /> },
]

export default function EnhancedMetricsSelectionPage() {
  const [selectedMetrics, setSelectedMetrics] = useState<Record<string, boolean>>({
    seoKeywords: true,
    adCreatives: true,
    socialMediaPosts: true,
    websiteUpdates: false,
  })
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [customKeywords, setCustomKeywords] = useState("")
  const [customUrls, setCustomUrls] = useState("")
  const [trackingFrequency, setTrackingFrequency] = useState("weekly")

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Selected Metrics:", selectedMetrics)
    console.log("Custom Keywords:", customKeywords)
    console.log("Custom URLs:", customUrls)
    console.log("Tracking Frequency:", trackingFrequency)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-start justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="bg-white text-black rounded-t-xl space-y-1">
          <CardTitle className="text-left">Metrics Selection</CardTitle>
          <CardDescription className="text-left text-gray-600">
            Choose the metrics you want to track for your competitors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <Card key={metric.key} className="flex items-center justify-between p-4 hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">{metric.icon}</div>
                    <div>
                      <Label htmlFor={metric.key} className="text-sm font-medium">
                        {metric.label}
                      </Label>
                      <p className="text-xs text-gray-500">{metric.description}</p>
                    </div>
                  </div>

                  <Switch
                    id={`track-${metric.key}`}
                    checked={selectedMetrics[metric.key]}
                    onCheckedChange={() => handleMetricToggle(metric.key)}
                  />
                </Card>
              ))}
            </div>

            <Collapsible
              open={advancedOpen}
              onOpenChange={setAdvancedOpen}
              className="border p-4 rounded-md bg-gray-50"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full justify-between">
                  Advanced Customization
                  {advancedOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="customKeywords">Custom Keywords</Label>
                  <Input
                    id="customKeywords"
                    placeholder="Enter custom keywords, comma-separated"
                    value={customKeywords}
                    onChange={(e) => setCustomKeywords(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customUrls">Custom URLs</Label>
                  <Input
                    id="customUrls"
                    placeholder="Enter custom URLs, comma-separated"
                    value={customUrls}
                    onChange={(e) => setCustomUrls(e.target.value)}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="space-y-2">
              <Label htmlFor="trackingFrequency">Tracking Frequency</Label>
              <Select
                value={trackingFrequency}
                onValueChange={setTrackingFrequency}
              >
                <SelectTrigger id="trackingFrequency">
                  <SelectValue placeholder="Select tracking frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="manual">Manual Refresh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {Object.values(selectedMetrics).filter(Boolean).length} metrics selected
              </p>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Save & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}