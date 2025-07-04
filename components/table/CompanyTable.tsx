"use client";

import { useState } from "react";
import { CompanyTableProps } from "@/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const CompanyTable = ({ companies }: CompanyTableProps) => {
  const [selectedCompany, setSelectedCompany] = useState<
    typeof companies[0] | null
  >(null);

  return (
    <>
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-foreground">
            <tr>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Industry</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="transition-all border-t hover:bg-muted/40"
              >
                <td className="px-4 py-2">
                  <Image
                    src={company.logo_url || "/blank.jpg"}
                    alt={company.name}
                    width={50}
                    height={50}
                    className="object-contain bg-white border rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-2 font-semibold">{company.name}</td>
                <td className="px-4 py-2">{company.industry}</td>
                <td className="px-4 py-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => setSelectedCompany(company)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={!!selectedCompany}
        onOpenChange={() => setSelectedCompany(null)}
      >
        <AnimatePresence>
          {selectedCompany && (
            <DialogContent>
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-6 space-y-6 border shadow-xl bg-background rounded-2xl"
              >
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-primary">
                    {selectedCompany.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Company profile details
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    src={selectedCompany.logo_url || "/blank.jpg"}
                    alt={selectedCompany.name}
                    width={100}
                    height={100}
                    className="object-contain bg-white border rounded-lg shadow-md"
                  />
                  <div className="space-y-2 text-center">
                    <p className="text-base">
                      <span className="font-medium text-foreground">
                        Industry:
                      </span>{" "}
                      {selectedCompany.industry}
                    </p>
                    <p className="max-w-md text-sm text-muted-foreground">
                      {selectedCompany.description ||
                        "No description available."}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCompany(null)}
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
};

export default CompanyTable;
