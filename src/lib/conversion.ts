import type { Unit, ConverterCategory } from '../types';

export function convertLength(value: number, from: Unit, to: Unit): number {
  const inMeters = value * from.toBase;
  return inMeters / to.toBase;
}

export function convertWeight(value: number, from: Unit, to: Unit): number {
  const inKg = value * from.toBase;
  return inKg / to.toBase;
}

export function convertTemperature(value: number, from: Unit, to: Unit): number {
  let celsius: number;

  // Convert to Celsius first
  switch (from.id) {
    case 'c':
      celsius = value;
      break;
    case 'f':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'k':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to.id) {
    case 'c':
      return celsius;
    case 'f':
      return celsius * (9 / 5) + 32;
    case 'k':
      return celsius + 273.15;
    default:
      return celsius;
  }
}

export function convertVolume(value: number, from: Unit, to: Unit): number {
  const inLiters = value * from.toBase;
  return inLiters / to.toBase;
}

export function convertSpeed(value: number, from: Unit, to: Unit): number {
  const inKmh = value * from.toBase;
  return inKmh / to.toBase;
}

export function convertTime(value: number, from: Unit, to: Unit): number {
  const inSeconds = value * from.toBase;
  return inSeconds / to.toBase;
}

export function convertStorage(value: number, from: Unit, to: Unit): number {
  const inBytes = value * from.toBase;
  return inBytes / to.toBase;
}

export function convertCurrency(value: number, from: Unit, to: Unit): number {
  const inEur = value / from.toBase;
  return inEur * to.toBase;
}

export function convertClothing(value: number, from: Unit, to: Unit): string | number {
  // Clothing size conversion tables
  const euToUs: Record<number, number> = {
    34: 0, 36: 2, 38: 4, 40: 6, 42: 8, 44: 10, 46: 12, 48: 14, 50: 16, 52: 18, 54: 20,
  };
  const euToUk: Record<number, number> = {
    34: 4, 36: 6, 38: 8, 40: 10, 42: 12, 44: 14, 46: 16, 48: 18, 50: 20, 52: 22, 54: 24,
  };
  const euToIt: Record<number, number> = {
    34: 38, 36: 40, 38: 42, 40: 44, 42: 46, 44: 48, 46: 50, 48: 52, 50: 54, 52: 56, 54: 58,
  };
  const euToIntl: Record<number, string> = {
    34: 'XXS', 36: 'XS', 38: 'S', 40: 'M', 42: 'L', 44: 'XL', 46: 'XXL', 48: '3XL', 50: '4XL', 52: '5XL',
  };

  const euSize = from.id === 'eu' ? value : getEuFromSize(value, from.id);
  if (euSize === null) return value;

  switch (to.id) {
    case 'eu':
      return euSize;
    case 'us':
      return euToUs[euSize] ?? value;
    case 'uk':
      return euToUk[euSize] ?? value;
    case 'it':
      return euToIt[euSize] ?? value;
    case 'intl':
      return euToIntl[euSize] ?? 'N/A';
    default:
      return value;
  }

  function getEuFromSize(val: number | string, fromId: string): number | null {
    if (typeof val === 'string') {
      for (const [eu, intl] of Object.entries(euToIntl)) {
        if (fromId === 'intl' && intl === val) return parseInt(eu);
      }
      return null;
    }
    for (const [eu, us] of Object.entries(euToUs)) {
      if (fromId === 'us' && us === val) return parseInt(eu);
    }
    for (const [eu, uk] of Object.entries(euToUk)) {
      if (fromId === 'uk' && uk === val) return parseInt(eu);
    }
    for (const [eu, it] of Object.entries(euToIt)) {
      if (fromId === 'it' && it === val) return parseInt(eu);
    }
    return val;
  }
}

export function convertShoes(value: number, from: Unit, to: Unit): number {
  // Shoe size conversion
  if (from.id === to.id) return value;

  // First convert to EU size
  let euSize = value;
  if (from.id === 'us_m') {
    euSize = value + 33;
  } else if (from.id === 'us_w') {
    euSize = value + 32.5;
  } else if (from.id === 'uk') {
    euSize = value + 34;
  } else if (from.id === 'jp') {
    euSize = (value - 1) * 0.6667 + 21;
  } else if (from.id === 'cm') {
    euSize = value * 1.5;
  }

  // Then convert from EU to target
  switch (to.id) {
    case 'eu':
      return euSize;
    case 'us_m':
      return euSize - 33;
    case 'us_w':
      return euSize - 32.5;
    case 'uk':
      return euSize - 34;
    case 'jp':
      return (euSize - 21) / 0.6667 + 1;
    case 'cm':
      return euSize / 1.5;
    default:
      return value;
  }
}

export function convert(
  value: number,
  from: Unit,
  to: Unit,
  category: ConverterCategory
): string | number {
  switch (category.id) {
    case 'length':
      return convertLength(value, from, to);
    case 'weight':
      return convertWeight(value, from, to);
    case 'temperature':
      return convertTemperature(value, from, to);
    case 'volume':
      return convertVolume(value, from, to);
    case 'speed':
      return convertSpeed(value, from, to);
    case 'time':
      return convertTime(value, from, to);
    case 'storage':
      return convertStorage(value, from, to);
    case 'currency':
      return convertCurrency(value, from, to);
    case 'clothing':
      return convertClothing(value, from, to);
    case 'shoes':
      return convertShoes(value, from, to);
    default:
      return value;
  }
}

export function formatNumber(num: number | string, decimals = 6): string {
  if (typeof num === 'string') return num;
  const absNum = Math.abs(num);
  if (absNum === 0) return '0';
  if (absNum >= 1e12) return num.toExponential(4);
  if (absNum >= 1e9) return (num / 1e9).toFixed(4) + ' Md';
  if (absNum >= 1e6) return (num / 1e6).toFixed(4) + ' M';
  if (absNum >= 1000) return num.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
  if (absNum >= 1) return num.toFixed(decimals > 2 ? 2 : decimals);
  if (absNum >= 0.01) return num.toFixed(4);
  if (absNum >= 0.0001) return num.toFixed(6);
  return num.toExponential(4);
}
