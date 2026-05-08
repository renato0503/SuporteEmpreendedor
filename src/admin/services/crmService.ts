import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Task, MessageTemplate, SystemSettings } from '../types/admin.types';

export const crmService = {
  // --- Tasks (Agenda) ---
  subscribeToTasks(callback: (tasks: Task[]) => void) {
    const q = query(collection(db, 'tasks'), orderBy('date', 'asc'), orderBy('time', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));
      callback(tasks);
    });
  },

  async addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, 'tasks'), {
      ...task,
      createdAt: Timestamp.now()
    });
  },

  async deleteTask(id: string) {
    await deleteDoc(doc(db, 'tasks', id));
  },

  async updateTask(id: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>) {
    await updateDoc(doc(db, 'tasks', id), {
      ...data,
      updatedAt: Timestamp.now()
    });
  },

  async toggleTaskStatus(id: string, currentStatus: 'pendente' | 'concluido') {
    const newStatus = currentStatus === 'pendente' ? 'concluido' : 'pendente';
    await updateDoc(doc(db, 'tasks', id), {
      status: newStatus,
      updatedAt: Timestamp.now()
    });
    return newStatus;
  },

  // --- Templates ---
  subscribeToTemplates(callback: (templates: MessageTemplate[]) => void) {
    const q = query(collection(db, 'templates'), orderBy('title', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const templates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MessageTemplate));
      callback(templates);
    });
  },

  async saveTemplate(template: Omit<MessageTemplate, 'id'>, id?: string) {
    if (id) {
       await updateDoc(doc(db, 'templates', id), { ...template });
    } else {
       await addDoc(collection(db, 'templates'), {
         ...template,
         usageCount: 0,
         createdAt: Timestamp.now()
       });
    }
  },

  async deleteTemplate(id: string) {
    await deleteDoc(doc(db, 'templates', id));
  },

  // --- Settings ---
  async getSettings(): Promise<SystemSettings | null> {
    const docRef = doc(db, 'settings', 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SystemSettings;
    }
    return null;
  },

  async saveSettings(settings: SystemSettings) {
    await setDoc(doc(db, 'settings', 'global'), {
      ...settings,
      updatedAt: Timestamp.now()
    });
  }
};
