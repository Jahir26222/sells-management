import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Calculator from "../pages/Calculator";

const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route
                path="/calculator"
                element={<Calculator />}
            />

        </Routes>
    );
};

export default AppRoutes;