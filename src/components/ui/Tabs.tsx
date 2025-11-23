import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, onValueChange, className, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultValue || '');

    const handleTabChange = (value: string) => {
      setActiveTab(value);
      onValueChange?.(value);
    };

    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ activeTab: string; onTabChange: (value: string) => void }>, {
                activeTab,
                onTabChange: handleTabChange,
              })
            : child
        )}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex border-b border-gray-200', className)}
      role="tablist"
      {...props}
    />
  )
);

TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, activeTab, onTabChange, className, ...props }, ref) => {
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        onClick={() => onTabChange?.(value)}
        className={cn(
          'px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px',
          isActive
            ? 'border-primary-800 text-primary-800'
            : 'border-transparent text-gray-600 hover:text-gray-900'
        )}
        role="tab"
        aria-selected={isActive}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeTab?: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, activeTab, className, ...props }, ref) => {
    if (activeTab !== value) return null;

    return (
      <div ref={ref} className={cn('mt-4', className)} role="tabpanel" {...props} />
    );
  }
);

TabsContent.displayName = 'TabsContent';
