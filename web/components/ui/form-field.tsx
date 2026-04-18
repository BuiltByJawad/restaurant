"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, error, hint, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-sm text-red-500 mt-1" role="alert">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-lg border-[1.5px] bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 outline-none",
            "border-slate-200 hover:border-slate-300",
            "focus:border-[#0A7A5A] focus:ring-3 focus:ring-[#0A7A5A]/10",
            error && "border-red-400 focus:border-red-400 focus:ring-red-100",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-lg border-[1.5px] bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 outline-none resize-none",
          "border-slate-200 hover:border-slate-300",
          "focus:border-[#0A7A5A] focus:ring-3 focus:ring-[#0A7A5A]/10",
          error && "border-red-400 focus:border-red-400 focus:ring-red-100",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  placeholder?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, error, children, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-lg border-[1.5px] bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-150 outline-none appearance-none",
          "border-slate-200 hover:border-slate-300",
          "focus:border-[#0A7A5A] focus:ring-3 focus:ring-[#0A7A5A]/10",
          error && "border-red-400 focus:border-red-400 focus:ring-red-100",
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
    );
  }
);
SelectField.displayName = "SelectField";
