
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DiagnosticoSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="py-16 bg-gradient-to-r from-brand-blue/10 to-brand-blue-light/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-brand-blue-light/10">
                <Skeleton className="h-8 w-2/3 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </CardHeader>
              
              <CardContent className="pt-6">
                {/* Progress Bar Skeleton */}
                <div className="mb-8">
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
                
                {/* Form Fields Skeleton */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
                
                {/* Button Skeleton */}
                <div className="flex justify-end pt-6">
                  <Skeleton className="h-12 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticoSkeleton;
