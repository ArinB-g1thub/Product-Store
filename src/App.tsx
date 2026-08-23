import { Routes, Route, Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"

function App() {
  return (
    <div>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/ProductDetail/:id" element={<ProductDetail/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route
            path="*"
            element={
              <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  404 - Page Not Found
                </h2>
                <p className="text-slate-500 mb-6">
                  The page you are looking for does not exist.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-slate-900 hover:bg-slate-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App;