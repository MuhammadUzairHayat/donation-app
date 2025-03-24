"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UseFormReturn } from "react-hook-form"

interface DescriptionFieldsProps {
  form: UseFormReturn<any>
}

export default function DescriptionFields({ form }: DescriptionFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter a brief description" className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cause"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cause (Optional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a cause" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Orphan Care">Orphan Care</SelectItem>
                <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                <SelectItem value="Food Security">Food Security</SelectItem>
                <SelectItem value="Water Projects">Water Projects</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

