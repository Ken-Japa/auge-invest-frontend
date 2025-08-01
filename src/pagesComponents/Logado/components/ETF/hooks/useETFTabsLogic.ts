import { useState, useCallback } from 'react';

export const useETFTabsLogic = () => {
    const [value, setValue] = useState(0);

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    return {
        value,
        handleChange,
    };
};