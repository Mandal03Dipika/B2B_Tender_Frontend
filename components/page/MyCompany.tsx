import { Company } from "@/types";
import CompanyCard from "../card/CompanyCard";
import CreateCompany from "../create/CreateCompany";

const MyCompany = ({ company }: { company: Company[] }) => {
  return (
    <>
      <CreateCompany />
      <div className="grid gap-6 px-2 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {company.length === 0 ? (
          <p className="text-muted-foreground">
            You have not created any companies yet.
          </p>
        ) : (
          company.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        )}
      </div>
    </>
  );
};

export default MyCompany;
