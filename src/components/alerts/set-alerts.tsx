"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Bell, CheckCircle, X } from "lucide-react"
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "@/components/ui/toast" 

const alertTypes = [
  { id: "seo", label: "SEO Updates" },
  { id: "ads", label: "New Ads" },
  { id: "social", label: "Social Media Posts" },
  { id: "website", label: "Website Updates" },
]

const competitors = [
  { id: "comp1", name: "Competitor A" },
  { id: "comp2", name: "Competitor B" },
  { id: "comp3", name: "Competitor C" },
]

const frequencies = [
  { id: "realtime", label: "Real-time" },
  { id: "daily", label: "Daily Digest" },
  { id: "weekly", label: "Weekly Digest" },
]

const deliveryMethods = [
  { id: "push", label: "Push notifications" },
  { id: "email", label: "Email notifications" },
]

export default function AlertsSetupModal() {
  const [selectedAlertTypes, setSelectedAlertTypes] = useState<string[]>([])
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])
  const [frequency, setFrequency] = useState("daily")
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  const handleSaveAndApply = () => {
    const alertSettings = {
      alertTypes: selectedAlertTypes,
      competitors: selectedCompetitors,
      frequency,
      deliveryMethods: selectedDeliveryMethods,
    }
    
    console.log("Alert Settings:", alertSettings)

    // Show the toast
    setToastOpen(true)

    // Close modal
    setIsOpen(false)
  }

  return (
    <ToastProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Set Alerts
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configure Real-time Alerts</DialogTitle>
            <DialogDescription>
              Set up alerts for competitor activities. Choose the types of alerts, competitors, frequency, and delivery methods.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Alert Types */}
            <div className="grid gap-2">
              <Label>Alert Types</Label>
              {alertTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedAlertTypes.includes(type.id)}
                    onCheckedChange={(checked) => {
                      const isChecked = checked as boolean;
                      setSelectedAlertTypes(
                        isChecked
                          ? [...selectedAlertTypes, type.id]
                          : selectedAlertTypes.filter((id) => id !== type.id)
                      )
                    }}
                  />
                  <Label htmlFor={type.id}>{type.label}</Label>
                </div>
              ))}
            </div>

            {/* Competitors */}
            <div className="grid gap-2">
              <Label>Competitors</Label>
              {competitors.map((competitor) => (
                <div key={competitor.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={competitor.id}
                    checked={selectedCompetitors.includes(competitor.id)}
                    onCheckedChange={(checked) => {
                      const isChecked = checked as boolean;
                      setSelectedCompetitors(
                        isChecked
                          ? [...selectedCompetitors, competitor.id]
                          : selectedCompetitors.filter((id) => id !== competitor.id)
                      )
                    }}
                  />
                  <Label htmlFor={competitor.id}>{competitor.name}</Label>
                </div>
              ))}
            </div>

            {/* Alert Frequency */}
            <div className="grid gap-2">
              <Label>Alert Frequency</Label>
              <RadioGroup value={frequency} onValueChange={setFrequency}>
                {frequencies.map((freq) => (
                  <div key={freq.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={freq.id} id={freq.id} />
                    <Label htmlFor={freq.id}>{freq.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Delivery Methods */}
            <div className="grid gap-2">
              <Label>Delivery Methods</Label>
              {deliveryMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={method.id}
                    checked={selectedDeliveryMethods.includes(method.id)}
                    onCheckedChange={(checked) => {
                      const isChecked = checked as boolean;
                      setSelectedDeliveryMethods(
                        isChecked
                          ? [...selectedDeliveryMethods, method.id]
                          : selectedDeliveryMethods.filter((id) => id !== method.id)
                      )
                    }}
                  />
                  <Label htmlFor={method.id}>{method.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveAndApply}>Save & Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toastOpen && (
        <Toast onOpenChange={setToastOpen} className="bg-green-100 border border-green-400 text-green-800 p-4 rounded-md shadow-lg animate-toast-slide-in">
          <div className="flex items-center space-x-2">
            {/* Add an icon */}
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="flex-1">
              <ToastTitle className="font-bold">Success!</ToastTitle>
              <ToastDescription className="text-sm">
                Your alert settings have been saved successfully.
              </ToastDescription>
            </div>
            {/* Add a close button */}
            <ToastClose>
              <X className="h-5 w-5 text-green-600 cursor-pointer" />
            </ToastClose>
          </div>
        </Toast>
      )}

      <ToastViewport />
    </ToastProvider>
  )
}
