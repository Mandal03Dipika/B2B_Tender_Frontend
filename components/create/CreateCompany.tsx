import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const CreateCompany = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push("/company/new");
  };
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-semibold text-foreground">My Companies</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Company
        </Button>
      </div>
    </>
  );
};

export default CreateCompany;
