import type {APIRoute} from 'astro';

export const prerender = false;

const KEY = "T.Workz vol.8.zip"

export const GET: APIRoute = async ({locals}) => {
  const object = await locals.runtime.env.R2.get(KEY)

  if (object === null) {
    return new Response('Object Not Found', { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body, {
    headers,
  });
}
