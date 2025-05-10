import Image from 'next/image';

const imageNames = [
    "bannerimage/image1.jpg",
    "bannerimage/image2.jpg",
    
];

const ImageLoader = () => {
    const images = imageNames.map(name => `/` + name); // สร้าง array ของ paths
    return images; // คืนค่าภาพทั้งหมด
}

export default ImageLoader;
