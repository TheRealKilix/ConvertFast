import type { ConverterCategory } from '../types';

interface ConverterCardProps {
  converter: ConverterCategory;
  onClick: () => void;
  isRecent?: boolean;
}

export function ConverterCard({ converter, onClick, isRecent }: ConverterCardProps) {
  const Icon = converter.icon;

  return (
    <button
      onClick={onClick}
      className="group card card-hover w-full text-left"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition-all duration-300">
          <Icon className="w-7 h-7 text-primary-400 group-hover:text-primary-300 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
              {converter.name}
            </h3>
            {isRecent && (
              <span className="text-xs px-2 py-0.5 bg-secondary-500/20 text-secondary-400 rounded-full">
                Récent
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1 truncate">{converter.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {converter.units.slice(0, 4).map((unit) => (
              <span
                key={unit.id}
                className="text-xs px-2 py-0.5 bg-surface-700/50 text-slate-500 rounded"
              >
                {unit.symbol}
              </span>
            ))}
            {converter.units.length > 4 && (
              <span className="text-xs px-2 py-0.5 bg-surface-700/50 text-slate-500 rounded">
                +{converter.units.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
