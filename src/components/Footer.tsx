
import React from 'react';
import { AlertTriangle, Search, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-placafala-black/80 border-t border-white/5 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-1 text-xl font-bold text-white mb-4">
              <span className="text-placafala-highlight">Placa</span>
              <span>Fala</span>
            </Link>
            <p className="text-placafala-lightgray/70 text-sm max-w-xs">
              PlacaFala is dedicated to improving road safety through community vigilance and accountability.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/", icon: <Shield size={14} /> },
                { label: "Report a Driver", path: "/report", icon: <AlertTriangle size={14} /> },
                { label: "Search Complaints", path: "/search", icon: <Search size={14} /> },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-placafala-lightgray/70 hover:text-white transition-colors flex items-center gap-2"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Remember</h3>
            <div className="space-y-2 text-placafala-lightgray/70 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-placafala-highlight mt-1">⚠️</span>
                <span>Drive Safe or Be Exposed!</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-placafala-highlight mt-1">🔍</span>
                <span>Your Voice, Your Safety. Report Now!</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-placafala-highlight mt-1">🛡️</span>
                <span>Every Plate Tells a Story!</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-placafala-lightgray/50 text-sm">
          <p>© {new Date().getFullYear()} PlacaFala. All rights reserved.</p>
          <p className="mt-1">Making roads safer, one report at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
