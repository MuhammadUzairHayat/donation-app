import type { UseFormReturn } from "react-hook-form"
import AmountFields from "@/components/forms/contribution/amount-fields"
import PaymentFields from "@/components/forms/contribution/payment-fields"
import DescriptionFields from "@/components/forms/contribution/description-fields"
import AnonymityField from "@/components/forms/contribution/anonymity-field"

interface DonationFieldsProps {
  form: UseFormReturn<any>
}

export default function DonationFields({ form }: DonationFieldsProps) {
  return (
    <div className="space-y-4">
      <AmountFields form={form} />
      <PaymentFields form={form} />
      <DescriptionFields form={form} />
      <AnonymityField form={form} />
    </div>
  )
}

