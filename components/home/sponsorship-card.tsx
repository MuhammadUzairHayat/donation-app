import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SponsorshipCard() {
  return (
    <Card className="flex flex-col justify-between min-h-72 border-secondary/20 hover:shadow-[0_0_10px_rgba(0,128,255,0.3)] hover:border-secondary hover:-translate-y-5 transition-all duration-300">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Sponsorship</CardTitle>
          <Users className="h-5 w-5 text-secondary" />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Record ongoing sponsorship commitments
        </CardDescription>
        <p className="text-sm text-muted-foreground">
          Track recurring sponsorships with detailed information and receipts.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full bg-secondary hover:opacity-90  hover:bg-secondary/90 transition-opacity"
        >
          <Link href="/new?type=sponsorship" className="group">
            Add Sponsorship{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
