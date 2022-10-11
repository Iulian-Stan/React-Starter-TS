import React from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import DynamicComponent from '../../src/components/DynamicComponent'

describe('Dynamic component tests', () => {
  const count = 0
  afterEach(cleanup)

  test('Data is rendered correctly', () => {
    const { getByText } = render(<DynamicComponent count={count} />)

    expect(getByText(count)).toBeInTheDocument()
  })

  test('Data is updated after increment', () => {
    const { getByText } = render(<DynamicComponent count={count} />)

    fireEvent.click(getByText('Increment'))

    expect(getByText(count + 1)).toBeInTheDocument()
  })

  test('Data is updated after decrement', () => {
    const { getByText } = render(<DynamicComponent count={count} />)

    fireEvent.click(getByText('Decrement'))

    expect(getByText(count - 1)).toBeInTheDocument()
  })
})
