import { Card, CardHeader } from "@/components/ui/card";
import { Application } from "@/types";
import { motion } from "framer-motion";

const ApplicationCard = ({ application }: { application: Application }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card className="flex flex-col justify-between h-full transition-shadow hover:shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <h3 className="text-lg font-semibold text-foreground">
            Proposal : {application.proposal}
          </h3>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default ApplicationCard;
