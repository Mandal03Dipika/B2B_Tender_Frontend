"use client";

import { useRouter } from "next/navigation";
import { updateCompany, getCompanyById, uploadLogo } from "@/lib/api";
import { CompanyFormValues } from "@/lib/validator";
import { useEffect, useState } from "react";
import CompanyForm from "@/components/forms/CompanyForm";
import { Button } from "@/components/ui/button";

interface EditCompanyPageProps {
  companyId: string;
}

const EditCompanyPage = ({ companyId }: EditCompanyPageProps) => {
  const router = useRouter();
  const [company, setCompany] = useState<CompanyFormValues | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyById(companyId);
        setCompany({
          name: data.name,
          description: data.description,
          industry: data.industry,
        });
      } catch (error) {
        console.error("Failed to fetch company", error);
      }
    };
    fetchCompany();
  }, [companyId]);

  const handleUpdate = async (data: CompanyFormValues) => {
    try {
      let logoUrl = "";
      const file = data.logo_url instanceof FileList ? data.logo_url[0] : null;
      if (file) {
        logoUrl = await uploadLogo(file);
      }
      await updateCompany(companyId, data, logoUrl);
      router.push("/company");
    } catch (error) {
      console.error("Failed to update company", error);
    }
  };

  return (
    <main className="max-w-2xl px-4 py-10 mx-auto">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        ← Back
      </Button>
      <h1 className="mb-6 text-2xl font-bold">Edit Company</h1>
      {!company ? (
        <p className="text-muted-foreground">Loading company details...</p>
      ) : (
        <CompanyForm
          defaultValues={company}
          onSubmit={handleUpdate}
          submitText="Update Company"
        />
      )}
    </main>
  );
};

export default EditCompanyPage;
