
import React from 'react';
import Navbar from '@/components/Navbar';
import SearchComplaints from '@/components/SearchComplaints';
import Footer from '@/components/Footer';

const Search = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Search Complaints
          </h1>
          <p className="text-placafala-lightgray/80 text-center max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Enter a license plate number to view all reported incidents for that vehicle. Every plate tells a story.
          </p>
          <SearchComplaints />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
