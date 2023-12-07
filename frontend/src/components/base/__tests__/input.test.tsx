import { render } from '@testing-library/react'
import Input from '../input'

describe('Input component', () => {
  it('renders without crashing', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" />)
  })
})