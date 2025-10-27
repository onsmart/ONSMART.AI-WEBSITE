
import React, { lazy, Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

// Lazy load the heavy form component
const MultiStepContactForm = lazy(() => import("./form/MultiStepContactForm"));

const FormFallback = () => (
  <div className="bg-white dark:bg-gray-800 shadow-xl border-primary/20 rounded-lg overflow-hidden">
    <div className="p-6">
      <LoadingSkeleton variant="card" className="h-12 mb-4" />
      <LoadingSkeleton variant="card" className="h-64 mb-4" />
      <LoadingSkeleton variant="card" className="h-12" />
    </div>
  </div>
);

const ContactForm = () => {
  return (
    <Suspense fallback={<FormFallback />}>
      <MultiStepContactForm />
    </Suspense>
  );
};

export default ContactForm;
