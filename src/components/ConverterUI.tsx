import { useState, useEffect, useCallback } from 'react';
import { ArrowLeftRight, Copy, Check, ChevronDown, Clock } from 'lucide-react';
import type { ConverterCategory, Unit, HistoryItem } from '../types';
import { convert, formatNumber } from '../lib/conversion';
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useLocalStorage';

interface ConverterUIProps {
  converter: ConverterCategory;
  onBack: () => void;
  onAddToHistory: (item: HistoryItem) => void;
}

export function ConverterUI({ converter, onBack, onAddToHistory }: ConverterUIProps) {
  const [fromValue, setFromValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<Unit>(converter.units[0]);
  const [toUnit, setToUnit] = useState<Unit>(converter.units[1] || converter.units[0]);
  const [result, setResult] = useState<string | number>(0);
  const [copied, setCopied] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const [history] = useLocalStorage<HistoryItem[]>(STORAGE_KEYS.HISTORY, []);

  const recentConversions = history
    .filter((h) => h.categoryId === converter.id)
    .slice(0, 5);

  const calculateResult = useCallback(
    (val: number, from: Unit, to: Unit) => {
      if (isNaN(val)) return 0;
      return convert(val, from, to, converter);
    },
    [converter]
  );

  useEffect(() => {
    const numValue = parseFloat(fromValue) || 0;
    const converted = calculateResult(numValue, fromUnit, toUnit);
    setResult(converted);
  }, [fromValue, fromUnit, toUnit, calculateResult]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    const currentResult = calculateResult(parseFloat(fromValue) || 0, fromUnit, toUnit);
    setFromValue(currentResult.toString());
  };

  const handleCopy = async () => {
    const formattedResult = formatNumber(result);
    await navigator.clipboard.writeText(`${fromValue} ${fromUnit.symbol} = ${formattedResult} ${toUnit.symbol}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      fromValue: parseFloat(fromValue) || 0,
      fromUnit,
      toValue: result,
      toUnit,
      timestamp: Date.now(),
      categoryId: converter.id,
    };
    onAddToHistory(historyItem);
  };

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeftRight className="w-4 h-4 rotate-180" />
        Retour aux convertisseurs
      </button>

      <div className="card glow-primary mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
            <converter.icon className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{converter.name}</h1>
            <p className="text-sm text-slate-400">{converter.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Valeur
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="input-field font-mono text-xl"
                placeholder="Entrez une valeur"
                inputMode="decimal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                De
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                  className="input-field flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{fromUnit.symbol}</span>
                    <span className="text-slate-500">{fromUnit.name}</span>
                  </span>
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </button>

                {showFromDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-surface-800 border border-surface-600 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto animate-scale-in">
                    {converter.units.map((unit) => (
                      <button
                        key={unit.id}
                        onClick={() => {
                          setFromUnit(unit);
                          setShowFromDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-700 transition-colors ${
                          unit.id === fromUnit.id ? 'bg-primary-500/10' : ''
                        }`}
                      >
                        <span className="font-mono text-primary-400 w-12">{unit.symbol}</span>
                        <span className="text-slate-300">{unit.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSwapUnits}
              className="p-3 rounded-full bg-surface-700 hover:bg-primary-500/20 text-slate-400 hover:text-primary-400 transition-all duration-200 active:scale-95"
              title="Inverser les unités"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Vers
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowToDropdown(!showToDropdown)}
                  className="input-field flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{toUnit.symbol}</span>
                    <span className="text-slate-500">{toUnit.name}</span>
                  </span>
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </button>

                {showToDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-surface-800 border border-surface-600 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto animate-scale-in">
                    {converter.units.map((unit) => (
                      <button
                        key={unit.id}
                        onClick={() => {
                          setToUnit(unit);
                          setShowToDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-700 transition-colors ${
                          unit.id === toUnit.id ? 'bg-primary-500/10' : ''
                        }`}
                      >
                        <span className="font-mono text-primary-400 w-12">{unit.symbol}</span>
                        <span className="text-slate-300">{unit.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Résultat
              </label>
              <div className="input-field bg-surface-700/50 flex items-center justify-between">
                <span className="font-mono text-xl text-primary-300">
                  {formatNumber(result)}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-surface-600 transition-colors"
                  title="Copier le résultat"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-surface-800/30">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-medium text-slate-400">Conversions récentes</h3>
        </div>
        {recentConversions.length > 0 ? (
          <div className="space-y-2">
            {recentConversions.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setFromValue(item.fromValue.toString());
                  setFromUnit(item.fromUnit);
                  setToUnit(item.toUnit);
                }}
                className="w-full text-left p-3 rounded-lg bg-surface-800/50 hover:bg-surface-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-slate-300">
                    {item.fromValue} {item.fromUnit.symbol} = {formatNumber(item.toValue)} {item.toUnit.symbol}
                  </span>
                  <span className="text-xs text-slate-500">{formatDateTime(item.timestamp)}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">
            Aucune conversion récente pour ce type.
          </p>
        )}
      </div>
    </div>
  );
}
