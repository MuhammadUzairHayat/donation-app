import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Contribution, Donor } from "@/lib/db"

interface ContributionDetailsProps {
  contribution: Contribution
  donor: Donor
}

export default function ContributionDetails({ contribution, donor }: ContributionDetailsProps) {
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
    <Card className="border-2 border-primary/20 print:border-none">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-primary">Contribution Receipt</CardTitle>
            <CardDescription>
              Receipt for {contribution.type} made on {new Date(contribution.date).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className={getTypeColor(contribution.type)} variant="outline">
            {contribution.type.charAt(0).toUpperCase() + contribution.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Donor Information</h3>

            <div>
              <p className="text-sm text-muted-foreground">Donor ID</p>
              <p className="font-medium">{donor.id}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{donor.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{donor.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{donor.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <div className="text-center">
            <h3 className="font-medium">Thank you for your contribution!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This receipt serves as an official record of your contribution.
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t py-4 print:hidden">
        <p className="text-sm text-muted-foreground">
          Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </p>
        <p className="text-sm font-medium">Donation & Zakat Management System</p>
      </CardFooter>
    </Card>
  )
}

