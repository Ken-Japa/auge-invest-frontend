import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '@/pagesComponents/Nao-Logado/Login';
import { useRouter } from 'next/navigation';
import * as auth from '@/utils/auth';
import { signIn } from 'next-auth/react';

const mockPush = jest.fn();

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Login Integration", () => {
  beforeEach(() => {
    (signIn as jest.Mock).mockReset();
    mockPush.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully log in a user and redirect to the dashboard', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ url: '/visao-economia' });

    render(<Login />);

    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
        callbackUrl: '/visao-economia',
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/visao-economia');
    });
  });

  it('should display an error message for invalid credentials', async () => {
      (signIn as jest.Mock).mockResolvedValueOnce({ error: 'Email ou senha inválidos' });

      render(<Login />);

      const emailInput = screen.getByLabelText(/E-mail/i);
      const passwordInput = screen.getByLabelText(/Senha/i);
      const loginButton = screen.getByRole('button', { name: /Entrar/i });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'wrong@example.com',
        password: 'wrongpassword',
        redirect: false,
        callbackUrl: undefined,
      });

      await waitFor(() => {
        const passwordHelperText = screen.getByTestId('password-login-helper-text');
        expect(passwordHelperText).toHaveTextContent(/Email ou senha inválidos/i);
      });
      expect(mockPush).not.toHaveBeenCalled();
    });
});