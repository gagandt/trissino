"use client";

import * as React from "react";
import { Instagram, Linkedin, Twitter, Facebook, BarChart, BarChart2, Clock, Eye, MessageCircle, Share2, ThumbsUp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from 'next/navigation';
import { competitors, posts } from "@/ data/mock-data";
import moment from "moment";
import { Image } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function SocialAnalysisPage() {
  const { projectId } = useParams();
  const [selectedPost, setSelectedPost] = React.useState(posts[0]);
  const router = useRouter();

  const hashtags = selectedPost?.content.match(/#\w+/g) || [];
  const postLength = selectedPost?.content.length || 0;


  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="text-pink-500 h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="text-blue-700 h-5 w-5" />;
      case "twitter":
        return <Twitter className="text-blue-500 h-5 w-5" />;
      case "facebook":
        return <Facebook className="text-blue-800 h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-800">Post Analysis</h1>
            <p className="text-lg text-muted-foreground">Detailed insights into selected competitor posts.</p>
          </div>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  All Posts
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Posts</DropdownMenuItem>
                {competitors.map((competitor) => (
                  <DropdownMenuItem key={competitor}>
                    {competitor}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Sort by
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Most Likes</DropdownMenuItem>
                <DropdownMenuItem>Most Comments</DropdownMenuItem>
                <DropdownMenuItem>Most Shares</DropdownMenuItem>
                <DropdownMenuItem>Highest Engagement Rate</DropdownMenuItem>
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-1 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>Selected Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className={`mb-4 cursor-pointer rounded-lg p-3 transition-all hover:shadow-md ${selectedPost?.id === post.id ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.image}
                      alt={`Post by ${post.competitor}`}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-lg">{post.competitor}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {renderPlatformIcon(post.platform)}
                        <Separator orientation="vertical" className="h-4" />

                        <span className="text-xs font-light text-gray-600">
                          {moment(post.date).format('DD MMM YYYY')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>Analysis Details</CardTitle>
            <CardDescription>{selectedPost?.competitor} - <span className="text-xs font-light text-gray-600">{moment(selectedPost?.date).format('DD MMM YYYY')}</span></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">

              <div className="flex  gap-6">
                {/* Content analysis part here */}
                <Card className=" w-2/3 shadow-sm border border-gray-200 rounded-lg">
                  <CardHeader>
                    <CardTitle>Content Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-medium text-lg">Content:</h3>
                      <p className="text-sm text-muted-foreground">{selectedPost?.content}</p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium text-lg">Post Details:</h3>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <span className="px-2 py-1 text-sm font-medium text-black bg-gray-200 rounded">Text</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedPost?.estimatedReadTime} min read</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <BarChart2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{postLength} characters</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedPost?.impressions.toLocaleString()} impressions</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium text-lg">Hashtags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {hashtags.map((hashtag, index) => (
                          <span key={index} className="px-2 py-1 text-sm font-medium text-black bg-gray-200 rounded-lg hover:bg-gray-300">
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium text-lg">Top Keywords:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost?.topKeywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 text-sm font-medium text-black bg-gray-200 rounded-lg hover:bg-gray-300">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className=" w-1/3 shadow-sm border border-gray-200 rounded-lg bg-muted">
                  <CardHeader>
                    <CardTitle>Content Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <div className="flex justify-center items-center h-full">
                      <Image className="w-24 h-24 text-gray-400" />
                    </div>




                  </CardContent>
                </Card>
              </div>

              {/* // engagement Metrics  */}
              <Card className="shadow-sm border border-gray-200 rounded-lg">
                <CardHeader className="pb-0">
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <ThumbsUp className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Likes</p>
                        <p className="text-2xl font-bold">{selectedPost?.likes}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Comments</p>
                        <p className="text-2xl font-bold">{selectedPost?.comments}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Share2 className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Shares</p>
                        <p className="text-2xl font-bold">{selectedPost?.shares}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <BarChart className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Engagement Rate</p>
                        <p className="text-2xl font-bold">{selectedPost?.engagementRate}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>



              {/* audience reactions */}

              <Card className="shadow-sm border border-gray-200 rounded-lg">
                <CardHeader>
                  <CardTitle>Audience Reaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="mb-2 font-medium text-lg">Sentiment Analysis:</p>
                    <div className="flex h-4 overflow-hidden rounded-full bg-muted">
                      <div
                        className="bg-green-500"
                        style={{ width: `${selectedPost?.sentiment?.positive}%` }}
                      />
                      <div
                        className="bg-yellow-500"
                        style={{ width: `${selectedPost?.sentiment?.neutral}%` }}
                      />
                      <div
                        className="bg-red-500"
                        style={{ width: `${selectedPost?.sentiment?.negative}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>Positive: {selectedPost?.sentiment.positive}%</span>
                      <span>Neutral: {selectedPost?.sentiment.neutral}%</span>
                      <span>Negative: {selectedPost?.sentiment.negative}%</span>
                    </div>
                  </div>
                  <p className="mb-2 font-medium text-lg">Top Comments:</p>
                  <ScrollArea className="h-24 p-2 bg-gray-50 rounded-lg">
                    {selectedPost?.topComments.map((comment, index) => (
                      <p key={index} className="text-sm text-muted-foreground mb-2">
                        {comment}
                      </p>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>Back to Dashboard</Button>
        <Button>
          <Share2 className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
