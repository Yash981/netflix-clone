import React, { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { BsChevronUp } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setshowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if(window.scrollY >= TOP_OFFSET){
            setShowBackground(true);
        }else{
            setShowBackground(false);
        }
    }
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener('scroll',handleScroll)
    }
  }, [])
  
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setshowAccountMenu((current) => !current);
  }, []);
  return (
    <nav className="w-full fixed z-40 ">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${ showBackground ? 'bg-zinc-900 bg-opacity-90':''}`}>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="News & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative transition">
          <p className="text-white text-sm">Browse</p>
          { showMobileMenu ? (
          <BsChevronUp className="text-white transition" />) : (
          <BsChevronDown className="text-white transition" />) }
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell className="w-6" />
          </div>

          <div onClick= {toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/default-blue.png" alt="" />
            </div>
            {showAccountMenu ?
            (<BsChevronUp  className = 'text-white transition'/>):(
                <BsChevronDown className="text-white transition" />)}
            <AccountMenu visible={showAccountMenu}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
