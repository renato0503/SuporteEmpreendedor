export function $(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

export function $$(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  children?: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key.startsWith('data-')) {
        element.setAttribute(key, value);
      } else {
        element.setAttribute(key, value);
      }
    });
  }

  if (children) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
  }

  return element;
}

export function setHTML(container: string | HTMLElement, html: string): void {
  const el = typeof container === 'string' ? $(container) : container;
  if (el) {
    el.innerHTML = html;
  }
}

export function setText(container: string | HTMLElement, text: string): void {
  const el = typeof container === 'string' ? $(container) : container;
  if (el) {
    el.textContent = text;
  }
}

export function addClass(element: string | HTMLElement, className: string): void {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.add(className);
  }
}

export function removeClass(element: string | HTMLElement, className: string): void {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.remove(className);
  }
}

export function toggleClass(element: string | HTMLElement, className: string): void {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.toggle(className);
  }
}

export function hasClass(element: string | HTMLElement, className: string): boolean {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    return el.classList.contains(className);
  }
  return false;
}

export function setAttributes(element: string | HTMLElement, attrs: Record<string, string>): void {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
}

export function removeElement(element: string | HTMLElement): void {
  const el = typeof element === 'string' ? $(element) : element;
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

export function show(element: string | HTMLElement): void {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.remove('hidden');
  }
}

export function hide(element: string | HTMLElement): void {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.add('hidden');
  }
}

export function isVisible(element: string | HTMLElement): boolean {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }
  return false;
}

export function scrollToTop(smooth: boolean = true): void {
  if (smooth) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }
}

export function scrollToElement(selector: string, offset: number = 0): void {
  const el = $(selector);
  if (el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}

export function getElementPosition(selector: string): { top: number; left: number } | null {
  const el = $(selector);
  if (el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
    };
  }
  return null;
}

export function onReady(callback: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

export function delegate(
  parent: string,
  selector: string,
  event: string,
  handler: (event: Event, element: HTMLElement) => void
): void {
  const parentEl = $(parent);
  if (parentEl) {
    parentEl.addEventListener(event, (e: Event) => {
      const target = (e.target as HTMLElement).closest(selector);
      if (target) {
        handler(e, target as HTMLElement);
      }
    });
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

export function setScrollPosition(x: number, y: number): void {
  window.scrollTo(x, y);
}

export function getViewportSize(): { width: number; height: number } {
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  };
}

export function isElementInViewport(element: string | HTMLElement): boolean {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return false;
  
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function focusElement(selector: string): void {
  const el = $(selector);
  if (el) {
    (el as HTMLElement).focus();
  }
}

export function blurActiveElement(): void {
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
}