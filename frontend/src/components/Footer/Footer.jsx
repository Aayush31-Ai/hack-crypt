export default function Footer() {
    return (
        <footer className="bg-[#0b1220] border-t border-blue-500/30 ">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left: Logo / Image */}
                <div className="flex items-center gap-3">
                    <img
                        src="/assets/png&gif/png/logo-purple.png" // 🔁 replace with your image path
                        alt="Vertex Team Logo"
                        className="h-10 w-auto"
                    />
                    {/* <span className="text-xl font-semibold tracking-wide text-white">
                        Vertex
                    </span> */}
                </div>

                {/* Center: Text */}
                <p className="text-sm text-gray-400 text-center">
                    Built with ❤️ for learning through gaming
                </p>

                {/* Right: Copyright */}
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Team Vertex
                </p>

            </div>
        </footer>
    );
}