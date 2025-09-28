"use client";

import React from 'react';

import { PageBackground } from '@/components/Layout/PageBackground';

import ETF from '../components/ETF';

const ETFPage: React.FC = () => {
    return (
        <PageBackground imageName="ETFs">
            <ETF defaultPageSize={50} />
        </PageBackground>
    )
};

export default ETFPage;