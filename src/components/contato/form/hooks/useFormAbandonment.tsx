
import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "../ContactFormSchema";
import { useAnalytics } from "@/hooks/useAnalytics";

export const useFormAbandonment = (form: UseFormReturn<ContactFormValues>, currentStep: number) => {
  const { trackEvent } = useAnalytics();
  const formStartTime = useRef<number | null>(null);
  const lastStepTime = useRef<number | null>(null);
  const hasInteracted = useRef(false);

  // Track form start
  useEffect(() => {
    if (!formStartTime.current) {
      formStartTime.current = Date.now();
      trackEvent({
        action: "form_started",
        category: "contact_form",
        label: "multi_step_contact"
      });
    }
  }, [trackEvent]);

  // Track step changes
  useEffect(() => {
    if (lastStepTime.current && currentStep > 1) {
      const stepDuration = Date.now() - lastStepTime.current;
      trackEvent({
        action: "step_completed",
        category: "contact_form",
        label: `step_${currentStep - 1}`,
        value: Math.round(stepDuration / 1000)
      });
    }
    lastStepTime.current = Date.now();
  }, [currentStep, trackEvent]);

  // Track field interactions
  useEffect(() => {
    const formData = form.getValues();
    const hasFilledFields = Object.values(formData).some(value => value && value.toString().length > 0);
    
    if (hasFilledFields && !hasInteracted.current) {
      hasInteracted.current = true;
      trackEvent({
        action: "form_interaction",
        category: "contact_form",
        label: `step_${currentStep}`
      });
    }
  }, [form.watch(), currentStep, trackEvent]);

  // Track abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasInteracted.current && formStartTime.current) {
        const timeSpent = Date.now() - formStartTime.current;
        trackEvent({
          action: "form_abandoned",
          category: "contact_form",
          label: `step_${currentStep}`,
          value: Math.round(timeSpent / 1000)
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentStep, trackEvent]);

  return { hasInteracted: hasInteracted.current };
};
