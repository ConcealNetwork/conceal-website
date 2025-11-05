/**
 * Helper function to generate image paths from a folder
 * Tries to load images sequentially (01, 02, 03, etc.) until one fails
 * This is a best-effort approach since we can't list files at runtime
 */
export function generateImagePaths(
  folderPath: string,
  pattern: string = 'assistant',
  maxAttempts: number = 20
): string[] {
  const images: string[] = [];

  // Try to load images with 2-digit zero-padded numbers (01, 02, 03, etc.)
  for (let i = 1; i <= maxAttempts; i++) {
    const num = i.toString().padStart(2, '0');
    // Try common image extensions
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];

    for (const ext of extensions) {
      const path = `${folderPath}/${pattern}_${num}.${ext}`;
      images.push(path);
      break; // Only add one per number
    }
  }

  return images;
}

/**
 * Alternative: Load images with specific naming pattern
 * This function assumes images are named sequentially
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
