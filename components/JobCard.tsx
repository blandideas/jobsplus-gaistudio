import React from 'react';
import { Job } from '../types';
import { Briefcase, MapPin, Clock, ExternalLink, Linkedin, ShieldAlert, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  showMatchScore: boolean;
  onAnalyze?: (jobId: string) => void;
  isAnalyzing?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  isSaved, 
  onToggleSave, 
  showMatchScore,
  onAnalyze,
  isAnalyzing 
}) => {
  const isMatchHigh = (job.matchScore || 0) >= 80;
  const isMatchMedium = (job.matchScore || 0) >= 50 && (job.matchScore || 0) < 80;

  const scoreColor = isMatchHigh ? 'bg-green-100 text-green-800 border-green-200' : 
                     isMatchMedium ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                     'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <div className={`relative bg-white rounded-lg border p-4 transition-all hover:shadow-md ${job.isExpired ? 'opacity-60 border-red-200 bg-red-50' : 'border-slate-200'}`}>
      
      {/* EXTENSION OVERLAY: Expired Badge */}
      {job.isExpired && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg z-10 flex items-center gap-1">
          <ShieldAlert size={12} /> EXPIRED
        </div>
      )}

      <div className="flex gap-4">
        <img 
          src={job.logoUrl} 
          alt={`${job.company} logo`} 
          className="w-12 h-12 rounded-md object-cover border border-slate-100"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer">
                {job.title}
              </h3>
              <p className="text-sm text-slate-600 font-medium">{job.company}</p>
            </div>
            
            <button 
              onClick={() => onToggleSave(job.id)}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              {isSaved ? <BookmarkCheck className="text-blue-600" /> : <Bookmark />}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 mb-3">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {job.postedDate}
            </span>
            
            {/* EXTENSION OVERLAY: Source Detection */}
            {job.source === 'NATIVE' ? (
              <span className="flex items-center gap-1 text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                <Linkedin size={10} /> Easy Apply
              </span>
            ) : (
              <span className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                <ExternalLink size={10} /> External Board
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {job.description}
          </p>

          {/* EXTENSION OVERLAY: Smart Keywords */}
          {job.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {job.keywords.map((kw) => (
                <span key={kw} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* EXTENSION OVERLAY: AI Match Score Section */}
          {showMatchScore && !job.isExpired && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              {job.matchScore !== undefined ? (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${scoreColor}`}>
                  <Sparkles size={14} />
                  <span>{job.matchScore}% Match</span>
                  <span className="font-normal opacity-80 border-l border-current pl-2 ml-1">
                    {job.matchReason}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={() => onAnalyze && onAnalyze(job.id)}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 text-xs font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                >
                  <Sparkles size={14} />
                  {isAnalyzing ? "Analyzing..." : "Calculate Match Score"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;