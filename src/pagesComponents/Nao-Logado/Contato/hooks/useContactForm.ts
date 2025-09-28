import { type ReadonlyURLSearchParams } from 'next/navigation';
import { useState } from 'react';

import { FormData, FormErrors } from '../types';

export const useContactForm = (searchParams: ReadonlyURLSearchParams) => {
    const [formData, setFormData] = useState<FormData>({
        name: searchParams.get('name') || "",
        email: searchParams.get('email') || "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Assunto é obrigatório';
        if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { formData, errors, handleChange, validateForm };
};