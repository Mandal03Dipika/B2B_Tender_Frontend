"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenderFormSchema, TenderFormValues } from "@/lib/validator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type TenderFormProps = {
  defaultValues?: TenderFormValues;
  onSubmit: (data: TenderFormValues) => Promise<void>;
  isSubmitting?: boolean;
  submitText?: string;
};

const TenderForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitText = "Submit",
}: TenderFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenderFormValues>({
    resolver: zodResolver(tenderFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

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
          {...register("title")}
          placeholder="Tender Title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
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
          type="number"
          {...register("budget")}
          placeholder="Budget"
          className={errors.budget ? "border-red-500" : ""}
        />
        {errors.budget && (
          <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>
        )}
      </div>
      <div>
        <Input
          type="date"
          {...register("deadline")}
          placeholder="Deadline"
          className={errors.deadline ? "border-red-500" : ""}
        />
        {errors.deadline && (
          <p className="mt-1 text-sm text-red-500">{errors.deadline.message}</p>
        )}
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center w-full gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Submitting..." : submitText}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default TenderForm;
