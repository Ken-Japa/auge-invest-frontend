import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import React from 'react'

import Register from './index'

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

expect.extend(toHaveNoViolations)

describe('Register Component Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Register />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
