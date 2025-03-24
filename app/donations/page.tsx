"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllContributions, getAllDonors, type Contribution, type Donor } from "@/lib/db"
import TableHeader from "@/components/donations/list/table-header"
import ContributionsTable from "@/components/donations/list/contributions-table"
import { useToast } from "@/components/ui/use-toast" // Add this if needed

export default function DonationsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [donors, setDonors] = useState<Donor[]>([])
  const { toast } = useToast() // Add this if you need toast functionality

  const [filteredContributions, setFilteredContributions] = useState<Contribution[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application with a database, we would use SQL queries like this:
        // const result = await executeSqlQuery(SQL_QUERIES.GET_ALL_CONTRIBUTIONS)

        // For the mock implementation, we'll use the existing functions
        const allContributions = await getAllContributions()
        const allDonors = await getAllDonors()
        setContributions(allContributions)
        setFilteredContributions(allContributions)
        setDonors(allDonors)
      } catch (error) {
        console.error("Error fetching data:", error)
        // Use toast if needed
        toast({
          title: "Error",
          description: "Failed to load contributions",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast]) // Add toast to dependencies if used

  useEffect(() => {
    let filtered = contributions

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((contribution) => contribution.type === typeFilter)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((contribution) => {
        const donor = donors.find((d) => d.id === contribution.donorId)
        return (
          contribution.id.toLowerCase().includes(term) ||
          contribution.description.toLowerCase().includes(term) ||
          (donor && donor.name.toLowerCase().includes(term)) ||
          (donor && donor.email.toLowerCase().includes(term))
        )
      })
    }

    setFilteredContributions(filtered)
  }, [searchTerm, typeFilter, contributions, donors])

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="hover-glow">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">All Contributions</CardTitle>
          <CardDescription>View and manage all donations, zakat, and sponsorships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <TableHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <ContributionsTable contributions={filteredContributions} donors={donors} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

