import { Suspense } from "react";
import CompanyPageClient from "@/components/page/CompanyPageClient";

const CompanyPage = () => {
  return (
    <Suspense fallback={<div className="p-4">Loading company list...</div>}>
      <CompanyPageClient />
    </Suspense>
  );
};

export default CompanyPage;
