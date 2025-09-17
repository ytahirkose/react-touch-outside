/**
 * Platform detection utilities
 */
export const isReactNative = (): boolean => {
  try {
    return typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
  } catch {
    return false
  }
}

export const isWeb = (): boolean => {
  return typeof window !== 'undefined' && !isReactNative()
}

/**
 * Debounce utility function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Check if element contains the target element
 */
export function containsElement(element: HTMLElement | null, target: EventTarget | null): boolean {
  if (!element || !target || !(target instanceof Node)) {
    return false
  }
  
  return element.contains(target)
}

/**
 * Get the default event type based on platform
 */
export function getDefaultEventType(): 'click' | 'touchstart' {
  return isReactNative() ? 'touchstart' : 'click'
}

/**
 * Safe event listener management
 */
export function addEventListener(
  target: EventTarget,
  eventType: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): void {
  if (target.addEventListener) {
    target.addEventListener(eventType, handler, options)
  }
}

export function removeEventListener(
  target: EventTarget,
  eventType: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): void {
  if (target.removeEventListener) {
    target.removeEventListener(eventType, handler, options)
  }
}
