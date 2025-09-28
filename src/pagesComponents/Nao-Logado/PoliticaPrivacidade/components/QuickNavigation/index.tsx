import { PRIVACY_SECTIONS } from "../../constants/sections";
import { QuickNavigationSkeleton } from "./QuickNavigationSkeleton";
import { NavigationContainer, NavigationTitle } from "./styled";

interface QuickNavigationProps {
    onSectionClick: (sectionId: string) => void;
    isLoading?: boolean;
}

export const QuickNavigation = ({ onSectionClick, isLoading }: QuickNavigationProps) => {
    if (isLoading) {
        return <QuickNavigationSkeleton />;
    }

    return (
        <>
            <NavigationTitle variant="h6">
                Navegação Rápida
            </NavigationTitle>
            <NavigationContainer>
                <div className="navigation-grid">
                    {PRIVACY_SECTIONS.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onSectionClick(section.id);
                            }}
                            className="nav-link"
                        >
                            {section.title}
                        </a>
                    ))}
                </div>
            </NavigationContainer>
        </>
    );
};