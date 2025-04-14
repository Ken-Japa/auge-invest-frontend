"use client";

import { useState, lazy } from "react";

import CloseIcon from '@mui/icons-material/Close';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { PageTransition } from "@/components/Utils/PageTransition";
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";

import { useLoginForm } from "./hooks/useLoginForm";
import { useNavigation } from "./hooks/useNavigation";
import { StyledDialog, StyledCloseButton } from "./styled";

const LoginFormComponent = lazy(() =>
    import('./components/LoginForm').then(mod => ({
        default: mod.LoginFormComponent
    }))
);

const BlockTimerComponent = lazy(() =>
    import('./components/BlockTimer').then(mod => ({
        default: mod.BlockTimer
    }))
);

const IMAGE_PROPS = {
    src: "/assets/images/background/REGISTER.jpg",
    alt: "Fundo da página de Login",
    fill: true,
    priority: true,
    sizes: "(max-width: 600px) 100vw, (max-width: 900px) 900px, 1200px",
    className: "object-cover",
    quality: 75,

};

export const Login = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { handleClose } = useNavigation();
    const {
        formData,
        errors,
        isBlocked,
        blockTimer,
        rememberMe,
        handleChange,
        handleSubmit,
        setRememberMe,
        handleGoogleSignIn
    } = useLoginForm();

    return (
        <PageTransition direction="up" duration={0.4} distance={30} className="w-full">
            <ErrorBoundary>
                <StyledDialog open={true} maxWidth="md" fullWidth disableEscapeKeyDown>
                    <div className="background-image">
                        <OptimizedImage
                            {...IMAGE_PROPS}
                            onLoad={() => {
                                setImageLoaded(true);
                            }}

                            style={{
                                opacity: imageLoaded ? 1 : 0.8,
                                transition: 'opacity 0.3s'
                            }}
                        />
                    </div>
                    <div className="content">
                        <StyledCloseButton onClick={handleClose}>
                            <CloseIcon />
                        </StyledCloseButton>

                        <SuspenseWrapper fallback={<div style={{ minHeight: '400px' }}></div>}>
                            {isBlocked ? (
                                <BlockTimerComponent seconds={blockTimer} />
                            ) : (
                                <LoginFormComponent
                                    formData={formData}
                                    errors={errors}
                                    isLoading={false}
                                    isBlocked={isBlocked}
                                    blockTimer={blockTimer}
                                    rememberMe={rememberMe}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    handleGoogleSignIn={handleGoogleSignIn}
                                    setRememberMe={setRememberMe}
                                />
                            )}
                        </SuspenseWrapper>
                    </div>
                </StyledDialog>
            </ErrorBoundary>
        </PageTransition>
    );
};

export default Login;