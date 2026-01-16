import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [classDrop, setClassDrop] = useState(false);
    const [practiceDrop, setPracticeDrop] = useState(false);

    return (
        <nav className="bg-[#0b1220] text-white px-6 py-4 flex items-center justify-around">
            {/* Left: Logo */}
            <div className="text-xl font-bold tracking-wide">
                ClassCombat
            </div>

            {/* Center: Menu */}
            <div className="flex justify-between w-xl px-2">
                <li className="relative group list-none">
                    <span className="cursor-pointer hover:text-blue-400">
                        ClassRoom
                    </span>

                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                        <ul className="w-56 bg-[#111a2e] rounded-md shadow-lg">
                            <li className="px-4 py-3 hover:bg-[#1a2540]"><Link to="/testing">Leader Board</Link></li>
                            <li className="px-4 py-3 hover:bg-[#1a2540]"><Link to="/testing">Challenges</Link></li>
                        </ul>
                    </div>
                </li>


                <li className="relative group list-none">
                    <span className="cursor-pointer hover:text-blue-400">
                        Practice
                    </span>

                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                        <ul className="w-56 bg-[#111a2e] rounded-md shadow-lg">
                            <li className="px-4 py-3 hover:bg-[#1a2540]">My Classes</li>
                            <li className="px-4 py-3 hover:bg-[#1a2540]">Assignments</li>
                            <li className="px-4 py-3 hover:bg-[#1a2540]">Students</li>
                        </ul>
                    </div>
                </li>

                <li className="relative group list-none">
                    <span className="cursor-pointer hover:text-blue-400">
                        Store
                    </span>

                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                        <ul className="w-56 bg-[#111a2e] rounded-md shadow-lg">
                            <li className="px-4 py-3 hover:bg-[#1a2540]">My Classes</li>
                            <li className="px-4 py-3 hover:bg-[#1a2540]">Assignments</li>
                            <li className="px-4 py-3 hover:bg-[#1a2540]">Students</li>
                        </ul>
                    </div>
                </li>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">

                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    S
                </div>
            </div>
        </nav>
    );
}