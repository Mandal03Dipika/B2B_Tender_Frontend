"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchTenders, getMyTenders } from "@/lib/api";
import type { Tender } from "@/types";
import MyTender from "@/components/page/MyTender";
import TenderMiniNavbar from "@/components/mini-navbar/TenderMiniNavbar";
import TenderTable from "@/components/table/TenderTable";
import CreateTender from "@/components/create/CreateTender";

const TenderPageClient = () => {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get("view") as "all" | "my") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "latest";
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [view, setView] = useState<"all" | "my">(initialView);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort);

  useEffect(() => {
    async function loadTenders() {
      try {
        const data =
          view === "all" ? await fetchTenders() : await getMyTenders();
        setTenders(data);
      } catch (err) {
        console.error("Error fetching tenders:", err);
      }
    }
    loadTenders();
  }, [view]);

  const filteredTenders = tenders
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "latest")
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      if (sort === "oldest")
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      if (sort === "budget_high") return b.budget - a.budget;
      if (sort === "budget_low") return a.budget - b.budget;
      return 0;
    });

  const handleViewChange = (v: "all" | "my") => {
    setView(v);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
  };

  return (
    <main className="max-w-6xl px-4 mx-auto">
      <TenderMiniNavbar
        view={view}
        search={search}
        sort={sort}
        onViewChange={handleViewChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      {filteredTenders.length === 0 ? (
        view === "all" ? (
          <div className="px-4 py-10 text-center border rounded-md text-muted-foreground bg-muted/50">
            <p className="text-sm">No tenders found.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <CreateTender />
              <div className="px-4 py-10 text-center border rounded-md text-muted-foreground bg-muted/50">
                <p className="text-sm">No tenders found.</p>
              </div>
            </div>
          </>
        )
      ) : view === "all" ? (
        <TenderTable tenders={filteredTenders} />
      ) : (
        <MyTender tender={filteredTenders} />
      )}
    </main>
  );
};

export default TenderPageClient;
