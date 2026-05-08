import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface DynamicPrices {
  feeAbertura: number;
  feeDasn: number;
  feeParcelamento: number;
  feeAlteracao: number;
  feeBaixa: number;
  feeConsulta: number;
}

const defaultPrices: DynamicPrices = {
  feeAbertura: 97,
  feeDasn: 67,
  feeParcelamento: 127,
  feeAlteracao: 67,
  feeBaixa: 97,
  feeConsulta: 47,
};

let cachedPrices: DynamicPrices | null = null;

export async function loadServicePrices(): Promise<DynamicPrices> {
  if (cachedPrices) {
    console.log('Using cached prices:', cachedPrices);
    return cachedPrices;
  }
  
  console.log('Loading prices from Firebase...');
  
  try {
    // Check if db is initialized
    if (!db) {
      console.log('Firestore not initialized');
      return defaultPrices;
    }
    
    const settingsDoc = await getDoc(doc(db, 'settings', 'global'));
    if (settingsDoc.exists()) {
      const data = settingsDoc.data();
      console.log('Settings found in Firebase:', data);
      
      cachedPrices = {
        feeAbertura: parseFloat(String(data.feeAbertura || '97').replace(',', '.')),
        feeDasn: parseFloat(String(data.feeDasn || '67').replace(',', '.')),
        feeParcelamento: parseFloat(String(data.feeParcelamento || '127').replace(',', '.')),
        feeAlteracao: parseFloat(String(data.feeAlteracao || '67').replace(',', '.')),
        feeBaixa: parseFloat(String(data.feeBaixa || '97').replace(',', '.')),
        feeConsulta: parseFloat(String(data.feeConsulta || '47').replace(',', '.')),
      };
      console.log('Prices loaded from Firebase:', cachedPrices);
      return cachedPrices;
    } else {
      console.log('No settings document found in Firebase, using defaults');
    }
  } catch (error) {
    console.error('Error loading prices from Firebase:', error);
  }
  
  console.log('Using default prices');
  return defaultPrices;
}

export function getServicePrice(serviceId: keyof DynamicPrices): number {
  const prices = cachedPrices || defaultPrices;
  return prices[serviceId] || defaultPrices[serviceId];
}

export function getServicePriceFormatted(serviceId: keyof DynamicPrices): string {
  const price = getServicePrice(serviceId);
  return price.toFixed(2).replace('.', ',');
}

export const SERVICE_PRICES_MAP: Record<string, number> = {
  'abertura-mei': 97,
  'dasan': 67,
  'parcelamento': 127,
  'alteracao-cadastral': 67,
  'baixa-mei': 97,
  'consulta-situacao': 47,
};

export async function initializePrices(): Promise<DynamicPrices> {
  const prices = await loadServicePrices();
  
  SERVICE_PRICES_MAP['abertura-mei'] = prices.feeAbertura;
  SERVICE_PRICES_MAP['dasan'] = prices.feeDasn;
  SERVICE_PRICES_MAP['parcelamento'] = prices.feeParcelamento;
  SERVICE_PRICES_MAP['alteracao-cadastral'] = prices.feeAlteracao;
  SERVICE_PRICES_MAP['baixa-mei'] = prices.feeBaixa;
  SERVICE_PRICES_MAP['consulta-situacao'] = prices.feeConsulta;
  
  // Also expose globally for easy access
  (window as any).__SERVICE_PRICES__ = prices;
  
  return prices;
}

// Função global para obter preço por chave
(window as any).getPrice = (key: string): number => {
  const prices = (window as any).__SERVICE_PRICES__ || defaultPrices;
  const keyMap: Record<string, keyof DynamicPrices> = {
    'abertura-mei': 'feeAbertura',
    'dasan': 'feeDasn',
    'parcelamento': 'feeParcelamento',
    'alteracao-cadastral': 'feeAlteracao',
    'baixa-mei': 'feeBaixa',
    'consulta-situacao': 'feeConsulta',
  };
  const mappedKey = keyMap[key];
  return mappedKey ? prices[mappedKey] : 97;
};