import { NextRequest, NextResponse } from 'next/server';
import portfolioData from '../../../dummy.json';

export async function GET() {
  try {
    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
