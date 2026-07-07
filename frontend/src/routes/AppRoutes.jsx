import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Calculator from "../pages/Calculator";
import Revenue from "../pages/Revenue";

const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route
                path="/calculator"
                element={<Calculator />}
            />
            <Route
              path="/revenue"
              element={<Revenue/>}
            />

        </Routes>
    );
};

export default AppRoutes;