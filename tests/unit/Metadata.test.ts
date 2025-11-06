import { test, expect } from 'vitest'
import { toFormValues } from '../../src/use/metadata'

test('toFormValues mutates and returns original argument', () => {
    const a = { a: "foo", b: 1, c: null }
    const b = toFormValues(a)

    // toFormValues mutates and returns original argument
    expect(a === b).toBe(true)
    expect(a.a).toBe('foo')
    expect(a.b).toBe(1)
    expect(a.c).toBe(null)
})

test('toFormValues returns empty object for null input', () => {
    const result = toFormValues(null)
    expect(result).toEqual({})
})

test('toFormValues returns empty object for undefined input', () => {
    const result = toFormValues(undefined)
    expect(result).toEqual({})
})

test('toFormValues shallow clones arrays', () => {
    const originalArray = [1, 2, 3]
    const dto = { items: originalArray }
    const result = toFormValues(dto)

    expect(result.items).toEqual([1, 2, 3])
    expect(result.items !== originalArray).toBe(true) // Different reference
    expect(Array.isArray(result.items)).toBe(true)
})

test('toFormValues shallow clones objects', () => {
    const originalNested = { value: 'test' }
    const dto = { nested: originalNested }
    const result = toFormValues(dto)

    expect(result.nested).toEqual({ value: 'test' })
    expect(result.nested !== originalNested).toBe(true) // Different reference
})
