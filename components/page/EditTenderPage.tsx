"use client";

import { useRouter } from "next/navigation";
import TenderForm from "@/components/forms/TenderForm";
import { updateTender, getTenderById } from "@/lib/api";
import { TenderFormValues } from "@/lib/validator";
import { useEffect, useState } from "react";

const EditTenderPage = ({ tenderId }: { tenderId: string }) => {
  const router = useRouter();
  const [tender, setTender] = useState<TenderFormValues | null>(null);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const data = await getTenderById(tenderId);
        setTender({
          title: data.title,
          description: data.description,
          budget: data.budget,
          deadline: data.deadline.split("T")[0],
        });
      } catch (err) {
        console.error("Failed to fetch tender", err);
      }
    };
    fetchTender();
  }, [tenderId]);

  const handleUpdate = async (data: TenderFormValues) => {
    try {
      await updateTender(tenderId, data);
      router.push("/tenders");
    } catch (err) {
      console.error("Failed to update tender", err);
    }
  };

  return (
    <main className="max-w-2xl px-4 py-10 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Edit Tender</h1>
      {tender ? (
        <TenderForm
          defaultValues={tender}
          onSubmit={handleUpdate}
          submitText="Update Tender"
        />
      ) : (
        <p className="text-muted-foreground">Loading tender details...</p>
      )}
    </main>
  );
};

export default EditTenderPage;
