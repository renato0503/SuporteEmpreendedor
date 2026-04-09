import type { RouterRoute } from '../types';

type RouteHandler = (params: Record<string, string>) => void;

class Router {
  private routes: Map<string, RouterRoute> = new Map();
  private currentRoute: string = '';
  private notFoundHandler: RouteHandler | null = null;
  private beforeEachHandler: ((to: string) => boolean | void) | null = null;
  private afterEachHandler: ((to: string) => void) | null = null;
  private isNavigating: boolean = false;

  constructor() {
    this.bindEvents();
  }

  private bindEvents(): void {
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  private handleLoad(): void {
    const hash = this.getHash();
    this.navigate(hash || '#/', false);
  }

  private handleHashChange(): void {
    if (this.isNavigating) {
      this.isNavigating = false;
      return;
    }
    const hash = this.getHash();
    this.navigate(hash, false);
  }

  private getHash(): string {
    const hash = window.location.hash;
    return hash.startsWith('#') ? hash : `#${hash || '/'}`;
  }

  addRoute(path: string, title: string, render: RouteHandler, meta?: RouterRoute['meta']): void {
    const routePath = path.startsWith('/') ? path : `/${path}`;
    this.routes.set(routePath, { path: routePath, title, render, meta });
  }

  removeRoute(path: string): void {
    this.routes.delete(path);
  }

  navigate(path: string, shouldScroll: boolean = true): void {
    if (this.beforeEachHandler) {
      const shouldContinue = this.beforeEachHandler(path);
      if (shouldContinue === false) return;
    }

    this.isNavigating = true;
    const fullPath = path.startsWith('#') ? path : `#${path}`;
    window.location.hash = fullPath;

    if (shouldScroll) {
      this.scrollToTop();
    }

    if (this.afterEachHandler) {
      this.afterEachHandler(path);
    }
  }

  replace(path: string): void {
    const fullPath = path.startsWith('#') ? path : `#${path}`;
    this.isNavigating = true;
    window.location.replace(fullPath);
  }

  getCurrentPath(): string {
    return window.location.hash.replace('#', '') || '/';
  }

  getCurrentRoute(): RouterRoute | undefined {
    const path = this.getCurrentPath();
    return this.matchRoute(path);
  }

  private matchRoute(path: string): RouterRoute | undefined {
    const cleanPath = path.replace(/^#/, '').replace(/^\//, '') || 'index';
    
    for (const [routePath, route] of this.routes) {
      const routeClean = routePath.replace(/^\//, '');
      
      if (routeClean === cleanPath) {
        return route;
      }

      const paramNames: string[] = [];
      const regexPattern = routeClean.replace(/:([^/]+)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      });

      const match = cleanPath.match(new RegExp(`^${regexPattern}$`));
      if (match) {
        const params: Record<string, string> = {};
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        return { ...route, params } as RouterRoute;
      }
    }

    return undefined;
  }

  private async resolveRoute(path: string): Promise<{ route: RouterRoute | undefined; params: Record<string, string> }> {
    const cleanPath = path.replace(/^#/, '').replace(/^\//, '') || 'index';

    for (const [routePath, route] of this.routes) {
      const routeClean = routePath.replace(/^\//, '');
      
      if (routeClean === cleanPath) {
        return { route, params: {} };
      }

      if (routePath.includes(':')) {
        const paramNames: string[] = [];
        const regexPattern = routePath.replace(/:([^/]+)/g, (_, name) => {
          paramNames.push(name);
          return '([^/]+)';
        });

        const match = cleanPath.match(new RegExp(`^${regexPattern}$`));
        if (match) {
          const params: Record<string, string> = {};
          paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
          });
          return { route, params };
        }
      }
    }

    return { route: undefined, params: {} };
  }

  async handleRoute(): Promise<void> {
    const path = this.getCurrentPath();
    const { route, params } = await this.resolveRoute(path);

    if (route) {
      this.currentRoute = route.path;
      this.updateTitle(route.title);
      
      if (route.meta?.description) {
        this.updateMeta('description', route.meta.description);
      }
      
      this.renderPage(route, params);
    } else {
      this.handleNotFound();
    }
  }

  private async renderPage(route: RouterRoute, params: Record<string, string>): Promise<void> {
    const app = document.getElementById('app');
    if (!app) return;

    const main = app.querySelector('main');
    if (!main) return;

    const currentPage = main.querySelector('.page.active');
    const nextPageId = this.getPageIdFromRoute(route.path);
    const nextPage = document.getElementById(nextPageId);

    if (nextPage && currentPage && currentPage.id !== nextPageId) {
      currentPage.classList.remove('active');
      nextPage.classList.add('active');
    }

    try {
      route.render(params);
    } catch (error) {
      console.error('Error rendering route:', error);
    }
  }

  private getPageIdFromRoute(path: string): string {
    const pathMap: Record<string, string> = {
      '/': 'page-home',
      '/index': 'page-home',
      '/servicos': 'page-servicos',
      '/servico': 'page-service',
      '/sobre': 'page-sobre',
      '/contato': 'page-contato',
      '/confirmacao': 'page-confirmation',
      '/404': 'page-404',
    };
    return pathMap[path] || 'page-home';
  }

  private handleNotFound(): void {
    this.updateTitle('Página não encontrada');
    this.updateMeta('description', 'Página não encontrada');
    
    if (this.notFoundHandler) {
      const params: Record<string, string> = {};
      this.notFoundHandler(params);
    } else {
      const app = document.getElementById('app');
      if (app) {
        app.innerHTML = `
          <div class="page active" id="page-404">
            <div class="min-h-screen flex items-center justify-center">
              <div class="text-center p-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p class="text-gray-600 mb-6">Página não encontrada</p>
                <a href="#/" class="text-primary-600 hover:text-primary-700 font-medium">
                  Voltar para a página inicial
                </a>
              </div>
            </div>
          </div>
        `;
      }
    }
  }

  private updateTitle(title: string): void {
    document.title = `${title} | Suporte Empreendedor`;
  }

  private updateMeta(name: string, content: string): void {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  beforeEach(handler: (to: string) => boolean | void): void {
    this.beforeEachHandler = handler;
  }

  afterEach(handler: (to: string) => void): void {
    this.afterEachHandler = handler;
  }

  onNotFound(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  getRoutes(): Map<string, RouterRoute> {
    return this.routes;
  }

  getRouteCount(): number {
    return this.routes.size;
  }
}

export const router = new Router();

export function createRouter(): Router {
  return new Router();
}

export default router;