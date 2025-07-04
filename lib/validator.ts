import { z } from "zod";

export const tenderFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  deadline: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid deadline date",
  }),
  budget: z.coerce
    .number({ invalid_type_error: "Budget must be a number" })
    .min(0, "Budget must be non-negative"),
});

export type TenderFormValues = z.infer<typeof tenderFormSchema>;

export const companyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  industry: z.string().min(2, "Industry is required"),
  description: z.string().optional(),
  logo_url: z
    .any()
    .refine(
      (file) =>
        file instanceof FileList ||
        typeof file === "string" ||
        file === undefined,
      {
        message: "Invalid file format",
      }
    )
    .optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const proposalSchema = z.object({
  proposal: z
    .string()
    .min(10, "Proposal must be at least 10 characters")
    .max(1000, "Proposal must be under 1000 characters"),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;
