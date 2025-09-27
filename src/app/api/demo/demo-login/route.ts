import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Função para lidar com requisições GET para a rota de demo-login
// Esta rota é usada para simular o login de um usuário demo e redirecionar para a dashboard
export async function GET(req: NextRequest) {
  // Dados mock do usuário para a demonstração
  const mockUser = { id: "demo", email: "demo@auge.com" };

  // Verifica se a variável de ambiente NEXTAUTH_SECRET está definida
  if (!process.env.NEXTAUTH_SECRET) {
    console.error("NEXTAUTH_SECRET is not defined in environment variables.");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  // Gera um token JWT com os dados do usuário mock e um tempo de expiração de 10 minutos
  const token = jwt.sign(mockUser, process.env.NEXTAUTH_SECRET, {
    expiresIn: "10m",
  });

  // Cria uma resposta de redirecionamento para a dashboard
  const response = NextResponse.redirect(new URL("/visao-economia", req.url));

  // Define o cookie de sessão com o token JWT
  // HttpOnly: impede o acesso ao cookie via JavaScript do lado do cliente
  // Path: o cookie estará disponível para todos os caminhos a partir da raiz
  // Max-Age: o cookie expira em 600 segundos (10 minutos)
  // Secure: o cookie só será enviado em requisições HTTPS
  // SameSite: ajuda a prevenir ataques CSRF
  response.cookies.set("authToken", token, {
    httpOnly: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days, matching next-auth default
    secure: process.env.NODE_ENV === "production", // Apenas em produção para HTTPS
    sameSite: "lax",
  });

  return response;
}
