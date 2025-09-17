import { useRef, useCallback, useEffect, useMemo } from 'react'
import type { TouchOutsideOptions, TouchOutsideReturn } from './types'
import { 
  isReactNative, 
  isWeb, 
  debounce, 
  containsElement, 
  getDefaultEventType,
  addEventListener,
  removeEventListener
} from './utils'

/**
 * A modern, performant hook for detecting clicks/touches outside of elements.
 * Works seamlessly with both React (web) and React Native.
 * 
 * @param callback - Function to call when outside touch/click is detected
 * @param options - Configuration options for the hook
 * @returns Object with ref to attach to element and interaction state
 * 
 * @example
 * ```tsx
 * import { useTouchOutside } from 'react-touch-outside'
 * 
 * function MyComponent() {
 *   const { ref, isOutside } = useTouchOutside((event) => {
 *     console.log('Clicked outside!')
 *   })
 * 
 *   return (
 *     <div ref={ref} className="modal">
 *       {isOutside ? 'Outside clicked!' : 'Inside clicked!'}
 *     </div>
 *   )
 * }
 * ```
 */
export function useTouchOutside(
  callback: (event: Event) => void,
  options: TouchOutsideOptions = {}
): TouchOutsideReturn {
  const {
    enabled = true,
    eventType = getDefaultEventType(),
    capture = false,
    stopPropagation = false,
    onOutside,
    onInside,
    debounceMs = 0
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const isInsideRef = useRef(false)
  const isOutsideRef = useRef(false)

  // Memoize the callback to prevent unnecessary re-renders
  const memoizedCallback = useMemo(() => {
    if (debounceMs > 0) {
      return debounce(callback, debounceMs)
    }
    return callback
  }, [callback, debounceMs])

  // Handle outside detection
  const handleOutside = useCallback((event: Event) => {
    const element = elementRef.current
    
    if (!element || !enabled) {
      return
    }

    const isInside = containsElement(element, event.target)
    const isOutside = !isInside

    isInsideRef.current = isInside
    isOutsideRef.current = isOutside

    if (isOutside) {
      if (stopPropagation) {
        event.stopPropagation()
      }
      
      // Call the main callback
      memoizedCallback(event)
      
      // Call the optional onOutside callback
      onOutside?.(event)
    } else {
      // Call the optional onInside callback
      onInside?.(event)
    }
  }, [enabled, stopPropagation, memoizedCallback, onOutside, onInside])

  // Set up event listeners
  useEffect(() => {
    if (!enabled) {
      return
    }

    const target = isReactNative() ? document : window

    if (isWeb()) {
      addEventListener(target, eventType, handleOutside, capture)
      
      // Also listen for touch events on mobile devices
      if (eventType === 'click') {
        addEventListener(target, 'touchstart', handleOutside, capture)
      }
    }

    return () => {
      if (isWeb()) {
        removeEventListener(target, eventType, handleOutside, capture)
        
        if (eventType === 'click') {
          removeEventListener(target, 'touchstart', handleOutside, capture)
        }
      }
    }
  }, [enabled, eventType, capture, handleOutside])

  // Return the ref and current state
  return {
    ref: elementRef,
    get isInside() {
      return isInsideRef.current
    },
    get isOutside() {
      return isOutsideRef.current
    }
  }
}

/**
 * React Native specific version of the hook
 * Provides better integration with React Native's touch system
 */
export function useTouchOutsideNative(
  callback: (event: any) => void,
  options: Omit<TouchOutsideOptions, 'eventType'> & { eventType?: 'touchstart' } = {}
): TouchOutsideReturn {
  return useTouchOutside(callback, {
    ...options,
    eventType: options.eventType || 'touchstart'
  })
}
