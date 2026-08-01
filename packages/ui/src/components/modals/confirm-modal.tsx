"use client";

import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { cn } from "../../lib/utils";
import { AlertTriangle, Ban, CheckCircle2, Info, Loader2 } from "lucide-react";
import React, { memo } from "react";

/**
 * Enum Loại Modal Confirm (DANGER: Đỏ hồng, WARNING: Vàng, SUCCESS: Xanh lá, INFO: Xanh dương, NONE: Không icon)
 */
export enum ConfirmModalType {
  DANGER = "danger",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info",
  NONE = "none",
}

/**
 * Props cho Component ConfirmModal
 */
export interface ConfirmModalProps {
  /** Trạng thái mở / đóng modal */
  open: boolean;
  /** Callback xử lý thay đổi trạng thái ẩn / hiện */
  onOpenChange: (open: boolean) => void;
  /** Loại modal quyết định icon và màu sắc chủ đạo (sử dụng ConfirmModalType Enum) */
  type?: ConfirmModalType | "danger" | "warning" | "success" | "info" | "none";
  /** Icon tùy chỉnh ở Header (nếu truyền sẽ ghi đè icon mặc định của type) */
  icon?: React.ReactNode;
  /** Class CSS tùy chỉnh cho khung nền Icon ở Header */
  iconBgClass?: string;
  /** Tiêu đề modal */
  title: React.ReactNode;
  /** Nội dung chi tiết modal */
  description?: React.ReactNode;
  /** Alias cho children */
  children?: React.ReactNode;
  /** Nhãn nút Hủy / Đóng lại */
  cancelText?: string;
  /** Nhãn nút Xác nhận */
  confirmText?: string;
  /** Biến thể màu của nút Confirm */
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /** Class CSS tùy chỉnh cho nút Confirm */
  confirmButtonClass?: string;
  /** Callback khi người dùng bấm nút Hủy / Đóng */
  onCancel?: () => void;
  /** Callback khi người dùng bấm nút Xác nhận */
  onConfirm?: () => void | Promise<void>;
  /** Trạng thái đang thực thi API (hiển thị spinner) */
  isSubmitting?: boolean;
  /** Cho phép hiển thị nút Hủy / Đóng hay không (Mặc định: true) */
  showCancelButton?: boolean;
  /** ClassName tùy chỉnh cho DialogContent */
  contentClassName?: string;
}

/**
 * Component Modal Confirm Cơ Sở (`ConfirmModal`)
 * - Dựng 100% từ primitive shadcn `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter`, `Button`.
 * - Ánh xạ `type` thông qua `ConfirmModalType` Enum để tránh hardcode chuỗi.
 * - Thiết kế căn giữa (`max-w-[420px] rounded-2xl p-6 gap-5 shadow-2xl`), Header icon tròn nổi bật với hiệu ứng ring-glow, tiêu đề căn giữa font 18px font-bold, cặp nút dàn hàng ngang (`grid grid-cols-2 gap-3`) chiều cao `h-10 rounded-xl`.
 * - Tối ưu `React.memo` chống re-render thừa.
 */
export const ConfirmModal = memo(function ConfirmModal({
  open,
  onOpenChange,
  type = ConfirmModalType.NONE,
  icon,
  iconBgClass,
  title,
  description,
  children,
  cancelText = "Hủy",
  confirmText = "Xác nhận",
  confirmVariant = "default",
  confirmButtonClass,
  onCancel,
  onConfirm,
  isSubmitting = false,
  showCancelButton = true,
  contentClassName,
}: ConfirmModalProps) {
  if (!open) return null;

  // Lựa chọn Icon và class màu ring glow theo `type` (ánh xạ qua Enum ConfirmModalType)
  const getIconAndBg = () => {
    if (icon) {
      return {
        iconNode: icon,
        bgClass: iconBgClass || "bg-primary/10 text-primary ring-8 ring-primary/5",
      };
    }

    switch (type) {
      case ConfirmModalType.DANGER:
      case "danger":
        return {
          iconNode: <Ban className="size-7 text-rose-600 dark:text-rose-400 stroke-[2.2]" />,
          bgClass:
            "bg-rose-100/90 dark:bg-rose-950/80 ring-8 ring-rose-500/10 dark:ring-rose-500/20 text-rose-600 dark:text-rose-400 shadow-sm",
        };
      case ConfirmModalType.WARNING:
      case "warning":
        return {
          iconNode: <AlertTriangle className="size-7 text-amber-600 dark:text-amber-400 stroke-[2.2]" />,
          bgClass:
            "bg-amber-100/90 dark:bg-amber-950/80 ring-8 ring-amber-500/10 dark:ring-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm",
        };
      case ConfirmModalType.SUCCESS:
      case "success":
        return {
          iconNode: <CheckCircle2 className="size-7 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />,
          bgClass:
            "bg-emerald-100/90 dark:bg-emerald-950/80 ring-8 ring-emerald-500/10 dark:ring-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm",
        };
      case ConfirmModalType.INFO:
      case "info":
        return {
          iconNode: <Info className="size-7 text-blue-600 dark:text-blue-400 stroke-[2.2]" />,
          bgClass:
            "bg-blue-100/90 dark:bg-blue-950/80 ring-8 ring-blue-500/10 dark:ring-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm",
        };
      default:
        return { iconNode: null, bgClass: "" };
    }
  };

  const { iconNode, bgClass } = getIconAndBg();

  // Mặc định class màu cho nút Confirm theo `type` (ánh xạ qua Enum ConfirmModalType)
  const getDefaultButtonClass = () => {
    if (confirmButtonClass) return confirmButtonClass;
    const typeStr = String(type);
    if (typeStr === ConfirmModalType.DANGER || typeStr === "danger") {
      return "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20";
    }
    if (typeStr === ConfirmModalType.WARNING || typeStr === "warning") {
      return "bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20";
    }
    if (typeStr === ConfirmModalType.SUCCESS || typeStr === "success") {
      return "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20";
    }
    return "";
  };

  const handleCancel = () => {
    if (isSubmitting) return;
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  const bodyContent = description || children;

  return (
    <Dialog open={open} onOpenChange={(val) => !isSubmitting && onOpenChange(val)}>
      <DialogContent
        className={cn(
          "max-w-[420px] rounded-2xl p-6 gap-5 focus:outline-none border border-slate-100 dark:border-slate-800/80 shadow-2xl bg-white dark:bg-slate-900",
          contentClassName,
        )}
      >
        <DialogHeader className="flex flex-col items-center text-center gap-3 space-y-0 pt-1">
          {iconNode && (
            <div className="relative flex items-center justify-center mb-1">
              <div
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform",
                  bgClass,
                )}
              >
                {iconNode}
              </div>
            </div>
          )}

          <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {title}
          </DialogTitle>

          {bodyContent && (
            <div className="w-full text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              {bodyContent}
            </div>
          )}
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-3 pt-2 sm:space-x-0">
          {showCancelButton && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-10 w-full rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {cancelText}
            </Button>
          )}

          <Button
            type="button"
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isSubmitting}
            className={cn(
              "h-10 w-full rounded-xl text-xs font-semibold gap-1.5 transition-all active:scale-[0.98] cursor-pointer",
              getDefaultButtonClass(),
            )}
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
