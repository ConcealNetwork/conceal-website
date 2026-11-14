/**
 * Load images with a specific naming pattern (sequential numbered files).
 */
export function loadImagesWithPattern(
  folderPath: string,
  pattern: string = 'assistant',
  count: number = 5,
  extension: string = 'png'
): string[] {
  const images: string[] = [];

  for (let i = 1; i <= count; i++) {
    const num = i.toString().padStart(2, '0');
    images.push(`${folderPath}/${pattern}_${num}.${extension}`);
  }

  return images;
}
