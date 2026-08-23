import { Routes, Route } from "react-router-dom"
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
          <Route path="*" element={<p>Page Not Found</p>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;