import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTouchOutside } from 'react-touch-outside'

// React Native Example
function MobileModal() {
  const [isOpen, setIsOpen] = useState(false)

  const { ref, isOutside } = useTouchOutside(() => {
    console.log('Touched outside modal')
    setIsOpen(false)
  }, {
    enabled: isOpen,
    eventType: 'touchstart' // Use touch events for React Native
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.overlay}>
          <View ref={ref} style={styles.modal}>
            <Text style={styles.title}>Mobile Modal</Text>
            <Text style={styles.subtitle}>Touch outside to close</Text>
            <Text style={styles.status}>
              Outside touched: {isOutside ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

// React Native Dropdown Example
function MobileDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const { ref } = useTouchOutside(() => {
    setIsOpen(false)
  }, {
    eventType: 'touchstart',
    debounceMs: 50 // Reduce touch sensitivity
  })

  return (
    <View style={styles.container}>
      <View ref={ref} style={styles.dropdownContainer}>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Text style={styles.dropdownButtonText}>
            Menu {isOpen ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setIsOpen(false)}
            >
              <Text style={styles.dropdownItemText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setIsOpen(false)}
            >
              <Text style={styles.dropdownItemText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setIsOpen(false)}
            >
              <Text style={styles.dropdownItemText}>Option 3</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  status: {
    fontSize: 12,
    color: '#999',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  dropdownButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
})

export { MobileModal, MobileDropdown }
