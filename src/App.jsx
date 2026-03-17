
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./components/Portfoilio/home";
// import Navbar from "./components/Portfoilio/Navbar";
// import Skills from "./components/Portfoilio/Skills";
// import Projects from "./components/Portfoilio/Projects";
// import Footer from "./components/Portfoilio/Footer";
// import About from "./components/Portfoilio/About";
// import Contact from "./components/Portfoilio/Contact";
// import { ToastContainer } from "react-toastify";
// import Tools from "./components/Portfoilio/Tools";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className=" bg-black d-flex flex-column min-vh-100">
//       <Navbar />
//          <main className="flex-grow-1">
//       <Routes>
//         <Route path="/" element={   
//           <>
//             <Home />
//             <Skills />
//             <About />
//             <Tools/>
//             <Projects />
//             <Contact/>
//           </>
//         } />
//         <Route path="/" element={<Home />} />
//         <Route path="/skills" element={<Skills />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />


//       </Routes>
//         </main>
//         <Footer/>
//       </div>
//       <ToastContainer/>
//     </BrowserRouter>
//   );
// };

// export default App;





// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Task Managment/navbar";
// import Taskcard from "./components/Task Managment/taskcard";

// import { ToastContainer } from "react-toastify";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className=" bg-white d-flex flex-column min-vh-100">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Taskcard/>} />
//         </Routes>
//       </div>
//       <ToastContainer />
//     </BrowserRouter>
//   );
// };

// export default App;




















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



















//TAsk APp

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Footer from "./components/Task App/footer";
// import All from "./components/Task App/Pages/alltask";
// import Favorite from "./components/Task App/Pages/favorite";
// import Learning from "./components/Task App/Pages/learning";
// import Personal from "./components/Task App/Pages/personal";
// import Work from "./components/Task App/Pages/work";
// import { ToastContainer } from "react-toastify";
// import NavBar from "./components/Task App/navbar";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="d-flex flex-column min-vh-100">
//         <NavBar />

//         <div className="flex-grow-1">
//           <Routes>
//             <Route path="/" element={<All />} />
//             <Route path="/all" element={<All />} />
//             <Route path="/favorite" element={<Favorite />} />
//             <Route path="/work" element={<Work />} />
//             <Route path="/personal" element={<Personal />} />
//             <Route path="/learning" element={<Learning />} />
//           </Routes>
//         </div>

//         <Footer />
//         <ToastContainer />
//       </div>
//     </BrowserRouter>
//   );
// };
// export default App;

