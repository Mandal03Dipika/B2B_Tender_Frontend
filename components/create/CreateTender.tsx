import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const CreateTender = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push("/tenders/new");
  };
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-semibold text-foreground">My Tenders</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Tender
        </Button>
      </div>
    </>
  );
};

export default CreateTender;
