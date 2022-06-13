import {
  BrowserRouter,
  Routes,
  Route
  } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {

  return (
    <BrowserRouter>
      <NavBar />     
      <main className="container mx-autops-3 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <br></br>
      <Footer />
    </BrowserRouter>
  );
}



export default App;