import AuthForm from "@/components/forms/AuthForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-background">
        <Card className="w-full max-w-md border shadow-xl border-border rounded-2xl bg-card">
          <CardHeader className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Login to your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">Welcome back!</p>
          </CardHeader>
          <CardContent className="p-6">
            <AuthForm type="login" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
