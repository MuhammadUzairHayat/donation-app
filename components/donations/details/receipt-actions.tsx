"use client"

import { Button } from "@/components/ui/button"
import { Printer, Download, ArrowLeft } from "lucide-react"

interface ReceiptActionsProps {
  onBack: () => void
  onPrint: () => void
}

export default function ReceiptActions({ onBack, onPrint }: ReceiptActionsProps) {
  return (
    <div className="flex justify-between items-center mb-6 no-print">
      <Button variant="outline" onClick={onBack} className="hover-scale border-muted hover:border-primary/50">
        <ArrowLeft className="mr-2 h-4 w-4 text-primary" />
        Back
      </Button>
      <div className="flex gap-2">
        <Button variant={'outline'} onClick={onPrint} className="hover-scale border-muted hover:border-primary/50">
          <Printer className="mr-2 h-4 w-4 text-primary" />
          Print
        </Button>
        <Button className="bg-primary hover:opacity-90 transition-opacity hover-scale">
          <Download className="mr-2 h-4 w-4" />
          Download Receipt
        </Button>
      </div>
    </div>
  )
}

