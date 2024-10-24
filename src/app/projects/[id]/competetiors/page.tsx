'use client'

import { useState } from 'react'
import { X, Edit2, BarChart2, Globe, DollarSign, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AddCompetitorDialog from '@/components/competetiors/add-new-competetior'
import { industry, suggestedCompetitors } from "@/ data/mock-data";


type Competitor = {
  name: string
  url?: string
  revenue?: string
  marketShare?: string
  isTracked: boolean
}

export default function CompetitorSetup() {
  const [open, setOpen] = useState(false)
  const [competitors, setCompetitors] = useState<Competitor[]>(suggestedCompetitors.map(c => ({ ...c, isTracked: true })))

  const handleCompetitorToggle = (index: number) => {
    setCompetitors(competitors.map((c, i) =>
      i === index ? { ...c, isTracked: !c.isTracked } : c
    ))
  }

  const handleCompetitorRemove = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index))
  }

  const handleSaveAndContinue = () => {
    console.log('Selected competitors:', competitors.filter(c => c.isTracked))
  }

  const handleAddCompetitor = (competitor: Competitor) => {
    setCompetitors([...competitors, competitor])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Competitor Setup</h1>
      <p className="mb-4 text-lg">Industry: {industry}</p>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" className="m-0">
          <TabsList>
            <TabsTrigger value="all">All Competitors</TabsTrigger>
            <TabsTrigger value="tracked">Tracked Competitors</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsContent value="all">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitors.map((competitor, index) => (
              <CompetitorCard
                key={index}
                competitor={competitor}
                onToggle={() => handleCompetitorToggle(index)}
                onRemove={() => handleCompetitorRemove(index)}
              />
            ))}
            <Card className="flex flex-col items-center justify-center bg-secondary" onClick={() => setOpen(true)}>
              <Plus className="size-8 mr-2" />
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tracked">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {competitors.filter(c => c.isTracked).map((competitor, index) => (
              <CompetitorCard
                key={index}
                competitor={competitor}
                onToggle={() => handleCompetitorToggle(index)}
                onRemove={() => handleCompetitorRemove(index)}
              />
            ))}
            <Card className="flex flex-col justify-between">
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span className="truncate">Add New Competitor</span>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSaveAndContinue} className="mt-6">Save & Continue</Button>

      <AddCompetitorDialog open={open} setOpen={setOpen} onAddCompetitor={handleAddCompetitor} />
    </div>
  )
}

function CompetitorCard({ competitor, onToggle, onRemove }: { competitor: Competitor, onToggle: () => void, onRemove: () => void }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="p-4">
        <CardTitle className="text-lg flex justify-between items-center">
          <span className="truncate">{competitor.name}</span>
          <Button variant="ghost" size="icon" onClick={onRemove} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm">
        <div className="space-y-1">
          <div className="flex items-center">
            <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
            <a href={competitor.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">{competitor.url}</a>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">Revenue: {competitor.revenue}</span>
          </div>
          <div className="flex items-center">
            <BarChart2 className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">Market Share: {competitor.marketShare}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id={`track-${competitor.name}`}
            checked={competitor.isTracked}
            onCheckedChange={onToggle}
          />
          <Label htmlFor={`track-${competitor.name}`} className="text-xs">Track</Label>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Edit2 className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Competitor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={competitor.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input id="url" value={competitor.url} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="revenue" className="text-right">
                  Revenue
                </Label>
                <Input id="revenue" value={competitor.revenue} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="marketShare" className="text-right">
                  Market Share
                </Label>
                <Input id="marketShare" value={competitor.marketShare} className="col-span-3" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
