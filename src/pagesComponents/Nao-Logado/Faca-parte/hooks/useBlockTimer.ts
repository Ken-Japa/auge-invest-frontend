import { useEffect,useState } from "react";

import { BLOCK_DURATION, BLOCK_TIMER_SECONDS } from "../constants";

interface UseBlockTimerProps {
  storageKey?: string;
  blockDuration?: number;
  blockTimerSeconds?: number;
}

export const useBlockTimer = ({
  storageKey = "joinTeamBlockedUntil",
  blockDuration = BLOCK_DURATION,
  blockTimerSeconds = BLOCK_TIMER_SECONDS
}: UseBlockTimerProps = {}) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);

  useEffect(() => {
    const blockedUntil = localStorage.getItem(storageKey);
    if (blockedUntil) {
      const timeLeft = parseInt(blockedUntil) - Date.now();
      if (timeLeft > 0) {
        setIsBlocked(true);
        setBlockTimer(Math.ceil(timeLeft / 1000));
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBlocked && blockTimer > 0) {
      interval = setInterval(() => {
        setBlockTimer((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            localStorage.removeItem(storageKey);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimer, storageKey]);

  const blockUser = () => {
    const blockedUntil = Date.now() + blockDuration;
    localStorage.setItem(storageKey, blockedUntil.toString());
    setIsBlocked(true);
    setBlockTimer(blockTimerSeconds);
  };

  return { isBlocked, blockTimer, blockUser };
};
