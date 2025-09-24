"use client";

import { useState, lazy, useEffect } from "react";
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

const LoginFormSkeleton = lazy(() =>
    import('./components/LoginForm/LoginFormSkeleton').then(mod => ({
        default: mod.LoginFormSkeleton
    }))
);

const IMAGE_PROPS = {
    src: "/assets/images/background/REGISTER.jpg",
    alt: "Fundo da página de Login",
    fill: true,
    priority: true,
    fetchPriority: "high",
    sizes: "(max-width: 600px) 100vw, (max-width: 900px) 900px, 1200px",
    className: "object-cover",
    quality: 60,
} as const;

export const Login = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isComponentMounted, setIsComponentMounted] = useState(false);
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

    useEffect(() => {
        setIsComponentMounted(true);

        const preloadResources = async () => {
            const formPromise = import('./components/LoginForm');
            const timerPromise = import('./components/BlockTimer');
            const skeletonPromise = import('./components/LoginForm/LoginFormSkeleton');

            await Promise.all([
                formPromise,
                timerPromise,
                skeletonPromise
            ]);
        };

        preloadResources().catch(console.error);

        const imgPreload = new Image();
        imgPreload.src = IMAGE_PROPS.src;

        return () => {
            imgPreload.onload = null;
            imgPreload.onerror = null;
        };
    }, []);

    return (
        <PageTransition direction="up" duration={0.3} distance={20} className="w-full">
            <ErrorBoundary>
                <StyledDialog
                    open={true}
                    maxWidth="md"
                    fullWidth
                    disableEscapeKeyDown
                    transitionDuration={{
                        enter: 300,
                        exit: 200
                    }}
                >
                    <div className="background-image">
                        <OptimizedImage
                            {...IMAGE_PROPS}
                            onLoad={() => {
                                setImageLoaded(true);
                            }}
                            style={{
                                opacity: imageLoaded ? 1 : 0.8,
                                transition: 'opacity 0.2s'
                            }}
                        />
                    </div>
                    <div className="content">
                        <StyledCloseButton onClick={handleClose}>
                            <CloseIcon />
                        </StyledCloseButton>

                        <SuspenseWrapper fallback={<LoginFormSkeleton />}>
                            {isBlocked ? (
                                <BlockTimerComponent seconds={blockTimer} />
                            ) : (
                                <LoginFormComponent
                                    formData={formData}
                                    errors={errors}
                                    isLoading={!isComponentMounted}
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