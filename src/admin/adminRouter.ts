import { $ } from '../utils/dom';

type RouteHandler = () => void;

class AdminRouter {
  private routes: Map<string, RouteHandler> = new Map();
  private currentPath: string = '';

  constructor() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  addRoute(path: string, handler: RouteHandler) {
    this.routes.set(path, handler);
  }

  navigate(path: string) {
    window.location.hash = path;
  }

  private handleRoute() {
    const hash = window.location.hash || '#/dashboard';
    this.currentPath = hash.replace('#', '');
    
    // Default to dashboard if route not found
    const handler = this.routes.get(this.currentPath) || this.routes.get('/dashboard');
    
    if (handler) {
      handler();
      this.updateActiveLinks();
    }
  }

  private updateActiveLinks() {
    document.querySelectorAll('[data-route]').forEach(link => {
      const route = link.getAttribute('data-route');
      if (route === this.currentPath) {
        link.classList.add('active-route');
      } else {
        link.classList.remove('active-route');
      }
    });
  }

  getCurrentPath() {
    return this.currentPath;
  }
}

export const adminRouter = new AdminRouter();
