"use client";

import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ImagePreviewModalProps {
  open: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  loadingText?: string;
  errorText?: string;
  invalidUrlText?: string;
}

export function ImagePreviewModal({
  open,
  images,
  initialIndex = 0,
  onClose,
  loadingText = "Đang tải chứng từ...",
  errorText = "Không thể tải ảnh chứng từ",
  invalidUrlText = "Đường dẫn không hợp lệ",
}: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [hasError, setHasError] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setHasError(false);
    setIsLoadingImage(true);
  }, [initialIndex, open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, images, currentIndex]);

  if (!open || !images || images.length === 0 || !mounted) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasError(false);
    setIsLoadingImage(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasError(false);
    setIsLoadingImage(true);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const rawUrl = images[currentIndex] || images[0] || "";

  const resolvedUrl = (() => {
    if (!rawUrl) return "";
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://") || rawUrl.startsWith("data:")) {
      return rawUrl;
    }
    if (rawUrl.startsWith("/")) {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      return `${apiBase}${rawUrl}`;
    }
    return rawUrl;
  })();

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-xs select-none pointer-events-auto"
      onClick={onClose}
    >
      {/* Nút đóng góc trên bên phải */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 z-[100000] p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all cursor-pointer outline-none focus:outline-none pointer-events-auto"
        title="Close (Esc)"
      >
        <X className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Nút điều hướng ảnh trước (Previous) */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-6 z-[100000] p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all cursor-pointer outline-none focus:outline-none pointer-events-auto"
          title="Previous"
        >
          <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
        </button>
      )}

      {/* Container xem ảnh trung tâm */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {hasError || !resolvedUrl ? (
          <div className="flex flex-col items-center justify-center w-[600px] max-w-[90vw] h-[400px] rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 p-6 text-center">
            <ImageIcon className="w-16 h-16 text-slate-500 mb-3" />
            <span className="text-sm font-semibold text-slate-300">
              {errorText} {currentIndex + 1}
            </span>
            <span className="text-xs text-slate-500 mt-1 max-w-xs truncate">{rawUrl || invalidUrlText}</span>
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {isLoadingImage && (
              <div className="w-[500px] max-w-[90vw] h-[350px] rounded-2xl bg-slate-800/80 animate-pulse border border-slate-700/50 flex flex-col items-center justify-center gap-2 text-slate-400">
                <ImageIcon className="w-10 h-10 animate-bounce text-slate-500" />
                <span className="text-xs font-medium">{loadingText}</span>
              </div>
            )}
            <img
              key={resolvedUrl}
              src={resolvedUrl}
              alt={`Preview ${currentIndex + 1}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsLoadingImage(false)}
              onError={() => {
                setIsLoadingImage(false);
                setHasError(true);
              }}
              className={`max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl transition-opacity duration-300 ${
                isLoadingImage ? "opacity-0 absolute inset-0" : "opacity-100"
              }`}
            />
          </div>
        )}

        {/* Đếm số trang ảnh ở bên dưới */}
        <div className="mt-4 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold tracking-wider backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Nút điều hướng ảnh sau (Next) */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-6 z-[100000] p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all cursor-pointer outline-none focus:outline-none pointer-events-auto"
          title="Next"
        >
          <ChevronRight className="w-8 h-8 stroke-[2.5]" />
        </button>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
}
