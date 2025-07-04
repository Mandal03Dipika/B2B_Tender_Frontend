"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  search: string;
  sort: string;
  onSearchChange: (v: string) => void;
  onSortChange: (v: string) => void;
};

const ApplicationsMiniNavbar = ({
  search,
  sort,
  onSearchChange,
  onSortChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 mb-8 border-b md:flex-row md:items-center md:justify-between bg-background">
      <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
      <div className="flex flex-col items-start w-full gap-4 md:flex-row md:items-center md:w-auto">
        <Input
          type="text"
          placeholder="Search application..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full transition-shadow rounded-md sm:w-64 focus:shadow-md"
        />
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">📅 Latest</SelectItem>
            <SelectItem value="oldest">📜 Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ApplicationsMiniNavbar;
