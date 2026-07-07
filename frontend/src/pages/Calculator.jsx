import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronDown, 
  Calculator as CalcIcon, 
  RotateCcw, 
  LayoutDashboard, 
  IndianRupee 
} from "lucide-react";
import toast from "react-hot-toast";
import { calculateParcel, addSale } from "../services/saleService";
import logo from "../assets/logo.jpg";

const Calculator = () => {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("Pani Puri");
  const [amount, setAmount] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    if (!amount) {
      return toast.error("Please Enter Amount");
    }

    try {
      setLoading(true);
      const data = await calculateParcel({
        itemName,
        amount: Number(amount),
      });
      setResult(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSale = async () => {
    try {
      setAddLoading(true);
      await addSale({
        itemName,
        quantity: result.plates,
      });
      toast.success("Sale Added Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Sale");
    } finally {
      setAddLoading(false);
    }
  };

  const handleClear = () => {
    setAmount("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#dce5ed] text-[#0f172a] font-sans pb-24 max-w-md mx-auto relative shadow-md">
      
      {/* 1. Header Navigation */}
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 text-[#0f172a] hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-black text-[#a14b05] tracking-tight">Parcel Calculator</h1>
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
          <img 
            src={logo} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      <div className="p-5 space-y-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-3xl font-black text-[#0f172a] tracking-tight">Quick Calc</h2>
          <p className="text-sm text-gray-500 mt-1">Estimate portions and totals instantly.</p>
        </div>

        {/* 2. Main Calculator Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
          
          {/* Item Selector Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-black tracking-wider text-[#78350f] uppercase">
              Select Item
            </label>
            <div className="relative">
              <select
                className="w-full bg-white border border-gray-200 rounded-xl p-3.5 pr-10 appearance-none font-bold text-[#0f172a] outline-none focus:border-orange-500 transition-colors"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              >
                <option value="Pani Puri">Pani Puri (₹20/plate)</option>
                <option value="Chaat">Chaat (₹30/plate)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Amount Input Fields */}
          <div className="space-y-2">
            <label className="text-xs font-black tracking-wider text-[#78350f] uppercase">
              Enter Amount (₹)
            </label>
            <div className="relative flex items-center bg-[#f8fafc] border border-gray-100 rounded-xl px-4">
              <span className="text-2xl font-bold text-gray-400">₹</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-transparent p-3.5 pl-2 text-2xl font-black text-[#0f172a] placeholder-gray-300 outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Calculate CTA Button */}
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full py-4 bg-[#ea580c] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(234,88,12,0.25)] active:scale-[0.99] transition-transform disabled:opacity-70"
          >
            <CalcIcon size={18} />
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </div>

        {/* 3. Output/Result Window Render */}
        {result && (
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] space-y-3.5">
            <h3 className="font-black text-gray-400 text-xs tracking-widest uppercase">Calculation Result</h3>
            <div className="divide-y divide-gray-50 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-gray-500 font-medium">Target Amount</span>
                <span className="font-bold text-[#0f172a]">₹{result.amount}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500 font-medium">Calculated Plates</span>
                <span className="font-black text-[#ea580c] text-base">{result.plates} Plates</span>
              </div>
              {itemName === "Pani Puri" && result.totalItems && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 font-medium">Total Puri Count</span>
                  <span className="font-bold text-emerald-600">{result.totalItems} Pieces</span>
                </div>
              )}
            </div>

            <button
              onClick={handleAddSale}
              disabled={addLoading}
              className="w-full mt-2 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-transform shadow-sm disabled:opacity-70"
            >
              {addLoading ? "Adding into Sales..." : "Confirm & Add To Sale"}
            </button>
          </div>
        )}

        {/* 4. Utilities Actions Controls */}
        <div className="flex flex-col items-center gap-4 pt-2">
          {(amount || result) && (
            <button 
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RotateCcw size={14} />
              Clear Calculation
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="w-full py-4 bg-white text-[#2d2219] border border-gray-200/80 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-transform"
          >
            <LayoutDashboard size={18} className="text-gray-400" />
            Back to Dashboard
          </button>
        </div>

      </div>

      {/* 5. Sticky Bottom Tabs Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t border-gray-100 py-2 px-6 flex justify-between items-center z-50">
        <button onClick={() => navigate("/")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#0f172a]">
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-semibold">Dashboard</span>
        </button>

        <button onClick={() => navigate("/revenue")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#0f172a]">
          <IndianRupee size={20} />
          <span className="text-[10px] font-semibold">Revenue</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-[#ea580c]">
          <div className="bg-orange-50 px-4 py-1.5 rounded-full text-[#ea580c]">
            <CalcIcon size={20} />
          </div>
          <span className="text-[10px] font-bold">Calculator</span>
        </button>
      </nav>

    </div>
  );
};

export default Calculator;