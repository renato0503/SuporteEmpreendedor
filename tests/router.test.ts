import { describe, it, expect, beforeEach, vi } from 'vitest';
import { router, createRouter } from '../src/router';

describe('Router', () => {
  beforeEach(() => {
    window.location.hash = '';
    router['routes'].clear();
    router['currentRoute'] = '';
  });

  it('should add a route', () => {
    const mockRender = vi.fn();
    router.addRoute('/test', 'Test Page', mockRender);
    
    expect(router.getRouteCount()).toBe(1);
  });

  it('should navigate to a route', () => {
    const mockRender = vi.fn();
    router.addRoute('/home', 'Home', mockRender);
    
    router.navigate('/home');
    
    expect(window.location.hash).toBe('#/home');
  });

  it('should get current path', () => {
    window.location.hash = '#/test';
    
    const path = router.getCurrentPath();
    
    expect(path).toBe('/test');
  });

  it('should return undefined for non-existent route', () => {
    window.location.hash = '#/nonexistent';
    
    const route = router.getCurrentRoute();
    
    expect(route).toBeUndefined();
  });

  it('should call beforeEach handler', () => {
    const beforeEachFn = vi.fn(() => true);
    router.beforeEach(beforeEachFn);
    
    const mockRender = vi.fn();
    router.addRoute('/test', 'Test', mockRender);
    
    router.navigate('/test');
    
    expect(beforeEachFn).toHaveBeenCalledWith('/test');
  });

  it('should call afterEach handler', () => {
    const afterEachFn = vi.fn();
    router.afterEach(afterEachFn);
    
    const mockRender = vi.fn();
    router.addRoute('/test', 'Test', mockRender);
    
    router.navigate('/test');
    
    expect(afterEachFn).toHaveBeenCalledWith('/test');
  });

  it('should get all routes', () => {
    router.addRoute('/home', 'Home', vi.fn());
    router.addRoute('/about', 'About', vi.fn());
    
    const routes = router.getRoutes();
    
    expect(routes.size).toBe(2);
  });

  it('should register not found handler', () => {
    const notFoundFn = vi.fn();
    router.onNotFound(notFoundFn);
    
    window.location.hash = '#/nonexistent';
    router.handleRoute();
    
    expect(notFoundFn).toHaveBeenCalled();
  });
});

describe('createRouter', () => {
  it('should create a new router instance', () => {
    const newRouter = createRouter();
    
    expect(newRouter).toBeDefined();
    expect(newRouter.getRouteCount()).toBe(0);
  });

  it('should have independent routes from default router', () => {
    const newRouter = createRouter();
    
    router.addRoute('/test', 'Test', vi.fn());
    newRouter.addRoute('/other', 'Other', vi.fn());
    
    expect(router.getRouteCount()).toBe(1);
    expect(newRouter.getRouteCount()).toBe(1);
  });
});