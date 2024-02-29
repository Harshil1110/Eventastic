import Home from "./components/Home";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Login from "./components/Login";
import Vendor from "./components/Vendors";
import VendorSignUp from "./components/VendorSignUp";
import VendorEditProfile from "./components/VendorEditProfile";
import DetailVendor from "./components/DetailVendor";
import VendorDashboard from "./components/VendorDashboard";
import DeleteVendor from "./components/DeleteVendor";
import UploadImage from "./components/UploadImage";
import Feedback from "./components/Feedback";
import Report from "./components/Report";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import UserSignUp from "./components/UserSignUp";
import UserEditProfile from "./components/UserEditProfile";
import Shortlist from "./components/Shortlist";
import Search from "./components/Search";
import Payment from "./components/Payment";
import Dashboard from "./components/Dashboard";
import ResetPasswordd from "./components/ResetPasswordd";
import User from "./components/pages/User";
import AllVendors from "./components/pages/AllVendors";
import Cities from "./components/pages/Cities";
import Events from "./components/pages/Events";
import Categories from "./components/pages/Categories";
import ContactUss from "./components/pages/ContactUs";
import Feedbacks from "./components/pages/Feedback";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/pages/AdminLogin";
	
function App() {
  const isDashboardRoute = window.location.pathname.includes("/dashboard");
  const x = window.location.pathname.includes("/adminlogin");
  // console.log(isDashboardRoute);
  return (
    <>
      <Router>
      {(!isDashboardRoute && !x) && <Header />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/usersignup" element={<UserSignUp />} />
          <Route exact path="/usereditprofile" element={<UserEditProfile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/vendors" element={<Vendor />} />
          <Route exact path="/vendorsignup" element={<VendorSignUp />} />
          <Route exact path="/vendoreditprofile" element={<VendorEditProfile />}/>
          <Route exact path="/detailvendor/:id" element={<DetailVendor />} />
          <Route exact path="/vendordashboard" element={<VendorDashboard />} />
          <Route exact path="/feedback/:id" element={<Feedback />} />
          <Route exact path="/report/:id" element={<Report />} />
          <Route exact path="/shortlist/:id" element={<Shortlist />} />
          <Route exact path="/deletevendor/:id" element={<DeleteVendor />} />
          <Route exact path="/uploadimage" element={<UploadImage />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route exact path="/resetpasswordd" element={<ResetPasswordd />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/contactus" element={<ContactUs />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/users" element={<User />} />
          <Route exact path="/vendorss" element={<AllVendors />} />
          <Route exact path="/cities" element={<Cities />} />
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/contactuss" element={<ContactUss />} />
          <Route exact path="/feedbacks" element={<Feedbacks />} />
        </Routes>
        {(!isDashboardRoute && !x) && <Footer/>
        }
      </Router>
    </>
  );
}

export default App;
