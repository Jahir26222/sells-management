import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import toast from "react-hot-toast";

import { calculateParcel, addSale } from "../services/saleService";

const Calculator = () => {

    const navigate = useNavigate();

    const [itemName, setItemName] = useState("Pani Puri");
    const [amount, setAmount] = useState("");
    const [addLoading, setAddLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    

    const handleCalculate = async () => {

        if (!amount) {
            return alert("Please Enter Amount");
        }

        try {

            setLoading(true);

            const data = await calculateParcel({
                itemName,
                amount: Number(amount)
            });

            setResult(data);

        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        } finally {

            setLoading(false);

        }

    };

    const handleAddSale = async () => {

        try {

            setAddLoading(true);

            await addSale({
                itemName,
                quantity: result.plates
            });

            toast.success("Sale Added Successfully");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Sale");

        } finally {

            setAddLoading(false);

        }

    };
    return (

        <div className="min-h-screen bg-gray-100 max-w-sm mx-auto p-4">

            <Header />

            <Card>

                <h2 className="text-xl font-bold">

                    Parcel Calculator

                </h2>

                {/* Select Item */}

                <div className="mt-5">

                    <label className="font-medium">

                        Select Item

                    </label>

                    <select
                        className="w-full mt-2 border rounded-xl p-3 outline-none"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    >

                        <option value="Pani Puri">
                            Pani Puri
                        </option>

                        <option value="Chaat">
                            Chaat
                        </option>

                    </select>

                </div>

                {/* Amount */}

                <div className="mt-5">

                    <label className="font-medium">

                        Enter Amount

                    </label>

                    <input
                        type="number"
                        placeholder="Enter Amount"
                        className="w-full mt-2 border rounded-xl p-3 outline-none"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                </div>

                {/* Button */}

                <div className="mt-6">

                    <Button
                        title={loading ? "Calculating..." : "Calculate"}
                        onClick={handleCalculate}
                        disabled={loading}
                    />

                </div>

            </Card>

            {/* Result */}

            {
                result && (

                    <div className="mt-5">

                        <Card>

                            <h2 className="text-xl font-bold mb-4">

                                Result

                            </h2>

                            <div className="space-y-3">

                                <div className="flex justify-between">

                                    <span>Amount</span>

                                    <span className="font-semibold">

                                        ₹{result.amount}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>Plate</span>

                                    <span className="font-semibold">

                                        {result.plates}

                                    </span>

                                </div>

                                {
                                    itemName === "Pani Puri" && (

                                        <div className="flex justify-between">

                                            <span>Total Puri</span>

                                            <span className="font-semibold">

                                                {result.totalItems}

                                            </span>

                                        </div>

                                    )
                                }

                            </div>

                        </Card>

                    </div>



                )
            }

            {
                result && (

                    <div className="mt-5">

                        <Button
                            title={
                                addLoading
                                    ? "Adding..."
                                    : "Add To Sale"
                            }
                            onClick={handleAddSale}
                            disabled={addLoading}
                        />

                    </div>

                )
            }

            {/* Back Button */}

            <div className="mt-5">

                <Button
                    title="← Back"
                    className="bg-gray-700"
                    onClick={() => navigate("/")}
                />

            </div>

        </div>

    );

};

export default Calculator;