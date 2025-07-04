"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProposalFormData, proposalSchema } from "@/lib/validator";
import { applyTender } from "@/lib/api";

interface ApplyTenderModalProps {
  open: boolean;
  onClose: () => void;
  tenderId: string;
  tenderTitle: string;
}

const ApplyTenderModal = ({
  open,
  onClose,
  tenderId,
  tenderTitle,
}: ApplyTenderModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
  });

  const onSubmit = async (data: ProposalFormData) => {
    try {
      await applyTender(tenderId, data);
      reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          reset();
          onClose();
        }
      }}
    >
      <AnimatePresence>
        {open && (
          <DialogContent forceMount>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="max-w-md px-6 py-5 border rounded-lg shadow-xl sm:max-w-lg bg-background"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <PencilLine className="w-5 h-5 text-primary" />
                    Apply to Tender
                  </DialogTitle>
                  <DialogDescription>
                    You are submitting a proposal for{" "}
                    <span className="font-semibold text-foreground">
                      {tenderTitle}
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <label
                    htmlFor="proposal"
                    className="block mb-1 text-sm font-medium text-muted-foreground"
                  >
                    Proposal
                  </label>
                  <Textarea
                    {...register("proposal")}
                    id="proposal"
                    placeholder="Explain your approach, pricing, and timeline..."
                    className="min-h-[120px] resize-y"
                  />
                  {errors.proposal && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.proposal.message}
                    </p>
                  )}
                </div>
                <DialogFooter className="pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default ApplyTenderModal;
