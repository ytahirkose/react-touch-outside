import React, { forwardRef, useImperativeHandle } from 'react'
import { useTouchOutside } from './useTouchOutside'
import type { TouchOutsideProps, TouchOutsideRef, TouchOutsideNativeProps } from './types'

/**
 * A declarative component wrapper for touch/click outside detection.
 * Provides a clean API for components that need outside interaction detection.
 * 
 * @example
 * ```tsx
 * import { TouchOutside } from 'react-touch-outside'
 * 
 * function MyModal() {
 *   return (
 *     <TouchOutside
 *       onOutside={() => console.log('Outside clicked!')}
 *       className="modal"
 *     >
 *       <div>Modal content</div>
 *     </TouchOutside>
 *   )
 * }
 * ```
 */
export const TouchOutside = forwardRef<TouchOutsideRef, TouchOutsideProps>(
  ({ 
    children, 
    className, 
    style, 
    as = 'div',
    wrapperProps = {},
    onOutside,
    onInside,
    ...options 
  }, ref) => {
    const { ref: elementRef, isInside, isOutside } = useTouchOutside(
      (event) => onOutside?.(event),
      {
        ...options,
        onInside: onInside
      }
    )

    // Expose ref methods
    useImperativeHandle(ref, () => ({
      element: elementRef.current,
      isInside,
      isOutside
    }), [elementRef.current, isInside, isOutside])

    // Use createElement to avoid type issues
    return React.createElement(
      as,
      {
        ref: elementRef,
        className,
        style,
        ...wrapperProps
      },
      children
    )
  }
)

TouchOutside.displayName = 'TouchOutside'

/**
 * React Native specific TouchOutside component
 */
export const TouchOutsideNative = forwardRef<TouchOutsideRef, TouchOutsideNativeProps>(
  ({ 
    children, 
    style, 
    as = 'View' as any,
    wrapperProps = {},
    onOutside,
    onInside,
    ...options 
  }, ref) => {
    const { ref: elementRef, isInside, isOutside } = useTouchOutside(
      (event) => onOutside?.(event),
      {
        ...options,
        eventType: 'touchstart',
        onInside: onInside
      }
    )

    useImperativeHandle(ref, () => ({
      element: elementRef.current,
      isInside,
      isOutside
    }), [elementRef.current, isInside, isOutside])

    // Use createElement for React Native
    return React.createElement(
      as,
      {
        ref: elementRef,
        style,
        ...wrapperProps
      },
      children
    )
  }
)

TouchOutsideNative.displayName = 'TouchOutsideNative'