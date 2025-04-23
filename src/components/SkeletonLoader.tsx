
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="w-full">
              <Skeleton className="h-8 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="w-14 h-14 rounded-full" />
              <Skeleton className="h-4 w-20 mt-1" />
            </div>
          </div>
          
          <div className="border rounded-lg p-4 mt-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardHeader>
        
        <CardContent>
          <Skeleton className="h-6 w-48 mb-4" />
          
          <div className="space-y-2 mb-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-72 w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonLoader;
