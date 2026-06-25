import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name:""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    // axios login here
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1326] flex items-center justify-center px-5">

      {/* Background Glow */}
      <div className="absolute -top-56 -left-56 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-56 -right-56 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Join GolfGiving
            </h1>

            <p className="mt-2 text-gray-400">
              Start Your Journey
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* name */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border-b border-gray-600 bg-transparent py-3 text-white outline-none transition focus:border-emerald-400 placeholder:text-gray-500"
              />
            </div>
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border-b border-gray-600 bg-transparent py-3 text-white outline-none transition focus:border-emerald-400 placeholder:text-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border-b border-gray-600 bg-transparent py-3 pr-10 text-white outline-none transition focus:border-emerald-400 placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Login Button */}
            <button
              className="w-full rounded-lg bg-emerald-500 py-3 font-semibold text-slate-900 transition hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] active:scale-95"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="mx-4 text-xs uppercase tracking-widest text-gray-500">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>


          {/* Footer */}
          <p className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Bottom Security */}
        <div className="mt-10 flex justify-center gap-10 text-xs uppercase tracking-widest text-gray-500">

          <div className="flex items-center gap-2">
            🔒
            <span>Secure Login</span>
          </div>

          <div className="flex items-center gap-2">
            🛡️
            <span>Encrypted</span>
          </div>

        </div>

      </div>

    </section>
  );
}