'use client';

import React, { useState, useEffect } from 'react'; // Added useEffect
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Search, Filter, Plus, Eye } from 'lucide-react';
import { keywordGapData, backlinkData, backlinkSources, serpFeatureData } from "@/ data/mock-data"; 

export default function SEOAnalysisDashboard() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const toggleKeywordSelection = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const filteredKeywords = keywordGapData.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">SEO Analysis</h1>
      <Tabs defaultValue="keyword-gap">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keyword-gap">Keyword Gap Analysis</TabsTrigger>
          <TabsTrigger value="backlink-profile">Backlink Profile</TabsTrigger>
          <TabsTrigger value="serp-features">SERP Features</TabsTrigger>
        </TabsList>

        {/* keyword gap analysis from here*/}
        <TabsContent value="keyword-gap">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Gap Analysis</CardTitle>
              <CardDescription>Identify keyword opportunities based on competitor rankings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-purple-400 text-white">0-50</Badge>
                  <span className="text-sm text-muted-foreground">Low Difficulty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-yellow-400 text-black">51-70</Badge>
                  <span className="text-sm text-muted-foreground">Medium Difficulty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-red-500 text-white">71-100</Badge>
                  <span className="text-sm text-muted-foreground">High Difficulty</span>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                  </Button>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" /> Add to Strategy ({selectedKeywords.length})
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Keyword</TableHead>
                    <TableHead>Competitor Ranking</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Keyword Difficulty</TableHead>
                    <TableHead>Opportunity Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKeywords.length > 0 ? (
                    filteredKeywords.map((item) => (
                      <TableRow key={item.keyword} className={selectedKeywords.includes(item.keyword) ? "bg-gray-100" : ""}>
                        <TableCell>{item.keyword}</TableCell>
                        <TableCell>{item.competitorRanking}</TableCell>
                        <TableCell>{item.searchVolume.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="default"
                            className={
                              item.keywordDifficulty < 50
                                ? "bg-purple-400 text-white"
                                : item.keywordDifficulty < 70
                                ? "bg-yellow-400 text-black"
                                : "bg-red-500 text-white"
                            }
                          >
                            {item.keywordDifficulty}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.opportunityScore}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeywordSelection(item.keyword)}
                          >
                            {selectedKeywords.includes(item.keyword) ? 'Remove' : 'Select'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>No keywords match your search criteria.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* backlink profile  */}
        <TabsContent value="backlink-profile">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Profile Comparison</CardTitle>
              <CardDescription>Compare your backlink profile with competitors.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap md:flex-nowrap gap-8">
                <div className="w-full md:w-1/2 flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-4">Backlink Distribution</h3>
                  {isClient && ( 
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={backlinkData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          fill="#8884d8"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ strokeWidth: 1 }}
                        >
                          {backlinkData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-semibold mb-4">Backlink Sources</h3>
                  <div className="overflow-x-auto rounded-lg shadow-md p-4 bg-white">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Domain</TableHead>
                          <TableHead>Authority</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Anchor Text</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backlinkSources.map((source) => (
                          <TableRow key={source.domain}>
                            <TableCell>{source.domain}</TableCell>
                            <TableCell>
                              <Badge
                                variant={source.authority > 75 ? "default" : source.authority > 50 ? "secondary" : "destructive"}
                              >
                                {source.authority}
                              </Badge>
                            </TableCell>
                            <TableCell>{source.type}</TableCell>
                            <TableCell>{source.anchorText}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" /> View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SERP features */}
        <TabsContent value="serp-features">
          <Card>
            <CardHeader>
              <CardTitle>SERP Feature Opportunities</CardTitle>
              <CardDescription>Identify opportunities to appear in rich results.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>SERP Feature</TableHead>
                    <TableHead>Competitor</TableHead>
                    <TableHead>Potential Traffic</TableHead>
                    <TableHead>Difficulty Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serpFeatureData.map((item) => (
                    <TableRow key={item.keyword}>
                      <TableCell>{item.keyword}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.feature}</Badge>
                      </TableCell>
                      <TableCell>{item.competitor}</TableCell>
                      <TableCell>{item.potentialTraffic.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.potentialTraffic > 4000
                              ? "default"
                              : item.potentialTraffic > 2000
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {item.potentialTraffic > 4000 ? "High Opportunity" : "Medium Opportunity"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
