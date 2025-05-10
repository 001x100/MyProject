"use client";
import NavbarItem from "./navbaritem";
import { BsChevronDown } from 'react-icons/bs';
import CategoryMenu from "./categorymenu";
import { useCallback, useState } from "react";
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from "react-icons/cg";
import ProfileMenu from "./profilemenu";
export default function Navbar() {
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const toggleCategoryMenu = useCallback(() => {
        setShowCategoryMenu((current) => !current)
    }, []);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const toggleProfileMenu = useCallback(() => {
        setShowProfileMenu((current) => !current)
    }, []);
    return (
        <nav className="w-full fixed z-40">
            <div
                className="
            px-4
            md:px-16
            py-6
            flex
            flex-rox
            items-center
            transition
            duration-500
            
            bg-opcity-90
                ">
                <div className="
                flex-row
                text-2xl
                ml-8
                gap-7
                hidden
                lg:flex
                ">
                    <NavbarItem label="Home" />
                </div>
                <div className="block
                    rounded-3xl
                    px-6
                    pt-3
                    pb-2
                    w-[830px]
                    text-2xl
                    text-black
                    bg-neutral-300
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    flex flex-row items-center gap-2 ml-8 cursor-pointer relative"> 
                    <BsSearch />
                    </div>
                <div onClick={toggleCategoryMenu} className="flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white font-semibold text-2xl">Category</p>
                    <BsChevronDown className="text-white transition " />
                    <CategoryMenu visible={showCategoryMenu} />
                </div>
                <div className="
                flex-row
                text-2xl
                ml-8
                gap-7
                hidden
                lg:flex
                ">
                    <NavbarItem label="My Ticket" />
                </div>
                <div onClick={toggleProfileMenu} className="flex flex-row items-center gap-2 ml-14 cursor-pointer relative">
                    <p className="text-white font-semibold text-2xl"></p>
                    <CgProfile className="text-3xl"/>
                    <ProfileMenu visible={showProfileMenu} />
                </div>
                
                
            </div>
        </nav>
    )
}