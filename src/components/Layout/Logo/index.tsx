import { LogoImage } from "@/components/Utils/OptimizedImage/specialized";
import { LogoContainer } from "./styled";

interface LogoProps {
    width?: number;
    height?: number;
    onClick?: () => void;
    className?: string;
}

export const Logo = ({
    width = 60,
    height = 60,
    onClick,
    className = ''
}: LogoProps) => {
    return (
        <LogoContainer 
            onClick={onClick} 
            style={{ cursor: onClick ? 'pointer' : 'default' }}
            className={className}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            } : undefined}
            aria-label={onClick ? 'Go to homepage' : 'Auge Invest logo'}
        >
            <LogoImage
                src="/assets/images/logo/icon-48.png"
                alt="Auge Invest - Investment analysis platform"
                width={width}
                height={height}
                className="transition-transform hover:scale-105"
            />
        </LogoContainer>
    );
}
