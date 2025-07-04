import TenderPageClient from "@/components/page/TenderPageClient";
import { Suspense } from "react";

const TendersPage = () => {
  return (
    <Suspense fallback={<div className="p-4">Loading tenders...</div>}>
      <TenderPageClient />
    </Suspense>
  );
};

export default TendersPage;
