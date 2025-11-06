import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Alert from '../../src/components/Alert'

test('displays the alert message in children', () => {
    render(<Alert type="warn">Hello, world!</Alert>)
    expect(screen.getByText('Hello, world!')).toBeTruthy()
})

test('displays the correct classes for "warn" type', () => {
    const { container } = render(<Alert type="warn">Warning message</Alert>)
    const alertElement = container.firstChild as HTMLElement

    expect(alertElement.classList.contains('border-yellow-400')).toBe(true)
    expect(alertElement.classList.contains('bg-yellow-50')).toBe(true)
})

test('displays the correct classes for "error" type', () => {
    const { container } = render(<Alert type="error">Error message</Alert>)
    const alertElement = container.firstChild as HTMLElement

    expect(alertElement.classList.contains('border-red-400')).toBe(true)
    expect(alertElement.classList.contains('bg-red-50')).toBe(true)
})

test('displays the correct classes for "success" type', () => {
    const { container } = render(<Alert type="success">Success message</Alert>)
    const alertElement = container.firstChild as HTMLElement

    expect(alertElement.classList.contains('border-green-400')).toBe(true)
    expect(alertElement.classList.contains('bg-green-50')).toBe(true)
})

test('displays the correct classes for "info" type', () => {
    const { container } = render(<Alert type="info">Info message</Alert>)
    const alertElement = container.firstChild as HTMLElement

    expect(alertElement.classList.contains('border-blue-400')).toBe(true)
    expect(alertElement.classList.contains('bg-blue-50')).toBe(true)
})
