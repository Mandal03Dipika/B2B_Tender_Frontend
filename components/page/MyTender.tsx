"use client";

import { useState } from "react";
import { Tender } from "@/types";
import CreateTender from "../create/CreateTender";
import TenderCard from "../card/TenderCard";

const MyTender = ({ tender }: { tender: Tender[] }) => {
  const [tenders, setTenders] = useState(tender);

  const handleDelete = (id: string) => {
    setTenders((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <CreateTender />
      <div className="grid gap-6 px-2 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {tenders.length === 0 ? (
          <p className="text-muted-foreground">
            You have not created any tenders yet.
          </p>
        ) : (
          tenders.map((tender) => (
            <TenderCard
              key={tender.id}
              tender={tender}
              onDeleted={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MyTender;
