import { getTripById } from "../access";
import { Trip } from "../trip";
import { deleteFavorite, addFavorite, getFavorites } from "./access";

type setStateFunction = React.Dispatch<React.SetStateAction<Trip[]>>;

export const removeFavorite = async (
  userUid: string,
  tripId: string,
  setStateFunction: setStateFunction,
) =>
  await deleteFavorite(userUid, tripId).then(() =>
    setStateFunction((prev) => {
      return prev.filter((trip) => trip.tripId !== tripId);
    }),
  );

export const appendFavorite = async (
  userUid: string,
  tripId: string,
  setStateFunction: setStateFunction,
) =>
  await addFavorite(userUid, tripId).then(() => {
    getTripById(tripId).then((trip) => {
      setStateFunction((prev) => {
        return [...prev, trip];
      });
    });
  });
export const retrieveFavorites = async (
  userUid: string,
  setStateFunction: setStateFunction,
) =>
  await getFavorites(userUid).then((favorites) => {
    setStateFunction(favorites);
  });

export const isFavorite = (favorites: Trip[], tripId: string) =>
  favorites.map((trip) => trip.tripId).includes(tripId);
