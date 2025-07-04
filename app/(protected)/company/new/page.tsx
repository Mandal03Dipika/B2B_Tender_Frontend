"use client";

import CompanyForm from "@/components/forms/CompanyForm";
import { createCompany, uploadLogo } from "@/lib/api";
import { CompanyFormValues } from "@/lib/validator";
import { useRouter } from "next/navigation";

const CreateCompany = () => {
  const router = useRouter();
  const handleCreate = async (data: CompanyFormValues) => {
    try {
      let logoUrl = "";
      const file = data.logo_url instanceof FileList ? data.logo_url[0] : null;
      if (file) {
        logoUrl = await uploadLogo(file);
      }
      await createCompany(data, logoUrl);
      router.push("/company");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="max-w-2xl px-4 py-10 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Create New Tender</h1>
        <CompanyForm onSubmit={handleCreate} submitText="Create Company" />
      </main>
    </>
  );
};

export default CreateCompany;
