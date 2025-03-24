"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getContributionById, getDonorById, type Contribution, type Donor } from "@/lib/db"
import ContributionDetails from "@/components/donations/details/contribution-details"
import ReceiptActions from "@/components/donations/details/receipt-actions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast" // Add this if needed
import { executeSqlQuery } from "@/lib/db-sql"

const SQL_QUERIES = {
  GET_CONTRIBUTION_BY_ID: "SELECT * FROM contributions WHERE id = ?",
  GET_DONOR_BY_ID: "SELECT * FROM donors WHERE id = ?",
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter()
  const [contribution, setContribution] = useState<Contribution | null>(null)
  const [donor, setDonor] = useState<Donor | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast() // Add this if you need toast functionality

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application with a database, we would use SQL queries like this:
        const contributionResult = await executeSqlQuery(SQL_QUERIES.GET_CONTRIBUTION_BY_ID, [id])
        if (Array.isArray(contributionResult) && contributionResult.length > 0) {
          const contributionData = contributionResult[0]
          setContribution(contributionData)
          const donorResult = await executeSqlQuery(SQL_QUERIES.GET_DONOR_BY_ID, [contributionData.donor_id])
          if (Array.isArray(donorResult) && donorResult.length > 0) {
            setDonor(donorResult[0])
          }
        }

        // For the mock implementation, we'll use the existing functions
        const contributionData = await getContributionById(id)

        if (contributionData) {
          setContribution(contributionData)
          const donorData = await getDonorById(contributionData.donorId)
          setDonor(donorData || null)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        // Use toast if needed
        toast({
          title: "Error",
          description: "Failed to load contribution details",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [id, toast]) // Add toast to dependencies if used

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading contribution details...</p>
        </div>
      </div>
    )
  }

  if (!contribution || !donor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Contribution Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The contribution you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/donations")} className="hover-scale">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Contributions
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <ReceiptActions onBack={() => router.back()} onPrint={handlePrint} />
      </div>

      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <ContributionDetails contribution={contribution} donor={donor} />
      </div>
    </div>
  )
}

