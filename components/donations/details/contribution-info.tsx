import type { Contribution } from "@/lib/db"

interface ContributionInfoProps {
  contribution: Contribution
}

export default function ContributionInfo({ contribution }: ContributionInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-b pb-2">Contribution Details</h3>

      <div>
        <p className="text-sm text-muted-foreground">Contribution ID</p>
        <p className="font-medium">{contribution.id}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Amount</p>
        <p className="font-medium text-xl">
          {contribution.amount.toLocaleString()} {contribution.currency}
        </p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Date</p>
        <p className="font-medium">{new Date(contribution.date).toLocaleDateString()}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Payment Method</p>
        <p className="font-medium">{contribution.paymentMethod}</p>
      </div>

      {contribution.cause && (
        <div>
          <p className="text-sm text-muted-foreground">Cause</p>
          <p className="font-medium">{contribution.cause}</p>
        </div>
      )}

      <div>
        <p className="text-sm text-muted-foreground">Description</p>
        <p className="font-medium">{contribution.description}</p>
      </div>
    </div>
  )
}

