import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { NotificationCenter } from '@/components/features/NotificationCenter';

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout = React.memo<LayoutProps>(({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenu={true}
        />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      <NotificationCenter />
    </div>
  );
});

Layout.displayName = 'Layout';
