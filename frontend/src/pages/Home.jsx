import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  TrendingUp,
  Calendar,
  LayoutDashboard,
  IndianRupee,
  Calculator as CalcIcon,
  Plus,
  Minus,
  UtensilsCrossed
} from "lucide-react";

// Weekly aur Monthly services ko import kiya
import { addSale, getTodaySale, getTotalRevenue, removeSale, getWeeklySale, getMonthlySale } from "../services/saleService";
import paniPuri from "../assets/pani-puri.jpg";
import chaat from "../assets/chaat.jpg";
import logo from "../assets/logo.jpg";


const Home = () => {
  const [todaySale, setTodaySale] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [weeklySale, setWeeklySale] = useState(null);
  const [weeklyLabel, setWeeklyLabel] = useState("");



  const [monthlySale, setMonthlySale] = useState(null);
  const [monthlyLabel, setMonthlyLabel] = useState("");
  const [remainingDays, setRemainingDays] = useState(null);


  const navigate = useNavigate();

  const fetchTodaySale = async () => {
    try {
      const data = await getTodaySale();
      setTodaySale(data.totalSale);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const data = await getTotalRevenue();
      setRevenue(data.revenue);
    } catch (error) {
      console.log(error);
    }
  };

  // Database se Weekly Sale fetch karne ka function
  const fetchWeeklySale = async () => {
    try {
      const data = await getWeeklySale();
      if (data && data.totalSale > 0) {
        setWeeklySale(data.totalSale);
        setWeeklyLabel(data.label);
      } else {
        setWeeklySale(null);
      }
    } catch (error) {
      console.log(error);
      setWeeklySale(null);
    }
  };

  // Database se Monthly Sale fetch karne ka function
  const fetchMonthlySale = async () => {
    try {
      const data = await getMonthlySale();

      if (data.isAvailable) {

        setMonthlySale(data.totalSale);
        setMonthlyLabel(data.label);
        setRemainingDays(null);

      } else {

        setMonthlySale(null);
        setRemainingDays(data.remainingDays);

      }
    } catch (error) {
      console.log(error);
      setMonthlySale(null);
    }
  };

  useEffect(() => {
    fetchTodaySale();
    fetchRevenue();
    fetchWeeklySale();
    fetchMonthlySale();
  }, []);

  const handleSale = async (itemName, quantity) => {
    try {
      await addSale({ itemName, quantity });
      fetchTodaySale();
      fetchRevenue();
      fetchWeeklySale();
      fetchMonthlySale();
      toast.success("Sale Added Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Sale");
    }
  };

  const handleRemoveSale = async (itemName) => {
    if (todaySale <= 0) {
      return toast.error("No sales recorded today to remove!");
    }

    try {
      await removeSale({ itemName });
      fetchTodaySale();
      fetchRevenue();
      fetchWeeklySale();
      fetchMonthlySale();
      toast.success("1 Plate Removed Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Remove Sale");
    }
  };

  return (
    <div className="min-h-screen bg-[#dce5ed] text-[#0f172a] font-sans pb-24 max-w-md mx-auto relative shadow-md">

      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <h1 className="text-xl font-black text-[#b45309] tracking-tight">Kalpana Pani Puri</h1>
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
          <img src={logo} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      <div className="p-4 space-y-5">
        <div className="flex items-center gap-2 mt-2">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <UtensilsCrossed className="text-orange-600" size={22} />
          </div>

          <h2 className="text-2xl font-black text-[#0f172a]">
            Sales Management
          </h2>
        </div>

        {/* Today's Sale */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Today's Sale</p>
          <h3 className="text-4xl font-black text-[#ea580c] mt-1">₹{todaySale}</h3>
          <div className="absolute right-5 top-5 bg-orange-50 text-orange-200 p-3 rounded-2xl">
            <Calendar size={32} className="opacity-40" />
          </div>
        </div>

        {/* Weekly & Monthly Row (Null check conditions added) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Weekly Card */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)]">

            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                <Calendar size={16} />
              </div>

              <h4 className="text-sm font-bold text-gray-500">
                Weekly Sale
              </h4>
            </div>

            {/* Date Range */}
            <p className="text-xs text-gray-400">
              {weeklyLabel}
            </p>

            {/* Amount */}
            <h4 className="text-lg font-black text-[#0369a1] mt-1">
              ₹{weeklySale?.toLocaleString("en-IN")}
            </h4>

          </div>

          {/* Monthly Card */}
          <div className="bg-white p-4 rounded-2xl border  border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <Calendar size={16} />
              </div>

              <p className="text-sm font-bold text-gray-500">
                Monthly Sale
              </p>
            </div>
            {/* Agar value he to dikhegi, nahi to khali ya '--' dikhega */}
            {
              remainingDays !== null ?

                (
                  <>
                    <p className="text-xs text-gray-400">
                      Available after {remainingDays} days
                    </p>
                    <h4 className="text-lg font-black text-[#047857]">
                      --
                    </h4>
                  </>

                )

                :

                (
                  <>
                    <p className="text-xs text-gray-400">
                      {monthlyLabel}
                    </p>

                    <h4 className="text-lg font-black text-[#047857]">
                      ₹{monthlySale?.toLocaleString("en-IN")}
                    </h4>
                  </>

                )
            }
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-[#0f172a] mt-2">Menu Items</h3>
          {/* Pani Puri */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={paniPuri} alt="Pani Puri" className="w-14 h-14 rounded-xl object-cover shadow-sm" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <h4 className="font-bold text-base text-[#0f172a]">Pani Puri</h4>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">₹20 per plate</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-full border border-gray-100">
              <button onClick={() => handleRemoveSale("Pani Puri")} className="w-9 h-9 rounded-full bg-white border-2 text-gray-500 flex items-center justify-center shadow-sm"><Minus size={16} /></button>
              <button onClick={() => handleSale("Pani Puri", 1)} className="w-9 h-9 rounded-full bg-[#ea580c] text-white flex items-center justify-center shadow-md"><Plus size={16} /></button>
            </div>
          </div>

          {/* Chaat */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={chaat} alt="Chaat" className="w-14 h-14 rounded-xl object-cover shadow-sm" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <h4 className="font-bold text-base text-[#0f172a]">Chaat</h4>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">₹30 per plate</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-full border border-gray-100">
              <button onClick={() => handleRemoveSale("Chaat")} className="w-9 h-9 rounded-full border-2 bg-white text-gray-500 flex items-center justify-center shadow-sm"><Minus size={16} /></button>
              <button onClick={() => handleSale("Chaat", 1)} className="w-9 h-9 rounded-full bg-[#ea580c] text-white flex items-center justify-center shadow-md"><Plus size={16} /></button>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button onClick={() => navigate("/calculator")} className="w-full py-3.5 bg-[#ea580c] text-white rounded-xl font-bold flex items-center justify-center gap-2"><CalcIcon size={18} />Parcel Calculator</button>
          <button onClick={() => navigate("/revenue")} className="w-full py-3.5 bg-[#e0f2fe] text-[#0369a1] rounded-xl font-bold flex items-center justify-center gap-2 border border-sky-100"><IndianRupee size={16} />Total Revenue</button>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t border-gray-100 py-2 px-6 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-[#ea580c]">
          <div className="bg-orange-50 px-4 py-1.5 rounded-full text-[#ea580c]"><LayoutDashboard size={20} /></div>
          <span className="text-[10px] font-bold">Dashboard</span>
        </button>
        <button onClick={() => navigate("/revenue")} className="flex flex-col items-center gap-1 text-gray-400"><IndianRupee size={20} /><span className="text-[10px] font-semibold">Revenue</span></button>
        <button onClick={() => navigate("/calculator")} className="flex flex-col items-center gap-1 text-gray-400"><CalcIcon size={20} /><span className="text-[10px] font-semibold">Calculator</span></button>
      </nav>
    </div>
  );
};

export default Home;