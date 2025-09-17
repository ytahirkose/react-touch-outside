import React, { useState } from 'react'
import { useTouchOutside, TouchOutside } from 'react-touch-outside'

// Example 1: Hook Usage
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  const { ref, isOutside } = useTouchOutside(() => {
    setIsOpen(false)
  }, {
    enabled: isOpen
  })

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      {isOpen && (
        <div className="modal-overlay">
          <div ref={ref} className="modal">
            <h2>Modal Title</h2>
            <p>Click outside to close</p>
            <p>Outside clicked: {isOutside ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Example 2: Component Usage
function DropdownExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <TouchOutside
        onOutside={() => setIsOpen(false)}
        className="dropdown-container"
      >
        <button onClick={() => setIsOpen(!isOpen)}>
          Toggle Dropdown {isOpen ? '▲' : '▼'}
        </button>
        
        {isOpen && (
          <div className="dropdown-menu">
            <a href="#" onClick={() => setIsOpen(false)}>Option 1</a>
            <a href="#" onClick={() => setIsOpen(false)}>Option 2</a>
            <a href="#" onClick={() => setIsOpen(false)}>Option 3</a>
          </div>
        )}
      </TouchOutside>
    </div>
  )
}

// Example 3: Advanced Usage with Debouncing
function AdvancedExample() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const { ref } = useTouchOutside(() => {
    setActiveItem(null)
  }, {
    debounceMs: 100,
    stopPropagation: true
  })

  return (
    <div ref={ref} className="advanced-container">
      <h3>Advanced Example</h3>
      
      {['Item 1', 'Item 2', 'Item 3'].map((item) => (
        <div key={item} className="item-container">
          <button 
            onClick={() => setActiveItem(item)}
            className={activeItem === item ? 'active' : ''}
          >
            {item}
          </button>
          
          {activeItem === item && (
            <div className="item-details">
              <p>Details for {item}</p>
              <p>Click outside to close</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export { ModalExample, DropdownExample, AdvancedExample }
