import { Trash2, Clock, ArrowRight } from 'lucide-react';
import type { HistoryItem, ConverterCategory } from '../types';
import { getConverterById } from '../lib/converters';
import { formatNumber } from '../lib/conversion';

interface HistoryViewProps {
  history: HistoryItem[];
  onClear: () => void;
  onSelectConversion: (converter: ConverterCategory, item: HistoryItem) => void;
}

export function HistoryView({ history, onClear, onSelectConversion }: HistoryViewProps) {
  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const groupedHistory = history.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary-400" />
          <h1 className="text-2xl font-bold text-white">Historique des conversions</h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="btn-ghost flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
            Effacer
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="card text-center py-12">
          <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Aucune conversion dans l'historique.</p>
          <p className="text-sm text-slate-500 mt-2">
            Vos conversions apparaîtront ici automatiquement.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date}>
              <p className="text-sm font-medium text-slate-500 mb-3">{date}</p>
              <div className="space-y-2">
                {items.map((item) => {
                  const converter = getConverterById(item.categoryId);
                  if (!converter) return null;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectConversion(converter, item)}
                      className="w-full card card-hover p-4 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                          <converter.icon className="w-5 h-5 text-primary-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 font-mono text-sm">
                            <span className="text-slate-300">
                              {item.fromValue} {item.fromUnit.symbol}
                            </span>
                            <ArrowRight className="w-4 h-4 text-slate-500" />
                            <span className="text-primary-300">
                              {formatNumber(item.toValue)} {item.toUnit.symbol}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {converter.name} - {formatDateTime(item.timestamp)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
