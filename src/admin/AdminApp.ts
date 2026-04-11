import '../css/styles.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { adminRouter } from './adminRouter';
import { $ } from '../utils/dom';

// Pages
import { renderLoginPage } from './pages/LoginPage';
import { renderDashboardPage } from './pages/DashboardPage';

// Components
import { renderSidebar, attachSidebarEvents } from './components/Sidebar';
import { renderTopBar } from './components/TopBar';
import { renderLeadsPage } from './pages/LeadsPage';
import { renderKanbanPage } from './pages/KanbanPage';
import { renderFinanceiroPage } from './pages/FinanceiroPage';
import { renderAnalyticsPage } from './pages/AnalyticsPage';
import { renderMensagensPage } from './pages/MensagensPage';
import { renderAgendaPage } from './pages/AgendaPage';
import { renderConfigPage } from './pages/ConfigPage';
import { openLeadModal } from './components/LeadModal';

const appContainer = $('#admin-app');

if (appContainer) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // 1. RBAC Verification
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        if (userData && userData.role === 'admin') {
          console.log('Admin Authenticated (RBAC):', user.email);
          initAdminShell();
        } else {
          console.warn('Unauthorized attempt:', user.email);
          auth.signOut();
          renderLoginPage(appContainer);
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
        renderLoginPage(appContainer);
      }
    } else {
      renderLoginPage(appContainer);
    }
  });
}

function initAdminShell() {
  if (!appContainer) return;

  // Render the persistent layout structure
  appContainer.innerHTML = `
    <div class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <!-- Sidebar placeholder -->
      <div id="sidebar-container"></div>
      
      <!-- Main Content Area -->
      <div class="flex-grow flex flex-col min-w-0 relative">
        <!-- TopBar placeholder -->
        <div id="topbar-container"></div>
        
        <!-- Page Content placeholder -->
        <main id="admin-main-content" class="flex-grow overflow-y-auto bg-slate-50/50 scroll-smooth">
          <!-- Dynamic pages injected here -->
        </main>
      </div>
    </div>
  `;

  // Render Sidebar
  const sidebarContainer = $('#sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = renderSidebar();
    attachSidebarEvents();
  }

  // Setup Routes
  adminRouter.addRoute('/dashboard', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Dashboard Estratégico');
    if (main) renderDashboardPage(main);
  });

  adminRouter.addRoute('/leads', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Gestão de Leads (CRM)');
    if (main) renderLeadsPage(main);
  });

  adminRouter.addRoute('/kanban', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Pipeline Kanban');
    if (main) renderKanbanPage(main);
  });

  adminRouter.addRoute('/financeiro', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Gestão Financeira');
    if (main) renderFinanceiroPage(main);
  });

  adminRouter.addRoute('/analytics', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Analytics & BI');
    if (main) renderAnalyticsPage(main);
  });

  adminRouter.addRoute('/mensagens', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Templates de Mensagens');
    if (main) renderMensagensPage(main);
  });

  adminRouter.addRoute('/agenda', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Agenda de Assessoria');
    if (main) renderAgendaPage(main);
  });

  adminRouter.addRoute('/configuracoes', () => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar('Configurações');
    if (main) renderConfigPage(main);
  });

  // Initial redirect if just logging in
  if (window.location.hash === '' || window.location.hash === '#/') {
    window.location.hash = '#/dashboard';
  }

  // Global event listener for lead details modal (handles dynamic content)
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-open-lead]');
    if (target) {
      const id = target.getAttribute('data-open-lead');
      if (id) openLeadModal(id);
    }
  });
}
