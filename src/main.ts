import './css/styles.css';
import { router } from './router';
import { renderHeader } from './components/Header';
import { renderFooter } from './components/Footer';
import { renderHomePage } from './pages/HomePage';
import { renderServicePage } from './pages/ServicePage';
import { renderNotFoundPage } from './pages/NotFoundPage';
import { trackPageView } from './utils/analytics';

function initApp(): void {
  const app = document.getElementById('app');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  if (header) {
    renderHeader(header, { showMenuButton: true, showCTA: true });
  }

  if (app) {
    router.addRoute('/', 'Início', () => {
      renderHomePage(app);
      trackPageView('/', 'Início');
    });

    router.addRoute('/abertura', 'Abertura de MEI', () => {
      renderServicePage(app, 'abertura');
      trackPageView('/abertura', 'Abertura de MEI');
    });

    router.addRoute('/declaracao', 'Declaração Anual', () => {
      renderServicePage(app, 'declaracao');
      trackPageView('/declaracao', 'Declaração Anual');
    });

    router.addRoute('/parcelamento', 'Parcelamento de Débitos', () => {
      renderServicePage(app, 'parcelamento');
      trackPageView('/parcelamento', 'Parcelamento de Débitos');
    });

    router.addRoute('/alteracao', 'Alteração Cadastral', () => {
      renderServicePage(app, 'alteracao');
      trackPageView('/alteracao', 'Alteração Cadastral');
    });

    router.addRoute('/baixa', 'Baixa do MEI', () => {
      renderServicePage(app, 'baixa');
      trackPageView('/baixa', 'Baixa do MEI');
    });

    router.addRoute('/consulta', 'Consulta de Situação', () => {
      renderServicePage(app, 'consulta');
      trackPageView('/consulta', 'Consulta de Situação');
    });

    router.addRoute('/servicos', 'Serviços', () => {
      renderHomePage(app);
      trackPageView('/servicos', 'Serviços');
    });

    router.addRoute('/sobre', 'Sobre', () => {
      renderHomePage(app);
      trackPageView('/sobre', 'Sobre');
    });

    router.addRoute('/contato', 'Contato', () => {
      renderHomePage(app);
      trackPageView('/contato', 'Contato');
    });

    router.addRoute('/404', 'Página não encontrada', () => {
      renderNotFoundPage(app);
      trackPageView('/404', 'Página não encontrada');
    });

    router.onNotFound(() => {
      renderNotFoundPage(app);
    });

    router.handleRoute();
  }

  if (footer) {
    renderFooter(footer, { showCTA: true, showLinks: true });
  }
}

document.addEventListener('DOMContentLoaded', initApp);

export {};