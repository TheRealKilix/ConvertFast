import { useState } from 'react';
import { Zap, Menu, X, History, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'converter' | 'history';
  onNavigate: (view: 'home' | 'converter' | 'history') => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              ConvertiFast
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'home'
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-slate-400 hover:text-white hover:bg-surface-800'
              }`}
            >
              <Home className="w-4 h-4" />
              Accueil
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'history'
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-slate-400 hover:text-white hover:bg-surface-800'
              }`}
            >
              <History className="w-4 h-4" />
              Historique
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-surface-700/50 animate-slide-up">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  currentView === 'home'
                    ? 'bg-primary-500/10 text-primary-400'
                    : 'text-slate-300 hover:bg-surface-800'
                }`}
              >
                <Home className="w-5 h-5" />
                Accueil
              </button>
              <button
                onClick={() => {
                  onNavigate('history');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  currentView === 'history'
                    ? 'bg-primary-500/10 text-primary-400'
                    : 'text-slate-300 hover:bg-surface-800'
                }`}
              >
                <History className="w-5 h-5" />
                Historique
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
