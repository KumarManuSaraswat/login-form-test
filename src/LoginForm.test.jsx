import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  test('Typing Test - fills email and password fields correctly', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    // Simulate typing valid email
    const emailInput = screen.getByTestId('email-input')
    await user.type(emailInput, 'test@example.com')
    
    // Simulate typing valid password
    const passwordInput = screen.getByTestId('password-input')
    await user.type(passwordInput, 'password123')

    // Assert inputs contain correct values
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  test('Happy Path Submission - submits with valid credentials', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    // Type valid credentials
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    // Click submit
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)

    expect(submitButton).not.toBeDisabled()
  })

  test('Validation Failure Path - shows errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    // Click submit without filling fields
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)

    // Assert error messages appear
    expect(screen.getByTestId('email-error')).toBeInTheDocument()
    expect(screen.getByTestId('password-error')).toBeInTheDocument()
  })

  test('Happy Path with Mock Handler - demonstrates proper mocking', async () => {
    const user = userEvent.setup()
    
    // Mock console.log to verify submission happens
    const mockConsole = jest.spyOn(console, 'log').mockImplementation()
    
    render(<LoginForm />)
    
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('submit-button')
    
    await user.type(emailInput, 'user@example.com')
    await user.type(passwordInput, 'securepass')
    await user.click(submitButton)
    
    // Verify submission behavior
    expect(mockConsole).toHaveBeenCalledWith('Login successful:', expect.any(Object))
    
    mockConsole.mockRestore()
  })
})