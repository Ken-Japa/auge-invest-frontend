export function getAuthToken(): string | null {
  const localToken = localStorage.getItem("authToken");
  if (localToken) return localToken;

  const cookieToken = getCookie("authToken") || getCookie("clientAuthToken");
  if (cookieToken) return cookieToken;

  const userId = getUserIdNoConsole();
  if (userId && userId.includes("@") === false) {
    const tempToken = `google_${userId}`;
    localStorage.setItem("authToken", tempToken);
    return tempToken;
  }

  return null;
}

// Função centralizada para definir dados de autenticação
export function setAuthData(token: string, userId?: string): void {
  if (!token) return;
  
  // Armazenar no localStorage (para acesso do cliente)
  if (typeof window !== 'undefined') {
    localStorage.setItem("authToken", token);
    
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }
  
  // Também definir em cookies para acesso entre abas
  if (typeof document !== "undefined") {
    const maxAge = 30 * 24 * 60 * 60; // 30 dias em segundos
    document.cookie = `authToken=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
    
    if (userId) {
      document.cookie = `userId=${userId}; path=/; max-age=${maxAge}; SameSite=Lax`;
    }
  }
}

function getUserIdNoConsole(): string | null {
  const localUserId = localStorage.getItem("userId");
  if (localUserId) return localUserId;

  const cookieUserId = getCookie("userId");
  if (cookieUserId) return cookieUserId;

  const sessionData = sessionStorage.getItem("nextauth.session");
  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      if (session?.user?.id) return session.user.id;
      if (session?.user?.email) return session.user.email;
    } catch (e) {}
  }

  return null;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift() || null;
    return cookieValue;
  }
  return null;
}

export function getUserId(session: any): string | null {
  const localUserId = localStorage.getItem("userId");
  if (localUserId) return localUserId;

  const cookieUserId = getCookie("userId");
  if (cookieUserId) return cookieUserId;

  if (session?.user?.id) return session.user.id;
  if (session?.user?.email) return session.user.email;

  return null;
}

export function clearAuthData(): void {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");

  if (typeof document !== "undefined") {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "clientAuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}


/**
 * Checks if the current auth token is valid
 * @returns {boolean} True if a valid token exists
 */
export function hasValidToken(): boolean {
  const token = getAuthToken();
  
  if (!token) return false;
  
  // If it's a Google token, assume it's valid (we can't easily check)
  if (token.startsWith('google_')) return true;
  
  // For JWT tokens, we could check expiration if the token is decoded
  // This is a simplified check - in a real app, you might want to decode the JWT
  // and check its expiration date
  return token.length > 20; // Arbitrary length check for a valid JWT
}

/**
 * Checks if the user is authenticated
 * @returns {boolean} True if the user is authenticated
 */
export function isAuthenticated(): boolean {
  return hasValidToken() && !!getUserIdNoConsole();
}
