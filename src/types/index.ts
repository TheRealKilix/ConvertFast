import type { LucideIcon } from 'lucide-react';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  toBase: number;
}

export interface ConverterCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  units: Unit[];
  keywords: string[];
}

export interface ConversionResult {
  fromValue: number;
  fromUnit: Unit;
  toValue: number | string;
  toUnit: Unit;
  timestamp: number;
  categoryId: string;
}

export interface HistoryItem extends ConversionResult {
  id: string;
}

export interface UserPreferences {
  lastUsedConverters: string[];
  favoriteCategories: string[];
  history: HistoryItem[];
}

export type ConverterId =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'volume'
  | 'speed'
  | 'time'
  | 'storage'
  | 'currency'
  | 'clothing'
  | 'shoes';
