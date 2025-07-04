"use client";

import ApplicationsMiniNavbar from "@/components/mini-navbar/ApplicationsMiniNavbar";
import MyApplications from "@/components/page/MyApplications";
import { getMyApplications } from "@/lib/api";
import { Application } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ApplicationsPageClient = () => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "latest";
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    loadCompanies();
  }, [applications]);

  const filteredApplications = applications
    .filter((t) => t.proposal.toLowerCase().includes(search.toLowerCase()))
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

  const handleSearchChange = (val: string) => {
    setSearch(val);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
  };

  return (
    <>
      <main className="max-w-6xl px-4 mx-auto">
        <ApplicationsMiniNavbar
          search={search}
          sort={sort}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
        {filteredApplications.length === 0 ? (
          <div className="px-4 py-10 text-center border rounded-md text-muted-foreground bg-muted/50">
            <p className="text-sm">No applications found.</p>
          </div>
        ) : (
          <MyApplications application={filteredApplications} />
        )}
      </main>
    </>
  );
};

export default ApplicationsPageClient;
