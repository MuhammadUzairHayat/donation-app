import type { UseFormReturn } from "react-hook-form"
import AmountFields from "@/components/forms/contribution/amount-fields"
import PaymentFields from "@/components/forms/contribution/payment-fields"
import DescriptionFields from "@/components/forms/contribution/description-fields"
import AnonymityField from "@/components/forms/contribution/anonymity-field"

interface SponsorshipFieldsProps {
  form: UseFormReturn<any>
}

export default function SponsorshipFields({ form }: SponsorshipFieldsProps) {
  // Sponsorship fields are currently the same as donation fields
  // but can be customized in the future if needed
  return (
    <div className="space-y-4">
      <AmountFields form={form} />
      <PaymentFields form={form} />
      <DescriptionFields form={form} />
      <AnonymityField form={form} />
    </div>
  )
}

