/**
 * react-touch-outside
 * 
 * A modern, performant React hook and component for detecting clicks/touches outside of elements.
 * Works seamlessly with both React (web) and React Native.
 * 
 * Features:
 * - 🌐 Universal: Works with React and React Native
 * - ⚡ Performance: Optimized with minimal re-renders
 * - 🎯 TypeScript: Full type safety and IntelliSense
 * - 📦 Tree-shakeable: Import only what you need
 * - 🔧 Configurable: Flexible options for different use cases
 * - 🚀 Modern: Built with 2025 best practices
 */

// Main hook exports
export { useTouchOutside, useTouchOutsideNative } from './useTouchOutside'

// Component exports
export { TouchOutside, TouchOutsideNative } from './TouchOutside'

// Type exports
export type {
  TouchOutsideOptions,
  TouchOutsideReturn,
  TouchOutsideHook,
  TouchOutsideNativeOptions,
  TouchOutsideNativeReturn,
  TouchOutsideProps,
  TouchOutsideRef,
  TouchOutsideNativeProps
} from './types'

// Utility exports
export { 
  isReactNative, 
  isWeb, 
  debounce, 
  containsElement, 
  getDefaultEventType 
} from './utils'

// Default export for convenience
import { useTouchOutside } from './useTouchOutside'
export default useTouchOutside
