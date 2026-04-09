export function fadeIn(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.display = '';
    element.style.opacity = '0';
    
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = String(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.opacity = '1';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function fadeOut(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.opacity = '1';
    
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = String(1 - progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
        element.style.opacity = '';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function slideIn(
  element: HTMLElement,
  direction: 'left' | 'right' | 'up' | 'down' = 'left',
  duration: number = 300
): Promise<void> {
  return new Promise((resolve) => {
    const style = window.getComputedStyle(element);
    const originalDisplay = style.display;
    const originalPosition = style.position;
    const originalVisibility = style.visibility;
    const originalOpacity = style.opacity;
    
    element.style.display = originalDisplay === 'none' ? '' : originalDisplay;
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
    
    document.body.appendChild(element);
    
    const rect = element.getBoundingClientRect();
    const startLeft = rect.left;
    const startTop = rect.top;
    
    element.style.position = originalPosition || 'relative';
    element.style.visibility = originalVisibility;
    
    let translateX = 0;
    let translateY = 0;
    
    switch (direction) {
      case 'left':
        translateX = -50;
        break;
      case 'right':
        translateX = 50;
        break;
      case 'up':
        translateY = -50;
        break;
      case 'down':
        translateY = 50;
        break;
    }
    
    element.style.transform = `translate(${translateX}%, ${translateY}%)`;
    
    requestAnimationFrame(() => {
      const startTime = performance.now();
      
      function animate(currentTime: number): void {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const eased = easeOutCubic(progress);
        
        element.style.opacity = String(eased);
        element.style.transform = `translate(${translateX * (1 - eased)}%, ${translateY * (1 - eased)}%)`;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.opacity = originalOpacity || '1';
          element.style.transform = '';
          resolve();
        }
      }
      
      requestAnimationFrame(animate);
    });
  });
}

export function animatePageTransition(
  outElement: HTMLElement,
  inElement: HTMLElement,
  direction: 'forward' | 'back' = 'forward'
): Promise<void> {
  return new Promise((resolve) => {
    outElement.style.position = 'absolute';
    outElement.style.width = '100%';
    inElement.style.display = '';
    inElement.style.opacity = '0';
    inElement.style.transform = direction === 'forward' ? 'translateX(30px)' : 'translateX(-30px)';
    
    const duration = 250;
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      
      outElement.style.opacity = String(1 - eased);
      outElement.style.transform = direction === 'forward' 
        ? `translateX(${-30 * eased}%)` 
        : `translateX(${30 * eased}%)`;
      
      inElement.style.opacity = String(eased);
      inElement.style.transform = direction === 'forward'
        ? `${30 * (1 - eased)}px`
        : `${-30 * (1 - eased)}px`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        outElement.style.display = 'none';
        outElement.style.position = '';
        outElement.style.opacity = '';
        outElement.style.transform = '';
        inElement.style.opacity = '';
        inElement.style.transform = '';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function fadeInUp(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.display = '';
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = easeOutCubic(progress);
      
      element.style.opacity = String(eased);
      element.style.transform = `translateY(${20 * (1 - eased)}px)`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function fadeInDown(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.display = '';
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px)';
    
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = easeOutCubic(progress);
      
      element.style.opacity = String(eased);
      element.style.transform = `translateY(${-20 * (1 - eased)}px)`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function scaleIn(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.display = '';
    element.style.opacity = '0';
    element.style.transform = 'scale(0.9)';
    
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = easeOutCubic(progress);
      
      element.style.opacity = String(eased);
      element.style.transform = `scale(${0.9 + 0.1 * eased})`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function pulse(element: HTMLElement, scale: number = 1.05, duration: number = 150): Promise<void> {
  return new Promise((resolve) => {
    const originalTransform = element.style.transform;
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = easeInOutCubic(progress);
      const currentScale = 1 + (scale - 1) * Math.sin(progress * Math.PI);
      
      element.style.transform = `scale(${currentScale})`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = originalTransform;
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function shake(element: HTMLElement, duration: number = 400): Promise<void> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const shakeIntensity = 10;
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const shake = Math.sin(progress * Math.PI * 6) * shakeIntensity * (1 - progress);
      
      element.style.transform = `translateX(${shake}px)`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = '';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function animateValue(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 1000,
  prefix: string = '',
  suffix: string = ''
): Promise<void> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = easeOutCubic(progress);
      const currentValue = Math.round(start + (end - start) * eased);
      
      element.textContent = `${prefix}${currentValue.toLocaleString('pt-BR')}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = `${prefix}${end.toLocaleString('pt-BR')}${suffix}`;
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

export function addTransitionClass(element: HTMLElement, className: string, duration: number = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.transition = `all ${duration}ms ease`;
    element.classList.add(className);
    
    setTimeout(() => {
      element.style.transition = '';
      resolve();
    }, duration);
  });
}

export function removeTransitionClass(element: HTMLElement, className: string, duration: number = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.transition = `all ${duration}ms ease`;
    element.classList.remove(className);
    
    setTimeout(() => {
      element.style.transition = '';
      resolve();
    }, duration);
  });
}