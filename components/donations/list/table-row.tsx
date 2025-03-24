import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import type { Contribution } from "@/lib/db"

interface TableRowProps {
  contribution: Contribution
  donorName: string
}

export default function ContributionTableRow({ contribution, donorName }: TableRowProps) {
  const getTypeClass = (type: string) => {
    switch (type) {
      case "donation":
        return "badge-donation"
      case "zakat":
        return "badge-zakat"
      case "sponsorship":
        return "badge-sponsorship"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getRowHoverClass = (type: string) => {
    switch (type) {
      case "donation":
        return "hover:bg-primary/5"
      case "zakat":
        return "hover:bg-secondary/5"
      case "sponsorship":
        return "hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5"
      default:
        return "hover:bg-muted"
    }
  }

  return (
    <TableRow className={`hover-scale transition-colors ${getRowHoverClass(contribution.type)}`}>
      <TableCell className="font-medium">{contribution.id}</TableCell>
      <TableCell>{donorName}</TableCell>
      <TableCell>
        <Badge className={getTypeClass(contribution.type)} variant="outline">
          {contribution.type.charAt(0).toUpperCase() + contribution.type.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>
        {contribution.amount.toLocaleString()} {contribution.currency}
      </TableCell>
      <TableCell>{new Date(contribution.date).toLocaleDateString()}</TableCell>
      <TableCell className="max-w-[200px] truncate">{contribution.description}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className={
            contribution.type === "donation"
              ? "hover:bg-primary/10 transition-colors"
              : "hover:bg-secondary/10 transition-colors"
          }
        >
          <Link href={`/donations/${contribution.id}`} className="group">
            <Eye className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
            View
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}

