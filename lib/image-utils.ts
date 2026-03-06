import imageCompression from "browser-image-compression";

export async function compressImage(file: File): Promise<string> {
  const options = {
    maxWidthOrHeight: 1200,
    maxSizeMB: 0.5,
    useWebWorker: true,
    fileType: "image/jpeg" as const,
    initialQuality: 0.8,
  };

  const compressed = await imageCompression(file, options);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(compressed);
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
