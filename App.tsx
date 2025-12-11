import React, { useState, useEffect, useCallback, useMemo } from 'react';
import LandingPage from './components/LandingPage';
import JobFeed from './components/JobFeed';
import ExtensionControls from './components/ExtensionControls';
import { Job, ExtensionSettings } from './types';
import { MOCK_JOBS, INITIAL_BLOCKED_KEYWORDS, MOCK_USER_PROFILE } from './constants';
import { analyzeJobMatch } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'LANDING' | 'APP'>('LANDING');
  
  // App State
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [analyzingIds, setAnalyzingIds] = useState<string[]>([]);
  
  // Extension Settings State
  const [settings, setSettings] = useState<ExtensionSettings>({
    filterExpired: true,
    blockedKeywords: INITIAL_BLOCKED_KEYWORDS,
    showMatchScore: true,
    savedJobIds: [],
  });

  // Helper to update settings
  const updateSetting = <K extends keyof ExtensionSettings>(key: K, value: ExtensionSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Reset demo data
  const refreshFeed = () => {
    setJobs(MOCK_JOBS.map(j => ({ ...j, matchScore: undefined, matchReason: undefined })));
  };

  // AI Analysis Handler
  const handleAnalyzeJob = useCallback(async (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    setAnalyzingIds(prev => [...prev, jobId]);

    const result = await analyzeJobMatch(job, MOCK_USER_PROFILE);

    setJobs(prevJobs => prevJobs.map(j => {
      if (j.id === jobId) {
        return { ...j, matchScore: result.score, matchReason: result.reason };
      }
      return j;
    }));

    setAnalyzingIds(prev => prev.filter(id => id !== jobId));
  }, [jobs]);


  // Filter Logic: Derived state using useMemo to avoid side-effects during render (fixes Error #301)
  const { displayedJobs, blockedCount } = useMemo(() => {
    let filtered = jobs;

    // 1. Expired Filter
    if (settings.filterExpired) {
      filtered = filtered.filter(job => !job.isExpired);
    }

    // 2. Keyword Blocking (This counts towards "Hidden" stats)
    // We calculate how many would be shown if NOT for the keyword block
    const preKeywordFilterCount = filtered.length;
    
    const finalJobs = filtered.filter(job => {
      const combinedText = `${job.title} ${job.description} ${job.keywords.join(' ')}`.toLowerCase();
      const hasBlockedKeyword = settings.blockedKeywords.some(kw => combinedText.includes(kw));
      return !hasBlockedKeyword;
    });

    const count = preKeywordFilterCount - finalJobs.length;

    return { displayedJobs: finalJobs, blockedCount: count };
  }, [jobs, settings.filterExpired, settings.blockedKeywords]);

  if (view === 'LANDING') {
    return <LandingPage onEnterApp={() => setView('APP')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Simulation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white font-bold p-1 rounded text-sm">LJ+</div>
            <span className="font-semibold text-slate-700 hidden sm:block">Extension Demo View</span>
          </div>
          <button 
            onClick={() => setView('LANDING')}
            className="text-sm text-slate-500 hover:text-blue-600"
          >
            Back to Landing Page
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left: The Content Script Injection Area (Simulated Job Feed) */}
        <JobFeed 
          jobs={displayedJobs}
          settings={settings}
          updateSetting={updateSetting}
          onAnalyze={handleAnalyzeJob}
          analyzingIds={analyzingIds}
        />

        {/* Right: The Extension Popup/Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <ExtensionControls 
            settings={settings}
            updateSetting={updateSetting}
            refreshFeed={refreshFeed}
            blockedCount={blockedCount}
          />
        </aside>

      </main>
    </div>
  );
};

export default App;