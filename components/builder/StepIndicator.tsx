"use client";

import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1 mb-8">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={i} className="flex items-center gap-1 flex-1">
            <button
              onClick={() => onStepClick(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full
                ${
                  isCurrent
                    ? "bg-accent text-white"
                    : isCompleted
                    ? "bg-accent-light text-accent cursor-pointer hover:bg-blue-200"
                    : "bg-gray-100 text-muted cursor-pointer hover:bg-gray-200"
                }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0
                ${
                  isCurrent
                    ? "bg-white text-accent"
                    : isCompleted
                    ? "bg-accent text-white"
                    : "bg-gray-300 text-white"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className="truncate">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={`w-4 h-0.5 shrink-0 ${
                  isCompleted ? "bg-accent" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
