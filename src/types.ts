import { RefObject } from 'react'

export interface TouchOutsideOptions {
  /** Whether the hook is enabled */
  enabled?: boolean
  /** The event type to listen for ('click' for web, 'touchstart' for React Native) */
  eventType?: 'click' | 'touchstart' | 'mousedown'
  /** Whether to capture events during the capture phase */
  capture?: boolean
  /** Whether to stop propagation when outside is detected */
  stopPropagation?: boolean
  /** Custom event handler for outside touches */
  onOutside?: (event: Event) => void
  /** Custom event handler for inside touches */
  onInside?: (event: Event) => void
  /** Debounce delay in milliseconds */
  debounceMs?: number
}

export interface TouchOutsideReturn {
  /** Ref to attach to the element you want to monitor */
  ref: RefObject<HTMLElement>
  /** Whether the last interaction was inside the element */
  isInside: boolean
  /** Whether the last interaction was outside the element */
  isOutside: boolean
}

export interface TouchOutsideHook {
  (callback: (event: Event) => void, options?: TouchOutsideOptions): TouchOutsideReturn
}

// React Native specific types
export interface TouchOutsideNativeOptions extends Omit<TouchOutsideOptions, 'eventType'> {
  /** The event type to listen for on React Native */
  eventType?: 'touchstart'
}

export interface TouchOutsideNativeReturn extends TouchOutsideReturn {
  /** Ref to attach to the React Native element you want to monitor */
  ref: RefObject<any>
}

// Component props types
export interface TouchOutsideProps extends TouchOutsideOptions {
  /** Children to render */
  children: React.ReactNode
  /** CSS class name */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Component to render as (default: 'div') */
  as?: keyof JSX.IntrinsicElements
  /** Additional props to pass to the wrapper element */
  wrapperProps?: Record<string, any>
}

export interface TouchOutsideRef {
  /** The underlying element ref */
  element: HTMLElement | null
  /** Whether the last interaction was inside */
  isInside: boolean
  /** Whether the last interaction was outside */
  isOutside: boolean
}

export interface TouchOutsideNativeProps extends Omit<TouchOutsideProps, 'as' | 'className' | 'style'> {
  /** React Native style object */
  style?: any
  /** React Native component to render as */
  as?: React.ComponentType<any>
}
