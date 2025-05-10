"use client";
import { useEffect, useState } from 'react';
import ImageLoader from '@/components/imageloader'; 
import Image from 'next/image';

const Banner = () => {
    const images = ImageLoader(); // โหลดภาพจาก ImageLoader
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000); // เปลี่ยน alle 3 วินาที

        return () => clearInterval(interval); // เคลียร์ interval เมื่อคอมโพเนนต์ unmount
    }, [images.length]);

    return (
        <div className="relative bg-zinc-900 h-[35rem]">
            <Image 
                src={images[currentImage]} 
                alt={`Banner Image ${currentImage + 1}`} 
                layout="fill" // ใช้ layout fill เพื่อให้ภาพครอบคลุมพื้นที่
                objectFit="cover" // ตั้งค่าสำหรับการครอบคลุมภาพ
                className="opacity-70" // เพิ่มความโปร่งใส
            />
        </div>
    );
}

export default Banner;
