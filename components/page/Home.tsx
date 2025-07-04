"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ShieldCheck, Send } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  {
    title: "Create & Publish Tenders",
    description:
      "Easily draft tenders with deadlines, budgets, and requirements.",
    icon: Sparkles,
  },
  {
    title: "Secure & Private",
    description:
      "Your data is protected with authentication and authorization.",
    icon: ShieldCheck,
  },
  {
    title: "Apply & Collaborate",
    description: "Find tenders, apply, and collaborate with other companies.",
    icon: Send,
  },
];

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-4 py-20 text-center bg-background">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="secondary" className="text-sm">
              Tender Management Platform
            </Badge>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold sm:text-5xl"
            >
              Simplify Tendering. Empower Your Business.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl mx-auto text-lg text-muted-foreground"
            >
              Manage your tenders, discover new opportunities, and grow through
              collaboration — all in one platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href={isLoggedIn ? "/dashboard" : "/register"}>
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href={isLoggedIn ? "/tenders" : "/login"}>
                <Button variant="outline" size="lg">
                  Browse Tenders
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
        <section className="px-4 py-16 bg-muted/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-10 text-2xl font-bold text-center">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  viewport={{ once: true, amount: 0.6 }}
                >
                  <Card className="transition-transform duration-300 border shadow-md bg-card border-border hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="flex flex-col items-center">
                      <feature.icon className="w-8 h-8 mb-2 text-primary" />
                      <h3 className="text-lg font-semibold text-center">
                        {feature.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="text-sm text-center text-muted-foreground">
                      {feature.description}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
