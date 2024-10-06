"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { burgerLinks } from '@/contants/brand-links'
import Image from 'next/image'
import type { BrandItem } from '@/contants/brand-links'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileChartLine, Download } from "lucide-react";
interface Brand {
  name: string
  division: number
}

interface Criteria {
  name: string
  ends: string[]
}

export default function AnalysisTimeline() {
  const router = useRouter()
  const [criteriaType, setCriteriaType] = React.useState('price');
  const [selectedCriteria, setSelectedCriteria] = React.useState<Criteria>({
    name: 'price',
    ends: ['high', 'low',]
  })

  function groupBrandsByDivision(brands: BrandItem[]) {
    return brands.reduce((acc, brand) => {
      const division = brand.division;
      if (!acc[division]) {
        acc[division] = [];
      }
      acc[division].push(brand);
      return acc;
    }, {} as Record<number, BrandItem[]>);
  }

  const BRANDS = burgerLinks.map(brand => ({
    ...brand,
    division: Math.floor(Math.random() * 3) + 1 // Randomly assign division 1, 2, or 3
  }))

  const divisions = Object.entries(groupBrandsByDivision(BRANDS));

  return (
    <div className='flex flex-col max-w-6xl w-full mx-auto gap-1'>
      <Button variant='ghost' className='w-fit' onClick={() => {
        router.push('/steve')
      }}>
        <ArrowLeft className='mr-2' />
      </Button>


      <Card className="w-full mb-32">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Burger Restaurants in Boston, Massachusetts</h2>
            <p className="text-sm text-muted-foreground">Keywords: Vegan, Healthy</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <FileChartLine className='text-muted-foreground' />

              <Tabs value={criteriaType} onValueChange={(value) => {
                setCriteriaType(value);
                if (value === 'price') {
                  setSelectedCriteria({ name: 'price', ends: ['high', 'low'] })
                } else {
                  setSelectedCriteria({ name: 'vegan friendly', ends: ['bad', 'good'] })
                }
              }} className="">
                <TabsList>
                  <TabsTrigger value="price">Price</TabsTrigger>
                  <TabsTrigger value="vegan friendly">Vegan Friendly</TabsTrigger>
                </TabsList>
              </Tabs>

            </div>

            <div className="flex items-center space-x-2">

              <Button variant='secondary' size='icon'>
                <Download className='text-foreground size-5' />
              </Button>


            </div>
          </div>

          <div className="relative flex gap-4">
            <div className="w-24 flex flex-col ont-light items-center justify-between py-4 bg-secondary rounded-lg bg-gradient-to-b from-green-100 via-yellow-100 to-red-100">
              <span className="text-sm uppercase">{selectedCriteria.ends[0]}</span>
              <span className="text-lg w-[200px] text-center capitalize rotate-[-90deg]">{selectedCriteria.name}</span>
              <span className="text-sm uppercase">{selectedCriteria.ends[1]}</span>
            </div>

            <div className="flex-1 overflow-x-auto rounded-lg p-4 border">
              {divisions.map(([division, brands], index: number) => (
                <div key={division} className="mb-4">
                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 ${index !== divisions.length - 1 ? 'border-b' : ''}`}>
                    {brands.map((brand: BrandItem, idx: number) => (
                      <Card
                        key={idx}
                        className='flex items-center h-[80px]'
                      >
                        <CardContent className="p-4 w-full">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={48}
                              height={48}
                              className='object-contain rounded-lg'
                            />
                            <p className="font-semibold text-sm">{brand.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}