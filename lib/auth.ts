import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Secret should be at least 32 bytes long for HS256 algorithm
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_at_least_32_characters_long'
);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Token expires in 24 hours
    .sign(secret);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(formData: FormData) {
  // Get email and password from form
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Add your authentication logic here
  // This is a placeholder - you would verify credentials against your database
  
  // Set JWT token in cookies upon successful authentication
  const token = await encrypt({ email, role: 'admin' }); // Set appropriate role
  cookies().set('token', token, { httpOnly: true });
  return { success: true };
}

export async function logout() {
  cookies().delete('token');
}

export async function getSession() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  return await decrypt(token);
}

export function updateSession(request: NextRequest) {
  // Check if there's a token in the request cookies
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    // If no token and trying to access protected routes, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Otherwise, allow the request to proceed
  return NextResponse.next();
}