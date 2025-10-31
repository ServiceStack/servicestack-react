import { describe, it, expect, afterEach } from 'vitest'
import ErrorSummary from './ErrorSummary'
import { ApiStateContext } from './TextInput'
import type { ResponseStatus } from '@/types'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'

describe('ErrorSummary', () => {
  let container: HTMLDivElement

  afterEach(() => {
    if (container && document.body.contains(container)) {
      document.body.removeChild(container)
    }
  })

  it('should render nothing when no error status is provided', () => {
    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(<ErrorSummary />)
    })

    expect(container.innerHTML).toBe('')

    root.unmount()
  })

  it('should render error message when status is provided', () => {
    const status: ResponseStatus = {
      errorCode: 'ValidationError',
      message: 'There was a validation error',
    }

    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(<ErrorSummary status={status} />)
    })

    const errorText = container.textContent
    expect(errorText).toContain('There was a validation error')

    root.unmount()
  })

  it('should render error summary with field errors', () => {
    const status: ResponseStatus = {
      errorCode: 'ValidationError',
      message: 'Validation failed',
      errors: [
        { fieldName: 'email', message: 'Email is required' },
        { fieldName: 'password', message: 'Password must be at least 8 characters' }
      ]
    }

    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(<ErrorSummary status={status} />)
    })

    expect(container.querySelector('.bg-red-50')).toBeDefined()

    root.unmount()
  })

  it('should apply custom className', () => {
    const status: ResponseStatus = {
      errorCode: 'Error',
      message: 'Test error',
    }

    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(<ErrorSummary status={status} className="custom-class" />)
    })

    const errorDiv = container.querySelector('.custom-class')
    expect(errorDiv).toBeDefined()

    root.unmount()
  })

  it('should exclude specified fields when except prop is provided', () => {
    const status: ResponseStatus = {
      errorCode: 'ValidationError',
      message: 'Validation failed',
      errors: [
        { fieldName: 'email', message: 'Email is required' },
        { fieldName: 'password', message: 'Password is required' }
      ]
    }

    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(<ErrorSummary status={status} except="email" />)
    })

    expect(container.querySelector('.bg-red-50')).toBeDefined()

    root.unmount()
  })

  it('should render error from ApiStateContext when no status prop provided', () => {
    const mockContext = {
      error: {
        current: {
          errorCode: 'ContextError',
          message: 'Error from context',
        }
      }
    }

    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(
        <ApiStateContext.Provider value={mockContext as any}>
          <ErrorSummary />
        </ApiStateContext.Provider>
      )
    })

    const errorText = container.textContent
    expect(errorText).toContain('Error from context')

    root.unmount()
  })

  it('should have correct styling classes', () => {
    const status: ResponseStatus = {
      errorCode: 'Error',
      message: 'Test error',
    }

    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(<ErrorSummary status={status} />)
    })

    const errorDiv = container.querySelector('.bg-red-50')
    expect(errorDiv).toBeDefined()

    const borderDiv = container.querySelector('.border-l-4')
    expect(borderDiv).toBeDefined()

    const borderColorDiv = container.querySelector('.border-red-400')
    expect(borderColorDiv).toBeDefined()

    root.unmount()
  })

  it('should render SVG icon', () => {
    const status: ResponseStatus = {
      errorCode: 'Error',
      message: 'Test error',
    }

    container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    flushSync(() => {
      root.render(<ErrorSummary status={status} />)
    })

    const svg = container.querySelector('svg')
    expect(svg).toBeDefined()
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')

    root.unmount()
  })
})

