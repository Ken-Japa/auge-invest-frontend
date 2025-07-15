"use client";

import React from 'react';
import ETF from '../components/ETF';
import { ETFPageContainer } from './styled'

const ETFPage: React.FC = () => {
    return (
        <ETFPageContainer>
            <ETF />
        </ETFPageContainer>
    )
};

export default ETFPage;