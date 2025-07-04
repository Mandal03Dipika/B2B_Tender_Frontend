import AuthForm from "@/components/forms/AuthForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-background">
      <Card className="w-full max-w-md border shadow-xl border-border rounded-2xl bg-card">
        <CardHeader className="space-y-1 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Register
          </h2>
          <p className="text-sm text-muted-foreground">Create a new account</p>
        </CardHeader>
        <CardContent className="p-6">
          <AuthForm type="register" />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
