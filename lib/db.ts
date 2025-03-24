// This is a mock database service
// In a real application, you would use a proper database client

export type DonationType = "donation" | "zakat" | "sponsorship"

export interface Donor {
  id: string
  name: string
  email: string
  phone: string
}

export interface Contribution {
  id: string
  donorId: string
  type: DonationType
  amount: number
  currency: string
  date: string
  description: string
  cause?: string
  isAnonymous: boolean
  paymentMethod: string
}

// Mock data
const donors: Donor[] = [
  {
    id: "D001",
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+92 300 1234567",
  },
  {
    id: "D002",
    name: "Fatima Ali",
    email: "fatima@example.com",
    phone: "+92 321 9876543",
  },
]

const contributions: Contribution[] = [
  {
    id: "C001",
    donorId: "D001",
    type: "donation",
    amount: 5000,
    currency: "PKR",
    date: "2023-03-15",
    description: "Flood relief donation",
    cause: "Disaster Relief",
    isAnonymous: false,
    paymentMethod: "Bank Transfer",
  },
  {
    id: "C002",
    donorId: "D001",
    type: "zakat",
    amount: 25000,
    currency: "PKR",
    date: "2023-04-10",
    description: "Annual Zakat",
    isAnonymous: false,
    paymentMethod: "Cash",
  },
  {
    id: "C003",
    donorId: "D002",
    type: "sponsorship",
    amount: 3000,
    currency: "PKR",
    date: "2023-05-01",
    description: "Monthly orphan sponsorship",
    cause: "Orphan Care",
    isAnonymous: false,
    paymentMethod: "Credit Card",
  },
]

// Helper functions
export async function getAllDonors() {
  return donors
}

export async function getDonorById(id: string) {
  return donors.find((donor) => donor.id === id)
}

export async function getAllContributions() {
  return contributions
}

export async function getContributionById(id: string) {
  return contributions.find((contribution) => contribution.id === id)
}

export async function getContributionsByDonorId(donorId: string) {
  return contributions.filter((contribution) => contribution.donorId === donorId)
}

export async function createDonor(donor: Omit<Donor, "id">) {
  const newDonor = {
    ...donor,
    id: `D${String(donors.length + 1).padStart(3, "0")}`,
  }

  donors.push(newDonor)
  return newDonor
}

export async function createContribution(contribution: Omit<Contribution, "id">) {
  const newContribution = {
    ...contribution,
    id: `C${String(contributions.length + 1).padStart(3, "0")}`,
  }

  contributions.push(newContribution)
  return newContribution
}

export async function getDonorWithContributions(donorId: string) {
  const donor = await getDonorById(donorId)
  const donorContributions = await getContributionsByDonorId(donorId)

  return {
    donor,
    contributions: donorContributions,
  }
}

