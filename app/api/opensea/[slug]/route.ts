import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || '';

  try {
    const url = `https://api.opensea.io/api/v2/collection/${slug}/nfts?limit=50`;
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (apiKey) {
      headers['X-API-KEY'] = apiKey;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`OpenSea API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('OpenSea API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection data', nfts: [] },
      { status: 500 }
    );
  }
}

