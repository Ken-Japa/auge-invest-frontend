import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { LogoContainer } from "./styled";

interface LogoProps {
    width?: number;
    height?: number;
    onClick?: () => void;
}

export const Logo = ({
    width = 60,
    height = 60,
    onClick
}: LogoProps) => {
    return (
        <LogoContainer onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <OptimizedImage
                src="/assets/images/logo/icon-48.png"
                alt="Auge Invest"
                width={width}
                height={height}
                priority
                quality={100}
                style={{
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto',
                    aspectRatio: `${width}/${height}`
                }}
            />
        </LogoContainer>
    );
}