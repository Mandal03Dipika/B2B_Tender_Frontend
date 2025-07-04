"use client";

import CompanyMiniNavbar from "@/components/mini-navbar/CompanyMiniNavbar";
import CompanyTable from "@/components/table/CompanyTable";
import CreateCompany from "@/components/create/CreateCompany";
import MyCompany from "@/components/page/MyCompany";
import { fetchCompanies, getMyCompanies } from "@/lib/api";
import { Company } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Companies = () => {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get("view") as "all" | "my") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "latest";
  const [companies, setCompanies] = useState<Company[]>([]);
  const [view, setView] = useState<"all" | "my">(initialView);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data =
          view === "all" ? await fetchCompanies() : await getMyCompanies();
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    loadCompanies();
  }, [view]);

  const filteredCompanies = companies
    .filter(
      (t) =>
        t.description?.toLowerCase().includes(search.toLowerCase()) ||
        t.industry.toLowerCase().includes(search.toLowerCase())
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
    <>
      <main className="max-w-6xl px-4 mx-auto">
        <CompanyMiniNavbar
          view={view}
          search={search}
          sort={sort}
          onViewChange={handleViewChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
        {filteredCompanies.length === 0 ? (
          view === "all" ? (
            <div className="px-4 py-10 text-center border rounded-md text-muted-foreground bg-muted/50">
              <p className="text-sm">No companies found.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <CreateCompany />
                <div className="px-4 py-10 text-center border rounded-md text-muted-foreground bg-muted/50">
                  <p className="text-sm">No companies found.</p>
                </div>
              </div>
            </>
          )
        ) : view === "all" ? (
          <CompanyTable companies={filteredCompanies} />
        ) : (
          <MyCompany company={filteredCompanies} />
        )}
      </main>
    </>
  );
};

export default Companies;
