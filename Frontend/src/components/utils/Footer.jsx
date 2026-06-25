import { Link } from "react-router-dom";
import { FiShare2, FiGlobe } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060E20]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 py-10 md:flex-row lg:px-10">
        {/* Left */}

        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-[#DAE2FD]">
            GolfGiving
          </h2>

          <p className="mt-3 text-base text-[#BBCABF]">
            © 2024 GolfGiving. Precision in Philanthropy.
          </p>
        </div>

        {/* Middle */}

        <div className="flex flex-wrap items-center justify-center gap-8 text-lg">
          <Link
            to="/terms"
            className="text-[#BBCABF] transition duration-300 hover:text-[#4EDEA3]"
          >
            Terms
          </Link>

          <Link
            to="/privacy"
            className="text-[#BBCABF] transition duration-300 hover:text-[#4EDEA3]"
          >
            Privacy
          </Link>

          <Link
            to="/contact"
            className="text-[#BBCABF] transition duration-300 hover:text-[#4EDEA3]"
          >
            Contact
          </Link>

          <Link
            to="/support"
            className="text-[#BBCABF] transition duration-300 hover:text-[#4EDEA3]"
          >
            Support
          </Link>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#11192D] text-[#BBCABF] transition-all duration-300 hover:border-[#4EDEA3]/40 hover:text-[#4EDEA3]"
          >
            <FiShare2 size={20} />
          </button>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#11192D] text-[#BBCABF] transition-all duration-300 hover:border-[#4EDEA3]/40 hover:text-[#4EDEA3]"
          >
            <FiGlobe size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}