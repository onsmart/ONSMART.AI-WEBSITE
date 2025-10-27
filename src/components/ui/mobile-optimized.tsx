
import { forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mobile-optimized Button com touch targets mínimos de 44px
interface MobileButtonProps extends ButtonProps {
  touchOptimized?: boolean;
}

const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, touchOptimized = true, ...props }, ref) => {
    return (
      <Button
        className={cn(
          touchOptimized && "min-h-[44px] min-w-[44px] touch-manipulation",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MobileButton.displayName = "MobileButton";

// Input otimizado para mobile
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touchOptimized?: boolean;
}

const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, touchOptimized = true, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          touchOptimized && "min-h-[44px] text-base sm:text-sm", // text-base para evitar zoom no iOS
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MobileInput.displayName = "MobileInput";

// Select otimizado para mobile
interface MobileSelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  touchOptimized?: boolean;
}

const MobileSelectTrigger = forwardRef<HTMLButtonElement, MobileSelectTriggerProps>(
  ({ className, touchOptimized = true, ...props }, ref) => {
    return (
      <button
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          touchOptimized && "min-h-[44px] text-base sm:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MobileSelectTrigger.displayName = "MobileSelectTrigger";

export { MobileButton, MobileInput, MobileSelectTrigger };
