import type { Donor } from "@/lib/db"

interface DonorInfoProps {
  donor: Donor
}

export default function DonorInfo({ donor }: DonorInfoProps) {
  return (
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
  )
}

