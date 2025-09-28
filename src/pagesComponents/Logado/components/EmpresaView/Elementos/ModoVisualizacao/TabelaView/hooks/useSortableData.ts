import { useState } from 'react';

export const useSortableData = (defaultOrderBy = '') => {
    const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');

    const handleSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return {
        orderBy,
        order,
        handleSort
    };
};