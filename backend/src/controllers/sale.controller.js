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

export const removeSale = async (req, res) => {

    try {

        const { itemName } = req.body;

        if (!itemName) {
            return res.status(400).json({
                success: false,
                message: "Item Name is required"
            });
        }

        const sale = await salemodel.findOneAndDelete(
            { itemName },
            { sort: { createdAt: -1 } }
        );

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: "No Sale Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Sale Removed Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}