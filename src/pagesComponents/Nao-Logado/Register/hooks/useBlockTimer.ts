import { useEffect,useState } from 'react';

export const useBlockTimer = (initialDuration: number) => {
    const [isBlocked, setIsBlocked] = useState(false);
    const [blockTimer, setBlockTimer] = useState(0);

    const handleBlockUser = () => {
        const blockedUntil = Date.now() + initialDuration;
        localStorage.setItem('registerBlockedUntil', blockedUntil.toString());
        setIsBlocked(true);
        setBlockTimer(initialDuration / 1000);
    };

    useEffect(() => {
        const checkBlockStatus = () => {
            const blockedUntil = localStorage.getItem('registerBlockedUntil');
            if (blockedUntil) {
                const timeLeft = parseInt(blockedUntil) - Date.now();
                if (timeLeft > 0) {
                    setIsBlocked(true);
                    setBlockTimer(Math.ceil(timeLeft / 1000));
                } else {
                    localStorage.removeItem('registerBlockedUntil');
                    setIsBlocked(false);
                }
            }
        };

        checkBlockStatus();

        if (isBlocked && blockTimer > 0) {
            const timer = setInterval(() => {
                setBlockTimer(prev => {
                    if (prev <= 1) {
                        setIsBlocked(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isBlocked, blockTimer, initialDuration]);

    return { isBlocked, blockTimer, handleBlockUser };
};