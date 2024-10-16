'use client'

import { useState } from 'react'
import { Plus, Globe, DollarSign, BarChart2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Competitor = {
  name: string
  url: string
  revenue: string
  marketShare: string
  isTracked: boolean
}

type AddCompetitorDialogProps = {
  onAddCompetitor: (competitor: Competitor) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AddCompetitorDialog({ onAddCompetitor, open, setOpen }: AddCompetitorDialogProps) {
  const [newCompetitor, setNewCompetitor] = useState<Competitor>({
    name: '',
    url: '',
    revenue: '',
    marketShare: '',
    isTracked: true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCompetitor(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddCompetitor(newCompetitor)
    setNewCompetitor({
      name: '',
      url: '',
      revenue: '',
      marketShare: '',
      isTracked: true
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[300px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex justify-between items-center">
              <span className="truncate">Add New Competitor</span>
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-4 pt-0 text-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newCompetitor.name}
                  onChange={handleInputChange}
                  required
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url" className="text-xs font-semibold">
                  URL
                </Label>
                <div className="flex items-center">
                  <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
                  <Input
                    id="url"
                    name="url"
                    value={newCompetitor.url}
                    onChange={handleInputChange}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue" className="text-xs font-semibold">
                  Revenue
                </Label>
                <div className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
                  <Input
                    id="revenue"
                    name="revenue"
                    value={newCompetitor.revenue}
                    onChange={handleInputChange}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketShare" className="text-xs font-semibold">
                  Market Share
                </Label>
                <div className="flex items-center">
                  <BarChart2 className="h-3 w-3 mr-1 flex-shrink-0" />
                  <Input
                    id="marketShare"
                    name="marketShare"
                    value={newCompetitor.marketShare}
                    onChange={handleInputChange}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Button type="submit" size="sm" className="h-7 text-xs">
                Add Competitor
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}