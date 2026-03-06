"use client";

import { Trash2, Receipt } from "lucide-react";
import { PhotoItem } from "@/lib/types";

interface PhotoCardProps {
  photo: PhotoItem;
  onUpdate: (updates: Partial<PhotoItem>) => void;
  onRemove: () => void;
}

export default function PhotoCard({ photo, onUpdate, onRemove }: PhotoCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden group">
      <div className="relative aspect-square">
        <img
          src={photo.dataUrl}
          alt={photo.caption || "Photo"}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onUpdate({ isReceipt: !photo.isReceipt })}
            title={photo.isReceipt ? "Marked as receipt" : "Mark as receipt"}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
              photo.isReceipt
                ? "bg-amber-500 text-white"
                : "bg-white/90 text-muted hover:bg-amber-100"
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRemove}
            className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        {photo.isReceipt && (
          <span className="absolute bottom-2 left-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
            Receipt
          </span>
        )}
      </div>
      <div className="p-2 space-y-1.5">
        <input
          type="text"
          value={photo.caption || ""}
          onChange={(e) => onUpdate({ caption: e.target.value })}
          placeholder="Caption"
          className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <div className="grid grid-cols-3 gap-1">
          <input
            type="text"
            value={photo.who || ""}
            onChange={(e) => onUpdate({ who: e.target.value })}
            placeholder="Who"
            className="px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            type="text"
            value={photo.date || ""}
            onChange={(e) => onUpdate({ date: e.target.value })}
            placeholder="Date"
            className="px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            type="text"
            value={photo.location || ""}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="Location"
            className="px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
    </div>
  );
}
