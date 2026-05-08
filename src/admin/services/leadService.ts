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

  // Update lead info
  async updateLead(id: string, data: Partial<Lead>): Promise<void> {
    const leadRef = doc(db, 'leads', id);
    try {
      // Filter out undefined values
      const cleanData: Record<string, any> = {};
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          cleanData[key] = value;
        }
      });
      
      if (Object.keys(cleanData).length === 0) return;
      
      await updateDoc(leadRef, { 
        ...cleanData,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      throw error;
    }
  },

  // Create lead manually
  async createLead(data: Partial<Lead>): Promise<string> {
    try {
      const leadsRef = collection(db, 'leads');
      const docRef = await addDoc(leadsRef, {
        ...data,
        status: data.status || 'novo',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        origem: data.origem || 'Painel Admin'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  // Get dynamic activities based on leads
  async getActivities(limitCount: number = 5): Promise<ActivityItem[]> {
    try {
      const leadsRef = collection(db, 'leads');
      const q = query(leadsRef, orderBy('updatedAt', 'desc'), limit(limitCount));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => {
        const lead = doc.data() as Lead;
        let text = `O lead ${lead.nome} foi atualizado.`;
        let type: any = 'alerta';

        if (lead.status === 'novo') {
          text = `Novo Lead recebido: ${lead.nome}`;
          type = 'novo_lead';
        } else if (lead.status === 'aguardando_pagamento') {
          text = `Lead ${lead.nome} aguardando pagamento.`;
          type = 'pagamento';
        } else if (lead.status === 'concluido') {
          text = `Serviço concluído para ${lead.nome}`;
          type = 'concluido';
        }

        return {
          id: doc.id,
          type,
          text,
          timestamp: lead.updatedAt || lead.createdAt,
          leadId: doc.id
        };
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
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
    const atendimento = data.filter(l => l.status === 'em_atendimento' || l.status === 'primeiro_contato' || l.status === 'em_negociacao').length;
    const aguardando = data.filter(l => l.status === 'aguardando_pagamento').length;
    const concluido = data.filter(l => l.status === 'concluido').length;
    
    const faturamentoConfirmado = data
      .filter(l => l.status === 'concluido')
      .reduce((acc, curr) => acc + (curr.valor || 0), 0);

    const valorPendente = data
      .filter(l => l.status === 'aguardando_pagamento' || l.status === 'em_negociacao')
      .reduce((acc, curr) => acc + (curr.valor || 0), 0);

    const ticketMedio = concluido > 0 ? faturamentoConfirmado / concluido : 0;

    return {
      totalLeads: total,
      novosHoje: novos,
      emAtendimento: atendimento,
      aguardandoPagto: aguardando,
      faturamentoConfirmado,
      valorPendente,
      concluidosMes: concluido,
      ticketMedio,
      taxaConversao: total > 0 ? Math.round((concluido / total) * 100) : 0,
      statsPorServico: {
        abertura: data.filter(l => l.servico === 'Abertura de MEI').length,
        dasn: data.filter(l => l.servico === 'DASN').length,
        outros: data.filter(l => l.servico !== 'Abertura de MEI' && l.servico !== 'DASN').length
      }
    };
  }
};
