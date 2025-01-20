import '@testing-library/jest-dom'
import { vi } from 'vitest'

const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

globalThis.ResizeObserver = ResizeObserverMock

Object.defineProperty(globalThis.SVGElement.prototype, 'getBBox', {
    writable: true,
    value: vi.fn().mockReturnValue({
        x: 0,
        y: 0,
    }),
})
