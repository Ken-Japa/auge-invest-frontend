import { Typography } from "@mui/material";
import { type FC } from 'react';

import { HeaderSkeleton } from "./HeaderSkeleton";
import { HeaderContainer, HeaderIcon } from "./styled";

interface HeaderProps {
    isLoading?: boolean;
}

const HEADER_TEXT = {
    title: "Embaixadores",
    subtitle: "Nossos Parceiros de Sucesso",
    description: "Conheça as pessoas que acreditam em nossa missão e nos ajudam a transformar o mercado financeiro."
} as const;

export const Header: FC<HeaderProps> = ({ isLoading }) => {
    if (isLoading) {
        return <HeaderSkeleton />;
    }

    return (
        <HeaderContainer spacing={3}>
            <HeaderIcon />
            <Typography variant="h1" className="header-title">
                {HEADER_TEXT.title}
            </Typography>
            <Typography variant="h3" className="header-subtitle">
                {HEADER_TEXT.subtitle}
            </Typography>
            <Typography variant="h4" className="header-description">
                {HEADER_TEXT.description}
            </Typography>
        </HeaderContainer>
    );
};

export default Header;