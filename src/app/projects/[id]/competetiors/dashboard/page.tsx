"use client";

import { useState, useEffect } from "react";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  ChevronDown,
  Globe,
  Image,
  Users,
  ScanText,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import {
  competitors,
  activityTypes,
  generateMockNewsFeed,
  generateMockNewsItem,
  NewsItem,
} from "@/ data/mock-data";

const CompetitorBadge = ({ name }: { name: string }) => {
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm mr-2 bg-accent"
    >
      {initials}
    </div>
  );
};

export default function ComprehensiveCompetitorDashboard() {
  const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("All");
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<{
    SEO: string[],
    "Ad Creatives": string[],
    "Social Media": string[],
  }>({
    SEO: [],
    "Ad Creatives": [],
    "Social Media": [],
  });

  useEffect(() => {
    const newsItems = generateMockNewsFeed(50); 
    setNewsFeed(newsItems);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = generateMockNewsItem(); 
      setNewsFeed((prev) => [newItem, ...prev]);
    }, 300000); 

    return () => clearInterval(interval);
  }, []);

  const filteredNewsFeed = newsFeed.filter((item) => {
    if (selectedCompetitor !== "All" && item.competitor !== selectedCompetitor) {
      return false;
    }
    return true;
  });

  const handleSelectItem = (itemId: string, itemType: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemType]: prev[itemType as keyof typeof prev].includes(itemId)
        ? prev[itemType as keyof typeof prev].filter((id) => id !== itemId)
        : [...prev[itemType as keyof typeof prev], itemId],
    }));
  };

  const NewsItem = ({ item }: { item: NewsItem }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`mt-1 mb-2 mx-3 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50 ${selectedItems[item.type as keyof typeof selectedItems].includes(item.id) ? 'border-2 border-blue-500' : ''}`}>
        <CardHeader className="px-3 py-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <CompetitorBadge name={item.competitor} />
              {item.competitor}
            </CardTitle>
            <div className="flex items-center space-x-1">
              <small className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                {moment(item.date).fromNow(true)}
              </small>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-0">
          <p className="text-sm">{item.content}</p>
          <div className="flex justify-between items-center">
            {item.type === "Social Media" && (
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{item.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{item.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{item.shares}</span>
                </div>
              </div>
            )}

            <div className="flex w-full justify-end items-center space-x-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleSelectItem(item.id, item.type)}
                className={`hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-300 ${selectedItems[item.type as keyof typeof selectedItems].includes(item.id) ? 'text-primary' : ''}`}
              >
                <ScanText className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-300"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const FilterDropdown = ({ options, value, onChange, label }: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    label: string;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {value === "All" ? label : (
            <div className="flex items-center">
              <CompetitorBadge name={value} />
              {value}
            </div>
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem key={option} onSelect={() => onChange(option)}>
            {option === "All" ? option : (
              <div className="flex items-center">
                <CompetitorBadge name={option} />
                {option}
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Competitor Activities</h2>
        <FilterDropdown
          options={["All", ...competitors]} 
          value={selectedCompetitor}
          onChange={setSelectedCompetitor}
          label="Filter by Competitor"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activityTypes.map((type) => (
          <Card key={type} className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                {type === "SEO" && <Globe className="w-5 h-5 mr-2 text-muted-foreground" />}
                {type === "Ad Creatives" && <Image className="w-5 h-5 mr-2 text-muted-foreground" />}
                {type === "Social Media" && <Users className="w-5 h-5 mr-2 text-muted-foreground" />}
                {type}
              </CardTitle>
              {selectedItems[type as keyof typeof selectedItems].length > 0 && (
                <Button variant="outline" size="sm">
                  Analyze <Badge variant="default" className="ml-2">{selectedItems[type as keyof typeof selectedItems].length}</Badge>
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-1 pb-4">
              <ScrollArea className="h-[400px]">
                <AnimatePresence>
                  {filteredNewsFeed
                    .filter((item) => item.type === type)
                    .map((item) => (
                      <NewsItem key={item.id} item={item} />
                    ))}
                </AnimatePresence>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
