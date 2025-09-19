import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileContainer className="bg-gradient-subtle">
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-bounce-subtle">
            <Logo size="lg" className="justify-center mb-8" />
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-1 w-16 mx-auto bg-gradient-primary rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Splash;