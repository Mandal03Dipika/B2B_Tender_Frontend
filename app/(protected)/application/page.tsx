import ApplicationsPageClient from "@/components/page/ApplicationPage";
import { Suspense } from "react";

const ApplicationsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-muted-foreground">Loading applications...</div>
      }
    >
      <ApplicationsPageClient />
    </Suspense>
  );
};

export default ApplicationsPage;
