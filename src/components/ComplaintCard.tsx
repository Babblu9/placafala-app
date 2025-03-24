
import React from 'react';
import { MapPin, Clock, AlertCircle, Image, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from './ui-components/GlassCard';

interface ComplaintProps {
  complaint: {
    id: number;
    licensePlate: string;
    date: string;
    time: string;
    location: string;
    severity: string;
    description: string;
    hasMedia: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

const ComplaintCard = ({ complaint, className, style }: ComplaintProps) => {
  const { licensePlate, date, time, location, severity, description, hasMedia } = complaint;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'moderate':
        return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'serious':
        return 'bg-placafala-highlight/20 text-placafala-highlight border-placafala-highlight/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };
  
  const getSeverityLabel = (severity: string) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  return (
    <GlassCard 
      highlightBorder={severity === 'serious'} 
      className={cn("overflow-hidden", className)}
      style={style}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="bg-placafala-highlight/10 text-white px-3 py-1 rounded-full border border-placafala-highlight/30 font-mono">
              {licensePlate}
            </div>
            
            <div className={cn(
              "px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1",
              getSeverityColor(severity)
            )}>
              <AlertCircle size={12} />
              {getSeverityLabel(severity)}
            </div>
            
            {hasMedia && (
              <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30 text-xs font-medium flex items-center gap-1">
                <Image size={12} />
                Media Available
              </div>
            )}
          </div>
          
          <div className="mb-4 space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <Clock size={16} className="text-placafala-lightgray/70 mt-0.5 shrink-0" />
              <span className="text-placafala-lightgray">
                {formatDate(date)} at {time}
              </span>
            </div>
            
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={16} className="text-placafala-lightgray/70 mt-0.5 shrink-0" />
              <span className="text-placafala-lightgray">{location}</span>
            </div>
          </div>
          
          <p className="text-white leading-relaxed">{description}</p>
          
          {/* Report reliability section */}
          <div className="mt-4 flex items-center gap-2 text-sm text-placafala-lightgray/70">
            <Shield size={14} />
            <span>Report ID: {complaint.id.toString().padStart(5, '0')}</span>
          </div>
        </div>
        
        {/* Evidence indicator for larger screens */}
        {hasMedia && (
          <div className="hidden md:flex items-center justify-center w-24 shrink-0">
            <div className="w-16 h-16 bg-placafala-highlight/5 rounded-full flex items-center justify-center border border-placafala-highlight/20">
              <Image size={24} className="text-placafala-highlight/70" />
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default ComplaintCard;
