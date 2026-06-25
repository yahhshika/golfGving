import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import {
  MdVerified,
  MdSecurity,
  MdStorage,
  MdLink,
  MdCheckCircle,
  MdRefresh,
} from "react-icons/md";

export default function NewCharity() {
  const [formData, setFormData] = useState({
    charityName: "",
    description: "",
    imageUrl: "",
    totalDonations: "",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDiscard = () => {
    setFormData({
      charityName: "",
      description: "",
      imageUrl: "",
      totalDonations: "",
    });

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);

    // TODO:
    // await axios.post(...)
    // Connect backend later

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1326] px-5 py-28 text-white md:px-10">

      {/* ========= Animated Background Glow ========= */}

      <div
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-emerald-400/15 blur-[120px] transition-all duration-300"
        style={{
          left: mouse.x * 0.03 - 120,
          top: mouse.y * 0.03 + 40,
        }}
      />

      <div
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-emerald-400/10 blur-[140px] transition-all duration-500"
        style={{
          right: mouse.x * 0.02 - 100,
          bottom: mouse.y * 0.02,
        }}
      />

      <div className="mx-auto max-w-4xl">

        {/* ================= Heading ================= */}

        <div className="mb-14 text-center">

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Register New Charity
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400 md:text-lg">
            Onboard a professional partner to the GolfGiving ecosystem.
          </p>

        </div>

        {/* ================= Glass Card ================= */}

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-10">

          {/* Decorative Corner */}

          <div className="absolute right-0 top-0 h-24 w-24 rounded-tr-2xl border-r border-t border-emerald-400/30" />

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Charity Name */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Charity Name
              </label>

              <input
                type="text"
                name="charityName"
                value={formData.charityName}
                onChange={handleChange}
                placeholder="e.g. Green Fairways Foundation"
                className="
                  w-full
                  border-0
                  border-b
                  border-slate-600
                  bg-transparent
                  px-0
                  py-3
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-emerald-400
                  focus:ring-0
                  focus:shadow-[0_6px_18px_rgba(16,185,129,0.25)]
                "
              />

            </div>

            {/* Description */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detail the mission and impact of this organization..."
                className="
                  w-full
                  resize-none
                  border-0
                  border-b
                  border-slate-600
                  bg-transparent
                  px-0
                  py-3
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-emerald-400
                  focus:ring-0
                  focus:shadow-[0_6px_18px_rgba(16,185,129,0.25)]
                "
              />

            </div>
            {/* Image URL + Initial Donation */}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              {/* Image URL */}

              <div>

                <label className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  <span>Image URL</span>

                  <span className="normal-case text-[10px] italic tracking-normal opacity-60">
                    Hint: Copy/Paste Direct Link
                  </span>
                </label>

                <div className="relative">

                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://image-library.com/..."
                    className="
                      w-full
                      border-0
                      border-b
                      border-slate-600
                      bg-transparent
                      px-0
                      py-3
                      pr-8
                      text-white
                      placeholder:text-slate-500
                      outline-none
                      transition-all
                      duration-300
                      focus:border-emerald-400
                      focus:ring-0
                      focus:shadow-[0_6px_18px_rgba(16,185,129,0.25)]
                    "
                  />

                  <MdLink
                    className="absolute bottom-4 right-0 text-slate-400"
                    size={20}
                  />

                </div>

              </div>

              {/* Initial Donation */}

              <div>

                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Initial Total Donations
                </label>

                <div className="relative">

                  <span className="absolute bottom-3 left-0 font-bold text-emerald-400">
                    $
                  </span>

                  <input
                    type="number"
                    name="totalDonations"
                    value={formData.totalDonations}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="
                      w-full
                      border-0
                      border-b
                      border-slate-600
                      bg-transparent
                      py-3
                      pl-5
                      pr-0
                      text-white
                      placeholder:text-slate-500
                      outline-none
                      transition-all
                      duration-300
                      focus:border-emerald-400
                      focus:ring-0
                      focus:shadow-[0_6px_18px_rgba(16,185,129,0.25)]
                    "
                  />

                </div>

              </div>

            </div>

            {/* Action Buttons */}

            <div className="flex flex-col gap-5 pt-8 md:flex-row">

              <button
                type="submit"
                disabled={saving}
                className={`
                  flex-1
                  rounded-xl
                  py-4
                  font-semibold
                  transition-all
                  duration-300
                  active:scale-95
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-[0_0_20px_rgba(16,185,129,0.35)]

                  ${
                    saved
                      ? "bg-yellow-400 text-black"
                      : "bg-emerald-500 text-white hover:brightness-110"
                  }

                  ${saving ? "pointer-events-none opacity-80" : ""}
                `}
              >
                {saving ? (
                  <>
                    <MdRefresh
                      className="animate-spin"
                      size={20}
                    />
                    Processing...
                  </>
                ) : saved ? (
                  <>
                    <MdCheckCircle size={20} />
                    Charity Saved
                  </>
                ) : (
                  <>
                    <FaSave size={18} />
                    Save Charity
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDiscard}
                className="
                  rounded-xl
                  border
                  border-slate-600
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-slate-300
                  transition-all
                  duration-300
                  hover:bg-white/5
                  active:scale-95
                  md:w-1/3
                "
              >
                Discard
              </button>

            </div>

          </form>

        </div>
        {/* ================= Bottom Insight Cards ================= */}

        <div className="mt-8 grid grid-cols-1 gap-5 opacity-70 md:grid-cols-3">

          {/* Compliance */}

          <div
            className="
              group
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-5
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-400/30
              hover:bg-white/10
            "
          >
            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-emerald-500/15 p-2 transition-all duration-300 group-hover:scale-110">
                <MdVerified
                  size={22}
                  className="text-emerald-400"
                />
              </div>

              <span className="text-sm font-medium text-slate-200">
                Compliance Check Auto-queue
              </span>

            </div>
          </div>

          {/* Audit */}

          <div
            className="
              group
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-5
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-400/30
              hover:bg-white/10
            "
          >
            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-emerald-500/15 p-2 transition-all duration-300 group-hover:scale-110">
                <MdSecurity
                  size={22}
                  className="text-emerald-400"
                />
              </div>

              <span className="text-sm font-medium text-slate-200">
                Audit Log Entry Created
              </span>

            </div>
          </div>

          {/* Sync */}

          <div
            className="
              group
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-5
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-400/30
              hover:bg-white/10
            "
          >
            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-emerald-500/15 p-2 transition-all duration-300 group-hover:scale-110">
                <MdStorage
                  size={22}
                  className="text-emerald-400"
                />
              </div>

              <span className="text-sm font-medium text-slate-200">
                Real-time Sync Enabled
              </span>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}