import SendIcon from '@mui/icons-material/Send';
import { Autocomplete,Button, TextField } from "@mui/material";
import { type ChangeEvent,type FC, type FormEvent } from 'react';

import { FormData, FormErrors } from '../../types';
import { AutocompletePaper,ContactFormStyled } from "./styled";

interface ContactFormProps {
    formData: FormData;
    errors: FormErrors;
    isBlocked: boolean;
    blockTimer: number;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: FormEvent) => void;
}

const subjectOptions = [
    "Assinaturas",
    "Suporte Técnico",
    "Parcerias",
    "Dúvidas Gerais",
    "Feedback",
    "Outros"
];

export const ContactFormComponent: FC<ContactFormProps> = ({
    formData,
    errors,
    isBlocked,
    blockTimer,
    handleChange,
    handleSubmit
}) => {
    const commonTextFieldProps = {
        className: "form-field",
        onChange: handleChange
    };

    return (
        <ContactFormStyled onSubmit={handleSubmit} id="contato-form">
            <TextField
                {...commonTextFieldProps}
                label="Nome"
                name="name"
                value={formData.name}
                error={!!errors.name}
                helperText={errors.name}
                id="nome-contato"
            />
            <TextField
                {...commonTextFieldProps}
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                error={!!errors.email}
                helperText={errors.email}
                id="email-contato"
            />
            <Autocomplete
                className="form-field"
                freeSolo
                options={subjectOptions}
                value={formData.subject}
                onChange={(_, newValue) => {
                    handleChange({
                        target: { name: 'subject', value: newValue || '' }
                    } as ChangeEvent<HTMLInputElement>);
                }}
                componentsProps={{
                    paper: { 
                        component: AutocompletePaper 
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Assunto"
                        name="subject"
                        error={!!errors.subject}
                        helperText={errors.subject}
                        fullWidth
                        id="assunto-contato"
                    />
                )}
                id="assunto-contato2"
            />
            <TextField
                {...commonTextFieldProps}
                label="Mensagem"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                error={!!errors.message}
                helperText={errors.message}
                id="mensagem-contato"
            />
            <Button
                className="submit-button"
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                endIcon={<SendIcon />}
                disabled={isBlocked}
            >
                {isBlocked ? `Aguarde ${blockTimer}s` : 'Enviar Mensagem'}
            </Button>
        </ContactFormStyled>
    );
};