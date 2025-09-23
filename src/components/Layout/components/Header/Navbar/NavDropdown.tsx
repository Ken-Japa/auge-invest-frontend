import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DropdownItem } from "../../../constants/Navigation";
import { LinkNavbar } from "./styled";

interface NavDropdownProps {
    name: string;
    path: string;
    items: DropdownItem[];
    onClick?: () => void;
}

export const NavDropdown = ({ name, path, items, onClick }: NavDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle click on the main dropdown button
    const handleMainClick = (e: React.MouseEvent) => {
        // If menu is open and user clicks on text (not arrow), navigate to path
        if (isOpen && !(e.target as HTMLElement).closest('.dropdown-arrow')) {
            router.push(path);
            setIsOpen(false);
            onClick?.();
        } else {
            // If menu is closed, open it regardless of where they clicked
            setIsOpen(!isOpen);
        }
    };

    // Handle arrow click specifically
    const handleArrowClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the parent click handler
        setIsOpen(!isOpen); // Toggle dropdown state
    };

    // Handle hover to open dropdown
    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleItemClick = (itemPath: string) => {
        router.push(itemPath);
        setIsOpen(false);
        onClick?.();
    };

    return (
        <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter}>
            <LinkNavbar
                className={`
                    px-3 py-2 rounded-md transition-all duration-200
                    text-white/70 hover:text-white hover:bg-white/5
                    flex items-center gap-1
                `}
                onClick={handleMainClick}
                aria-label={name}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {name}
                <span 
                    className="dropdown-arrow" 
                    onClick={handleArrowClick}
                    aria-label={`Abrir/Fechar menu ${name}`}
                >
                    <KeyboardArrowDownIcon
                        fontSize="small"
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </span>
            </LinkNavbar>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 bg-[#1A1A1A] rounded-md shadow-lg z-50 min-w-[200px] border border-white/10"
                        role="menu"
                    >
                        {items.map((item) => (
                            <div
                                key={item.name}
                                className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
                                onClick={() => handleItemClick(item.path)}
                                role="menuitem"
                            >
                                {item.name}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};