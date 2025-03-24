import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Contribution, Donor } from "@/lib/db"
import ContributionTableRow from "@/components/donations/list/table-row"
import EmptyState from "@/components/donations/list/empty-state"

interface ContributionsTableProps {
  contributions: Contribution[]
  donors: Donor[]
}

export default function ContributionsTable({ contributions, donors }: ContributionsTableProps) {
  const getDonorName = (donorId: string) => {
    const donor = donors.find((d) => d.id === donorId)
    return donor ? donor.name : "Unknown"
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
            <EmptyState />
          ) : (
            contributions.map((contribution) => (
              <ContributionTableRow
                key={contribution.id}
                contribution={contribution}
                donorName={getDonorName(contribution.donorId)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

