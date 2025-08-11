import { SearchItem, SearchResponse } from '@/types/SearchResponse';
import { stripNumberingFromKeys } from '@/utils/helper-functions';
import { NextRequest } from 'next/server';

const TOKEN = process.env.API_TOKEN;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') ?? '';
  const url = `${process.env.API_URL}/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${TOKEN}`;
  const res = await fetch(url);
  const json = (await res.json()) as SearchResponse;
  const listWithoutNumbering = json.bestMatches.map(
    (item: { [key: string]: string }) => stripNumberingFromKeys(item)
  ) as SearchItem[];
  return Response.json(listWithoutNumbering);
}
