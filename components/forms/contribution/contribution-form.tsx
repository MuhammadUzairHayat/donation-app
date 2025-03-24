import type { UseFormReturn } from "react-hook-form"
import FormSection from "@/components/forms/shared/form-section"
import DonationFields from "@/components/forms/contribution/donation-fields"
import ZakatFields from "@/components/forms/contribution/zakat-fields"
import SponsorshipFields from "@/components/forms/contribution/sponsorship-fields"

interface ContributionFormProps {
  form: UseFormReturn<any>
  type: "donation" | "zakat" | "sponsorship"
}

export default function ContributionForm({ form, type }: ContributionFormProps) {
  return (
    <FormSection title="Contribution Details">
      {type === "donation" && <DonationFields form={form} />}
      {type === "zakat" && <ZakatFields form={form} />}
      {type === "sponsorship" && <SponsorshipFields form={form} />}
    </FormSection>
  )
}

