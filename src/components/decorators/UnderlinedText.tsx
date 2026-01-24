import { cn } from '@/lib/utils' // tự tạo khi dùng shadcn ui
import { ReactNode } from 'react'

const UnderlinedText = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        // nếu nối chuỗi thì có thể className là undefined -> cn tự loại bỏ undefined
        // đây là decorator comp - nó bọc text, thêm underline, cho phép override style từ ngoài
        <span className={cn("underline underline-offset-4 decoration-dashed decoration-sky-400", className)}>
            {children}
        </span>
    )
}

export default UnderlinedText
