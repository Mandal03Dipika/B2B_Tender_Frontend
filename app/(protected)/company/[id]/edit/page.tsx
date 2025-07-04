import EditCompanyPage from "@/components/page/EditCompanyPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <EditCompanyPage companyId={id} />;
};

export default Page;
