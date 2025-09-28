import { Typography } from "@mui/material";

import { SECTIONS } from "../../constants/sections";
import { QuickNavigationSkeleton } from "./QuickNavigationSkeleton";
import { NavigationContainer } from "./styled";

interface QuickNavigationProps {
    onSectionClick: (sectionId: string) => void;
    isLoading?: boolean;
}

export const QuickNavigation = ({ onSectionClick, isLoading }: QuickNavigationProps) => {
    if (isLoading) {
        return <QuickNavigationSkeleton />;
    }

    return (
        <NavigationContainer>
            <Typography variant="h4" className="navigation-title">
                Navegação Rápida
            </Typography>
            <div className="navigation-content">
                <div className="navigation-grid">
                    {SECTIONS.map((section) => (
                        <Typography
                            key={section.id}
                            className="navigation-link"
                            onClick={() => onSectionClick(section.id)}
                            variant="body1"
                        >
                            {section.title}
                        </Typography>
                    ))}
                </div>
            </div>
        </NavigationContainer>
    );
};

export default QuickNavigation;