import './css/styles.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { renderAdminLogin } from './components/AdminLogin';
import { renderAdminDashboard } from './components/AdminDashboard';
import { $ } from './utils/dom';

import { getDoc, doc } from 'firebase/firestore';

const appContainer = $('#admin-app');

if (appContainer) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Fetch user data from Firestore to check role
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        if (userData && userData.role === 'admin') {
          console.log('Admin Authenticated (RBAC):', user.email);
          renderAdminDashboard(appContainer);
        } else {
          console.warn('Unauthorized access attempt (RBAC):', user.email);
          auth.signOut().then(() => {
            alert('Acesso Negado: Sua conta não possui permissões de administrador.');
            renderAdminLogin(appContainer);
          });
        }
      } catch (error) {
        console.error('Error verifying RBAC:', error);
        auth.signOut();
        renderAdminLogin(appContainer);
      }
    } else {
      renderAdminLogin(appContainer);
    }
  });
}
