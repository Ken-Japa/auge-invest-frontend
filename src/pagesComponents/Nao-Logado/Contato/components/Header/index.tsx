import { type FC } from 'react';

import { HeaderSkeleton } from "./HeaderSkeleton";
import { HeaderContainer, HeaderStack, MatrixTitle,SubtitleText } from "./styled";

interface HeaderProps {
    isLoading: boolean;
}

const headerContent = {
    title: "Entre em Contato",
    subtitles: [
        "Estamos aqui para ajudar. Entre em contato conosco!"
    ]
} as const;

export const Header: FC<HeaderProps> = ({ isLoading }) => {
    if (isLoading) {
        return (
            <HeaderContainer>
                <HeaderSkeleton />
            </HeaderContainer>
        );
    }

    return (
        <HeaderContainer>
            <HeaderStack spacing={2}>
                <MatrixTitle
                    text={headerContent.title}
                    className="title"
                />
                {headerContent.subtitles.map((text, index) => (
                    <SubtitleText
                        key={index}
                        variant="h4"
                        className="subtitle"
                    >
                        {text}
                    </SubtitleText>
                ))}
            </HeaderStack>
        </HeaderContainer>
    );
};