import '../css/styles.css';
import { adminRouter } from './adminRouter';
import { $ } from '../utils/dom';
import { initializePrices, SERVICE_PRICES_MAP } from '../utils/priceService';

// Pages
import { renderLoginPage, checkAdminAuth, adminLogout } from './pages/LoginPage';
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

// Initialize prices from Firebase
initializePrices().then(() => {
  console.log('Admin prices loaded from Firebase');
  (window as any).SERVICE_PRICES_MAP = SERVICE_PRICES_MAP;
});

// Check authentication on load
if (appContainer) {
  // Check if already authenticated
  if (!checkAdminAuth()) {
    renderLoginPage(appContainer);
  } else {
    initAdminShell();
  }
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
  
  // Add logout handler
  $('#btn-admin-logout')?.addEventListener('click', () => {
    if (confirm('Deseja sair do sistema?')) {
      adminLogout();
    }
  });

  // Setup Routes helper
  const renderRoute = async (title: string, renderFn: (container: HTMLElement) => void | Promise<void>) => {
    const main = $('#admin-main-content');
    const top = $('#topbar-container');
    if (top) top.innerHTML = renderTopBar(title);
    
    if (main) {
      // Execute cleanup of previous page listeners
      if ((main as any)._cleanup) {
        (main as any)._cleanup();
        (main as any)._cleanup = null;
      }
      
      // Potential loader
      main.innerHTML = '<div class="h-full flex items-center justify-center opacity-50"><span class="animate-pulse font-black uppercase tracking-[0.3em] text-[10px]">Carregando...</span></div>';
      
      await renderFn(main);
    }
  };

  adminRouter.addRoute('/dashboard', () => renderRoute('Dashboard', renderDashboardPage));
  adminRouter.addRoute('/leads', () => renderRoute('Leads / CRM', renderLeadsPage));
  adminRouter.addRoute('/kanban', () => renderRoute('Kanban Board', renderKanbanPage));
  adminRouter.addRoute('/financeiro', () => renderRoute('Financeiro', renderFinanceiroPage));
  adminRouter.addRoute('/analytics', () => renderRoute('Analytics', renderAnalyticsPage));
  adminRouter.addRoute('/mensagens', () => renderRoute('Mensagens', renderMensagensPage));
  adminRouter.addRoute('/agenda', () => renderRoute('Agenda', renderAgendaPage));
  adminRouter.addRoute('/configuracoes', () => renderRoute('Configurações', renderConfigPage));
  adminRouter.addRoute('/login', () => renderLoginPage(appContainer!));

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