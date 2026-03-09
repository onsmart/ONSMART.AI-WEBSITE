/**
 * Supabase Storage: marketing-pdfs, marketing-images.
 * Uses the same admin client as db (service role).
 */

import { supabaseAdmin } from './db.js';
import { sanitizeFileName } from './sanitize.js';

const BUCKET_PDFS = 'marketing-pdfs';
const BUCKET_IMAGES = 'marketing-images';

export type BucketKind = 'pdf' | 'image';

export async function uploadMarketingFile(
  bucket: BucketKind,
  path: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<{ path: string; error: string | null }> {
  if (!supabaseAdmin) return { path: '', error: 'Storage not configured' };
  const bucketName = bucket === 'pdf' ? BUCKET_PDFS : BUCKET_IMAGES;
  const safePath = path.split('/').map(sanitizeFileName).join('/');
  const { error } = await supabaseAdmin.storage.from(bucketName).upload(safePath, body, {
    contentType,
    upsert: true,
  });
  if (error) return { path: '', error: error.message };
  return { path: safePath, error: null };
}

export function getPublicUrl(bucket: BucketKind, path: string): string {
  if (!supabaseAdmin) return '';
  const bucketName = bucket === 'pdf' ? BUCKET_PDFS : BUCKET_IMAGES;
  const { data } = supabaseAdmin.storage.from(bucketName).getPublicUrl(path);
  return data?.publicUrl ?? '';
}

export async function getSignedUrl(bucket: BucketKind, path: string, expiresInSeconds = 3600): Promise<string> {
  if (!supabaseAdmin) return '';
  const bucketName = bucket === 'pdf' ? BUCKET_PDFS : BUCKET_IMAGES;
  const { data, error } = await supabaseAdmin.storage.from(bucketName).createSignedUrl(path, expiresInSeconds);
  if (error || !data?.signedUrl) return '';
  return data.signedUrl;
}

/** Download file from marketing storage for email attachment. */
export async function downloadMarketingFile(
  bucket: BucketKind,
  path: string
): Promise<{ buffer: Buffer; contentType: string; filename: string } | null> {
  if (!supabaseAdmin) return null;
  const bucketName = bucket === 'pdf' ? BUCKET_PDFS : BUCKET_IMAGES;
  const { data, error } = await supabaseAdmin.storage.from(bucketName).download(path);
  if (error || !data) return null;
  const buf = Buffer.from(await data.arrayBuffer());
  const ext = path.split('.').pop()?.toLowerCase() || (bucket === 'pdf' ? 'pdf' : 'jpg');
  const contentType = bucket === 'pdf' ? 'application/pdf' : `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  const filename = path.split('/').pop() || `file.${ext}`;
  return { buffer: buf, contentType, filename };
}

const IMAGE_EXT = /\.(jpe?g|png|gif|webp)$/i;
const PDF_EXT = /\.pdf$/i;

/** Fetch file from URL for email attachment (e.g. public/signed Supabase or external). */
export async function fetchFileFromUrl(
  url: string
): Promise<{ buffer: Buffer; contentType: string; filename: string } | null> {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const disp = res.headers.get('content-disposition');
    let filename = 'arquivo.pdf';
    if (disp && /filename[*]?=(?:UTF-8'')?([^;\s]+)/i.test(disp)) {
      filename = (disp.match(/filename[*]?=(?:UTF-8'')?([^;\s]+)/i) || [])[1]?.replace(/^["']|["']$/g, '') || filename;
    } else {
      const pathPart = url.split('?')[0];
      const segment = pathPart.split('/').pop() || '';
      if (PDF_EXT.test(segment)) filename = segment;
      else if (IMAGE_EXT.test(segment)) filename = segment;
    }
    return { buffer: buf, contentType, filename };
  } catch {
    return null;
  }
}
