"use client";

import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LogoutIcon from '@mui/icons-material/Logout';
import { Alert, Button, Snackbar, Typography } from '@mui/material';
import Link from 'next/link';
import { signOut,useSession } from 'next-auth/react';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { PageBackground } from '@/components/Layout/PageBackground';
import { PageTransition } from '@/components/Utils/PageTransition';
import { clearAuthData } from '@/utils/auth';

import { AdditionalInfo } from './components/AdditionalInfo';
import { BasicInfo } from './components/BasicInfo';
import { ProfileSkeleton } from './components/ProfileSkeleton';
import { SubscriptionInfo } from './components/SubscriptionInfo';
import { useProfileActions } from './hooks/useProfileActions';
import { useProfileData } from './hooks/useProfileData';
import {
    ContactButton,
    ProfileCard,
    StyledContactButton
} from './styled';

export const Perfil = () => {
    const { data: session, status } = useSession();

    const {
        userData,
        setUserData,
        isLoading,
        notification,
        setNotification,
        displayValues,
        displayCreatedAt,
        displayUpdatedAt,
        isActiveUser,
        handleCloseNotification
    } = useProfileData(session);

    const {
        editField,
        editValue,
        isSaving,
        showPasswordDialog,
        passwordError,
        setEditField,
        setShowPasswordDialog,
        setPasswordError,
        handleEdit,
        handleSave,
        handlePasswordChange
    } = useProfileActions(session, userData, setUserData, setNotification, displayValues);

    // Destructure display values for easier access
    const { name: displayName, email: displayEmail, phone: displayPhone, cpf: displayCpf } = displayValues;

    if (status === "loading" || isLoading) {
        return <ProfileSkeleton />;
    }

    return (
        <ErrorBoundary>
            <PageTransition direction="up" duration={0.4} distance={30}>
                <SuspenseWrapper fallback={<ProfileSkeleton />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <PageBackground imageName="Perfil">
                            <Typography
                                variant="h1"
                                sx={{
                                    textAlign: "center",
                                    fontSize: "2.5rem",
                                    fontWeight: 600,
                                    mb: 4,
                                }}
                            >
                                Perfil
                            </Typography>

                            <ProfileCard elevation={0}>
                                <BasicInfo
                                    displayName={displayName}
                                    displayEmail={displayEmail}
                                    displayPhone={displayPhone}
                                    displayCpf={displayCpf}
                                    handleEdit={handleEdit}
                                    showPasswordDialog={showPasswordDialog}
                                    setShowPasswordDialog={setShowPasswordDialog}
                                    setPasswordError={setPasswordError}
                                    handlePasswordChange={handlePasswordChange}
                                    isSaving={isSaving}
                                    editField={editField}
                                    editValue={editValue}
                                    setEditField={setEditField}
                                    handleSave={handleSave}
                                />
                            </ProfileCard>

                            <ProfileCard>
                                <AdditionalInfo
                                    displayCreatedAt={displayCreatedAt}
                                    displayUpdatedAt={displayUpdatedAt}
                                    isActiveUser={isActiveUser}
                                    userData={userData}
                                    handleEdit={handleEdit}
                                />
                            </ProfileCard>

                            <ProfileCard elevation={0}>
                                <SubscriptionInfo />
                            </ProfileCard>

                            <ProfileCard elevation={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="text"
                                    color="error"
                                    endIcon={<LogoutIcon />}
                                    onClick={() => {
                                        clearAuthData();
                                        signOut({ callbackUrl: '/' })
                                    }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    Fazer logout
                                </Button>
                            </ProfileCard>

                            <ContactButton>
                                <StyledContactButton
                                    variant="contained"
                                    startIcon={<ContactSupportIcon />}
                                    component={Link}
                                    href={`/visitante/contato?name=${displayName}&email=${displayEmail}`}
                                >
                                    Precisa de Ajuda? Entre em Contato
                                </StyledContactButton>
                            </ContactButton>

                            <Snackbar
                                open={notification.open}
                                autoHideDuration={6000}
                                onClose={handleCloseNotification}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            >
                                <Alert
                                    onClose={handleCloseNotification}
                                    severity={notification.type}
                                    sx={{ width: '100%' }}
                                >
                                    {notification.message}
                                </Alert>
                            </Snackbar>
                        </PageBackground>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary>
    );
};
