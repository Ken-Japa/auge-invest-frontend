import { type FC } from 'react';

import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";

import { FormData, FormErrors } from '../../types';
import { ContentContainer, FormContainer } from './styled';

interface ContactContentProps {
    imageLoaded: boolean;
    formData: FormData;
    errors: FormErrors;
    isBlocked: boolean;
    blockTimer: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    Header: React.LazyExoticComponent<FC<any>>;
    ContactInfo: React.LazyExoticComponent<FC<any>>;
    ContactFormComponent: React.LazyExoticComponent<FC<any>>;
    ContactFormSkeleton: React.LazyExoticComponent<FC>;
}

export const ContactContent: FC<ContactContentProps> = ({
    imageLoaded,
    formData,
    errors,
    isBlocked,
    blockTimer,
    handleChange,
    handleSubmit,
    Header,
    ContactInfo,
    ContactFormComponent,
    ContactFormSkeleton
}) => (
    <ContentContainer spacing={4}>
        <SuspenseWrapper>
            <Header isLoading={!imageLoaded} />
        </SuspenseWrapper>

        <FormContainer
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
        >
            <SuspenseWrapper>
                <ContactInfo isLoading={!imageLoaded} />
            </SuspenseWrapper>

            <SuspenseWrapper>
                {!imageLoaded ? (
                    <ContactFormSkeleton />
                ) : (
                    <ContactFormComponent
                        formData={formData}
                        errors={errors}
                        isBlocked={isBlocked}
                        blockTimer={blockTimer}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                )}
            </SuspenseWrapper>
        </FormContainer>
    </ContentContainer>
);