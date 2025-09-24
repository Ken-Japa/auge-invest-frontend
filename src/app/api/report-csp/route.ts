import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('CSP Violation Report:', body);
    // In a real application, you would save this report to a database
    // or send it to a logging service.
    return NextResponse.json({ message: 'CSP report received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return NextResponse.json({ message: 'Error processing CSP report' }, { status: 500 });
  }
}