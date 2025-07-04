import TenderTable from "@/components/table/TenderTable";
import { getMyTenders } from "@/lib/api";

const MyTenders = async () => {
  const tenders = await getMyTenders();
  return (
    <>
      <main className="max-w-6xl px-4 py-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">My Tenders</h1>
        {tenders.length === 0 ? (
          <p className="text-muted-foreground">
            You have not created any tenders yet.
          </p>
        ) : (
          <TenderTable tenders={tenders} />
        )}
      </main>
    </>
  );
};

export default MyTenders;
