import { useEffect, useState } from 'react'

export const useBlockTimer = (duration: number, storageKey: string) => {
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimer, setBlockTimer] = useState(0)

  const handleBlock = () => {
    const blockedUntil = Date.now() + duration
    localStorage.setItem(storageKey, blockedUntil.toString())
    setIsBlocked(true)
    setBlockTimer(duration / 1000)
  }

  useEffect(() => {
    const blockedUntil = localStorage.getItem(storageKey)
    if (blockedUntil) {
      const timeLeft = parseInt(blockedUntil) - Date.now()
      if (timeLeft > 0) {
        setIsBlocked(true)
        setBlockTimer(Math.ceil(timeLeft / 1000))
      } else {
        localStorage.removeItem(storageKey)
      }
    }
  }, [storageKey])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isBlocked && blockTimer > 0) {
      timer = setInterval(() => {
        setBlockTimer((prev) => {
          if (prev <= 1) {
            setIsBlocked(false)
            localStorage.removeItem(storageKey)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isBlocked, blockTimer, storageKey])

  return { isBlocked, blockTimer, handleBlock }
}
