"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Company } from "@/types";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const CompanyCard = ({ company }: { company: Company }) => {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card className="flex flex-col justify-between h-full transition-shadow hover:shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative w-12 h-12 overflow-hidden border rounded-full bg-muted">
            <Image
              src={company.logo_url || "/blank.jpg"}
              alt={`${company.name} logo`}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {company.name}
          </h3>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Industry:</span>{" "}
            {company.industry}
          </p>
          <p className="line-clamp-3">
            <span className="font-medium text-foreground">Description:</span>{" "}
            {company.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/company/${company.id}/edit`)}
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CompanyCard;
