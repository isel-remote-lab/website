import { Form, Skeleton } from "antd";
import type { DomainConfig } from "~/types/domain";
import React from "react";

/**
 * Default form props
 */
interface DefaultFormSkeletonProps {
  configType: keyof DomainConfig;
  submitButtonText: string;
  children?: React.ReactNode;
}

/**
 * Default form skeleton props
 */
interface DefaultFormSkeletonProps {
  configType: keyof DomainConfig;
  submitButtonText: string;
  children?: React.ReactNode;
}

/**
 * Default form skeleton component
 * Shows loading placeholders while the actual form is being prepared
 */
export default function DefaultFormSkeleton({
  configType,
  submitButtonText,
  children
}: DefaultFormSkeletonProps) {
  // Get the number of fields to show
  const fieldCount = Object.keys(configType).length;

  return (
    <>
      <Form>
        {/* Generate skeleton form items */}
        {Array.from({ length: fieldCount }, (_, index) => (
          <Form.Item key={index}>
            <div style={{ marginBottom: 16 }}>
              {/* Label skeleton */}
              <Skeleton.Input 
                active 
                size="small" 
                style={{ width: 120, marginBottom: 8 }} 
              />
              {/* Input skeleton */}
              <Skeleton.Input 
                active 
                size="large" 
                style={{ width: '100%' }} 
              />
            </div>
          </Form.Item>
        ))}
        
        <Form.Item>
          {/* Submit button skeleton */}
          <Skeleton.Button 
            active 
            size="large" 
            style={{ width: 120, height: 32 }} 
          />
          {children}
        </Form.Item>
      </Form>
    </>
  );
}
