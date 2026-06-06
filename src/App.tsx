import { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { ConverterCard } from './components/ConverterCard';
import { ConverterUI } from './components/ConverterUI';
import { HistoryView } from './components/HistoryView';
import { AdPlaceholder } from './components/AdPlaceholder';
import { converters } from './lib/converters';
import { useLocalStorage, STORAGE_KEYS } from './hooks/useLocalStorage';
import type { ConverterCategory, HistoryItem } from './types';

type View = 'home' | 'converter' | 'history';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedConverter, setSelectedConverter] = useState<ConverterCategory | null>(null);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(STORAGE_KEYS.HISTORY, []);

  const handleSelectConverter = useCallback((converter: ConverterCategory) => {
    setSelectedConverter(converter);
    setCurrentView('converter');
  }, []);

  const handleAddToHistory = useCallback((item: HistoryItem) => {
    setHistory((prev) => [item, ...prev.slice(0, 49)]);
  }, [setHistory]);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    if (view === 'home' || view === 'history') {
      setSelectedConverter(null);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const handleSelectFromHistory = useCallback((_converter: ConverterCategory, _item: HistoryItem) => {
    setSelectedConverter(_converter);
    setCurrentView('converter');
  }, []);

  const lastUsedConverters = history
    .reduce((acc, item) => {
      if (!acc.includes(item.categoryId)) {
        acc.push(item.categoryId);
      }
      return acc;
    }, [] as string[])
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean)
    .slice(0, 3) as ConverterCategory[];

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <section className="py-12 sm:py-16 px-4">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-full text-sm text-primary-300 mb-6">
                  <Sparkles className="w-4 h-4" />
                  Convertisseurs universels gratuits
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  <span className="text-white">Convertissez </span>
                  <span className="gradient-text">tout</span>
                  <span className="text-white">, instantanément</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Longueur, poids, température, monnaies, vêtements...
                  Tous vos convertisseurs au même endroit, gratuits et sans publicité intrusive.
                </p>
              </div>

              <SearchBar converters={converters} onSelectConverter={handleSelectConverter} />
            </section>

            <AdPlaceholder location="header" className="max-w-4xl mx-auto mb-8" />

            {lastUsedConverters.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 mb-8">
                <h2 className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                  Récemment utilisés
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lastUsedConverters.map((converter) => (
                    <ConverterCard
                      key={converter.id}
                      converter={converter}
                      onClick={() => handleSelectConverter(converter)}
                      isRecent
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="max-w-7xl mx-auto px-4 pb-12">
              <h2 className="text-lg font-semibold text-white mb-6">
                Tous les convertisseurs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {converters.map((converter) => (
                  <ConverterCard
                    key={converter.id}
                    converter={converter}
                    onClick={() => handleSelectConverter(converter)}
                  />
                ))}
              </div>
            </section>

            <AdPlaceholder location="content" className="max-w-4xl mx-auto mb-8" />

            <section className="max-w-7xl mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold text-white text-center mb-12">
                Pourquoi ConvertiFast ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ultra rapide</h3>
                  <p className="text-slate-400 text-sm">
                    Calculs instantanés sans rechargement de page.
                    Résultats en temps réel.
                  </p>
                </div>
                <div className="card text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-500/20 to-secondary-600/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">100% privé</h3>
                  <p className="text-slate-400 text-sm">
                    Aucune donnée envoyée à nos serveurs.
                    Tout reste sur votre appareil.
                  </p>
                </div>
                <div className="card text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mobile first</h3>
                  <p className="text-slate-400 text-sm">
                    Optimisé pour smartphone, tablette et PC.
                    Interface responsive et intuitive.
                  </p>
                </div>
              </div>
            </section>

            <AdPlaceholder location="footer" className="max-w-4xl mx-auto mb-8" />
          </>
        )}

        {currentView === 'converter' && selectedConverter && (
          <ConverterUI
            converter={selectedConverter}
            onBack={() => handleNavigate('home')}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            history={history}
            onClear={handleClearHistory}
            onSelectConversion={handleSelectFromHistory}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
