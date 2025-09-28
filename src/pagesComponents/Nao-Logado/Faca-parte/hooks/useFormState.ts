import { useState } from 'react';

import { INITIAL_FORM_DATA } from '../constants';
import { FormData, FormErrors } from '../types';

export const useFormState = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };

    const closeSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        isSubmitting,
        setIsSubmitting,
        snackbar,
        setSnackbar,
        handleChange,
        closeSnackbar
    };
};