import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CurrentUser from '../../playerData/CurrentUser';

export default function Navbar() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleAvatarClick = () => {
        navigate('/profile');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    return (
        <>
            <nav className="bg-[#0b1220] text-white px-4 sm:px-20 py-4 flex items-center justify-between overflow-visible relative z-50">
                {/* Left: Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img className="w-[140px] sm:w-[200px] h-10 sm:h-12 bg-none sm:scale-125" src="/assets/png&gif/png/logo-purple.png" alt="Logo" />
                </Link>

                {/* Hamburger Menu Button - Mobile Only */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex flex-col gap-1.5 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Center: Menu - Desktop */}
                <div className="hidden md:flex justify-center gap-6 lg:gap-8 text-lg px-2">
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
                                    <li className="px-4 py-3 hover:bg-[#1a2540] hover:text-[#B19EEF]"><Link to="/challenge">Challenges</Link></li>
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
                    </li>
                </div>

                {/* Right: Avatar */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={handleAvatarClick}
                        className="group relative"
                        title={CurrentUser.name}
                    >
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-400 transition-all hover:scale-110 shadow-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                            <img 
                                src={CurrentUser.avatar} 
                                alt={CurrentUser.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#1a2540] border border-purple-500/50 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {CurrentUser.name}
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#0b1220] text-white border-b-2 border-[#B19EEF] shadow-2xl z-40">
                    <div className="px-4 py-4 space-y-3">
                        {/* Classroom Dropdown */}
                        <div>
                            <button
                                onClick={() => toggleDropdown('classroom')}
                                className="w-full flex items-center justify-between py-2 hover:text-[#B19EEF] transition-colors"
                            >
                                <span>ClassRoom</span>
                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${openDropdown === 'classroom' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="-2 -3 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openDropdown === 'classroom' && (
                                <div className="pl-4 space-y-2 mt-2 border-l-2 border-[#B19EEF]">
                                    <Link to="/leaderboard" onClick={closeMenu} className="block py-2 hover:text-[#B19EEF] transition-colors">LeaderBoard</Link>
                                    <Link to="/challenge" onClick={closeMenu} className="block py-2 hover:text-[#B19EEF] transition-colors">Challenges</Link>
                                </div>
                            )}
                        </div>

                        {/* Practice Dropdown */}
                        <div>
                            <button
                                onClick={() => toggleDropdown('practice')}
                                className="w-full flex items-center justify-between py-2 hover:text-[#B19EEF] transition-colors"
                            >
                                <span>Practice</span>
                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${openDropdown === 'practice' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="-2 -3 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openDropdown === 'practice' && (
                                <div className="pl-4 space-y-2 mt-2 border-l-2 border-[#B19EEF]">
                                    <Link to="/mario" onClick={closeMenu} className="block py-2 hover:text-[#B19EEF] transition-colors">Mario</Link>
                                    <Link to="/quizshogun" onClick={closeMenu} className="block py-2 hover:text-[#B19EEF] transition-colors">Quiz Shogun</Link>
                                </div>
                            )}
                        </div>

                        {/* Shop */}
                        <Link to="/shop" onClick={closeMenu} className="block py-2 hover:text-[#B19EEF] transition-colors">Shop</Link>
                    </div>
                </div>
            )}

            <div className="border-b-2 border-[#B19EEF] shadow-2xl"></div>
        </>
    );
}