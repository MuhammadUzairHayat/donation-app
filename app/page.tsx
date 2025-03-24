import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import DonationCard from "@/components/home/donation-card"
import ZakatCard from "@/components/home/zakat-card"
import SponsorshipCard from "@/components/home/sponsorship-card"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          <span className="text-primary">Donation</span> & <span className="text-secondary">Zakat</span> Management
          System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Manage all your charitable contributions in one place - donations, zakat, and sponsorships.
        </p>
      </div>

      <div className="mt-12 grid gap-6 w-full max-w-5xl" style={{gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"}}>
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <DonationCard />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <ZakatCard />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <SponsorshipCard />
        </div>
      </div>

      <div className="mt-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <Button
          asChild
          size="lg"
          className="mt-12 bg-primary hover:opacity-95 transition-opacity"
        >
          <Link href="/donations" className="group">
            View All Contributions{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

