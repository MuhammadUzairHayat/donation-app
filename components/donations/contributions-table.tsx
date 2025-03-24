import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import type { Contribution, Donor } from "@/lib/db"

interface ContributionsTableProps {
  contributions: Contribution[]
  donors: Donor[]
}

export default function ContributionsTable({ contributions, donors }: ContributionsTableProps) {
  const getDonorName = (donorId: string) => {
    const donor = donors.find((d) => d.id === donorId)
    return donor ? donor.name : "Unknown"
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "donation":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "zakat":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "sponsorship":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Donor</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No contributions found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          ) : (
            contributions.map((contribution) => (
              <TableRow key={contribution.id}>
                <TableCell className="font-medium">{contribution.id}</TableCell>
                <TableCell>{getDonorName(contribution.donorId)}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(contribution.type)} variant="outline">
                    {contribution.type.charAt(0).toUpperCase() + contribution.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {contribution.amount.toLocaleString()} {contribution.currency}
                </TableCell>
                <TableCell>{new Date(contribution.date).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[200px] truncate">{contribution.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/donations/${contribution.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

