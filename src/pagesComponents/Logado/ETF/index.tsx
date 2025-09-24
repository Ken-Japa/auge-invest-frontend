"use client";

import React from 'react';
import ETF from '../components/ETF';
import { PageBackground } from '@/components/Layout/PageBackground';

const ETFPage: React.FC = () => {
    return (
        <PageBackground imageName="ETFs">
            <ETF defaultPageSize={50} />
        </PageBackground>
    )
};

export default ETFPage;