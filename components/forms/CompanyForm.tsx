"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyFormSchema, CompanyFormValues } from "@/lib/validator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type CompanyFormProps = {
  defaultValues?: CompanyFormValues;
  onSubmit: (data: CompanyFormValues) => Promise<void>;
  isSubmitting?: boolean;
  submitText?: string;
};

const CompanyForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitText = "Submit",
}: CompanyFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting: formSubmitting },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const watchedLogo = watch("logo_url");

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const file =
      watchedLogo &&
      typeof watchedLogo !== "string" &&
      watchedLogo instanceof FileList &&
      watchedLogo.length > 0
        ? watchedLogo[0]
        : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [watchedLogo]);

  return (
    <motion.form
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6 border rounded-lg shadow-sm bg-background"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          {...register("name")}
          placeholder="Company Name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Textarea
          {...register("description")}
          placeholder="Description"
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Input
          {...register("industry")}
          placeholder="Industry"
          className={errors.industry ? "border-red-500" : ""}
        />
        {errors.industry && (
          <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>
        )}
      </div>

      <div>
        <Input
          type="file"
          accept="image/*"
          {...register("logo_url")}
          className={errors.logo_url ? "border-red-500" : ""}
        />
        {errors.logo_url && (
          <p className="mt-1 text-sm text-red-500">
            {errors.logo_url.message as string}
          </p>
        )}
        {preview && (
          <div className="mt-4">
            <Image
              src={preview}
              alt="Preview"
              width={100}
              height={100}
              className="border rounded"
            />
          </div>
        )}
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={formSubmitting || isSubmitting}
          className="flex items-center w-full gap-2"
        >
          {(formSubmitting || isSubmitting) && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {formSubmitting || isSubmitting ? "Submitting..." : submitText}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default CompanyForm;
