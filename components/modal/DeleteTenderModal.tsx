"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Tender } from "@/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteTenderModalProps {
  tender: Tender;
  onDelete: () => void;
}

const DeleteTenderModal = ({ tender, onDelete }: DeleteTenderModalProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {open && (
          <DialogContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-lg shadow-xl bg-background"
            >
              <DialogHeader>
                <DialogTitle className="text-lg text-destructive">
                  Confirm Deletion
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  You are about to permanently delete this tender:
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold">📌 Title:</span>{" "}
                  {tender.title}
                </p>
                <p>
                  <span className="font-semibold">📝 Description:</span>{" "}
                  {tender.description}
                </p>
                <p>
                  <span className="font-semibold">💰 Budget:</span> ₹
                  {tender.budget}
                </p>
                <p>
                  <span className="font-semibold">📅 Deadline:</span>{" "}
                  {new Date(tender.deadline).toLocaleDateString()}
                </p>
              </div>
              <DialogFooter className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete();
                    handleClose();
                  }}
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default DeleteTenderModal;
