
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "@/components/ui-components/AnimatedButton";
import GlassCard from "@/components/ui-components/GlassCard";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-placafala-black p-4">
      <GlassCard className="max-w-md w-full text-center animate-fade-in">
        <div className="text-8xl font-bold text-placafala-highlight mb-6">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-placafala-lightgray mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <AnimatedButton 
          variant="highlight" 
          onClick={() => navigate('/')}
          className="mx-auto"
        >
          Return to Home
        </AnimatedButton>
      </GlassCard>
    </div>
  );
};

export default NotFound;
