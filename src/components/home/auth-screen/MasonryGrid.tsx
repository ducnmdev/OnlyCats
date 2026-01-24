'use client'
import Image from "next/image"
import { useState } from "react"

interface IMousePosition {
    x: number;
    y: number;
}

const MasonryGrid = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState<IMousePosition>({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (hoverIndex === index) {
            const rect = (e.target as HTMLDivElement).getBoundingClientRect(); 
            const x = ((e.clientX - rect.left) / rect.width) * 100; // e.clientX: vị trí chuột trục X trên viewport
            const y = ((e.clientY - rect.top) / rect.height) * 100; // rect.left: khoảng cách từ mép trái vp đến mép trái element

            setMousePosition({ x, y });
        }
    };

    return (
        <div className="p-5 sm:p-8">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-8">

                {[...Array(15)].map((_, index) => (
                    <div key={index} className="relative overflow-hidden rounded-md"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                    >
                        <Image src={`/featured/featured${index + 1}.jpg`}
                            className="cursor-pointer hover:scale-150 transition-transform duration-500 ease-in-out"
                            alt="Featured Horse"
                            style={{
                                transformOrigin:`${mousePosition.x}% ${mousePosition.y}%`
                            }}
                            width={500}
                            height={500}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default MasonryGrid

// dùng columns nên các cột = nhau ảnh không bị to quá rồi chiếm diện tích cột #
// &: chọn div hiện tại, >div: tất cả div con trực tiếp, :not(:first-child): trừ div đầu tiên