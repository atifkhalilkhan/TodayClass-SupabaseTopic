import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import SpacePage from "../pages/SpacePage";

export default function AppRouter() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:spaceId/*" element={<SpacePage />} />
            </Routes>
        </BrowserRouter>
    </>
}