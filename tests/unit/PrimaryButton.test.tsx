import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import PrimaryButton from '../../src/components/PrimaryButton'

// Helper to render with Router for href tests
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

test('renders button with children', () => {
  render(<PrimaryButton>Click me</PrimaryButton>)
  expect(screen.getByText('Click me')).toBeTruthy()
})

test('renders as submit button by default', () => {
  const { container } = render(<PrimaryButton>Submit</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement
  expect(button.type).toBe('submit')
})

test('renders with custom type', () => {
  const { container } = render(<PrimaryButton type="button">Click</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement
  expect(button.type).toBe('button')
})

test('applies indigo color classes by default', () => {
  const { container } = render(<PrimaryButton>Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('bg-indigo-600')).toBe(true)
  expect(button.classList.contains('hover:bg-indigo-700')).toBe(true)
  expect(button.classList.contains('focus:ring-indigo-500')).toBe(true)
})

test('applies blue color classes', () => {
  const { container } = render(<PrimaryButton color="blue">Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('bg-blue-600')).toBe(true)
  expect(button.classList.contains('hover:bg-blue-700')).toBe(true)
  expect(button.classList.contains('focus:ring-blue-500')).toBe(true)
})

test('applies purple color classes', () => {
  const { container } = render(<PrimaryButton color="purple">Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('bg-purple-600')).toBe(true)
  expect(button.classList.contains('hover:bg-purple-700')).toBe(true)
  expect(button.classList.contains('focus:ring-purple-500')).toBe(true)
})

test('applies red color classes', () => {
  const { container } = render(<PrimaryButton color="red">Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('bg-red-600')).toBe(true)
  expect(button.classList.contains('hover:bg-red-700')).toBe(true)
  expect(button.classList.contains('focus:ring-red-500')).toBe(true)
})

test('applies green color classes', () => {
  const { container } = render(<PrimaryButton color="green">Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('bg-green-600')).toBe(true)
  expect(button.classList.contains('hover:bg-green-700')).toBe(true)
  expect(button.classList.contains('focus:ring-green-500')).toBe(true)
})

test('applies sky color classes', () => {
  const { container } = render(<PrimaryButton color="sky">Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('bg-sky-600')).toBe(true)
  expect(button.classList.contains('hover:bg-sky-700')).toBe(true)
  expect(button.classList.contains('focus:ring-sky-500')).toBe(true)
})

test('applies cyan color classes', () => {
  const { container } = render(<PrimaryButton color="cyan">Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('bg-cyan-600')).toBe(true)
  expect(button.classList.contains('hover:bg-cyan-700')).toBe(true)
  expect(button.classList.contains('focus:ring-cyan-500')).toBe(true)
})

test('applies base button classes', () => {
  const { container } = render(<PrimaryButton>Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('inline-flex')).toBe(true)
  expect(button.classList.contains('justify-center')).toBe(true)
  expect(button.classList.contains('rounded-md')).toBe(true)
  expect(button.classList.contains('text-white')).toBe(true)
})

test('calls onClick handler when clicked', () => {
  const handleClick = vi.fn()
  render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>)

  const button = screen.getByText('Click')
  button.click()

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('renders with Link when href is provided', () => {
  const { container } = renderWithRouter(
    <PrimaryButton href="/test">Link Button</PrimaryButton>
  )

  const link = container.querySelector('a')
  expect(link).toBeTruthy()
  expect(link?.getAttribute('href')).toBe('/test')
})

test('renders button inside Link when href is provided', () => {
  const { container } = renderWithRouter(
    <PrimaryButton href="/test">Link Button</PrimaryButton>
  )

  const link = container.querySelector('a')
  const button = link?.querySelector('button')
  expect(button).toBeTruthy()
  expect(button?.textContent).toBe('Link Button')
})

test('applies disabled attribute', () => {
  const { container } = render(<PrimaryButton disabled>Disabled</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.disabled).toBe(true)
})

test('applies disabled classes when disabled', () => {
  const { container } = render(<PrimaryButton disabled color="blue">Disabled</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('disabled:bg-blue-400')).toBe(true)
  expect(button.classList.contains('disabled:hover:bg-blue-400')).toBe(true)
})

test('applies custom className', () => {
  const { container } = render(<PrimaryButton className="custom-class">Button</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.classList.contains('custom-class')).toBe(true)
})

test('renders reset type button', () => {
  const { container } = render(<PrimaryButton type="reset">Reset</PrimaryButton>)
  const button = container.querySelector('button') as HTMLButtonElement

  expect(button.type).toBe('reset')
})

test('calls onClick for Link button', () => {
  const handleClick = vi.fn()
  renderWithRouter(
    <PrimaryButton href="/test" onClick={handleClick}>Link</PrimaryButton>
  )

  const button = screen.getByText('Link')
  button.click()

  expect(handleClick).toHaveBeenCalledTimes(1)
})
