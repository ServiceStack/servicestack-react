import type { AppMetadata, AuthenticateResponse, AutoQueryGridDefaults, UiConfig } from "@/types"
import type { ComponentType } from "react"
import { getFormatters } from "./formatters"
import { enumFlagsConverter } from "./metadata"
import { createBus, toKebabCase } from "@servicestack/client"

export class Interceptors {
    callbacks:{ [key:string]: (key:string, value:any) => void} = {}

    public register(key:string, callback:(key:string, value:any) => void) {
        this.callbacks[key] = callback
    }

    public has(key:string) { return !!this.callbacks[key] }

    public invoke(key:string, value:any) {
        const cb = this.callbacks[key]
        if (typeof cb == 'function') {
            cb(key, value)
        }
    }
}

/** SSR safe wrapper around localStorage */
export class LocalStore implements Storage {
    get length() { return typeof localStorage == "undefined" ? 0 : localStorage.length }
    getItem(key:string) {
        if (typeof localStorage == "undefined") return null
        return localStorage.getItem(key)
    }
    setItem(key:string, value:string) {
        if (typeof localStorage == "undefined") return
        localStorage.setItem(key, value)
    }
    removeItem(key:string) {
        if (typeof localStorage == "undefined") return
        localStorage.removeItem(key)
    }
    clear() {
        if (typeof localStorage == "undefined") return
        localStorage.clear()
    }
    key(index: number) {
        if (typeof localStorage == "undefined") return null
        return localStorage.key(index)
    }
}

// Simple reactive state management for React
class ReactiveValue<T> {
    private _value: T
    private listeners: Set<(value: T) => void> = new Set()

    constructor(initialValue: T) {
        this._value = initialValue
    }

    get value(): T {
        return this._value
    }

    set value(newValue: T) {
        this._value = newValue
        this.listeners.forEach(listener => listener(newValue))
    }

    subscribe(listener: (value: T) => void): () => void {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }
}

export class Sole {
    static config:UiConfig = {
        redirectSignIn: '/signin',
        redirectSignOut: '/auth/logout',
        navigate: url => location.href = url,
        assetsPathResolver: src => src,
        fallbackPathResolver: src => src,
        storage: new LocalStore(),
        tableIcon: { svg: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>` },
        scopeWhitelist: {
            enumFlagsConverter,
            ...getFormatters()
        }
    }

    static autoQueryGridDefaults:AutoQueryGridDefaults = {
        deny: [],
        hide: [],
        toolbarButtonClass: undefined,
        tableStyle: "stripedRows",
        take: 25,
        maxFieldLength: 150,
    }

    static events = createBus()
    static user = new ReactiveValue<AuthenticateResponse|null>(null)
    static metadata = new ReactiveValue<AppMetadata|null>(null)
    static components:{[k:string]:ComponentType<any>} = {}

    static component(name:string) {
        const component = Sole.components[name]
        if (component) return component
        const kebabName = toKebabCase(name)
        const match = Object.keys(Sole.components).find(x => toKebabCase(x) === kebabName)
        return match && Sole.components[match] || null
    }
    static interceptors:Interceptors = new Interceptors()
}

/** Set global configuration */
export function setConfig(config:UiConfig) {
    Sole.config = Object.assign(Sole.config, config)
}

export function setAutoQueryGridDefaults(config:AutoQueryGridDefaults) {
    Sole.autoQueryGridDefaults = Object.assign(Sole.autoQueryGridDefaults, config)
}

/** Resolve Absolute URL to use for relative paths */
export function assetsPathResolver(src?:string) {
    return src && Sole.config.assetsPathResolver
        ? Sole.config.assetsPathResolver(src)
        : src
}

/** Resolve fallback URL to use if primary URL fails */
export function fallbackPathResolver(src?:string) {
    return src && Sole.config.fallbackPathResolver
        ? Sole.config.fallbackPathResolver(src)
        : src
}

export function registerInterceptor(key:string, callback:(key:string, value:any) => void) {
    Sole.interceptors.register(key, callback)
}

/** Manage Global Configuration for Component Library */
export function useConfig() {
    /** Resolve configuration */
    const config = Sole.config
    const autoQueryGridDefaults = Sole.autoQueryGridDefaults
    const events = Sole.events

    return {
        config, setConfig, events,
        autoQueryGridDefaults, setAutoQueryGridDefaults,
        assetsPathResolver, fallbackPathResolver,
        registerInterceptor,
    }
}
