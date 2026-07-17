import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    TrendingUp,
    Calendar,
    Layers,
    LayoutGrid,
    MoreVertical,
    LayoutDashboard,          // Bottom Nav ke liye import kiya
    Calculator as CalcIcon,   // Bottom Nav ke liye import kiya
    IndianRupee               // Icon consistency ke liye
} from "lucide-react";
import { getTodaySale, getTotalRevenue, getWeeklySale, getMonthlySale } from "../services/saleService";

import logo from "../assets/logo.jpg";

const Revenue = () => {
    const [todaySale, setTodaySale] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [weeklySale, setWeeklySale] = useState(null);
    const [monthlySale, setMonthlySale] = useState(null);
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

    useEffect(() => {
        const fetchExtraSales = async () => {
            try {
                const wData = await getWeeklySale();
                if (wData && wData.totalSale > 0) setWeeklySale(wData.totalSale);

                const mData = await getMonthlySale();
                if (mData && mData.totalSale > 0) setMonthlySale(mData.totalSale);
            } catch (e) {
                console.log(e);
            }
        };

        fetchTodaySale();
        fetchRevenue();
        fetchExtraSales();
    }, []);

    return (
        <div className="min-h-screen bg-[#dce5ed] text-[#0f172a] font-sans pb-24 max-w-md mx-auto relative shadow-md">

            {/* 1. Top Header Navigation */}
            <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="p-1 text-[#0f172a] hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={22} />
                </button>
                <h1 className="text-lg font-black text-[#a14b05] tracking-tight">Total Revenue</h1>
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                    <img
                        src={logo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </header>

            <div className="p-4 space-y-6">

                {/* 2. Premium Lifetime Sales Card */}
                <div className="bg-[#b45309] text-white p-6 rounded-[28px] shadow-[0_8px_30px_rgba(180,83,9,0.25)] text-center relative overflow-hidden">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-200/80">
                        Lifetime Sales
                    </p>
                    <h2 className="text-4xl font-black tracking-tight mt-1.5 flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold opacity-90">₹</span>
                        {revenue.toLocaleString('en-IN')}
                    </h2>

        
                </div>

                {/* 3. Performance Summary Section */}
                <div className="space-y-3">
                    <h3 className="text-xl font-black text-[#0f172a] tracking-tight">
                        Performance Summary
                    </h3>

                    {/* Today's Sale Card */}
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400">Today's Sale</p>
                                <h4 className="text-lg font-black text-[#0f172a] mt-0.5">₹{todaySale}</h4>
                            </div>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black tracking-wider px-2.5 py-1 rounded-md border border-emerald-100">
                            LIVE
                        </span>
                    </div>

                    {/* Weekly Sale Card */}
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                                <Layers size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400">Weekly Sale</p>
                                <h4 className="text-lg font-black text-[#0f172a] mt-0.5">
                                    {weeklySale !== null ? `₹${weeklySale.toLocaleString('en-IN')}` : "--"}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Sale Card */}
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <LayoutGrid size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400">Monthly Sale</p>
                                <h4 className="text-lg font-black text-[#0f172a] mt-0.5">
                                    {monthlySale !== null ? `₹${monthlySale.toLocaleString('en-IN')}` : "--"}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Bottom Navigation Action Button */}
                <div className="pt-2">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-4 bg-[#0f172a] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(15,23,42,0.15)] active:scale-[0.99] transition-transform"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>
                </div>

            </div>

            {/* 6. Sticky Bottom Tabs Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t border-gray-100 py-2 px-6 flex justify-between items-center z-50">
                <button 
                    onClick={() => navigate("/")} 
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#0f172a]"
                >
                    <LayoutDashboard size={20} />
                    <span className="text-[10px] font-semibold">Dashboard</span>
                </button>

                {/* Revenue Section active primary style wrapper */}
                <button className="flex flex-col items-center gap-1 text-[#ea580c]">
                    <div className="bg-orange-50 px-4 py-1.5 rounded-full text-[#ea580c]">
                        <IndianRupee size={20} />
                    </div>
                    <span className="text-[10px] font-bold">Revenue</span>
                </button>

                <button 
                    onClick={() => navigate("/calculator")} 
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#0f172a]"
                >
                    <CalcIcon size={20} />
                    <span className="text-[10px] font-semibold">Calculator</span>
                </button>
            </nav>

        </div>
    );
};

export default Revenue;