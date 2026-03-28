import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const centsToDollars = (cents: number) => {
  return (cents / 100).toFixed(2)
}

// Kiểm tra định dạng email: phải có ký tự trước và sau @ và có dấu chấm sau @
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Kiểm tra password: chỉ gồm chữ cái và số, tối thiểu 8 ký tự
export function isValidPassword(password: string) {
  const passwordRegex = /^[A-Za-z0-9]{8,}$/;
  return passwordRegex.test(password);
}

// // Kiểm tra số điện thoại: chỉ 10 chữ số
// export function isValidPhoneNumber(phone: string) {
//   const phoneRegex = /^\d{10}$/;
//   return phoneRegex.test(phone.trim());
// }

// // Kiểm tra không rỗng
// export function isNotEmpty(value: string) {
//   return typeof value === 'string' && value.trim() !== '';
// }

// Kiểm tra mật khẩu trùng khớp
export function doPasswordsMatch(pw1: string, pw2: string) {
  return pw1 === pw2;
}