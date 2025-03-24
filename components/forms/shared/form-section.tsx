import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  children: ReactNode
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {children}
    </div>
  )
}

