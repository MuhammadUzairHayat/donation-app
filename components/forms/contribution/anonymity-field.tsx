import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import type { UseFormReturn } from "react-hook-form"

interface AnonymityFieldProps {
  form: UseFormReturn<any>
}

export default function AnonymityField({ form }: AnonymityFieldProps) {
  return (
    <FormField
      control={form.control}
      name="isAnonymous"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Anonymous Donation</FormLabel>
            <FormDescription>
              Check this if you want to keep the donor's identity private in public records.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  )
}

