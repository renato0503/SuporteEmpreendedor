import './css/styles.css';
import { analytics } from './firebase';

// Script principal de suporte
console.log('Suporte Empreendedor: Landing Page Ativa');

// Analytics inicializado via firebase.ts
if (analytics) {
  console.log('Firebase Analytics: Conectado');
}