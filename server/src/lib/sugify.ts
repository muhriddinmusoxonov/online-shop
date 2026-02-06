import slugify from 'slugify';

export async function generateSlug(title: string): Promise<string> {
  return slugify(title, {
    lower: true,
    strict: true,
  });
}
