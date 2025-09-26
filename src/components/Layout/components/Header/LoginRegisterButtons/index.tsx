import { PermIdentity, AppRegistration } from "@mui/icons-material";
import { motion } from "framer-motion";
import { CustomButton } from "../../../../Core/Button";
import { useRouter } from "next/navigation";


interface AuthButtonsProps {
    onButtonClick?: () => void;
    isFullWidth?: boolean;
    direction?: 'row' | 'column';
}

export const LoginsButtons = ({ onButtonClick, isFullWidth, direction = 'row' }: AuthButtonsProps) => {
    const router = useRouter();

    const handleLoginClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }
        router.push("/login");
    };

    const handleRegisterClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }
        router.push("/register");
    };

    return (
        <motion.div
            className={`flex gap-4 ${isFullWidth ? 'w-full' : ''} ${direction === 'column' ? 'flex-col' : 'flex-row'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <CustomButton
                value="Login"
                Icon={PermIdentity}
                customColor="#0056b3"
                textColor="#FFFFFF"
                onClick={handleLoginClick}
                fullWidth={isFullWidth}
                ariaLabel="Login"
            />
            <CustomButton
                value="Registrar"
                Icon={AppRegistration}
                customColor="#F5F5F5"
                textColor="#000000"
                onClick={handleRegisterClick}
                fullWidth={isFullWidth}
                ariaLabel="Registrar"
            />
        </motion.div>
    );
};