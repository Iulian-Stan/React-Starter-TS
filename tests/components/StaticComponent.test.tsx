import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import StaticComponent from '../../src/components/StaticComponent'
import UserInterface from '../../src/UserInterface'

describe('Static component tests', () => {
  test('Data is render correctly', () => {
    const user: UserInterface = {
      name: 'John Doe',
      age: 26,
      address: '87 Summer St, Boston, MA 02110',
      dob: new Date()
    }

    const { getByText } = render(<StaticComponent {...user} />)

    expect(getByText(user.name)).toBeInTheDocument()
    expect(getByText(user.age.toString() + ' years')).toBeInTheDocument()
    expect(getByText(user.address)).toBeInTheDocument()
    expect(getByText(user.dob.toDateString())).toBeInTheDocument()
  })
})
