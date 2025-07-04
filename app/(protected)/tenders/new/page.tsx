"use client";

import TenderForm from "@/components/forms/TenderForm";
import { createTender } from "@/lib/api";
import { TenderFormValues } from "@/lib/validator";
import { useRouter } from "next/navigation";

const CreateTender = () => {
  const router = useRouter();
  const handleCreate = async (data: TenderFormValues) => {
    await createTender(data);
    router.push("/tenders");
  };

  return (
    <>
      <main className="max-w-2xl px-4 py-10 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Create New Tender</h1>
        <TenderForm onSubmit={handleCreate} submitText="Create Tender" />
      </main>
    </>
  );
};

export default CreateTender;
