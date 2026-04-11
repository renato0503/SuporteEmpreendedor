import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  Timestamp,
  where,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Lead, LeadStatus } from '../types/admin.types';

export const leadService = {
  // Real-time synchronization of all leads
  subscribeToLeads(callback: (leads: Lead[]) => void) {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const leads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Lead));
      callback(leads);
    }, (error) => {
      console.error('Error fetching real-time leads:', error);
    });
  },

  // Update lead status with visual feedback support
  async updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
    const leadRef = doc(db, 'leads', id);
    try {
      await updateDoc(leadRef, { 
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error(`Error updating status for lead ${id}:`, error);
      throw error;
    }
  },

  // Delete lead
  async deleteLead(id: string): Promise<void> {
    const leadRef = doc(db, 'leads', id);
    try {
      await deleteDoc(leadRef);
    } catch (error) {
      console.error(`Error deleting lead ${id}:`, error);
      throw error;
    }
  },

  // Fetch KPI data (Real-time calculations)
  async getDashboardKPIs() {
    // This could also be done via subscriptions for live updates
    const leadsRef = collection(db, 'leads');
    const snapshot = await getDocs(leadsRef);
    const data = snapshot.docs.map(d => d.data());
    
    const total = data.length;
    const novos = data.filter(l => l.status === 'novo').length;
    const atendimento = data.filter(l => l.status === 'em_atendimento' || l.status === 'primeiro_contato').length;
    const aguardando = data.filter(l => l.status === 'aguardando_pagamento').length;
    const concluido = data.filter(l => l.status === 'concluido').length;
    
    const valorPendente = data
      .filter(l => l.status === 'aguardando_pagamento')
      .reduce((acc, curr) => acc + (curr.valor || 0), 0);

    return {
      totalLeads: total,
      novosHoje: novos,
      emAtendimento: atendimento,
      aguardandoPagto: aguardando,
      valorPendente,
      concluidosMes: concluido,
      taxaConversao: total > 0 ? Math.round((concluido / total) * 100) : 0
    };
  }
};
