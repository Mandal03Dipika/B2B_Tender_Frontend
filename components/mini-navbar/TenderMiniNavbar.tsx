"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  view: "all" | "my";
  search: string;
  sort: string;
  onViewChange: (v: "all" | "my") => void;
  onSearchChange: (v: string) => void;
  onSortChange: (v: string) => void;
};

const TenderMiniNavbar = ({
  view,
  search,
  sort,
  onViewChange,
  onSearchChange,
  onSortChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 mb-8 border-b md:flex-row md:items-center md:justify-between bg-background">
      <h2 className="text-2xl font-bold tracking-tight">Tenders</h2>

      <div className="flex flex-col items-start w-full gap-4 md:flex-row md:items-center md:w-auto">
        <nav className="relative flex gap-6 text-sm font-medium">
          {[
            { key: "all", label: "All Tenders", icon: "📄" },
            { key: "my", label: "My Tenders", icon: "🧾" },
          ].map((tab) => {
            const isActive = view === tab.key;
            return (
              <span
                key={tab.key}
                onClick={() => onViewChange(tab.key as "all" | "my")}
                className={cn(
                  "cursor-pointer transition-all relative pb-1 group flex items-center gap-1",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                    isActive && "scale-x-100"
                  )}
                />
              </span>
            );
          })}
        </nav>
        <Input
          type="text"
          placeholder="Search tenders..."
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
            <SelectItem value="budget_high">💰 Budget (High)</SelectItem>
            <SelectItem value="budget_low">💸 Budget (Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TenderMiniNavbar;
