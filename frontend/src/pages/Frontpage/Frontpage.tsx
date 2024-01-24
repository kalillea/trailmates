import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { SplitSection } from "../../components/SplitSection/SplitSection";
import { TripSection } from "../../components/TripSection/TripSection";
import {
  getLatestTrips,
  getRecommendedTrips,
  getTopRatedTrips,
  getTrips,
} from "../../trips/access";
import "./Frontpage.css";
import { Trip } from "../../trips/trip";
import { UserContext } from "../../authentication/UserProvider";

export const Frontpage = () => {
  const [recommendedTrips, setRecommendedTrips] = useState<Trip[]>([]);
  const [topRatedTrips, setTopRatedTrips] = useState<Trip[]>([]);
  const [latestTrips, setLatestTrips] = useState<Trip[]>([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getTopRatedTrips().then(setTopRatedTrips);
    getLatestTrips().then(setLatestTrips);
  }, []);

  useEffect(() => {
    if (currentUser) {
      getRecommendedTrips(currentUser.userUid).then(setRecommendedTrips);
    } else {
      getTrips().then(setRecommendedTrips);
    }
  }, [currentUser]);

  useEffect(() => {
    document.title = "Trailmates - Hjem";
  }, []);

  return (
    <div className="offset-container">
      <Header />
      <SplitSection />
      <div className="frontpage-container">
        <TripSection
          trips={topRatedTrips}
          text="Toppreiser"
          textColor="black"
        />
        <TripSection
          trips={latestTrips}
          text="Nylig publisert"
          textColor="black"
        />
        <TripSection
          trips={recommendedTrips}
          text="Anbefalt for deg"
          textColor="black"
        />
      </div>
    </div>
  );
};
