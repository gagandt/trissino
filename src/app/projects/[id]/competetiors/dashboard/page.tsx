"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  Filter,
  Save,
  ThumbsUp,
  MessageSquare,
  Share2,
  Megaphone,
  ChevronDown,
  Search,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import moment from "moment"

const competitors = ["Competitor A", "Competitor B", "Competitor C"]
const activityTypes = ["SEO", "Ad Creatives", "Social Media"]

interface NewsItem {
  id: string
  competitor: string
  type: string
  content: string
  date: string
  likes: number
  comments: number
  shares: number
}

const generateMockNewsItem = (): NewsItem => {
  const randomCompetitor =
    competitors[Math.floor(Math.random() * competitors.length)] ?? "Unknown Competitor"
  const randomType =
    activityTypes[Math.floor(Math.random() * activityTypes.length)] ?? "Unknown Type"

  return {
    id: Math.random().toString(36).substr(2, 9),
    competitor: randomCompetitor,
    type: randomType,
    content: `New ${randomType} update for ${randomCompetitor}`,
    date: new Date().toISOString(),
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 20),
  }
}

const generateMockNewsFeed = (count: number): NewsItem[] =>
  Array.from({ length: count }, generateMockNewsItem)

export default function InteractiveDashboard() {
  const [newsFeed, setNewsFeed] = useState<NewsItem[]>([])
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("All")
  const [savedNews, setSavedNews] = useState<NewsItem[]>([])
  const [notifications, setNotifications] = useState<number>(0)
  const [isSavedNewsOpen, setIsSavedNewsOpen] = useState(false)

  useEffect(() => {
    const newsItems = generateMockNewsFeed(20)
    setNewsFeed(newsItems)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = generateMockNewsItem()
      setNewsFeed((prev) => [newItem, ...prev])
      setNotifications((prev) => prev + 1)
    }, 300000) 

    return () => clearInterval(interval)
  }, [])

  const filteredNewsFeed = newsFeed.filter((item) => {
    if (selectedCompetitor !== "All" && item.competitor !== selectedCompetitor) {
      return false
    }
    return true
  })

  const handleSaveInsight = (item: NewsItem) => {
    if (!savedNews.some((news) => news.id === item.id)) {
      setSavedNews((prev) => [...prev, item])
    }
  }

  const removeSavedInsight = (id: string) => {
    setSavedNews((prev) => prev.filter((news) => news.id !== id))
  }

  const resetNotifications = () => {
    setNotifications(0)
  }

  const CompetitorSummary = ({ competitor }: { competitor: string }) => {
    const competitorItems = newsFeed.filter((item) => item.competitor === competitor)
    const totalActivities = competitorItems.length
    const activityBreakdown = activityTypes.map((type) => ({
      type,
      count: competitorItems.filter((item) => item.type === type).length,
    }))

    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{competitor}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activityBreakdown.map(({ type, count }) => (
              <div key={type} className="flex items-center justify-between">
                <span>{type}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-1/2 group">
                        <Progress
                          value={(count / totalActivities) * 100}
                          className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{`${count} ${type} activities`}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const NewsItem = ({ item }: { item: NewsItem }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              {item.competitor === "Competitor A" && <Search className="w-4 h-4 mr-2 text-blue-500" />}
              {item.competitor === "Competitor B" && <Filter className="w-4 h-4 mr-2 text-green-500" />}
              {item.competitor === "Competitor C" && <Megaphone className="w-4 h-4 mr-2 text-purple-500" />}
              {item.competitor}
            </CardTitle>
            <Badge
              className={`
                ${item.type === "SEO" && "bg-yellow-100 text-yellow-800"}
                ${item.type === "Ad Creatives" && "bg-blue-100 text-blue-800"}
                ${item.type === "Social Media" && "bg-green-100 text-green-800"}
              `}
            >
              {item.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
  <p>{item.content}</p>
  <div className="flex justify-between items-center mt-4">
    <small className="text-gray-500 text-sm ">
      {moment(item.date).format('DD MMM YYYY, h:mm A')}
    </small>
    
    {item.type === "Social Media" && (
      <div className="flex space-x-4"> 
        <div className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4 text-gray-600" />
          <span>{item.likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4 text-gray-600" />
          <span>{item.comments}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Share2 className="w-4 h-4 text-gray-600" />
          <span>{item.shares}</span>
        </div>
      </div>
    )}
    
    <Button
      size="sm"
      onClick={() => handleSaveInsight(item)}
      className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-300 ml-4" 
    >
      <Save className="w-4 h-4 mr-2" /> Save
    </Button>
  </div>
</CardContent>

      </Card>
    </motion.div>
  )

  const FilterDropdown = ({ options, value, onChange, label }: {
    options: string[]
    value: string
    onChange: (value: string) => void
    label: string
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {value === "All" ? label : value}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem key={option} onSelect={() => onChange(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Competitor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {competitors.map((competitor) => (
          <CompetitorSummary key={competitor} competitor={competitor} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8 items-center justify-start space-x-2">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          onClick={resetNotifications}
          className="flex items-center justify-center px-4 py-2"
        >
          <Bell className="w-4 h-4 mr-2" />
          <span>Alerts</span>
          {notifications > 0 && (
            <Badge
              variant="destructive"
              className="ml-2 w-5 h-5 text-xs rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              {notifications}
            </Badge>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>You have {notifications} new notifications</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <Button
    variant="outline"
    onClick={() => setIsSavedNewsOpen(true)}
    className="flex items-center justify-center px-4 py-2"
  >
    <span>Saved News</span>
  </Button>

  <FilterDropdown
    options={["All", ...competitors]}
    value={selectedCompetitor}
    onChange={setSelectedCompetitor}
    label="Competitor"
  />
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {activityTypes.map((type) => (
          <div key={type}>
            <h2 className="text-xl font-bold mb-4">{type}</h2>
            <ScrollArea className="h-[600px] pr-4">
              <AnimatePresence>
                {filteredNewsFeed
                  .filter((item) => item.type === type)
                  .map((item) => (
                    <NewsItem key={item.id} item={item} />
                  ))}
              </AnimatePresence>
            </ScrollArea>
          </div>
        ))}
      </div>

      <Dialog open={isSavedNewsOpen} onOpenChange={setIsSavedNewsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Saved News</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {savedNews.length > 0 ? (
              savedNews.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        {item.competitor === "Competitor A" && <Search className="w-4 h-4 mr-2 text-blue-500" />}
                        {item.competitor === "Competitor B" && <Filter className="w-4 h-4 mr-2 text-green-500" />}
                        {item.competitor === "Competitor C" && <Megaphone className="w-4 h-4 mr-2 text-purple-500" />}
                        {item.competitor}
                      </CardTitle>
                      <Badge
                        className={`
                          ${item.type === "SEO" && "bg-yellow-100 text-yellow-800"}
                          ${item.type === "Ad Creatives" && "bg-blue-100 text-blue-800"}
                          ${item.type === "Social Media" && "bg-green-100 text-green-800"}
                        `}
                      >
                        {item.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSavedInsight(item.id)}
                        className="ml-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{item.content}</p>
                    <small>{new Date(item.date).toLocaleString()}</small>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No saved news items.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
