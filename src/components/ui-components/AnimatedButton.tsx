
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'highlight' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const AnimatedButton = ({
  variant = 'default',
  size = 'default',
  children,
  className,
  isLoading = false,
  ...props
}: AnimatedButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'highlight':
        return "bg-gradient-to-r from-placafala-highlight to-placafala-highlight/80 text-white hover:shadow-[0_0_15px_rgba(234,56,73,0.4)] border-transparent";
      case 'outline':
        return "bg-transparent border border-white/20 hover:bg-white/5 text-placafala-lightgray";
      case 'ghost':
        return "bg-transparent hover:bg-white/5 text-placafala-lightgray";
      default:
        return "bg-gradient-to-b from-placafala-gray to-placafala-darkgray text-placafala-lightgray hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return "text-sm px-3 py-1";
      case 'lg':
        return "text-lg px-6 py-3";
      default:
        return "px-4 py-2";
    }
  };

  return (
    <Button
      className={cn(
        "font-medium rounded-md transition-all duration-300",
        "transform hover:translate-y-[-2px]",
        getVariantClasses(),
        getSizeClasses(),
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default AnimatedButton;
