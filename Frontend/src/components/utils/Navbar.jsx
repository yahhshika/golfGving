import { useState , useContext} from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import UserContext from "../../contexts/user/UserContext";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {user} = useContext(UserContext);

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Winners",
      path: "/winners",
    },
    {
      name: "Charities",
      path: "/charities",
    },
    {
      name: "Profile",
      path: "/profile"
    },
    {
      name:"New Subscription",
      path:"/subscribe"
    },
    {
      name: "Draw",
      path: "/admin/draw"
    },
    {
      name:"Add new Charity",
      path: "/admin/charity"
    },
    {
      name:"Add new Admin",
      path:"/admin/new"
    }
  ];
  const onlyAdminRoutes =new Set(["Draw", "Add new Charity", "Add new Admin"]);
  const onlyUserRoutes = new Set(["New Subscription"]);
  const onlySubscriberRoutes = new Set([]);
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-[#0B1326]/80 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-[2rem] font-bold tracking-tight text-[#4EDEA3]"
          >
            GolfGiving
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {links.map((item) => {
              if(user && user.role==="user" && (onlyAdminRoutes.has(item.name) || onlySubscriberRoutes.has(item.name))){
                return null;
              }
              if(user && user.role==="admin" && (onlyUserRoutes.has(item.name) || onlySubscriberRoutes.has(item.name) || item.name==="Profile" || item.name==="Winners")){
                return null;
              }
              if(user && user.role==="subscriber" && (onlyUserRoutes.has(item.name) || onlyAdminRoutes.has(item.name))){
                return null;
              }
             
              return(
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative pb-1 text-lg transition-all duration-300 ${
                    isActive
                      ? "text-[#4EDEA3]"
                      : "text-[#BBCABF] hover:text-[#4EDEA3]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}

                    {isActive && (
                      <span className="absolute left-0 -bottom-[8px] h-[2px] w-full rounded-full bg-[#4EDEA3]" />
                    )}
                  </>
                )}
              </NavLink>
            )})}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/login" className="text-[#BBCABF] font-medium transition hover:text-[#4EDEA3] active:scale-95">
              Login
            </Link>

          
            <Link to={"/signup"} className="self-start rounded-full bg-[#10B981] px-6 py-2.5 font-semibold text-[#003824] shadow-[0_0_25px_rgba(16,185,129,.25)] hover:scale-105 transition">
            Sign Up
            </Link>

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-[#DAE2FD]"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#0B1326]/95 backdrop-blur-xl px-6 py-5">
          <div className="flex flex-col gap-5">
            {links.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg ${
                    isActive
                      ? "text-[#4EDEA3]"
                      : "text-[#BBCABF] hover:text-[#4EDEA3]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="mt-4 border-t border-white/10 pt-4 flex flex-row gap-4 align-middle">
              <Link to="/login" className="text-left flex items-center justify-center text-[#BBCABF] hover:text-[#4EDEA3]">
                Login
              </Link>

              <Link to={"/signup"} className=" w-24 self-start rounded-full bg-[#10B981] py-3 font-semibold text-[#003824] shadow-[0_0_25px_rgba(16,185,129,.25)] text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}