import { Button,Checkbox, FormControlLabel, TextField } from "@mui/material";
import Link from 'next/link';
import { type ChangeEvent, type FormEvent, memo, useEffect } from 'react';

import { FormData, FormErrors } from "../../types";
import { FormHeader } from "../FormHeader";
import { SocialLogin } from "../SocialLogin";
import { LoginFormSkeleton } from "./LoginFormSkeleton";
import {
    ForgotPasswordLink,
    LoginFormStyled,
    RememberMeContainer
} from "./styled";

interface LoginFormProps {
    formData: FormData;
    errors: FormErrors;
    isLoading: boolean;
    isBlocked: boolean;
    blockTimer: number;
    rememberMe: boolean;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent) => void;
    handleGoogleSignIn: () => Promise<void>;
    setRememberMe: (value: boolean) => void;
}

export const LoginFormComponent = memo(({
    formData,
    errors,
    isLoading,
    isBlocked,
    blockTimer,
    rememberMe,
    handleChange,
    handleSubmit,
    handleGoogleSignIn,
    setRememberMe
}: LoginFormProps) => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
                transition: background-color 5000s ease-in-out 0s;
                -webkit-text-fill-color: #fff !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (isLoading) {
        return <LoginFormSkeleton />;
    }

    const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isBlocked && isFormValid) {
            handleSubmit(e);
        }
    };

    return (
        <LoginFormStyled
            onSubmit={handleFormSubmit}
            id="login-form"
            noValidate
            autoComplete="off"
            spellCheck="false"
            data-form-type="login"
        >
            <FormHeader />

            <TextField
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || ' '}
                fullWidth
                id="email-login"
                autoComplete="off"
                inputProps={{
                    spellCheck: "false",
                    autoCorrect: "off",
                    autoCapitalize: "off",
                    "data-form-type": "email",
                    "data-lpignore": "true" // Ignore LastPass autofill
                }}
            />

            <TextField
                label="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || ' '}
                fullWidth
                id="password-login"
                autoComplete="off"
                inputProps={{
                    "data-form-type": "password",
                    "data-lpignore": "true" // Ignore LastPass autofill
                }}
            />

            <ForgotPasswordLink>
                <Link href="/forgot-password">
                    Esqueceu sua senha?
                </Link>
            </ForgotPasswordLink>

            <RememberMeContainer>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            id="remember-me-checkbox"
                        />
                    }
                    label="Lembrar-me"
                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                />
            </RememberMeContainer>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isBlocked || !isFormValid}
                onClick={handleFormSubmit}
            >
                {isBlocked ? `Bloqueado (${blockTimer}s)` : 'Entrar'}
            </Button>

            <SocialLogin
                handleGoogleSignIn={handleGoogleSignIn}
                isLoading={isLoading}
            />
        </LoginFormStyled>
    );
});

LoginFormComponent.displayName = 'LoginFormComponent';