import { message } from './index'

describe('test', () => {
  it('should passed', () => {
    expect(1 + 1).toBe(2)
  })

  it('import test', () => {
    expect(message()).toBe('hi')
  })
})
