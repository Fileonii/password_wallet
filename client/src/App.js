import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Login, Register } from "./routes"
import { PrivateRoute } from "./components"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                    
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
