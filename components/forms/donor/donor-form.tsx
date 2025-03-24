import type { UseFormReturn } from "react-hook-form"
import FormSection from "@/components/forms/shared/form-section"
import DonorFields from "@/components/forms/donor/donor-fields"

interface DonorFormProps {
  form: UseFormReturn<any>
}

export default function DonorForm({ form }: DonorFormProps) {
  return (
    <FormSection title="Donor Information">
      <DonorFields form={form} />
    </FormSection>
  )
}

