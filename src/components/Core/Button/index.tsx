import { Button, ButtonProps, Theme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { ButtonPropsColorOverrides, ButtonPropsSizeOverrides } from '@mui/material';
import { SxProps } from '@mui/system';
import { HTMLMotionProps } from 'framer-motion';

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'color' | 'size'> {
    value?: string;
    Icon?: React.ComponentType;
    color?: OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >;
    customColor?: string;
    textColor?: string;
    variant?: 'contained' | 'outlined' | 'text';
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
    margin?: string;
    align?: string;
    padding?: string;
    borderRadius?: string;
    disabled?: boolean;
    component?: any;
    whilehover?: HTMLMotionProps<"button">["whileHover"];
    whiletap?: HTMLMotionProps<"button">["whileTap"];
    initial?: HTMLMotionProps<"button">["initial"];
    animate?: HTMLMotionProps<"button">["animate"];
    transition?: HTMLMotionProps<"button">["transition"];
}

export const CustomButton = ({
    value,
    Icon,
    color = "primary",
    customColor,
    textColor,
    variant = "contained",
    size = "medium",
    onClick,
    fullWidth,
    margin,
    align,
    padding = '10px 30px',
    borderRadius = '100px',
    disabled = false,
    className,
    sx,
    children,
    startIcon,
    component,
    whilehover,
    whiletap,
    initial,
    animate,
    transition,
    ...props
}: CustomButtonProps) => {
    const customStyles: SxProps<Theme> = {
        margin,
        alignSelf: align,
        padding,
        borderRadius,
        textTransform: 'none',
        '&.Mui-disabled': {
            opacity: 0.7,
        },
        ...(customColor && {
            bgcolor: customColor,
            '&:hover': {
                bgcolor: customColor,
                filter: 'brightness(0.9)',
            },
        }),
        ...(textColor && {
            color: textColor,
        }),
        ...sx
    };

    return (
        <Button
            onClick={onClick}
            fullWidth={fullWidth}
            variant={variant}
            color={customColor ? undefined : color}
            size={size}
            disabled={disabled}
            className={className}
            sx={customStyles}
            startIcon={startIcon || (Icon && <Icon />)}
            component={component}
            whilehover={whilehover}
            whiletap={whiletap}
            initial={initial}
            animate={animate}
            transition={transition}
            {...props}
        >
            {children || value}
        </Button>
    );
}