//Pakclassified

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Pakclassified/Component/navbar";
import Carseoul from "./components/Pakclassified/Component/carseoulimg";
import Searching from "./components/Pakclassified/Component/seraching&listing ";
import Categories from "./components/Pakclassified/Pages/allcategories";
import CategoryPage from "./components/Pakclassified/Pages/cardcategory";
import About from "./components/Pakclassified/Component/about";
import Contact from "./components/Pakclassified/Component/contact";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Pakclassified/Component/footer";
import CarDetailsPage from "./components/Pakclassified/Pages/Carddetail";
import LatestPosts from "./components/Pakclassified/Pages/lastestposting";
import Dashboard from "./components/Pakclassified/Component/dashboard";
import VerifyOTP from "./components/Pakclassified/Component/otp";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={ <>
              <Carseoul/>
              <Searching />
              <Categories />
              <LatestPosts/>
            </>
          }/>
       <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ad/:id" element={<CarDetailsPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
        <Footer/>
         <ToastContainer />
    </BrowserRouter>
  );
};

export default App;


