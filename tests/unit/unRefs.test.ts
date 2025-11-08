import { test, expect } from 'vitest'
import { unRefs } from '../../src/use/utils'

// Mock DTO class similar to ServiceStack DTOs
class GetWeatherForecast {
    public date?: string;

    public constructor(init?: Partial<GetWeatherForecast>) { 
        (Object as any).assign(this, init); 
    }
    
    public getTypeName() { 
        return 'GetWeatherForecast'; 
    }
    
    public getMethod() { 
        return 'GET'; 
    }
    
    public createResponse() { 
        return []; 
    }
}

test('unRefs preserves prototype chain and methods', () => {
    const dto = new GetWeatherForecast({ date: '2024-01-01' })
    const result = unRefs(dto)

    // Should preserve the prototype chain
    expect(result).toBe(dto)
    expect(result instanceof GetWeatherForecast).toBe(true)
    
    // Should preserve methods
    expect(typeof result.getTypeName).toBe('function')
    expect(result.getTypeName()).toBe('GetWeatherForecast')
    expect(result.getMethod()).toBe('GET')
    
    // Should preserve properties
    expect(result.date).toBe('2024-01-01')
})

test('unRefs returns the original object reference', () => {
    const dto = new GetWeatherForecast({ date: '2024-01-01' })
    const result = unRefs(dto)

    // Should be the exact same reference
    expect(result === dto).toBe(true)
})

test('unRefs works with plain objects', () => {
    const obj = { a: 1, b: 'test' }
    const result = unRefs(obj)

    expect(result).toBe(obj)
    expect(result.a).toBe(1)
    expect(result.b).toBe('test')
})

