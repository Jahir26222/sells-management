import salemodel from '../models/sale.model.js';

export const addSale = async (req, res) => {
    try {

        const { itemName, quantity } = req.body;

        if (!itemName || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Price Backend decide karega
        let price = 0;

        if (itemName === "Pani Puri") {
            price = 20;
        } else if (itemName === "Chaat") {
            price = 30;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Item"
            });
        }

        const total = quantity * price;

        const sale = await salemodel.create({
            itemName,
            quantity,
            price,
            total
        });

        res.status(201).json({
            success: true,
            message: "Sale Added Successfully",
            sale
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

export const getTodaySale = async (req, res) => {
    try {

        // Aaj ke din ki starting
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        // Aaj ke din ki ending
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const sales = await salemodel.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        });

        let totalSale = 0;
        let paniPuriSale = 0;
        let chaatSale = 0;

        sales.forEach((sale) => {

            totalSale += sale.total;

            if (sale.itemName === "Pani Puri") {
                paniPuriSale += sale.total;
            }

            if (sale.itemName === "Chaat") {
                chaatSale += sale.total;
            }

        });

        res.status(200).json({
            success: true,
            totalSale,
            paniPuriSale,
            chaatSale
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getTotalRevenue = async (req, res) => {

    try {

        const sales = await salemodel.find();

        let revenue = 0;

        sales.forEach((sale) => {

            revenue += sale.total;

        });

        res.status(200).json({
            success: true,
            revenue
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// export const removeSale = async (req, res) => {

//     try {

//         const { itemName } = req.body;

//         if (!itemName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Item Name is required"
//             });
//         }

//         const sale = await salemodel.findOneAndDelete(
//             { itemName },
//             { sort: { createdAt: -1 } }
//         );

//         if (!sale) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Sale Found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Sale Removed Successfully"
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// }


export const removeSale = async (req, res) => {
    try {
        const { itemName } = req.body;

        if (!itemName) {
            return res.status(400).json({
                success: false,
                message: "Item Name is required"
            });
        }

        // Sabse latest sale dhoondhenge us item ki
        const latestSale = await salemodel.findOne({ itemName }).sort({ createdAt: -1 });

        if (!latestSale) {
            return res.status(404).json({
                success: false,
                message: "No Sale Found to remove"
            });
        }

        // Agar entry me quantity 1 se zyada hai (jaise Calc se multiple items add hue thhe)
        if (latestSale.quantity > 1) {
            latestSale.quantity -= 1;
            latestSale.total = latestSale.quantity * latestSale.price;
            await latestSale.save(); // Sirf ek quantity aur uska total minus karke save kar diya
        } else {
            // Agar entry me sirf 1 hi quantity bachi hai, toh poori document remove kar denge
            await salemodel.findByIdAndDelete(latestSale._id);
        }

        res.status(200).json({
            success: true,
            message: "1 Plate Removed Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// export const getWeeklySale = async (req, res) => {
//     try {
//         // Aaj se 7 din pehle ki starting (00:00:00) date nikalna
//         const startOfWeek = new Date();
//         startOfWeek.setDate(startOfWeek.getDate() - 6);
//         startOfWeek.setHours(0, 0, 0, 0);

//         // Aaj ke din ka end time
//         const endOfWeek = new Date();
//         endOfWeek.setHours(23, 59, 59, 999);

//         const sales = await salemodel.find({
//             createdAt: {
//                 $gte: startOfWeek,
//                 $lte: endOfWeek
//             }
//         });

//         let totalSale = 0;
//         sales.forEach((sale) => {
//             totalSale += sale.total;
//         });

//         // Agar koi sale nahi mili (ya total 0 hai), toh frontend condition ke mutabik hum totalSale: 0 bhejenge
//         res.status(200).json({
//             success: true,
//             totalSale
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// 2. GET MONTHLY SALE CONTROLLER



export const getWeeklySale = async (req, res) => {
    try {
        const today = new Date();

        // Monday = 1 ... Sunday = 0
        const day = today.getDay();

        // Previous week's Monday
        const startDate = new Date(today);

        if (day === 0) {
            // Sunday
            startDate.setDate(today.getDate() - 13);
        } else {
            startDate.setDate(today.getDate() - day - 6);
        }

        startDate.setHours(0, 0, 0, 0);

        // Previous week's Sunday
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        const sales = await salemodel.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalSale = sales.reduce((sum, sale) => sum + sale.total, 0);

        const formatDate = (date) =>
            date.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
            });

        res.status(200).json({
            success: true,
            totalSale,
            label: `${formatDate(startDate)} - ${formatDate(endDate)}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// export const getMonthlySale = async (req, res) => {


//     try {
//         // Aaj se 30 din pehle ki starting (00:00:00) date nikalna
//         const startOfMonth = new Date();
//         startOfMonth.setDate(startOfMonth.getDate() - 30);
//         startOfMonth.setHours(0, 0, 0, 0);

//         // Aaj ke din ka end time
//         const endOfMonth = new Date();
//         endOfMonth.setHours(23, 59, 59, 999);

//         const sales = await salemodel.find({
//             createdAt: {
//                 $gte: startOfMonth,
//                 $lte: endOfMonth
//             }
//         });

//         let totalSale = 0;
//         sales.forEach((sale) => {
//             totalSale += sale.total;
//         });

//         res.status(200).json({
//             success: true,
//             totalSale
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };



export const getMonthlySale = async (req, res) => {
    try {

        // First Sale
        const firstSale = await salemodel.findOne().sort({ createdAt: 1 });

        if (!firstSale) {
            return res.json({
                success: true,
                totalSale: null,
                isAvailable: false,
                remainingDays: 30
            });
        }

        const today = new Date();

        const diffDays = Math.floor(
            (today - firstSale.createdAt) / (1000 * 60 * 60 * 24)
        );

        if (diffDays < 30) {
            return res.json({
                success: true,
                totalSale: null,
                isAvailable: false,
                remainingDays: 30 - diffDays
            });
        }

        const startDate = new Date();
        startDate.setDate(today.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const sales = await salemodel.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalSale = sales.reduce((sum, sale) => sum + sale.total, 0);

        const formatDate = (date) =>
            date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short"
            });

        res.json({
            success: true,
            isAvailable: true,
            totalSale,
            label: `${formatDate(startDate)} - ${formatDate(endDate)}`
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};