import React, { useState } from 'react';
import { ExtensionSettings } from '../types';
import { Settings, RefreshCw, XCircle, Plus, ToggleLeft, ToggleRight, Save } from 'lucide-react';

interface ExtensionControlsProps {
  settings: ExtensionSettings;
  updateSetting: <K extends keyof ExtensionSettings>(key: K, value: ExtensionSettings[K]) => void;
  refreshFeed: () => void;
  blockedCount: number;
}

const ExtensionControls: React.FC<ExtensionControlsProps> = ({ 
  settings, 
  updateSetting, 
  refreshFeed,
  blockedCount
}) => {
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyword.trim()) {
      updateSetting('blockedKeywords', [...settings.blockedKeywords, newKeyword.trim().toLowerCase()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    updateSetting('blockedKeywords', settings.blockedKeywords.filter(k => k !== kw));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-full lg:w-80 sticky top-24 h-fit">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
            LJ+
          </div>
          <h2 className="font-semibold text-slate-800">LinkedIn Jobs Plus</h2>
        </div>
        <button 
          onClick={refreshFeed}
          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
          title="Refresh Feed"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Toggle Filters */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Smart Filters</h3>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Hide Expired Jobs</label>
            <button 
              onClick={() => updateSetting('filterExpired', !settings.filterExpired)}
              className={`transition-colors ${settings.filterExpired ? 'text-blue-600' : 'text-slate-300'}`}
            >
              {settings.filterExpired ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Show AI Match Score</label>
            <button 
              onClick={() => updateSetting('showMatchScore', !settings.showMatchScore)}
              className={`transition-colors ${settings.showMatchScore ? 'text-purple-600' : 'text-slate-300'}`}
            >
              {settings.showMatchScore ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            </button>
          </div>
        </div>

        {/* Blocked Keywords */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blocked Keywords</h3>
            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-medium">
              {blockedCount} Hidden
            </span>
          </div>

          <form onSubmit={handleAddKeyword} className="flex gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="e.g. commission"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="bg-slate-800 text-white p-1.5 rounded-md hover:bg-slate-700 transition-colors"
            >
              <Plus size={16} />
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {settings.blockedKeywords.map(kw => (
              <span key={kw} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                {kw}
                <button onClick={() => removeKeyword(kw)} className="text-slate-400 hover:text-red-500">
                  <XCircle size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Save size={14} className="text-blue-600" />
            <span className="text-xs font-bold text-blue-800">Extension Active</span>
          </div>
          <p className="text-xs text-blue-600">
            You have saved {settings.savedJobIds.length} jobs this session.
          </p>
        </div>

      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        <button className="flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-slate-800 w-full py-2">
          <Settings size={14} /> Advanced Settings
        </button>
      </div>
    </div>
  );
};

export default ExtensionControls;