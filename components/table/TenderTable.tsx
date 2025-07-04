"use client";

import { TenderTableProps } from "@/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ApplyTenderModal from "../modal/ApplyTenderModal";

const TenderTable = ({ tenders }: TenderTableProps) => {
  const [selectedTender, setSelectedTender] = useState<null | {
    id: string;
    title: string;
  }>(null);

  return (
    <>
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-foreground">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender) => (
              <tr key={tender.id} className="border-t hover:bg-muted/20">
                <td className="px-4 py-2 font-medium">{tender.title}</td>
                <td className="px-4 py-2">₹{tender.budget}</td>
                <td className="px-4 py-2">
                  {new Date(tender.deadline).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() =>
                      setSelectedTender({ id: tender.id, title: tender.title })
                    }
                  >
                    Apply Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedTender && (
        <ApplyTenderModal
          open={!!selectedTender}
          tenderId={selectedTender.id}
          tenderTitle={selectedTender.title}
          onClose={() => setSelectedTender(null)}
        />
      )}
    </>
  );
};

export default TenderTable;
