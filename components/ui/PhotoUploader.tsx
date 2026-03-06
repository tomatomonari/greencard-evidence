"use client";

import { Upload } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { compressImage, generateId } from "@/lib/image-utils";
import { PhotoItem } from "@/lib/types";

interface PhotoUploaderProps {
  onUpload: (photo: PhotoItem) => void;
}

export default function PhotoUploader({ onUpload }: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      setIsProcessing(true);
      const fileArr = Array.from(files);
      for (const file of fileArr) {
        if (!file.type.startsWith("image/")) continue;
        const dataUrl = await compressImage(file);
        onUpload({
          id: generateId(),
          dataUrl,
        });
      }
      setIsProcessing(false);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && processFiles(e.target.files)}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        disabled={isProcessing}
        className={`w-full border-2 border-dashed rounded-lg py-8 flex flex-col items-center justify-center gap-2 transition-colors
          ${
            isDragging
              ? "border-accent bg-accent-light"
              : "border-border hover:border-accent"
          }
          ${isProcessing ? "opacity-50 cursor-wait" : "cursor-pointer"}
        `}
      >
        <Upload className="w-8 h-8 text-muted" />
        <span className="text-sm text-muted">
          {isProcessing
            ? "Processing..."
            : "Drop photos here or click to browse"}
        </span>
        <span className="text-xs text-muted">
          Supports JPG, PNG, HEIC — auto-compressed
        </span>
      </button>
    </div>
  );
}
