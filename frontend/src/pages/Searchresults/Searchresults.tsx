import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TripCollection } from "../../components/TripCollection/TripCollection";
import { Trip } from "../../trips/trip";
import { getTrips } from "../../trips/access";
import { InputField } from "../../components/InputField/InputField";
import "./Searchresults.css";
import { removeDuplicates } from "../../trips/utils";

/**
 * A trip that has a priority from 1 to 5.
 * The lower the priority, the more relevant the trip is to the search query.
 */
interface PrioritizedTrip extends Trip {
  priority: number;
}

const attributePriority = {
  destinationCity: 1,
  startCity: 1,
  countries: 2,
  description: 3,
};

const applyTripFilters = (
  prioritizedTrips: PrioritizedTrip[],
  callbacks: ((trips: Trip[]) => Trip[])[],
): PrioritizedTrip[] => {
  const priorityMap = new Map(
    prioritizedTrips.map((trip) => [trip.tripId, trip.priority]),
  );
  const trips = prioritizedTrips.map((trip) => trip as Trip);
  let filteredTrips: Trip[] = trips;
  for (const callback of callbacks) {
    filteredTrips = callback(filteredTrips);
  }
  return filteredTrips.map(
    (trip) =>
      ({
        ...trip,
        priority: priorityMap.get(trip.tripId),
      } as PrioritizedTrip),
  );
};

const Searchresults = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<PrioritizedTrip[]>([]);

  useEffect(() => {
    const getAllTrips = async () => {
      if (allTrips.length === 0) {
        await getTrips()
          .then((trips) => {
            setAllTrips(removeDuplicates(trips));
          })
          .catch(console.error);
      }
      setQuery(searchParams.get("query") || "");
    };
    getAllTrips();
  }, [searchParams]);

  useEffect(() => {
    if (allTrips.length === 0) console.warn("No trips found");
    if (query === "") {
      setFilteredTrips(allTrips.map((trip) => ({ ...trip, priority: 1 })));
      return;
    }
    const trips: PrioritizedTrip[] = [];

    allTrips.forEach((trip) => {
      const searchAttributes: (keyof typeof attributePriority)[] = [
        "destinationCity",
        "startCity",
        "description",
        "countries",
      ];
      for (const attribute of searchAttributes) {
        if (attribute === "countries") {
          if (trip.countries.some((country) => country.includes(query))) {
            trips.push({ ...trip, priority: attributePriority[attribute] });
            break;
          }
        } else if (trip[attribute].includes(query)) {
          trips.push({ ...trip, priority: attributePriority[attribute] });
          break;
        }
      }
    });

    trips.sort((a, b) => a.priority - b.priority);
    setFilteredTrips(trips);
  }, [query]);

  return (
    <div className="search-results">
      <div className="search-header-background"></div>
      <InputField
        labelText="Søk"
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Søk etter reiser!"
      />
      {filteredTrips.length > 0 ? (
        <TripCollection trips={filteredTrips} />
      ) : (
        <h1>
          Dessverre er det ingen reiser som er relatert til søkeordet ditt!
          Gjerne prøv et nytt søk
        </h1>
      )}
    </div>
  );
};

export default Searchresults;
