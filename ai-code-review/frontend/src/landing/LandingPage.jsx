import React from 'react';
import Hero from './Hero';
import DashboardPreview from './DashboardPreview';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Hero />
      <DashboardPreview />
    </div>
  );
}

