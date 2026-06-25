// src/pages/Admin/NewAdmin.jsx

import { useState } from "react";
import {
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

export default function NewAdmin() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect API here
    console.log(formData);
  };

  return (
    <main className="min-h-screen mt-20 flex items-center justify-center px-5 py-10 bg-[#0b1326] text-[#dae2fd]">
      <div className="w-full max-w-xl">
        {/* ---------------- Header ---------------- */}

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Create Administrator
          </h2>

          <p className="mt-3 text-sm md:text-base text-[#bbcabf]">
            Assign privileged access to the GolfGiving ecosystem.
          </p>
        </div>

        {/* ---------------- Glass Card ---------------- */}

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(23,31,51,0.45)] backdrop-blur-xl shadow-2xl p-6 md:p-10">
          {/* Decorative Blur */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-400/10 blur-[90px]" />

          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-8"
          >
            {/* ================= Full Name ================= */}

            <div className="group">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcabf] transition-colors group-focus-within:text-emerald-400">
                Full Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g. Dustin Johnson"
                  className="
                    w-full
                    border-0
                    border-b
                    border-white/15
                    bg-transparent
                    py-3
                    pr-10
                    text-lg
                    placeholder:text-white/25
                    focus:border-emerald-400
                    focus:outline-none
                    focus:ring-0
                    transition-all
                  "
                />

                <FaUser
                  className="
                    absolute
                    right-1
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    transition-colors
                    group-focus-within:text-emerald-400
                  "
                />
              </div>
            </div>

            {/* ================= Email ================= */}

            <div className="group">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcabf] transition-colors group-focus-within:text-emerald-400">
                Email Address
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@golfgiving.org"
                  className="
                    w-full
                    border-0
                    border-b
                    border-white/15
                    bg-transparent
                    py-3
                    pr-10
                    text-lg
                    placeholder:text-white/25
                    focus:border-emerald-400
                    focus:outline-none
                    focus:ring-0
                    transition-all
                  "
                />

                <FaEnvelope
                  className="
                    absolute
                    right-1
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    transition-colors
                    group-focus-within:text-emerald-400
                  "
                />
              </div>
            </div>

            {/* ================= Password ================= */}

            <div className="group">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcabf] transition-colors group-focus-within:text-emerald-400">
                Secure Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="
                    w-full
                    border-0
                    border-b
                    border-white/15
                    bg-transparent
                    py-3
                    pr-12
                    text-lg
                    placeholder:text-white/25
                    focus:border-emerald-400
                    focus:outline-none
                    focus:ring-0
                    transition-all
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-0
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-emerald-400
                    transition-colors
                  "
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>
            {/* ================= Submit Button ================= */}

            <div className="pt-2">
              <button
                type="submit"
                className="
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-emerald-400
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#003824]
                  shadow-lg
                  shadow-emerald-400/20
                  transition-all
                  hover:bg-emerald-500
                  active:scale-[0.98]
                "
              >
                Create Account
                <FaArrowRight />
              </button>
            </div>
          </form>
        </div>

        {/* ---------------- Security Note ---------------- */}

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[#bbcabf]/70">
          <FaShieldAlt className="text-sm" />

          <span>
            Encrypted session. Access logs will be recorded.
          </span>
        </div>
      </div>
    </main>
  );
}