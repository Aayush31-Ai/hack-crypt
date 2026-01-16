import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <>
            <nav className="bg-[#0b1220] text-white px-6 py-4 flex items-center justify-around overflow-visible relative z-50">
                {/* Left: Logo */}
                <div className="">
                    <img className="w-[200px] h-12 bg-none scale-125" src="/assets/png&gif/png/logo-purple.png" alt="" />
                </div>

                {/* Center: Menu */}
                <div className="flex justify-between w-sm px-2 text-xl">
                    <li className="relative group list-none flex items-center">
                        <div className="flex items-center hover:text-[#B19EEF]">
                            <span className="cursor-pointer hover:text-[#B19EEF]">
                                ClassRoom
                            </span>
                            <div className="">
                                <svg
                                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="-2 -3 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                            <div className="p-[2px] rounded-md bg-gradient-to-r z-50 from-[#B19EEF] via-[#B19EEF] to-[#B19EEF]">
                                <ul className="w-56 bg-[#111a2e] rounded-md shadow-lg z-50">
                                    <li className="px-4 py-3 hover:bg-[#1a2540] cursor-pointer hover:text-[#B19EEF]"><Link to="/leaderboard">LeaderBoard</Link></li>
                                    <li className="px-4 py-3 hover:bg-[#1a2540] hover:text-[#B19EEF]"><Link to="">Challenges</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>


                    <li className="relative group list-none flex items-center">
                        <div className="flex items-center hover:text-[#B19EEF]">
                            <span className="cursor-pointer hover:text-[#B19EEF]">
                                Practice
                            </span>
                            <div className="">
                                <svg
                                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="-2 -3 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                            <div className="p-[2px] rounded-md bg-gradient-to-r from-[#B19EEF] via-[#B19EEF] to-[#B19EEF] z-50">
                                <ul className="w-56 bg-[#111a2e] rounded-md shadow-lg z-50">
                                    <li className="px-4 py-3 hover:bg-[#1a2540] hover:text-[#B19EEF]"><Link to="/mario">Mario</Link></li>
                                    <li className="px-4 py-3 hover:bg-[#1a2540] hover:text-[#B19EEF]"><Link to="/quizshogun">Quiz Shogun</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="relative group list-none">
                        <span className="cursor-pointer hover:text-[#B19EEF]">
                            <Link to="/shop">Shop</Link>
                        </span>

                        {/* <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                        <ul className="w-56 bg-[#111a2e] rounded-md shadow-lg">
                            <li className="px-4 py-3 hover:bg-[#1a2540]">My Classes</li>
                            <li className="px-4 py-3 hover:bg-[#1a2540]">Assignments</li>
                            <li className="px-4 py-3 hover:bg-[#1a2540]">Students</li>
                        </ul>
                    </div> */}
                    </li>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">

                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <Link to="/profile">S</Link>
                    </div>
                </div>
            </nav>
            <div className="border-b-2 border-[#B19EEF] shadow-2xl"></div>
        </>
    );
}