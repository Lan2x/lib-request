import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: React.ReactElement;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, Icon, ...props }, ref) => {
    return (
      <motion.div
        className="relative "
        animate={{
          scale: 1,
          opacity: 1,
        }}
        initial={{
          scale: 0.8,
          opacity: 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <label className="sr-only text-white">{label}</label>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
          <span className="text-gray-700">{Icon}</span>
        </span>
      </motion.div>
    );
  }
);

InputWithIcon.displayName = "Input";

export { InputWithIcon };
