import React from "react";
import { clsx, type ClassValue } from "clsx";
import { cn } from "@/utils/util";

// Định nghĩa các type
type ButtonVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon" | "fit";

// Base classes (không thay đổi)
const buttonBaseClasses = clsx(
    "inline-flex items-center justify-center rounded-md font-medium flex gap-1 justify-center items-center",
    "transition-colors focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
    "disabled:pointer-events-none ring-offset-background cursor-pointer",
    "transition-all duration-200"
);

// Variant classes map
const variantClassMap: Record<ButtonVariant, string> = {
    default: "bg-gray-800 text-white hover:bg-gray-800/60",
    destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
};

// Size classes map
const sizeClassMap: Record<ButtonSize, string> = {
    default: "h-10 py-2 px-4",
    fit: "p-1 rounded-md",
    sm: "h-8 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
};

// Helper function để merge classes
const mergeButtonClasses = (
    variant: ButtonVariant,
    size: ButtonSize,
    className?: ClassValue
) => {
    return cn(
        buttonBaseClasses,
        variantClassMap[variant],
        sizeClassMap[size],
        className
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "default",
            size = "default",
            asChild = false,
            children,
            ...props
        },
        ref
    ) => {
        const mergedClasses = mergeButtonClasses(variant, size, className);

        if (asChild) {
            const child = React.Children.only(children) as React.ReactElement;
            const cName =
                (child?.props as { className: string })["className"] || "";

            return React.cloneElement(child, {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                className: cn(mergedClasses, cName),
                ref,
                ...props,
            });
        }

        return (
            <button className={mergedClasses} ref={ref} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type { ButtonVariant, ButtonSize, ButtonProps };
