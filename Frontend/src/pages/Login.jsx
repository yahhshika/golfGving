import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import UserContext from "../contexts/user/UserContext";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Login() {
  let {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      const response = await api.post("/user/login",form);
      // if(response.data.)
      // console.log(response);
      if(response?.data?.user){
        setUser(response.data.user);
      }
      if(response?.data?.message){
        toast.success(response.data.message);
      }
      navigate("/home");
    }catch(err){
      console.log("error in login frontend");
      console.log(err.response?.data?.message);
      if(err.response?.data?.message){
        toast.error(err.response.data.message);
      }
    }
    // console.log(form);


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
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-400">
              Login to access your GolfGiving dashboard.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email Address
              </label>

              <input
                required
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
                  required
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
              Login
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
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-emerald-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Bottom Security */}
        <div className="mt-10 flex justify-center gap-10 text-xs uppercase tracking-widest text-gray-500">

          <div className="flex items-center gap-2">
            <span>Secure Login</span>
          </div>
          <div className="flex items-center gap-2">
            <span>|</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Encrypted</span>
          </div>

        </div>

      </div>

    </section>
  );
}