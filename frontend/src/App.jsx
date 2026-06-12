import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"


function App() {
  
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
