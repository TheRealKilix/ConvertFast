import {
  Ruler,
  Scale,
  Thermometer,
  Droplet,
  Gauge,
  Clock,
  HardDrive,
  Coins,
  Shirt,
  Footprints,
} from 'lucide-react';
import type { ConverterCategory } from '../types';

export const converters: ConverterCategory[] = [
  {
    id: 'length',
    name: 'Longueur',
    description: 'Mètres, kilomètres, miles, pieds, pouces...',
    icon: Ruler,
    keywords: ['longueur', 'distance', 'mètre', 'km', 'mile', 'pied', 'pouce', 'cm', 'mm', 'yard'],
    units: [
      { id: 'km', name: 'Kilomètre', symbol: 'km', toBase: 1000 },
      { id: 'm', name: 'Mètre', symbol: 'm', toBase: 1 },
      { id: 'cm', name: 'Centimètre', symbol: 'cm', toBase: 0.01 },
      { id: 'mm', name: 'Millimètre', symbol: 'mm', toBase: 0.001 },
      { id: 'mi', name: 'Mile', symbol: 'mi', toBase: 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', toBase: 0.9144 },
      { id: 'ft', name: 'Pied', symbol: 'ft', toBase: 0.3048 },
      { id: 'in', name: 'Pouce', symbol: 'in', toBase: 0.0254 },
      { id: 'nmi', name: 'Mille nautique', symbol: 'nmi', toBase: 1852 },
    ],
  },
  {
    id: 'weight',
    name: 'Poids',
    description: 'Kilogrammes, grammes, livres, onces...',
    icon: Scale,
    keywords: ['poids', 'masse', 'kg', 'gramme', 'livre', 'ounce', 'tonne', 'mg', 'lb'],
    units: [
      { id: 't', name: 'Tonne', symbol: 't', toBase: 1000 },
      { id: 'kg', name: 'Kilogramme', symbol: 'kg', toBase: 1 },
      { id: 'g', name: 'Gramme', symbol: 'g', toBase: 0.001 },
      { id: 'mg', name: 'Milligramme', symbol: 'mg', toBase: 0.000001 },
      { id: 'lb', name: 'Livre', symbol: 'lb', toBase: 0.453592 },
      { id: 'oz', name: 'Once', symbol: 'oz', toBase: 0.0283495 },
      { id: 'st', name: 'Stone', symbol: 'st', toBase: 6.35029 },
      { id: 'ct', name: 'Carat', symbol: 'ct', toBase: 0.0002 },
    ],
  },
  {
    id: 'temperature',
    name: 'Température',
    description: 'Celsius, Fahrenheit, Kelvin...',
    icon: Thermometer,
    keywords: ['température', 'celsius', 'fahrenheit', 'kelvin', 'degré', 'chaud', 'froid'],
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', toBase: 1 },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: 1 },
      { id: 'k', name: 'Kelvin', symbol: 'K', toBase: 1 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    description: 'Litres, millilitres, gallons, onces liquides...',
    icon: Droplet,
    keywords: ['volume', 'litre', 'ml', 'gallon', 'ml', 'cl', 'dl', 'm³', 'verre'],
    units: [
      { id: 'm3', name: 'Mètre cube', symbol: 'm³', toBase: 1000 },
      { id: 'l', name: 'Litre', symbol: 'L', toBase: 1 },
      { id: 'dl', name: 'Décilitre', symbol: 'dL', toBase: 0.1 },
      { id: 'cl', name: 'Centilitre', symbol: 'cL', toBase: 0.01 },
      { id: 'ml', name: 'Millilitre', symbol: 'mL', toBase: 0.001 },
      { id: 'gal_us', name: 'Gallon US', symbol: 'gal (US)', toBase: 3.78541 },
      { id: 'gal_uk', name: 'Gallon UK', symbol: 'gal (UK)', toBase: 4.54609 },
      { id: 'qt', name: 'Quart', symbol: 'qt', toBase: 0.946353 },
      { id: 'pt', name: 'Pinte', symbol: 'pt', toBase: 0.473176 },
      { id: 'fl_oz', name: 'Once liquide', symbol: 'fl oz', toBase: 0.0295735 },
      { id: 'cup', name: 'Tasse', symbol: 'cup', toBase: 0.236588 },
    ],
  },
  {
    id: 'speed',
    name: 'Vitesse',
    description: 'km/h, mph, m/s, nœuds...',
    icon: Gauge,
    keywords: ['vitesse', 'km/h', 'mph', 'm/s', 'nœud', 'rapide', 'kilomètre heure'],
    units: [
      { id: 'kmh', name: 'Kilomètre/heure', symbol: 'km/h', toBase: 1 },
      { id: 'mph', name: 'Mile/heure', symbol: 'mph', toBase: 1.60934 },
      { id: 'ms', name: 'Mètre/seconde', symbol: 'm/s', toBase: 3.6 },
      { id: 'kn', name: 'Nœud', symbol: 'kn', toBase: 1.852 },
      { id: 'fts', name: 'Pied/seconde', symbol: 'ft/s', toBase: 1.09728 },
      { id: 'mach', name: 'Mach', symbol: 'Mach', toBase: 1225.04 },
    ],
  },
  {
    id: 'time',
    name: 'Temps',
    description: 'Secondes, minutes, heures, jours, années...',
    icon: Clock,
    keywords: ['temps', 'durée', 'seconde', 'minute', 'heure', 'jour', 'mois', 'année', 'semaine'],
    units: [
      { id: 'y', name: 'Année', symbol: 'an(s)', toBase: 31536000 },
      { id: 'mo', name: 'Mois', symbol: 'mois', toBase: 2592000 },
      { id: 'w', name: 'Semaine', symbol: 'sem.', toBase: 604800 },
      { id: 'd', name: 'Jour', symbol: 'j', toBase: 86400 },
      { id: 'h', name: 'Heure', symbol: 'h', toBase: 3600 },
      { id: 'm', name: 'Minute', symbol: 'min', toBase: 60 },
      { id: 's', name: 'Seconde', symbol: 's', toBase: 1 },
      { id: 'ms', name: 'Milliseconde', symbol: 'ms', toBase: 0.001 },
    ],
  },
  {
    id: 'storage',
    name: 'Stockage',
    description: 'Ko, Mo, Go, To, Po...',
    icon: HardDrive,
    keywords: ['stockage', 'informatique', 'ko', 'mo', 'go', 'to', 'po', 'octet', 'byte', 'bit'],
    units: [
      { id: 'bit', name: 'Bit', symbol: 'bit', toBase: 0.125 },
      { id: 'b', name: 'Octet', symbol: 'o', toBase: 1 },
      { id: 'kb', name: 'Kilooctet', symbol: 'Ko', toBase: 1024 },
      { id: 'mb', name: 'Mégaoctet', symbol: 'Mo', toBase: 1048576 },
      { id: 'gb', name: 'Gigaoctet', symbol: 'Go', toBase: 1073741824 },
      { id: 'tb', name: 'Téraoctet', symbol: 'To', toBase: 1099511627776 },
      { id: 'pb', name: 'Pétaoctet', symbol: 'Po', toBase: 1125899906842624 },
    ],
  },
  {
    id: 'currency',
    name: 'Monnaies',
    description: 'EUR, USD, GBP, JPY, CHF, CAD...',
    icon: Coins,
    keywords: ['monnaie', 'devise', 'euro', 'dollar', 'livre', 'yen', 'franc', 'change', 'taux'],
    units: [
      { id: 'eur', name: 'Euro', symbol: '€', toBase: 1 },
      { id: 'usd', name: 'Dollar US', symbol: '$', toBase: 1.08 },
      { id: 'gbp', name: 'Livre sterling', symbol: '£', toBase: 0.86 },
      { id: 'jpy', name: 'Yen japonais', symbol: '¥', toBase: 162.5 },
      { id: 'chf', name: 'Franc suisse', symbol: 'CHF', toBase: 0.95 },
      { id: 'cad', name: 'Dollar canadien', symbol: 'CA$', toBase: 1.47 },
      { id: 'aud', name: 'Dollar australien', symbol: 'AU$', toBase: 1.65 },
      { id: 'cny', name: 'Yuan chinois', symbol: '¥', toBase: 7.85 },
      { id: 'inr', name: 'Roupie indienne', symbol: '₹', toBase: 89.5 },
      { id: 'mxn', name: 'Peso mexicain', symbol: 'MX$', toBase: 18.2 },
      { id: 'brl', name: 'Réal brésilien', symbol: 'R$', toBase: 5.35 },
      { id: 'rub', name: 'Rouble russe', symbol: '₽', toBase: 98.5 },
    ],
  },
  {
    id: 'clothing',
    name: 'Taille vêtements',
    description: 'EU, US, UK, IT, tailles universelles...',
    icon: Shirt,
    keywords: ['vêtement', 'taille', 'chemise', 'pantalon', 't-shirt', 'eu', 'us', 'uk', 'it', 's', 'm', 'l', 'xl'],
    units: [
      { id: 'eu', name: 'Europe (FR)', symbol: 'EU', toBase: 1 },
      { id: 'us', name: 'États-Unis', symbol: 'US', toBase: 1 },
      { id: 'uk', name: 'Royaume-Uni', symbol: 'UK', toBase: 1 },
      { id: 'it', name: 'Italie', symbol: 'IT', toBase: 1 },
      { id: 'intl', name: 'International', symbol: 'INT', toBase: 1 },
    ],
  },
  {
    id: 'shoes',
    name: 'Taille chaussures',
    description: 'EU, US, UK, pointures mondiales...',
    icon: Footprints,
    keywords: ['chaussure', 'pointure', 'taille', 'pied', 'eu', 'us', 'uk', 'semelle'],
    units: [
      { id: 'eu', name: 'Europe', symbol: 'EU', toBase: 1 },
      { id: 'us_m', name: 'US Homme', symbol: 'US M', toBase: 1 },
      { id: 'us_w', name: 'US Femme', symbol: 'US W', toBase: 1 },
      { id: 'uk', name: 'Royaume-Uni', symbol: 'UK', toBase: 1 },
      { id: 'jp', name: 'Japon', symbol: 'JP', toBase: 1 },
      { id: 'cm', name: 'Centimètre', symbol: 'cm', toBase: 1 },
    ],
  },
];

export function getConverterById(id: string): ConverterCategory | undefined {
  return converters.find((c) => c.id === id);
}

export function searchConverters(query: string): ConverterCategory[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return converters;

  return converters.filter(
    (converter) =>
      converter.name.toLowerCase().includes(normalizedQuery) ||
      converter.description.toLowerCase().includes(normalizedQuery) ||
      converter.keywords.some((keyword) => keyword.includes(normalizedQuery)) ||
      converter.units.some(
        (unit) =>
          unit.name.toLowerCase().includes(normalizedQuery) ||
          unit.symbol.toLowerCase().includes(normalizedQuery)
      )
  );
}
