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

interface CustomToggleProps {
  checked: boolean;
  onChange: () => void;
}

const CustomToggle: React.FC<CustomToggleProps> = ({ checked, onChange }) => (
  <div 
    className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
      checked ? 'bg-purple-600' : 'bg-gray-300'
    }`}
    onClick={onChange}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
        checked ? 'translate-x-5' : ''
      }`}
    />
  </div>
)

export default function EnhancedMetricsSelectionPage() {
  const [metrics, setMetrics] = useState({
    seoKeywords: true,
    adCreatives: true,
    socialMediaPosts: true,
    websiteUpdates: false,
  })
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [customKeywords, setCustomKeywords] = useState("")
  const [customUrls, setCustomUrls] = useState("")
  const [trackingFrequency, setTrackingFrequency] = useState("weekly")

  const handleMetricToggle = (metric: keyof typeof metrics) => {
    setMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Selected Metrics:", metrics)
    console.log("Custom Keywords:", customKeywords)
    console.log("Custom URLs:", customUrls)
    console.log("Tracking Frequency:", trackingFrequency)
  }

  const metricIcons = {
    seoKeywords: <BarChart className="h-6 w-6" />,
    adCreatives: <Zap className="h-6 w-6" />,
    socialMediaPosts: <Share2 className="h-6 w-6" />,
    websiteUpdates: <Globe className="h-6 w-6" />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="bg-white text-black rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center">Metrics Selection</CardTitle>
          <CardDescription className="text-center text-grey-600">
            Choose the metrics you want to track for your competitors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(metrics).map(([key, value]) => (
                <Card key={key} className="flex items-center justify-between p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                    {metricIcons[key as keyof typeof metrics]} 
                    </div>
                    <div>
                      <Label htmlFor={key} className="text-lg font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                      <p className="text-sm text-gray-500">Track competitor {key}</p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CustomToggle
                          checked={value}
                          onChange={() => handleMetricToggle(key as keyof typeof metrics)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{value ? 'Disable' : 'Enable'} tracking</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
                {Object.values(metrics).filter(Boolean).length} metrics selected
              </p>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Save & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}