import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addSale, getTodaySale, getTotalRevenue, removeSale } from "../services/saleService";
import paniPuri from "../assets/pani-puri.jpg";
import chaat from "../assets/chaat.jpg";



const Home = () => {

    const [todaySale, setTodaySale] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const navigate = useNavigate();

    const fetchTodaySale = async () => {

        try {

            const data = await getTodaySale();

            setTodaySale(data.totalSale);

        } catch (error) {

            console.log(error);

        }

    }

    const fetchRevenue = async () => {

        try {

            const data = await getTotalRevenue();

            setRevenue(data.revenue);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchTodaySale();
        fetchRevenue();

    }, []);


    const handleSale = async (itemName, quantity) => {
        try {
            await addSale({
                itemName,
                quantity
            });
            fetchTodaySale();
            fetchRevenue();
            toast.success("Sale Added Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to Add Sale");
        }
    }

    const handleRemoveSale = async (itemName) => {
        try {
            await removeSale({ itemName });
            fetchTodaySale();
            fetchRevenue();
            toast.success("Sale Removed Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to Remove Sale");
        }
    }

    return (

        <div className="min-h-screen bg-gray-100 p-4 max-w-sm mx-auto">

            <Header />

            {/* Today's Sale */}

            <Card>

                <p className="text-gray-500 text-sm">

                    Today's Sale

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    ₹{todaySale}

                </h2>

            </Card>

            {/* Total Revenue */}

            <div className="mt-4">

                <Card>

                    <p className="text-gray-500">

                        Total Revenue

                    </p>

                    <h2 className="text-3xl font-bold">

                        ₹{revenue}

                    </h2>

                </Card>
            </div>

            {/* Pani Puri */}

            <div className="mt-4">

                <Card>

                    <h2 className="text-xl font-bold">

                        <span className="flex gap-2 items-center"><img className="w-12 h-12" src={paniPuri} />Pani Puri</span>

                    </h2>

                    <p className="text-gray-500">

                        ₹20 / Plate

                    </p>

                    <div className="mt-4 flex gap-2">

                        <Button
                            title="+ Add Sale"
                            onClick={() => handleSale("Pani Puri", 1)}
                        />

                         <Button
                            className="bg-red-800"
                            title="- Remove Sale"
                            onClick={() => handleRemoveSale("Pani Puri")}
                        />

                    </div>

                </Card>

            </div>

            {/* Chaat */}

            <div className="mt-4">

                <Card>

                    <h2 className="text-xl font-bold">

                        <span className="flex gap-2 items-center"><img className="w-12 h-12" src={chaat} />Chaat</span>

                    </h2>

                    <p className="text-gray-500">

                        ₹30 / Plate

                    </p>

                    <div className="mt-4 flex gap-2">

                        <Button
                            title="+ Add Sale"
                            onClick={() => handleSale("Chaat", 1)}
                        />
                        <Button
                           className="bg-red-800"
                            title="- Remove Sale"
                            onClick={() => handleRemoveSale("Chaat")}
                        />

                    </div>

                </Card>

            </div>

            {/* Calculator */}

            <div className="mt-4">

                <Button
                    title="🧮 Parcel Calculator"
                    onClick={() => navigate("/calculator")}
                />



            </div>

        </div>

    );

};

export default Home;