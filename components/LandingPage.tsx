import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Sliders, BrainCircuit, Linkedin } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
            LJ+
          </div>
          <span className="font-bold text-xl text-slate-900">LinkedIn Jobs Plus</span>
        </div>
        <button 
          onClick={onEnterApp}
          className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          View Demo Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100 animate-fade-in-up">
          Now in Early Access
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 max-w-4xl leading-tight">
          Supercharge Your <span className="text-blue-600">LinkedIn Job Search.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Tired of outdated, irrelevant, and expired job listings? Get the job feed you deserve — personalized, filtered, and powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button 
            onClick={onEnterApp}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all shadow-lg shadow-blue-600/20"
          >
            Launch Extension Demo <ArrowRight size={20} />
          </button>
          <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-lg px-8 py-4 rounded-lg transition-all">
            Join Waitlist
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-4">
          <FeatureCard 
            icon={<ShieldAlert className="text-red-500" size={32} />}
            title="Filter Out Expired Roles"
            description="Automatically hides expired or filled roles so you don't waste time applying."
          />
          <FeatureCard 
            icon={<BrainCircuit className="text-purple-600" size={32} />}
            title="Smart Matching"
            description="AI analyzes your profile against job descriptions to give you a true match score."
          />
          <FeatureCard 
            icon={<Sliders className="text-orange-500" size={32} />}
            title="Block Job Board Junk"
            description="Filter out specific keywords like 'unpaid' or third-party recruiters."
          />
          <FeatureCard 
            icon={<CheckCircle2 className="text-green-500" size={32} />}
            title="Save and Track"
            description="Keep track of your favorite applications locally with one click."
          />
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200">
        © 2024 LinkedIn Jobs Plus. Not affiliated with LinkedIn Corporation.
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-left hover:shadow-md transition-shadow">
    <div className="mb-4 bg-slate-50 w-fit p-3 rounded-lg">{icon}</div>
    <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;