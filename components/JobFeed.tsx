import React from 'react';
import { Job, ExtensionSettings } from '../types';
import JobCard from './JobCard';
import { Search, Filter } from 'lucide-react';

interface JobFeedProps {
  jobs: Job[];
  settings: ExtensionSettings;
  updateSetting: <K extends keyof ExtensionSettings>(key: K, value: ExtensionSettings[K]) => void;
  onAnalyze: (jobId: string) => void;
  analyzingIds: string[];
}

const JobFeed: React.FC<JobFeedProps> = ({ 
  jobs, 
  settings, 
  updateSetting, 
  onAnalyze, 
  analyzingIds 
}) => {
  const toggleSave = (id: string) => {
    const isSaved = settings.savedJobIds.includes(id);
    let newSaved;
    if (isSaved) {
      newSaved = settings.savedJobIds.filter(sid => sid !== id);
    } else {
      newSaved = [...settings.savedJobIds, id];
    }
    updateSetting('savedJobIds', newSaved);
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full">
      {/* Search Bar Simulation */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 mb-6 shadow-sm flex gap-3 items-center sticky top-4 z-20">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by title, skill, or company" 
          className="flex-1 outline-none text-slate-700 bg-transparent"
        />
        <div className="h-6 w-px bg-slate-200 mx-1"></div>
        <button className="flex items-center gap-1 text-slate-600 font-medium px-3 py-1 hover:bg-slate-50 rounded-full transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-semibold text-slate-700">Recommended for you</h2>
          <span className="text-xs text-slate-500">Based on your profile and search history</span>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-200 border-dashed">
            <p className="text-slate-500">No jobs match your current filters.</p>
            <p className="text-xs text-slate-400 mt-2">Try removing some blocked keywords or showing expired jobs.</p>
          </div>
        ) : (
          jobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job}
              isSaved={settings.savedJobIds.includes(job.id)}
              onToggleSave={toggleSave}
              showMatchScore={settings.showMatchScore}
              onAnalyze={onAnalyze}
              isAnalyzing={analyzingIds.includes(job.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobFeed;