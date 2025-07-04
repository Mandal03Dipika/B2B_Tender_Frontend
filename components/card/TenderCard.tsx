"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Tender } from "@/types";
import { useRouter } from "next/navigation";
import { deleteTender } from "@/lib/api";
import DeleteTenderModal from "../modal/DeleteTenderModal";

const TenderCard = ({
  tender,
  onDeleted,
}: {
  tender: Tender;
  onDeleted: (id: string) => void;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteTender(tender.id);
      onDeleted(tender.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="flex flex-col justify-between h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <h3 className="text-xl font-bold">{tender.title}</h3>
        <p className="text-muted-foreground">{tender.description}</p>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p>Budget: ₹{tender.budget}</p>
        <p>Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/tenders/${tender.id}/edit`)}
        >
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <DeleteTenderModal tender={tender} onDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
};

export default TenderCard;
