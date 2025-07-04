import { Application } from "@/types";
import ApplicationCard from "../card/ApplicationCard";

const MyApplications = ({ application }: { application: Application[] }) => {
  return (
    <>
      <div className="grid gap-6 px-2 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {application.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </>
  );
};

export default MyApplications;
