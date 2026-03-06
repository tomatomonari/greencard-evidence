"use client";

import { useBuilderStore } from "@/lib/store";
import { compressImage } from "@/lib/image-utils";
import { Upload, User, Calendar, ArrowRight } from "lucide-react";
import { useRef } from "react";

interface BasicInfoStepProps {
  onNext: () => void;
}

export default function BasicInfoStep({ onNext }: BasicInfoStepProps) {
  const { basicInfo, updateBasicInfo } = useBuilderStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await compressImage(file);
    updateBasicInfo({ coverPhoto: dataUrl });
  };

  const canContinue =
    basicInfo.petitionerName.trim() && basicInfo.beneficiaryName.trim();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-muted">
          Enter the names as they appear on your immigration forms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            <User className="w-4 h-4 inline mr-1.5" />
            Petitioner (US Citizen/LPR)
          </label>
          <input
            type="text"
            value={basicInfo.petitionerName}
            onChange={(e) =>
              updateBasicInfo({ petitionerName: e.target.value })
            }
            placeholder="Full legal name"
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            <User className="w-4 h-4 inline mr-1.5" />
            Beneficiary (Applicant)
          </label>
          <input
            type="text"
            value={basicInfo.beneficiaryName}
            onChange={(e) =>
              updateBasicInfo({ beneficiaryName: e.target.value })
            }
            placeholder="Full legal name"
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          <Calendar className="w-4 h-4 inline mr-1.5" />
          Filing Date (optional)
        </label>
        <input
          type="date"
          value={basicInfo.filingDate}
          onChange={(e) => updateBasicInfo({ filingDate: e.target.value })}
          className="w-full max-w-xs px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Cover Photo (optional)
        </label>
        <p className="text-sm text-muted mb-2">
          A nice photo of you two together for the cover page.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverPhoto}
          className="hidden"
        />
        {basicInfo.coverPhoto ? (
          <div className="relative w-48 h-48">
            <img
              src={basicInfo.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => updateBasicInfo({ coverPhoto: undefined })}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-48 h-48 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <Upload className="w-8 h-8" />
            <span className="text-sm">Upload photo</span>
          </button>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
