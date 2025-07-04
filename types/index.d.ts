export interface Tender {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface TenderTableProps {
  tenders: Tender[];
}

export interface GoodsService {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceSelectorProps {
  selected: string[];
  onChange: (ids: string[]) => void;
  availableServices: GoodsService[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyTableProps {
  companies: Company[];
}

export interface Application {
  id: string;
  tender_id: string;
  applicant_company_id: string;
  proposal: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationTableProps {
  applications: Application[];
}
