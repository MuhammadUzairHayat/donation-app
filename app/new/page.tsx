"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createDonor, createContribution, type DonationType } from "@/lib/db"
import { useToast } from "@/components/ui/use-toast"
import { executeSqlQuery, SQL_QUERIES } from "@/lib/db-sql"
import DonorForm from "@/components/forms/donor/donor-form"
import ContributionForm from "@/components/forms/contribution/contribution-form"
import FormActions from "@/components/forms/shared/form-actions"

const formSchema = z.object({
  // Donor information
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),

  // Contribution information
  type: z.enum(["donation", "zakat", "sponsorship"] as const),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  currency: z.string().default("PKR"),
  date: z.string(),
  description: z.string().min(5, { message: "Please provide a brief description" }),
  cause: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  paymentMethod: z.string(),
})

export default function NewContributionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialType = (searchParams.get("type") as DonationType) || "donation"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState(initialType)
  const { toast } = useToast() // Use the hook instead

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: initialType,
      currency: "PKR",
      date: new Date().toISOString().split("T")[0],
      isAnonymous: false,
      paymentMethod: "Cash",
    },
  })

  useEffect(() => {
    form.setValue("type", initialType)
    setActiveTab(initialType)
  }, [initialType, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // In a real application with a database, we would use SQL queries like this:

      // 1. Insert donor into database
      const donorId = `D${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
      await executeSqlQuery(SQL_QUERIES.INSERT_DONOR, [donorId, values.name, values.email, values.phone])

      // 2. Insert contribution into database
      const contributionId = `C${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
      await executeSqlQuery(SQL_QUERIES.INSERT_CONTRIBUTION, [
        contributionId,
        donorId,
        values.type,
        values.amount,
        values.currency,
        values.date,
        values.description,
        values.cause || null,
        values.isAnonymous,
        values.paymentMethod,
      ])

      // For the mock implementation, we'll use the existing functions
      const donor = await createDonor({
        name: values.name,
        email: values.email,
        phone: values.phone,
      })

      const contribution = await createContribution({
        donorId: donor.id,
        type: values.type,
        amount: values.amount,
        currency: values.currency,
        date: values.date,
        description: values.description,
        cause: values.cause,
        isAnonymous: values.isAnonymous,
        paymentMethod: values.paymentMethod,
      })

      toast({
        title: "Success!",
        description: `Your ${values.type} has been recorded with ID: ${contribution.id}`,
      })

      // Redirect to the contribution details page
      setTimeout(() => {
        router.push(`/donations/${contribution.id}`)
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your contribution.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTabStyle = (value: string) => {
    if (value === "donation") {
      return activeTab === value ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
    } else if (value === "zakat") {
      return activeTab === value ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/10"
    } else {
      return activeTab === value
        ? "bg-gradient-to-r from-primary to-secondary text-white"
        : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10"
    }
  }

  const getCardBorderClass = () => {
    if (activeTab === "donation") {
      return "border-primary/20 hover-glow-primary"
    } else if (activeTab === "zakat") {
      return "border-secondary/20 hover-glow-secondary"
    } else {
      return "border-gradient-to-r from-primary/20 to-secondary/20"
    }
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className={getCardBorderClass()}>
        <CardHeader>
          <CardTitle className={`text-2xl ${activeTab === "zakat" ? "text-secondary" : "text-primary"}`}>
            New Contribution
          </CardTitle>
          <CardDescription>Submit a new donation, zakat, or sponsorship record</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs
                defaultValue={initialType}
                value={activeTab}
                onValueChange={(value) => {
                  form.setValue("type", value as DonationType)
                  setActiveTab(value as DonationType)
                }}
              >
                <TabsList className="grid w-full grid-cols-3 p-1">
                  <TabsTrigger value="donation" className={`transition-colors ${getTabStyle("donation")}`}>
                    Donation
                  </TabsTrigger>
                  <TabsTrigger value="zakat" className={`transition-colors ${getTabStyle("zakat")}`}>
                    Zakat
                  </TabsTrigger>
                  <TabsTrigger value="sponsorship" className={`transition-colors ${getTabStyle("sponsorship")}`}>
                    Sponsorship
                  </TabsTrigger>
                </TabsList>

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="mt-6 space-y-6">
                  <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <DonorForm form={form} />
                  </div>
                  <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <ContributionForm form={form} type={form.watch("type")} />
                  </div>
                </div>
              </Tabs>

              <CardFooter className="flex justify-between px-0 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <FormActions onCancel={() => router.back()} isSubmitting={isSubmitting} />
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

