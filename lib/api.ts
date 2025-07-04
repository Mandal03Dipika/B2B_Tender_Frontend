import {
  CompanyFormValues,
  ProposalFormData,
  TenderFormValues,
} from "./validator";

const api = process.env.NEXT_PUBLIC_API_URL;

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(data: { email: string; password: string }) {
  const res = await fetch(`${api}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function logout() {
  const res = await fetch(`${api}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
}

export async function fetchTenders() {
  const res = await fetch(`${api}/tenders/`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tenders");
  }
  const data = await res.json();
  return data.tenders;
}

export async function createTender(data: TenderFormValues) {
  const res = await fetch(`${api}/tenders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      budget: data.budget,
    }),
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Creating tender failed");
  }
}

export async function getMyTenders() {
  const res = await fetch(`${api}/tenders/mine`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch my tenders");
  return res.json();
}

export async function updateTender(id: string, data: TenderFormValues) {
  const res = await fetch(`${api}/tenders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Updating tender failed");
  }
  return res.json();
}

export async function getTenderById(id: string) {
  const res = await fetch(`${api}/tenders/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch tender by id");
  return res.json();
}

export async function deleteTender(id: string) {
  const res = await fetch(`${api}/tenders/${id}`, {
    method: "DELETE",
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete tender.");
}

export async function fetchCompanies() {
  const res = await fetch(`${api}/company/`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch companies");
  }
  const data = await res.json();
  return data;
}

export async function getMyCompanies() {
  const res = await fetch(`${api}/company/my`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch my companies");
  return res.json();
}

export async function updateCompany(
  id: string,
  data: CompanyFormValues,
  logoUrl: string
) {
  const res = await fetch(`${api}/company/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      industry: data.industry,
      description: data.description,
      logo_url: logoUrl,
    }),
  });
  if (!res.ok) {
    throw new Error("Updating company failed");
  }
  return res.json();
}

export async function getCompanyById(id: string) {
  const res = await fetch(`${api}/company/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch company by id");
  return res.json();
}

export async function createCompany(data: CompanyFormValues, logoUrl: string) {
  const res = await fetch(`${api}/company`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      industry: data.industry,
      description: data.description,
      logo_url: logoUrl,
    }),
  });
  if (!res.ok) throw new Error("Failed to create company");
}

export async function applyTender(tenderId: string, data: ProposalFormData) {
  const res = await fetch(`${api}/applications/${tenderId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ proposal: data.proposal }),
  });
  if (!res.ok) {
    throw new Error("Failed to apply tender");
  }
}

export async function getMyApplications() {
  const res = await fetch(`${api}/applications/mine`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch my applications");
  return res.json();
}

export async function getTenderApplications(tenderId: string) {
  const res = await fetch(`${api}/applications/${tenderId}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch tender applications by id");
  return res.json();
}
export const uploadLogo = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("logo", file);
  const res = await fetch(`${api}/company/upload-logo`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const data = await res.json();
  return typeof data === "string" ? data : data?.publicUrl || data?.url;
};
