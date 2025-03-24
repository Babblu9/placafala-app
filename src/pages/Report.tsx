
import React from 'react';
import Navbar from '@/components/Navbar';
import ReportForm from '@/components/ReportForm';
import Footer from '@/components/Footer';

const Report = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Report a Driver
          </h1>
          <p className="text-placafala-lightgray/80 text-center max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Help make our roads safer by reporting reckless driving behavior. Your report could prevent future accidents.
          </p>
          <ReportForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;
