# react-touch-outside

[![npm version](https://badge.fury.io/js/react-touch-outside.svg)](https://badge.fury.io/js/react-touch-outside)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-touch-outside)](https://bundlephobia.com/result?p=react-touch-outside)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/react-touch-outside.svg)](https://www.npmjs.com/package/react-touch-outside)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-✅-green.svg)](https://webpack.js.org/guides/tree-shaking/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-green.svg)](https://www.npmjs.com/package/react-touch-outside)

> 🚀 **Ultra-lightweight** (1.037KB gzipped) React hook and component for detecting clicks/touches outside of elements. Works seamlessly with React (web) and React Native. Zero dependencies, TypeScript ready, tree-shakeable.

## 🎯 Perfect For

- **Modals & Overlays**: Close modals when clicking outside
- **Dropdowns & Menus**: Hide dropdowns on outside interaction  
- **Popovers & Tooltips**: Dismiss popovers automatically
- **Mobile Apps**: Touch outside detection for React Native
- **Accessibility**: Keyboard and screen reader friendly
- **Performance**: Minimal bundle impact with maximum functionality

## ✨ Features

- 🌐 **Universal**: Works with React and React Native out of the box
- ⚡ **Performance**: Optimized with minimal re-renders and efficient event handling
- 🎯 **TypeScript**: Full type safety with comprehensive IntelliSense support
- 📦 **Tree-shakeable**: Import only what you need, minimal bundle impact
- 🔧 **Configurable**: Flexible options for different use cases and platforms
- 🚀 **Modern**: Built with 2025 best practices and latest React patterns
- 🧪 **Well-tested**: Comprehensive test coverage with Vitest
- 📱 **Mobile-friendly**: Optimized touch handling for mobile devices

## 📦 Installation

```bash
npm install react-touch-outside
# or
yarn add react-touch-outside
# or
pnpm add react-touch-outside
```

### 📋 Requirements

- React 16.8+ (hooks support)
- React Native 0.60+ (for React Native usage)
- TypeScript 4.5+ (for TypeScript support)
- Node.js 16+ (for development)

### 🔄 Migration from Other Libraries

Replacing other click-outside libraries? It's easy:

```tsx
// Before (react-click-outside)
import { useClickOutside } from 'react-click-outside'

// After (react-touch-outside) - Same API!
import { useTouchOutside } from 'react-touch-outside'
```

## 🚀 Quick Start

### Hook Usage (Recommended)

```tsx
import { useTouchOutside } from 'react-touch-outside'

function MyModal() {
  const { ref, isOutside } = useTouchOutside((event) => {
    console.log('Clicked outside the modal!')
    // Close modal, hide dropdown, etc.
  })

  return (
    <div ref={ref} className="modal">
      <h2>Modal Content</h2>
      <p>Click outside to close</p>
      {isOutside && <span>Outside clicked!</span>}
    </div>
  )
}
```

### Component Usage

```tsx
import { TouchOutside } from 'react-touch-outside'

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TouchOutside
      onOutside={() => setIsOpen(false)}
      className="dropdown-wrapper"
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Dropdown
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
        </div>
      )}
    </TouchOutside>
  )
}
```

## 📚 API Reference

### `useTouchOutside(callback, options?)`

The main hook for detecting outside interactions.

#### Parameters

- **`callback`** `(event: Event) => void` - Function called when outside interaction is detected
- **`options`** `TouchOutsideOptions` - Configuration options (optional)

#### Returns

```tsx
{
  ref: RefObject<HTMLElement>    // Ref to attach to your element
  isInside: boolean              // Whether last interaction was inside
  isOutside: boolean             // Whether last interaction was outside
}
```

#### Options

```tsx
interface TouchOutsideOptions {
  enabled?: boolean              // Whether the hook is active (default: true)
  eventType?: 'click' | 'touchstart' | 'mousedown'  // Event to listen for
  capture?: boolean              // Use capture phase (default: false)
  stopPropagation?: boolean      // Stop event propagation (default: false)
  onOutside?: (event: Event) => void    // Called when outside is detected
  onInside?: (event: Event) => void     // Called when inside is detected
  debounceMs?: number            // Debounce delay in milliseconds (default: 0)
}
```

### `TouchOutside` Component

A declarative wrapper component for outside detection.

#### Props

```tsx
interface TouchOutsideProps extends TouchOutsideOptions {
  children: React.ReactNode      // Content to wrap
  className?: string             // CSS class name
  style?: React.CSSProperties    // Inline styles
  as?: keyof JSX.IntrinsicElements  // HTML element to render (default: 'div')
  wrapperProps?: Record<string, any>  // Additional props for wrapper
}
```

## 🌟 Advanced Examples

### Modal with Escape Key

```tsx
function AdvancedModal({ isOpen, onClose }) {
  const { ref } = useTouchOutside(() => onClose(), {
    enabled: isOpen,
    stopPropagation: true
  })

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div ref={ref} className="modal">
        <button onClick={onClose} className="close-btn">×</button>
        <h2>Advanced Modal</h2>
        <p>Click outside or press Escape to close</p>
      </div>
    </div>
  )
}
```

### Multi-level Dropdown

```tsx
function MultiLevelDropdown() {
  const [activeLevel, setActiveLevel] = useState(null)
  
  const { ref } = useTouchOutside(() => {
    setActiveLevel(null)
  }, {
    debounceMs: 100 // Prevent rapid toggles
  })

  return (
    <TouchOutside
      ref={ref}
      onOutside={() => setActiveLevel(null)}
      className="dropdown-container"
    >
      <div className="dropdown-level-1">
        <button onClick={() => setActiveLevel(1)}>
          Level 1
        </button>
        {activeLevel === 1 && (
          <div className="dropdown-level-2">
            <button onClick={() => setActiveLevel(2)}>
              Level 2
            </button>
            {activeLevel === 2 && (
              <div className="dropdown-content">
                <a href="#">Option A</a>
                <a href="#">Option B</a>
              </div>
            )}
          </div>
        )}
      </div>
    </TouchOutside>
  )
}
```

### React Native Integration

```tsx
import { useTouchOutside } from 'react-touch-outside'

function MobileModal() {
  const { ref, isOutside } = useTouchOutside((event) => {
    // Handle outside touch on mobile
    console.log('Touched outside modal')
  }, {
    eventType: 'touchstart' // Use touch events for React Native
  })

  return (
    <View ref={ref} style={styles.modal}>
      <Text>Modal Content</Text>
      {isOutside && <Text>Outside touched!</Text>}
    </View>
  )
}
```

### Performance Optimized List

```tsx
function VirtualizedList() {
  const { ref } = useTouchOutside(() => {
    // Close dropdown when scrolling outside
  }, {
    debounceMs: 50, // Reduce event frequency
    capture: true   // Capture during capture phase for better performance
  })

  return (
    <div ref={ref} className="virtual-list">
      {/* Virtual list content */}
    </div>
  )
}
```

## 🎯 Best Practices

### 1. **Use the Hook for Custom Logic**
```tsx
// ✅ Good: Use hook for complex interactions
const { ref } = useTouchOutside((event) => {
  if (event.target.closest('.keep-open')) return
  onClose()
})

// ❌ Avoid: Over-engineering simple cases
<TouchOutside onOutside={onClose}>
  <ComplexComponent />
</TouchOutside>
```

### 2. **Optimize Event Handling**
```tsx
// ✅ Good: Use debouncing for performance
const { ref } = useTouchOutside(onClose, {
  debounceMs: 100
})

// ✅ Good: Disable when not needed
const { ref } = useTouchOutside(onClose, {
  enabled: isOpen
})
```

### 3. **Handle Edge Cases**
```tsx
// ✅ Good: Check for valid targets
const { ref } = useTouchOutside((event) => {
  if (!event.target || !document.contains(event.target)) return
  onClose()
})
```

### 4. **Accessibility Considerations**
```tsx
// ✅ Good: Combine with keyboard navigation
const { ref } = useTouchOutside(onClose)

useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') onClose()
  }
  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
}, [onClose])
```

## 🔧 Configuration

### Environment Detection

The package automatically detects your environment:

- **Web**: Uses `click` and `touchstart` events
- **React Native**: Uses `touchstart` events
- **Mobile Web**: Handles both click and touch events

### Custom Event Types

```tsx
// For web applications
const { ref } = useTouchOutside(callback, {
  eventType: 'mousedown' // More responsive than 'click'
})

// For React Native
const { ref } = useTouchOutside(callback, {
  eventType: 'touchstart'
})
```

## 📊 Bundle Size

This package is optimized for minimal bundle impact:

- **ESM Gzipped**: 1.037KB
- **CJS Gzipped**: 1.124KB  
- **ESM Minified**: 2.312KB
- **CJS Minified**: 2.521KB
- **TypeScript Definitions**: 5.794KB
- **Zero Runtime Dependencies**: Only React/React Native peer dependencies
- **Tree-shakeable**: Import only what you need

```tsx
// Import only the hook (smallest bundle)
import { useTouchOutside } from 'react-touch-outside'

// Import everything (still small!)
import { useTouchOutside, TouchOutside } from 'react-touch-outside'
```

## 🧪 Testing

The package includes comprehensive tests. For testing your components:

```tsx
import { render, fireEvent } from '@testing-library/react'
import { useTouchOutside } from 'react-touch-outside'

test('should detect outside clicks', () => {
  const onOutside = jest.fn()
  const { container } = render(
    <div>
      <div data-testid="inside">Inside</div>
      <div data-testid="outside">Outside</div>
    </div>
  )

  fireEvent.click(container.querySelector('[data-testid="outside"]'))
  expect(onOutside).toHaveBeenCalled()
})
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/ytahirkose/react-touch-outside.git
cd react-touch-outside
npm install
npm run dev
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint checking

## 📄 License

MIT © [Yaşar Tahir Köse](https://github.com/ytahirkose)

## 🙏 Acknowledgments

- Built with modern React patterns and 2025 best practices
- Inspired by the need for a universal, performant outside click detection solution
- Thanks to the React and React Native communities for their excellent tooling

## 🔍 Common Use Cases

### E-commerce Applications
```tsx
// Shopping cart popover
const { ref } = useTouchOutside(() => setCartOpen(false))

// Product quick view modal
const { ref } = useTouchOutside(() => setQuickViewOpen(false))
```

### Dashboard Applications
```tsx
// User profile dropdown
const { ref } = useTouchOutside(() => setProfileOpen(false))

// Settings panel
const { ref } = useTouchOutside(() => setSettingsOpen(false))
```

### Mobile Applications (React Native)
```tsx
// Bottom sheet
const { ref } = useTouchOutside(() => setBottomSheetOpen(false))

// Action sheet
const { ref } = useTouchOutside(() => setActionSheetOpen(false))
```

## 🆚 Comparison with Other Libraries

| Feature | react-touch-outside | react-click-outside | react-outside-click-handler |
|---------|-------------------|-------------------|---------------------------|
| **Bundle Size** | 1.037KB gzipped | ~2KB+ | ~3KB+ |
| **React Native** | ✅ Native support | ❌ Web only | ❌ Web only |
| **TypeScript** | ✅ Full support | ⚠️ Partial | ⚠️ Partial |
| **Tree Shaking** | ✅ Optimized | ❌ Limited | ❌ Limited |
| **Zero Dependencies** | ✅ Yes | ❌ No | ❌ No |
| **Modern API** | ✅ Hooks + Components | ⚠️ HOC only | ⚠️ HOC only |

## 🚀 Performance Tips

1. **Use debouncing for high-frequency events**:
```tsx
const { ref } = useTouchOutside(callback, { debounceMs: 100 })
```

2. **Disable when not needed**:
```tsx
const { ref } = useTouchOutside(callback, { enabled: isOpen })
```

3. **Use capture phase for better performance**:
```tsx
const { ref } = useTouchOutside(callback, { capture: true })
```

## 📈 Bundle Analysis

Want to see the exact impact on your bundle? Check out [Bundlephobia](https://bundlephobia.com/result?p=react-touch-outside) for detailed analysis.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run test       # Run tests
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## 📄 License

MIT © [Yaşar Tahir Köse](https://github.com/ytahirkose)

## 🙏 Acknowledgments

- Built with modern React patterns and 2025 best practices
- Inspired by the need for a universal, performant outside click detection solution
- Thanks to the React and React Native communities for their excellent tooling
- Special thanks to all contributors and users

---

**Made with ❤️ for the React community**

[⭐ Star this repo](https://github.com/ytahirkose/react-touch-outside) | [🐛 Report an issue](https://github.com/ytahirkose/react-touch-outside/issues) | [💡 Request a feature](https://github.com/ytahirkose/react-touch-outside/issues) | [📖 Documentation](https://github.com/ytahirkose/react-touch-outside#readme)
