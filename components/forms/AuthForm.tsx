"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { login, register as registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const AuthForm = ({ type }: { type: "login" | "register" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res =
        type === "login" ? await login(data) : await registerUser(data);
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-base font-medium text-foreground"
        >
          Email
        </Label>
        <Input
          id="email"
          placeholder="you@example.com"
          {...register("email")}
          className="border bg-background border-input text-foreground placeholder:text-muted-foreground"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-base font-medium text-foreground"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="border bg-background border-input text-foreground placeholder:text-muted-foreground"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        {loading ? "Please Wait..." : type === "login" ? "Login" : "Register"}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <Link
          href={type === "login" ? "/register" : "/login"}
          className="font-medium text-primary hover:underline"
        >
          {type === "login" ? "Register" : "Login"}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
