import { type FC } from 'react';
import dynamic from 'next/dynamic';
import { HeaderSkeleton } from "./HeaderSkeleton";
import { HeaderContainer, HeaderIcon } from "./styled";

interface HeaderProps {
    isLoading?: boolean;
}

const DynamicMatrixRainText = dynamic(() => import('@/components/Effects/MatrixRainText').then(mod => mod.MatrixRainText), {
    ssr: false,
    loading: () => <span className="title">Carregando...</span>,
});

export const Header: FC<HeaderProps> = ({ isLoading }) => {
    if (isLoading) {
        return <HeaderSkeleton />;
    }

    return (
        <HeaderContainer>
            <div className="header-icon-wrapper">
                <HeaderIcon />
                <DynamicMatrixRainText
                    text="Dúvidas Frequentes"
                    className="title"
                />
            </div>
            <p className="subtitle">
                Encontre respostas para as perguntas mais comuns sobre a Auge Invest
            </p>
        </HeaderContainer>
    );
};