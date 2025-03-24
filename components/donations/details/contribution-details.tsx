import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Contribution, Donor } from "@/lib/db"
import ContributionInfo from "@/components/donations/details/contribution-info"
import DonorInfo from "@/components/donations/details/donor-info"
import ReceiptFooter from "@/components/donations/details/receipt-footer"

interface ContributionDetailsProps {
  contribution: Contribution
  donor: Donor
}

export default function ContributionDetails({ contribution, donor }: ContributionDetailsProps) {
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

  const getCardBorderClass = (type: string) => {
    switch (type) {
      case "donation":
        return "border-primary/20 hover-glow-primary"
      case "zakat":
        return "border-secondary/20 hover-glow-secondary"
      case "sponsorship":
        return "border-gradient-to-r from-primary/20 to-secondary/20"
      default:
        return "border-muted"
    }
  }

  return (
    <Card className={`border-2 print:border-none animate-scale ${getCardBorderClass(contribution.type)}`}>
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={`text-2xl ${contribution.type === "zakat" ? "text-secondary" : "text-primary"}`}>
              Contribution Receipt
            </CardTitle>
            <CardDescription>
              Receipt for {contribution.type} made on {new Date(contribution.date).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className={getTypeClass(contribution.type)} variant="outline">
            {contribution.type.charAt(0).toUpperCase() + contribution.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContributionInfo contribution={contribution} />
          <DonorInfo donor={donor} />
        </div>

        <ReceiptFooter />
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

