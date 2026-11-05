import React, { useRef, useState } from "react";
import { Upload, Trash2, Link, RefreshCw, AlertCircle, Check } from "lucide-react";

interface ImageUploadFieldProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  aspectRatio?: "square" | "wide" | "avatar";
  helperText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  folder = "speakers",
  placeholder = "https://...",
  aspectRatio = "square",
  helperText = "Stores to public folder via PHP backend",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setErrorMessage(null);
    setUploadSuccess(false);

    // 1. Instant local preview
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onChange(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    // 2. Upload to PHP backend
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload-image.php", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          onChange(data.url);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        } else {
          setErrorMessage(data.error || "Upload failed");
        }
      } else {
        setErrorMessage("Upload request returned " + res.status);
      }
    } catch (err: any) {
      // Local preview is kept so user doesn't lose work
      setErrorMessage("Upload failed, local preview preserved");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const previewAspectClass =
    aspectRatio === "avatar"
      ? "w-12 h-12 rounded-full"
      : aspectRatio === "wide"
      ? "w-20 h-12 rounded-lg"
      : "w-14 h-14 rounded-xl";

  return (
    <div className="space-y-1.5 font-sans">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase tracking-wider">
            {label}
          </span>
          {helperText && (
            <span className="text-[9px] text-zinc-400 font-mono">
              {helperText}
            </span>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="flex items-center gap-2 p-2 bg-zinc-50 border border-zinc-200 rounded-xl group hover:border-zinc-300 transition">
          {/* Thumbnail preview */}
          <div className={`relative overflow-hidden bg-zinc-200 shrink-0 border border-zinc-300 ${previewAspectClass}`}>
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                // Fallback for broken URLs
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200";
              }}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
              </div>
            )}
          </div>

          {/* Info & URL */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-zinc-800 font-mono truncate block">
                {isUploading ? "Uploading to PHP..." : value.startsWith("data:") ? "Local Image Preview" : value.split("/").pop() || "Image Loaded"}
              </span>
              {uploadSuccess && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded shrink-0">
                  <Check className="w-2.5 h-2.5" /> Saved
                </span>
              )}
            </div>
            <p className="text-[9px] text-zinc-400 font-mono truncate mt-0.5">
              {value.startsWith("data:") ? "Stored locally • Will save on submit" : value}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-2 py-1 text-[10px] font-mono font-bold bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-lg transition cursor-pointer flex items-center gap-1"
              title="Replace Image with new file upload"
            >
              <Upload className="w-3 h-3 text-zinc-500" />
              <span>Replace</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className={`p-1 text-zinc-400 hover:text-black rounded-lg border transition cursor-pointer ${
                showUrlInput ? "bg-black text-white border-black" : "bg-white border-zinc-200"
              }`}
              title="Edit Image URL"
            >
              <Link className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition cursor-pointer"
              title="Remove Image"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full py-3 px-3 border border-dashed border-zinc-300 hover:border-black rounded-xl text-center bg-zinc-50 hover:bg-white transition cursor-pointer flex items-center justify-center gap-2 font-mono text-[11px] font-bold text-zinc-700 shadow-2xs"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-black animate-spin" />
                <span>Uploading Image to Public Folder...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-zinc-600" />
                <span>Click to Upload Image (PHP Backend)</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono px-1">
            <span>PNG, JPG, WEBP, SVG up to 15MB</span>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-zinc-600 hover:text-black underline cursor-pointer"
            >
              {showUrlInput ? "Hide URL input" : "Or paste URL"}
            </button>
          </div>
        </div>
      )}

      {/* Direct URL input fallback */}
      {showUrlInput && (
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-zinc-200 mt-1">
          <Link className="w-3 h-3 text-zinc-400 shrink-0 ml-1" />
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full text-xs font-mono bg-transparent outline-none text-zinc-800"
          />
        </div>
      )}

      {errorMessage && (
        <p className="text-[10px] text-rose-500 font-mono flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3" />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
};
