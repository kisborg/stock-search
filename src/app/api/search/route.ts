import { ERROR_API_RATE_LIMIT } from '@/constants/error-strings';
import { SearchItem } from '@/types/SearchResponse';
import { stripNumberingFromKeys } from '@/utils/helper-functions';
import { NextRequest } from 'next/server';

const TOKEN = process.env.API_TOKEN;
const API_URL = process.env.API_URL;

export async function GET(req: NextRequest): Promise<Response> {
  const query = req.nextUrl.searchParams.get('q') ?? '';
  const url = `${API_URL}/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${TOKEN}`;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    const data = await res.json();

    let response: Response;
    if (data.Information?.match(ERROR_API_RATE_LIMIT)) {
      response = Response.json(
        { result: 'error', error: 'Too many requests' },
        { status: 429 }
      );
    } else {
      const listWithoutNumbering = data.bestMatches.map(
        (item: { [key: string]: string }) => stripNumberingFromKeys(item)
      ) as SearchItem[];
      response = Response.json(
        { result: 'success', symbols: listWithoutNumbering },
        { status: 200 }
      );

      response.headers.set(
        'Cache-Control',
        'public, max-age=300, s-maxage=300, stale-while-revalidate=300'
      );
    }

    return response;
  } catch (error) {
    return Response.json(
      { result: 'error', error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
