import { ButtonPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { type FC } from 'react';

import { CustomButton } from "@/components/Core/Button";

import { CardContainer } from "./styled";

interface CardProps {
    title: string;
    price: string;
    list?: readonly string[];
    discount?: string;
    valueBtn: string;
    colorBtn?: OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >;
    customColorBtn?: string;
    textColorBtn?: string;
}
export const Card: FC<CardProps> = ({
    title,
    price,
    list,
    discount,
    valueBtn,
    colorBtn,
    customColorBtn,
    textColorBtn
}) => {
    return (
        <CardContainer
            className="glow-hover gradient-bg"
            direction="column"
            alignItems="center"
            padding="30px"
        >
            <h3 className="text-2xl mb-4 glitch text-white" data-text={title}>{title}</h3>
            <div className="flex items-center mb-5">
                <h2 className="text-4xl font-bold text-white">{price}</h2>
                <small className="ml-2 opacity-80 text-white">/{title.toLowerCase()}</small>
            </div>
            {(list && list.length > 0) &&
                <ul className="mb-5 space-y-3 text-white">
                    {list.map(item => (
                        <li key={item} className="flex items-center">
                            <span className="mr-2 text-white">›</span>
                            {item}
                        </li>
                    ))}
                </ul>
            }
            {discount &&
                <span className="text-[#FF6B00] mb-5 px-4 py-2 border border-[#FF6B00] rounded-md font-semibold">
                    {`${discount} desconto`}
                </span>
            }
            <CustomButton
                value={valueBtn}
                color={!customColorBtn ? colorBtn : undefined}
                customColor={customColorBtn}
                textColor={textColorBtn}
                margin="0"
                align="center"
                className="mt-4 w-full"
            />
        </CardContainer>
    );
}