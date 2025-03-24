import React, { useState } from 'react';
import { Search, AlertTriangle, SlidersHorizontal, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GlassCard from './ui-components/GlassCard';
import AnimatedButton from './ui-components/AnimatedButton';
import ComplaintCard from './ComplaintCard';

const SearchComplaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [severityFilter, setSeverityFilter] = useState('all');
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Fetch data from your API
      const response = await fetch(`https://placafala-app.onrender.com/get?licensePlate=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      let data = await response.json();
      
      // Transform API data to match the expected complaint format
      const transformedData = data.map((item, index) => {
        // Convert the date from the API format
        const dateObj = new Date(item.date?.$date?.$numberLong ? parseInt(item.date.$date.$numberLong) : Date.now());
        const formattedDate = dateObj.toISOString().split('T')[0];
        const formattedTime = dateObj.toTimeString().split(' ')[0].substring(0, 5);
        
        return {
          id: index + 1, // Generate a numeric ID
          licensePlate: item.licensePlate || searchTerm,
          date: formattedDate,
          time: formattedTime,
          location: item.location || 'Unknown location',
          severity: 'moderate', // Set all to moderate as requested
          description: item.desc || 'No description provided',
          hasMedia: false // Default to no media
        };
      });
      
      // Apply sorting
      let sortedResults = [...transformedData];
      if (sortBy === 'newest') {
        sortedResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (sortBy === 'oldest') {
        sortedResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      
      // Apply severity filter
      if (severityFilter !== 'all') {
        sortedResults = sortedResults.filter(complaint => complaint.severity === severityFilter);
      }
      
      setSearchResults(sortedResults);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHasSearched(false);
  };
  
  const applyFilters = () => {
    if (hasSearched) {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <GlassCard className="mb-8 animate-scale-in">
        <div className="mb-6 flex items-center gap-2">
          <Search size={24} className="text-placafala-highlight" />
          <h2 className="text-2xl font-bold text-white">Search Complaints</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter plate number (e.g., TS08UE1234)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-placafala-darkgray border-white/10 focus:border-placafala-highlight pr-10"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-placafala-lightgray/70 hover:text-placafala-highlight"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          {/* Filters popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 bg-placafala-darkgray rounded-md border border-white/10 hover:border-white/20 transition-colors">
                <SlidersHorizontal size={20} className="text-placafala-lightgray" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-placafala-darkgray border-white/10">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Filters & Sorting</h3>
                
                <div className="space-y-2">
                  <label className="text-xs text-placafala-lightgray/70">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-placafala-black border-white/10">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-placafala-darkgray border-white/10">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-placafala-lightgray/70">Severity</label>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="bg-placafala-black border-white/10">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-placafala-darkgray border-white/10">
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <AnimatedButton 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={applyFilters}
                >
                  Apply Filters
                </AnimatedButton>
              </div>
            </PopoverContent>
          </Popover>
          
          <AnimatedButton 
            onClick={handleSearch} 
            isLoading={isSearching}
            variant="highlight"
          >
            Search
          </AnimatedButton>
        </div>
      </GlassCard>
      
      {/* Search results */}
      {hasSearched && (
        <div className="space-y-6 animate-fade-in">
          {searchResults.length > 0 ? (
            <>
              <h3 className="text-xl font-medium flex items-center gap-2">
                <span className="text-placafala-highlight">
                  {searchResults.length}
                </span> 
                complaints found for 
                <span className="font-bold">{searchTerm}</span>
              </h3>
              
              <div className="space-y-4">
                {searchResults.map((complaint, index) => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    className="animate-fade-up opacity-0"
                    style={{ 
                      animationDelay: `${0.1 * index}s`,
                      animationFillMode: 'forwards'
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <GlassCard className="text-center py-10 animate-fade-in">
              <AlertTriangle size={48} className="text-placafala-highlight/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No complaints found</h3>
              <p className="text-placafala-lightgray/70 max-w-md mx-auto">
                We couldn't find any complaints for the plate number "{searchTerm}". 
                Try a different plate number or check if you typed it correctly.
              </p>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComplaints;