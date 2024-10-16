"use client"

import React, { useEffect, useId, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { burgerLinks } from '@/contants/brand-links'
import Image from 'next/image'
import type { BrandItem } from '@/contants/brand-links'
import { ArrowLeft, ExternalLink, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from 'framer-motion'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { useSteveAnalysisQueryStore } from '@/stores/steve-analysis-query-store'
import { FileChartLine, Download } from "lucide-react";

interface Criteria {
  name: string
  ends: string[]
  noOfDivisions: number
}

export default function AnalysisTimeline() {
  const router = useRouter()

  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const steveAnalysisQueryStore = useSteveAnalysisQueryStore(state => state);
  const { term, city, keywords, criterias } = steveAnalysisQueryStore;

  const [selectedCriteria, setSelectedCriteria] = React.useState<Criteria>({
    name: '',
    ends: [],
    noOfDivisions: 0
  })
  const [active, setActive] = React.useState<BrandItem | null>(
    null
  );

  useEffect(() => {
    if (!term) {
      router.push('/');
    }
  }, [term, router]);

  useEffect(() => {
    setSelectedCriteria({
      name: criterias[0]?.criteriaType ?? '',
      ends: criterias[0]?.ends ?? [],
      noOfDivisions: criterias[0]?.noOfDivisions ?? 0
    })
  }, [criterias])

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

  const divisions = Object.entries(groupBrandsByDivision(burgerLinks));

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <X />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.logo}
                  alt={active.name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-contain object-top bg-white dark:bg-neutral-900"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-center p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-xl"
                    >
                      {active.name}
                    </motion.h3>
                    {/* <motion.a
                      href={active.url}
                      target="_blank"
                      className="text-neutral-600 cursor-pointer dark:text-neutral-400 text-base"
                    >
                      {active.url}
                    </motion.a> */}
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.url}
                    target="_blank"
                    className="px-4 py-1 text-sm rounded-full font-bold bg-primary text-white"
                  >
                    Visit
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <div className='flex flex-col gap-2 h-36 overflow-y-auto w-full'>
                      <div>
                        <p className='text-sm font-bold'>Brand Analysis:</p>
                        <ul className='list-disc pl-5 text-sm'>
                          <li>Market positioning: {active.division === 1 ? 'Low-end' : active.division === 2 ? 'Mid-range' : 'High-end'}</li>
                          <li>Menu focus: Burgers and fast-casual dining</li>
                          <li>Target demographic: {active.division === 1 ? 'Budget-conscious consumers' : active.division === 2 ? 'Average consumers' : 'Premium segment'}</li>
                          <li>Unique selling proposition: {active.name === 'sweetgreen' ? 'Healthy, organic ingredients' : active.name === 'FIVE GUYS' ? 'Customizable burgers' : 'Quality fast food'}</li>
                        </ul>
                      </div>
                      <div>
                        <p className='text-sm font-bold'>Relevance to Search:</p>
                        <ul className='list-disc pl-5 text-sm'>
                          <li>Matches keyword: &quot;{keywords.find(keyword => active.name.toLowerCase().includes(keyword.toLowerCase())) ?? 'burger'}&quot;</li>
                          <li>Located in or serves: {city}</li>
                          <li>Aligns with {selectedCriteria.name} criteria: {selectedCriteria.ends[active.division - 1]}</li>
                        </ul>
                      </div>
                      <div>
                        <p className='text-sm font-bold'>Sources:</p>
                        <ul>
                          {['https://example.com/source1', 'https://example.com/source2', 'https://example.com/source3'].map((source, idx) => (
                            <motion.a key={idx} className='text-sm block flex gap-2 items-center hover:underline text-blue-500' href={source} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                              {source}
                            </motion.a>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className='flex flex-col max-w-6xl w-full mx-auto gap-1'>
        <Button variant='ghost' className='w-fit' onClick={() => {
          router.push('/')
        }}>
          <ArrowLeft className='mr-2' />
        </Button>


        <Card className="w-full mb-32">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Burger Restaurants in {city}</h2>
              <p className="text-sm text-muted-foreground">Keywords: {keywords.length > 0 ? keywords.join(', ') : '-'}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <FileChartLine className='text-muted-foreground' />

                <Tabs value={selectedCriteria.name} onValueChange={(value) => {
                  const criteria = criterias.find(criteria => criteria.criteriaType === value);
                  if (criteria) {
                    setSelectedCriteria({
                      name: criteria.criteriaType,
                      ends: criteria.ends,
                      noOfDivisions: criteria.noOfDivisions,
                    });
                  }
                }} className="">
                  <TabsList>
                    {criterias.map((criteria) => (
                      <TabsTrigger key={criteria.criteriaType} value={criteria.criteriaType}>{criteria.criteriaType}</TabsTrigger>
                    ))}
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
                <span className="text-sm uppercase dark:text-neutral-800">{selectedCriteria.ends[0]}</span>
                <span className="text-lg w-[200px] text-center capitalize rotate-[-90deg] dark:text-neutral-800">{selectedCriteria.name}</span>
                <span className="text-sm uppercase dark:text-neutral-800">{selectedCriteria.ends[1]}</span>
              </div>

              <div className="flex-1 overflow-x-auto rounded-lg p-4 border">
                {divisions.map(([division, brands], index: number) => (
                  <div key={division} className="mb-4">
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 ${index !== divisions.length - 1 ? 'border-b' : ''}`}>
                      {brands.map((brand: BrandItem, idx: number) => (
                        <motion.div
                          layoutId={`card-${brand.name}-${id}`}
                          key={brand.name}
                          onClick={() => setActive(brand)}
                          className="flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                        >
                          <Card
                            key={idx}
                            className='flex items-center h-[80px]'
                          >
                            <CardContent className="p-4 w-full">
                              <div className="flex items-center space-x-2">
                                <motion.div layoutId={`image-${brand.name}-${id}`}>
                                  <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={48}
                                    height={48}
                                    className='object-contain rounded-lg'
                                  />
                                </motion.div>
                                <motion.h3
                                  layoutId={`title-${brand.name}-${id}`}
                                  className="font-semibold text-sm"
                                >
                                  {brand.name}
                                </motion.h3>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}