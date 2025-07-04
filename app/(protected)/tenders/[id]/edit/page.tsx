import EditTenderPage from "@/components/page/EditTenderPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <EditTenderPage tenderId={id} />;
};

export default Page;
