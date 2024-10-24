'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { MultiSelect } from "@/components/ui/multi-select"

const industryOptions = [
  { value: 'fashion', label: 'Fashion' },
  { value: 'tech', label: 'Tech' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'fmcg', label: 'FMCG' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'finance', label: 'Finance' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'travel', label: 'Travel' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
]

const companySizeOptions = [
  { value: 'small', label: 'Small (1-50 employees)' },
  { value: 'medium', label: 'Medium (51-200 employees)' },
  { value: 'large', label: 'Large (200+ employees)' },
]

const targetMarketOptions = [
  { value: 'local', label: 'Local (Within a city or region)' },
  { value: 'national', label: 'National (Within the US)' },
  { value: 'global', label: 'Global (Worldwide)' },
]

const formSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  companySize: z.string().min(1, { message: "Company size is required" }),
  targetMarket: z.array(z.string()).optional(),
  projectDescription: z.string().optional(),
})

export default function ProjectSetup() {
  const [filteredIndustries, setFilteredIndustries] = useState(industryOptions)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      industry: '',
      companySize: '',
      targetMarket: [],
      projectDescription: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const handleIndustryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.toLowerCase()
    const filtered = industryOptions.filter(option =>
      option.label.toLowerCase().includes(input)
    )
    setFilteredIndustries(filtered)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Project Setup</CardTitle>
        <CardDescription>Enter your project details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project/Brand Name</Label>
            <Controller
              name="projectName"
              control={control}
              render={({ field }) => (
                <Input id="projectName" placeholder="Enter project name" {...field} />
              )}
            />
            {errors.projectName && (
              <p className="text-sm text-red-500">{errors.projectName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <input
                      type="text"
                      placeholder="Search industry..."
                      onChange={handleIndustryInputChange}
                      className="px-2 py-1 mb-2 border rounded"
                    />
                    {filteredIndustries.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.industry && (
              <p className="text-sm text-red-500">{errors.industry.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Controller
              name="companySize"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="companySize">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.companySize && (
              <p className="text-sm text-red-500">{errors.companySize.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetMarket">Target Market</Label>
            <Controller
              name="targetMarket"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={targetMarketOptions}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select target markets"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">Project Description</Label>
            <Controller
              name="projectDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="projectDescription"
                  placeholder="Enter project description"
                  {...field}
                />
              )}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit(onSubmit)} className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}