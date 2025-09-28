import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';
import React from 'react';

import { ThemePreference } from '@/components/Theme/TrocarTema';

import { EditDialog } from '../EditDialog';
import { PasswordDialog } from '../PasswordDialog';
import { EditButton, InfoContainer, InfoLabel, InfoRow, InfoValue, PasswordButton, StyledDivider } from './styled';


const formatPhoneNumber = (phone: string | null): string => {
    if (!phone) return 'Não informado';
    const numericPhone = phone.replace(/\D/g, '');
    if (numericPhone.length === 11) {
        return `(${numericPhone.substring(0, 2)}) ${numericPhone.substring(2, 7)}-${numericPhone.substring(7)}`;
    } else if (numericPhone.length === 10) {
        return `(${numericPhone.substring(0, 2)}) ${numericPhone.substring(2, 6)}-${numericPhone.substring(6)}`;
    }

    return phone;
};

const formatCPF = (cpf: string | null): string => {
    if (!cpf) return 'Não informado';
    const numericCPF = cpf.replace(/\D/g, '');
    if (numericCPF.length === 11) {
        return `${numericCPF.substring(0, 3)}.${numericCPF.substring(3, 6)}.${numericCPF.substring(6, 9)}-${numericCPF.substring(9)}`;
    }
    return cpf;
};

interface BasicInfoProps {
    displayName: string;
    displayEmail: string;
    displayPhone: string | null;
    displayCpf: string | null;
    handleEdit: (field: string, value: string) => void;
    showPasswordDialog: boolean;
    setShowPasswordDialog: (show: boolean) => void;
    setPasswordError: (error: string) => void;
    handlePasswordChange: (oldPassword: string, newPassword: string) => Promise<void>;
    isSaving: boolean;
    editField: string | null;
    editValue: string;
    setEditField: (field: string | null) => void;
    handleSave: (value: string) => Promise<void>;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({
    displayName,
    displayEmail,
    displayPhone,
    displayCpf,
    handleEdit,
    showPasswordDialog,
    setShowPasswordDialog,
    setPasswordError,
    handlePasswordChange,
    isSaving,
    editField,
    editValue,
    setEditField,
    handleSave
}) => {
    return (
        <InfoContainer>
            {/* Name field */}
            <InfoRow>
                <InfoLabel>Nome</InfoLabel>
                <InfoValue>{displayName}</InfoValue>
                <EditButton
                    onClick={() => handleEdit('name', displayName)}
                    startIcon={<EditIcon />}
                    size="small"
                    color="primary"
                >
                    Editar
                </EditButton>
            </InfoRow>
            <StyledDivider />

            {/* Email field */}
            <InfoRow>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{displayEmail}</InfoValue>
                <EditButton
                    onClick={() => handleEdit('email', displayEmail)}
                    startIcon={<EditIcon />}
                    size="small"
                    color="primary"
                >
                    Editar
                </EditButton>
            </InfoRow>
            <StyledDivider />

            {/* Phone field */}
            <InfoRow>
                <InfoLabel>Telefone</InfoLabel>
                <InfoValue>{formatPhoneNumber(displayPhone)}</InfoValue>
                <EditButton
                    onClick={() => handleEdit('phone', displayPhone || '')}
                    startIcon={<EditIcon />}
                    size="small"
                    color="primary"
                >
                    {displayPhone ? 'Editar' : 'Adicionar'}
                </EditButton>
            </InfoRow>
            <StyledDivider />

            {/* CPF field */}
            <InfoRow>
                <InfoLabel>CPF</InfoLabel>
                <InfoValue>{formatCPF(displayCpf)}</InfoValue>
                <EditButton
                    onClick={() => handleEdit('cpf', displayCpf || '')}
                    startIcon={<EditIcon />}
                    size="small"
                    color="primary"
                >
                    {displayCpf ? 'Editar' : 'Adicionar'}
                </EditButton>
            </InfoRow>
            <StyledDivider />

            {/* Theme preference toggle */}
            <InfoRow>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <ThemePreference />
                </Box>
            </InfoRow>
            <StyledDivider />

            {/* Password field - just a button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <PasswordButton
                    onClick={() => setShowPasswordDialog(true)}
                    startIcon={<LockIcon />}
                    size="medium"
                    color="primary"
                >
                    Alterar Senha
                </PasswordButton>
            </Box>

            {/* Dialogs */}
            <PasswordDialog
                open={showPasswordDialog}
                onClose={() => {
                    setShowPasswordDialog(false);
                    setPasswordError("");
                }}
                onSave={handlePasswordChange}
                loading={isSaving}
            />

            <EditDialog
                open={!!editField}
                title={editField || ""}
                value={editValue}
                onClose={() => setEditField(null)}
                onSave={handleSave}
                loading={isSaving}
            />
        </InfoContainer>
    );
};