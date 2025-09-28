import dynamic from "next/dynamic";

import { HeaderSkeleton } from "./HeaderSkeleton";
import { HeaderContainer } from "./styled";

interface HeaderProps {
    isLoading?: boolean;
}

const DynamicMatrixRainText = dynamic(() => import("@/components/Effects/MatrixRainText").then(mod => mod.MatrixRainText), {
    ssr: false,
    loading: () => <span className="title">Carregando...</span>,
});

export const Header = ({ isLoading }: HeaderProps) => {
    if (isLoading) {
        return <HeaderSkeleton />;
    }
    return (

        <HeaderContainer>
            <DynamicMatrixRainText
                text="Quem Somos"
                className="title"
            />
        </HeaderContainer>
    );
};