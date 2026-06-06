import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-surface-700/50 bg-surface-900/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">ConvertiFast</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              Plateforme de convertisseurs universels gratuite, rapide et précise.
              Convertissez tout instantanément.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Convertisseurs</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Longueur - Distance</li>
              <li>Poids - Masse</li>
              <li>Température</li>
              <li>Volume</li>
              <li>Vitesse</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Autres outils</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Temps - Durée</li>
              <li>Stockage informatique</li>
              <li>Monnaies</li>
              <li>Taille vêtements</li>
              <li>Taille chaussures</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-700/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ConvertiFast. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-600">
            Fait avec précision pour vos conversions quotidiennes.
          </p>
        </div>
      </div>
    </footer>
  );
}
