'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Plus, Trash2, Edit2, SquareArrowOutUpRight, FileImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type BrandItem, burgerLinks, skincareLinks } from '@/contants/brand-links'
import type { PromptTypes } from '@/app/page'

interface PropsTypes {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  promptType: PromptTypes;
  setAnalysisLoading: (isLoading: boolean) => void;
}


export default function SteveUrls(props: PropsTypes) {
  const router = useRouter();

  const { isOpen, setIsOpen, promptType, setAnalysisLoading } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [urls, setUrls] = useState<BrandItem[]>([]);
  const [editingIndex, setEditingIndex] = useState(-1)

  useEffect(() => {
    if (promptType === 'PROMPT') {
      setUrls(skincareLinks)
    } else {
      setUrls(burgerLinks)
    }
  }, [promptType])

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const delayTimer = setTimeout(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false)
        }, 400 + Math.random() * 600)
        return () => clearTimeout(loadingTimer)
      }, 2000)
      return () => clearTimeout(delayTimer)
    }
  }, [isOpen])

  const addUrl = () => {
    setUrls([...urls, { name: `New Example ${urls.length + 1}`, url: 'https://acme.org', logo: '', division: 1 }])
  }

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
  }

  const handleEdit = (index: number, newValue: string) => {
    const newUrls = [...urls]
    newUrls[index]!.url = newValue; // Removed unnecessary type assertion
    setUrls(newUrls)
  }

  const finishEditing = () => {
    setEditingIndex(-1)
  }

  const handleBrandLink = (brandLink: string) => {
    window?.open(brandLink, 'blank');
  }

  return (
    <div id="urls-panel" className="w-full mt-12 flex flex-col items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>Target URLs</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin text-primary" size={24} />
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={addUrl}
                      className="w-full mb-4"
                      variant="outline"
                    >
                      <Plus size={18} className="mr-2" /> Add URL
                    </Button>

                    <AnimatePresence>
                      {urls.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.2 + Math.random() * 0.3 }}
                          className="bg-muted rounded-md p-3 mb-3 flex items-center"
                        >
                          <div className="flex-shrink-0 mr-4">
                            {item?.logo ? (
                              <Image
                                src={item?.logo}
                                alt={`${item.name} icon`}
                                width={40}
                                height={40}
                                className="rounded-md"
                              />
                            ) : (
                              <FileImageIcon size={32} />
                            )}

                          </div>
                          <div className="flex-grow">
                            <div className="font-medium mb-1">
                              {item.name}
                            </div>
                            {editingIndex === index ? (
                              <Input
                                type="text"
                                value={item.url}
                                onChange={(e) => handleEdit(index, e.target.value)}
                                onBlur={finishEditing}
                                autoFocus
                                className="w-full bg-white"
                              />
                            ) : (
                              <div onClick={() => {
                                handleBrandLink(item?.url);
                              }} className="flex items-center gap-2 cursor-pointer w-fit hover:border-b hover:border-blue-500">
                                <p className='text-sm text-muted-foreground truncate'>{item.url}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex-shrink-0 ml-2">

                            <Link href={item.url} target='_blank'>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="mr-2"
                              >
                                <SquareArrowOutUpRight size={18} />
                              </Button>
                            </Link>

                            <Button
                              onClick={() => startEditing(index)}
                              size="icon"
                              variant="ghost"
                              className="mr-2"
                            >
                              <Edit2 size={18} />
                            </Button>
                            <Button
                              onClick={() => removeUrl(index)}
                              size="icon"
                              variant="ghost"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </CardContent>

              <CardFooter>
                <Button onClick={() => {
                  setIsOpen(false);
                  setAnalysisLoading(true);
                  setTimeout(() => {
                    setAnalysisLoading(false);
                    router.push('/analysis');
                  }, 3500);
                }} className='w-full'>
                  Start Analysis
                </Button>
              </CardFooter>
            </Card>


          </motion.div>


        )}
      </AnimatePresence>
    </div>
  )
}