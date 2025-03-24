import { TableCell, TableRow } from "@/components/ui/table"

export default function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
        No contributions found. Try adjusting your filters.
      </TableCell>
    </TableRow>
  )
}

