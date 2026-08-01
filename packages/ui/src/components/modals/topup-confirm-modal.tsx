"use client";

import { Textarea } from "../textarea";
import { ConfirmModal, ConfirmModalType } from "./confirm-modal";
import { cn } from "../../lib/utils";
import { Hash, User } from "lucide-react";
import React, { memo } from "react";

/**
 * Props cho Component TopupConfirmModal
 */
export interface TopupConfirmModalProps {
  /** Trạng thái mở / đóng modal */
  open: boolean;
  /** Callback xử lý thay đổi trạng thái ẩn / hiện */
  onOpenChange: (open: boolean) => void;
  /** Loại modal (ConfirmModalType.DANGER: đỏ hồng cho Hủy/Từ chối, ConfirmModalType.SUCCESS: xanh lá cho Duyệt, ConfirmModalType.WARNING: vàng) */
  type?: ConfirmModalType | "danger" | "warning" | "success" | "info" | "none";
  /** Icon tùy chỉnh ở Header (nếu truyền sẽ ghi đè icon mặc định) */
  icon?: React.ReactNode;
  /** Class CSS tùy chỉnh cho khung nền Icon ở Header */
  iconBgClass?: string;
  /** Tiêu đề Modal */
  title: React.ReactNode;

  /** Nhãn trên ô số tiền (ví dụ: REQUESTED TOP-UP AMOUNT / APPROVED TOPUP AMOUNT) */
  amountLabel?: string;
  /** Số tiền nạp */
  amount?: number | string;

  /** Mã giao dịch nạp tiền */
  transactionCode?: string;
  /** Nhãn mã giao dịch (Mặc định: Transaction Code) */
  transactionCodeLabel?: string;

  /** Tên khách hàng (nếu có) */
  customerName?: string;
  /** Mã khách hàng (nếu có) */
  customerCode?: string;
  /** Nhãn khách hàng (Mặc định: Customer) */
  customerLabel?: string;

  /** Phương thức thanh toán */
  paymentMethod?: string;
  /** Biểu tượng phương thức thanh toán */
  paymentMethodIcon?: string | null;
  /** Nhãn phương thức thanh toán (Mặc định: Payment Method) */
  paymentMethodLabel?: string;

  /** Dòng câu hỏi xác nhận căn giữa ở dưới cùng */
  confirmQuestion?: React.ReactNode;

  /** Nhãn nút Hủy / Đóng */
  cancelText?: string;
  /** Nhãn nút Xác nhận */
  confirmText?: string;
  /** Callback khi bấm Hủy */
  onCancel?: () => void;
  /** Callback khi bấm Xác nhận */
  onConfirm?: () => void | Promise<void>;
  /** Trạng thái đang submit */
  isSubmitting?: boolean;

  /** Cấu hình ô nhập Lý do (Dành cho thao tác Admin Từ chối / Reject) */
  showReasonInput?: boolean;
  reasonValue?: string;
  onReasonChange?: (val: string) => void;
  reasonErrorText?: string;
  reasonPlaceholder?: string;
  reasonLabel?: string;
}

/**
 * Component Modal Confirm Topup Base (`TopupConfirmModal`)
 * - Dựng 100% dựa trên thiết kế chuẩn từ `ApproveTopupModal.tsx` ở Admin (`max-w-[420px] rounded-2xl p-6 gap-5 shadow-2xl`).
 * - Card 1: Thẻ nổi bật hiển thị Số tiền nạp (REQUESTED TOP-UP AMOUNT / APPROVED TOPUP AMOUNT) với con số 3xl font-mono.
 * - Card 2: Thẻ chi tiết thông tin Khách hàng (User Icon), Mã giao dịch (Hash Icon), và Phương thức thanh toán.
 * - Subtext câu hỏi xác nhận căn giữa ở dưới cùng.
 * - Tối ưu `React.memo` dùng chung cho cả Customer Portal (Cancel Topup) và Admin Portal (Approve / Reject Topup).
 */
