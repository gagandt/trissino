"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { brandLinks } from '@/contants/brand-links'
import Image from 'next/image'
import { BrandItem } from '@/contants/brand-links'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
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
  const [selectedCriteria, setSelectedCriteria] = React.useState<Criteria>({
    name: 'price',
    ends: ['low', 'high']
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

  const BRANDS = brandLinks.map(brand => ({
    ...brand,
    division: Math.floor(Math.random() * 3) + 1 // Randomly assign division 1, 2, or 3
  }))

  const divisions = Object.entries(groupBrandsByDivision(BRANDS));

  return (
    <div className='flex flex-col max-w-6xl w-full mx-auto gap-1'>
      <Button variant='ghost' className='w-fit' onClick={() => {
        router.push('/steve')
      }}>
        <ArrowLeft />
        <p>Re-Generate</p>
      </Button>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Top organic skincare brands</h2>
            <p className="text-sm text-muted-foreground">Keywords: Natural, Eco-friendly</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Button
                variant={selectedCriteria.name === 'price' ? 'default' : 'outline'}
                onClick={() => setSelectedCriteria({ name: 'price', ends: ['low', 'high'] })}
              >
                Price
              </Button>
              <Button
                variant={selectedCriteria.name === 'quality' ? 'default' : 'outline'}
                onClick={() => setSelectedCriteria({ name: 'quality', ends: ['bad', 'good'] })}
              >
                Quality
              </Button>
            </div>
          </div>

          <div className="relative flex">
            <div className="w-24 flex flex-col items-center justify-between py-4 bg-secondary rounded-l-lg">
              <span className="text-sm font-semibold uppercase">{selectedCriteria.ends[0]}</span>
              <span className="text-lg font-bold capitalize rotate-[-90deg]">{selectedCriteria.name}</span>
              <span className="text-sm font-semibold uppercase">{selectedCriteria.ends[1]}</span>
            </div>
            <div className='w-8 bg-gradient-to-b from-green-100 via-yellow-100 to-red-100' />
            <div className="flex-1 overflow-x-auto rounded-r-lg p-4 border">
              {divisions.map(([division, brands], index: number) => (
                <div key={division} className="mb-4">
                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 ${index !== divisions.length - 1 ? 'border-b' : ''}`}>
                    {brands.map((brand: BrandItem, idx: number) => (
                      <Card
                        key={idx}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={32}
                              height={32}
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