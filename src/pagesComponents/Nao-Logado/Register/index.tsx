"use client";

import { useState, lazy } from "react";
import { useRouter } from "next/navigation";

import CloseIcon from '@mui/icons-material/Close';

import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { PageTransition } from "@/components/Utils/PageTransition";
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";

import { useBlockTimer } from "./hooks/useBlockTimer";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { useGoogleSignIn } from "./hooks/useGoogleSignIn";
import { StyledCloseButton, RegisterPageContainer } from "./styled";
import { BlockTimer } from "./components/BlockTimer";

const BLOCK_DURATION = 10 * 60 * 1000;
const DEFAULT_REDIRECT = "/visao-economia";

const RegisterFormContent = lazy(() => import('./components/RegisterForm').then(mod => ({ default: mod.RegisterFormContent })));

export const Register = () => {
    const router = useRouter();
    const [imageLoaded, setImageLoaded] = useState(false);
    const { isBlocked, blockTimer, handleBlockUser } = useBlockTimer(BLOCK_DURATION);
    const { formData, errors, acceptedTerms, isSubmitting, setAcceptedTerms, handleChange, handleSubmit } = useRegisterForm(handleBlockUser);
    const { handleGoogleClick } = useGoogleSignIn(DEFAULT_REDIRECT);

    const handleClose = () => {
        try {
            router.back();
        } catch {
            router.push('/');
        }
    };

    return (
        <PageTransition direction="up" duration={0.4} distance={30} className="w-full">
            <ErrorBoundary>
                <RegisterPageContainer>
                    <div className="background-image">
                        <OptimizedImage
                            src="/assets/images/background/REGISTER.jpg"
                            alt="Fundo da página de Registro"
                            fill
                            priority
                            sizes="(max-width: 900px) 100vw, 900px"
                            className="object-cover"
                            loadingClassName=""
                            quality={70}
                            onLoad={() => setImageLoaded(true)}
                            style={{
                                opacity: imageLoaded ? 1 : 0.3,
                                transition: 'opacity 0.3s ease-in-out'
                            }}
                        />
                    </div>
                    <div className="content">
                        <StyledCloseButton onClick={handleClose}>
                            <CloseIcon />
                        </StyledCloseButton>

                        <SuspenseWrapper>
                            {isBlocked ? (
                                <BlockTimer seconds={blockTimer} />
                            ) : (
                                <RegisterFormContent
                                    formData={formData}
                                    errors={errors}
                                    acceptedTerms={acceptedTerms}
                                    onSubmit={handleSubmit}
                                    onChange={handleChange}
                                    onTermsChange={setAcceptedTerms}
                                    onGoogleClick={handleGoogleClick}
                                    isLoading={!imageLoaded || isSubmitting}
                                />
                            )}
                        </SuspenseWrapper>
                    </div>
                </RegisterPageContainer>
            </ErrorBoundary>
        </PageTransition>
    );
};