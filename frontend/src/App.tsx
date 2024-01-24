import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Frontpage } from "./pages/Frontpage/Frontpage";
import Footer from "./components/Footer/Footer";
import UserProvider from "./authentication/UserProvider";
import { PrivateProfile } from "./pages/PrivateProfile/PrivateProfile";
import { PublicProfile } from "./pages/PublicProfile/PublicProfile";
import { ToTopButton } from "./components/ToTopButton/ToTopButton";
import { TripPage } from "./pages/TripPage/TripPage";
import { TripForm } from "./pages/TripForm/TripForm";
import Searchresults from "./pages/Searchresults/Searchresults";
import { MyTrips } from "./pages/MyTrips/MyTrips";
import { Favorites } from "./pages/Favorites/Favorites";
import { FavoritesProvider } from "./trips/favorites/FavoritesProvider";
import { LoginPopup } from "./components/LoginPopup/LoginPopup";

export const App = () => {
  return (
    <UserProvider>
      <LoginPopup>
        <FavoritesProvider>
          <BrowserRouter>
            <Navbar></Navbar>
            <main>
              <Routes>
                <Route path="/" element={<Frontpage />} />
                <Route path="/profile" element={<PrivateProfile />} />
                <Route path="/profile/:uid" element={<PublicProfile />} />
                <Route path="/reiserute/:tripId" element={<TripPage />} />
                <Route path="/createtrip/" element={<TripForm />} />
                <Route path="/edittrip/:tripId" element={<TripForm />} />
                <Route path="/search" element={<Searchresults />} />
                <Route path="/mytrips" element={<MyTrips />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
              <Footer />
            </main>
            <ToTopButton />
          </BrowserRouter>
        </FavoritesProvider>
      </LoginPopup>
    </UserProvider>
  );
};
