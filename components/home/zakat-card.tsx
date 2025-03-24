import Link from "next/link";
import { Coins, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ZakatCard() {
  return (
    <Card className="flex flex-col justify-between min-h-72 border-secondary/20 hover:shadow-[0_0_10px_rgba(0,128,255,0.3)] hover:border-secondary hover:-translate-y-5 transition-all duration-300">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Zakat</CardTitle>
          <Coins className="h-5 w-5 text-secondary" />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Record Islamic obligatory charity payments
        </CardDescription>
        <p className="text-sm text-muted-foreground">
          Manage your zakat contributions with detailed tracking and receipts.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full bg-secondary hover:bg-secondary/90 transition-colors"
        >
          <Link href="/new?type=zakat" className="group">
            Add Zakat{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
