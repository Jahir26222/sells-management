export const calculateParcel = (req, res) => {

    try {

        const { amount, itemName } = req.body;

        if (!amount || !itemName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let platePrice = 0;

        if (itemName === "Pani Puri") {
            platePrice = 20;
        } else if (itemName === "Chaat") {
            platePrice = 30;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Item"
            });
        }

        const plates = amount / platePrice;

        let totalItems = 0;

        if (itemName === "Pani Puri") {
            totalItems = plates * 6;
        } else {
            totalItems = plates;
        }

        res.status(200).json({
            success: true,
            amount,
            plates,
            totalItems
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
