import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to SeatScout!",
        description: "Login successful",
      });
      navigate("/libraries");
    }, 1500);
  };

  return (
    <MobileContainer className="bg-gradient-subtle">
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center">
            <Logo size="lg" className="justify-center mb-8" />
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">UMS LOGIN</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium shadow-soft"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Secure access to campus libraries
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Login;