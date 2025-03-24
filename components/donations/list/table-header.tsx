"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, FileDown } from "lucide-react"

interface TableHeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  typeFilter: string
  setTypeFilter: (type: string) => void
}

export default function TableHeader({ searchTerm, setSearchTerm, typeFilter, setTypeFilter }: TableHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by ID, donor name, or description..."
          className="pl-8 border-muted hover:border-primary/50 focus:border-primary transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-full md:w-[180px] border-muted hover:border-secondary/50 focus:border-secondary transition-colors">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="donation">Donations</SelectItem>
          <SelectItem value="zakat">Zakat</SelectItem>
          <SelectItem value="sponsorship">Sponsorships</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="w-full md:w-auto hover-scale border-muted hover:border-primary/50">
        <FileDown className="mr-2 h-4 w-4 text-primary" />
        Export
      </Button>
    </div>
  )
}