export const TopupConfirmModal = memo(function TopupConfirmModal({
  open,
  onOpenChange,
  type = ConfirmModalType.DANGER,
  icon,
  iconBgClass,
  title,
  amountLabel,
  amount,
  transactionCode,
  transactionCodeLabel = "Transaction Code",
  customerName,
  customerCode,
  customerLabel = "Customer",
  paymentMethod,
  paymentMethodIcon,
  paymentMethodLabel = "Payment Method",
  confirmQuestion,
  cancelText = "Hủy",
  confirmText = "Xác nhận",
  onCancel,
  onConfirm,
  isSubmitting = false,
  showReasonInput = false,
  reasonValue = "",
  onReasonChange,
  reasonErrorText,
  reasonPlaceholder = "Vui lòng nhập lý do từ chối...",
  reasonLabel = "Lý do từ chối",
}: TopupConfirmModalProps) {
  // Định dạng số tiền nạp dạng $4.00 nếu có
  const formattedAmount =
    amount !== undefined && amount !== null
      ? typeof amount === "number"
        ? `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : amount
      : null;

  const isDanger = String(type) === ConfirmModalType.DANGER || String(type) === "danger";
  const isSuccess = String(type) === ConfirmModalType.SUCCESS || String(type) === "success";

  const descriptionContent = (
    <div className="flex flex-col gap-3.5 mt-1">
      {/* 1. Thẻ Nổi Bật Số Tiền Nạp (Amount Card) */}
      {formattedAmount && (
        <div
          className={cn(
            "flex flex-col items-center justify-center p-4 rounded-xl border text-center gap-1 shadow-sm",
            isDanger
              ? "bg-rose-50/80 dark:bg-rose-950/40 border-rose-200/70 dark:border-rose-800/40 text-rose-600 dark:text-rose-400"
              : isSuccess
              ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200/70 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400"
              : "bg-amber-50/80 dark:bg-amber-950/40 border-amber-200/70 dark:border-amber-800/40 text-amber-600 dark:text-amber-400",
          )}
        >
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-wider",
              isDanger
                ? "text-rose-700 dark:text-rose-300"
                : isSuccess
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-amber-700 dark:text-amber-300",
            )}
          >
            {amountLabel || (isDanger ? "REQUESTED TOP-UP AMOUNT" : "APPROVED TOPUP AMOUNT")}
          </span>
          <span className="text-3xl font-extrabold font-mono tracking-tight">
            {formattedAmount}
          </span>
        </div>
      )}

      {/* 2. Thẻ Thông Tin Chi Tiết (Customer & Transaction Info Details Card) */}
      {(customerName || transactionCode || paymentMethod) && (
        <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-left text-xs">
          {/* Row 1: Customer Info */}
          {customerName && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                <User className="size-3.5 text-slate-400" />
                <span>{customerLabel}:</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100">
                <span>{customerName}</span>
                {customerCode && (
                  <span className="inline-flex items-center rounded-md bg-slate-200/70 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                    {customerCode}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Row 2: Transaction Code */}
          {transactionCode && (
            <div
              className={cn(
                "flex items-center justify-between",
                customerName && "pt-1 border-t border-slate-200/40 dark:border-slate-700/40",
              )}
            >
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                <Hash className="size-3.5 text-slate-400" />
                <span>{transactionCodeLabel}:</span>
              </div>
              <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                {transactionCode}
              </span>
            </div>
          )}

          {/* Row 3: Payment Method */}
          {paymentMethod && (
            <div
              className={cn(
                "flex items-center justify-between",
                (customerName || transactionCode) &&
                  "pt-1 border-t border-slate-200/40 dark:border-slate-700/40",
              )}
            >
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {paymentMethodLabel}:
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                {paymentMethodIcon && (
                  <img
                    src={paymentMethodIcon}
                    alt={paymentMethod}
                    className="w-4 h-4 object-contain rounded-[3px]"
                  />
                )}
                <span>{paymentMethod}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Subtext Dòng Hỏi Xác Nhận Căn Giữa */}
      {confirmQuestion && (
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 px-2 leading-normal">
          {confirmQuestion}
        </p>
      )}

      {/* 4. Ô nhập Lý do (Dành cho Admin Reject) */}
      {showReasonInput && (
        <div className="flex flex-col gap-1.5 text-left pt-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {reasonLabel} <span className="text-red-500">*</span>:
          </label>
          <Textarea
            value={reasonValue}
            onChange={(e) => onReasonChange?.(e.target.value)}
            placeholder={reasonPlaceholder}
            rows={3}
            className={`text-xs resize-none ${reasonErrorText ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {reasonErrorText && <span className="text-[11px] text-red-500">{reasonErrorText}</span>}
        </div>
      )}
    </div>
  );

  return (
    <ConfirmModal
      open={open}
      onOpenChange={onOpenChange}
      type={type}
      icon={icon}
      iconBgClass={iconBgClass}
      title={title}
      description={descriptionContent}
      cancelText={cancelText}
      confirmText={confirmText}
      onCancel={onCancel}
      onConfirm={onConfirm}
      isSubmitting={isSubmitting}
    />
  );
});
