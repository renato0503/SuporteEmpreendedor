import './css/styles.css';
import { analytics, db } from './firebase';
import { getDoc, doc } from 'firebase/firestore';

// Script principal de suporte
console.log('Suporte Empreendedor: Landing Page Ativa');

if (analytics) {
  console.log('Firebase Analytics: Conectado');
}

// Função para atualizar os preços nos elementos DOM
function updateAllPrices(prices: any) {
  console.log('Updating all prices on page:', prices);
  
  // Elementos com data-service-price
  document.querySelectorAll('[data-service-price]').forEach(el => {
    const serviceId = el.getAttribute('data-service-price');
    if (!serviceId || !prices) return;
    
    // Mapeamento de IDs para chaves de preços
    const keyMap: Record<string, string> = {
      'abertura-mei': 'feeAbertura',
      'declaracao-anual-dasn': 'feeDasn',
      'dasan': 'feeDasn', 
      'parcelamento-debitos-mei': 'feeParcelamento',
      'parcelamento': 'feeParcelamento',
      'alteracao-cadastral-mei': 'feeAlteracao',
      'baixa-mei-encerramento': 'feeBaixa',
      'consulta-situacao-cadastral': 'feeConsulta'
    };
    
    const priceKey = keyMap[serviceId];
    if (priceKey && prices[priceKey]) {
      const formatted = parseFloat(prices[priceKey]).toFixed(2).replace('.', ',');
      el.textContent = formatted;
    }
  });
}

// Carregar preços do Firebase
async function loadPrices() {
  if (!db) {
    console.log('Firebase não disponível');
    return;
  }
  
  try {
    const docSnap = await getDoc(doc(db, 'settings', 'global'));
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Preços carregados do Firebase:', data);
      
      const prices = {
        feeAbertura: parseFloat(data.feeAbertura?.replace(',', '.') || 97),
        feeDasn: parseFloat(data.feeDasn?.replace(',', '.') || 67),
        feeParcelamento: parseFloat(data.feeParcelamento?.replace(',', '.') || 127),
        feeAlteracao: parseFloat(data.feeAlteracao?.replace(',', '.') || 67),
        feeBaixa: parseFloat(data.feeBaixa?.replace(',', '.') || 97),
        feeConsulta: parseFloat(data.feeConsulta?.replace(',', '.') || 47),
      };
      
      console.log('Parsed prices:', prices);
      
      // Atualizar preços imediatamente
      setTimeout(() => updateAllPrices(prices), 500);
      
      // Observar o DOM para mudanças
      const observer = new MutationObserver(() => {
        updateAllPrices(prices);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      console.log('Nenhum documento de configurações encontrado');
    }
  } catch (e) {
    console.error('Erro ao carregar preços:', e);
  }
}

// Iniciar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded, loading prices...');
  loadPrices();
});

// Também tentar após um delay maior (para garantir que o DOM esteja pronto)
setTimeout(loadPrices, 1500);