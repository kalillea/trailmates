import { FormEvent, useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../authentication/UserProvider";
import { Button } from "../../components/Button/Button";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import useNavigate from "../../hooks/useNavigate";
import { uploadFile } from "../../storage/util/methods";
import { getTripById, postTrip, putTrip } from "../../trips/access";
import { Trip, TripSubmission } from "../../trips/trip";
import "./TripForm.css";

interface CustomElements extends HTMLFormControlsCollection {
  startCity: HTMLInputElement;
  destinationCity: HTMLInputElement;
  countries: HTMLInputElement;
  price: HTMLInputElement;
  tripDurationDays: HTMLInputElement;
  degreesCelcius: HTMLInputElement;
  tripLengthKm: HTMLInputElement;
  description: HTMLInputElement;
  attractions: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export const TripForm = () => {
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    if (tripId) {
      getTripById(tripId)
        .then((trip) => {
          setImageIds(trip.imageIds);
          return trip;
        })
        .then(setTrip);
    }
  }, [tripId]);

  const uploadFiles = async (tripId: string) => {
    for (let i = 0; i < (files?.length || 0); i++) {
      const file = files?.item(i);
      if (
        file?.type !== "image/png" &&
        file?.type !== "image/jpeg" &&
        file?.type !== "image/jpg" &&
        file?.type !== "image/jfif"
      ) {
        alert("Bildet må være av typen PNG, JPG eller JPEG");
        return;
      }

      const path = `trips/${tripId}/${imageIds[i]}`;

      await uploadFile(file, path);
    }
  };

  const onSubmit = async (event: FormEvent<CustomForm>) => {
    event.preventDefault();
    if (isLoading) return;

    const target = event.currentTarget.elements;

    const tripSubmission: TripSubmission = {
      startCity: target.startCity.value,
      destinationCity: target.destinationCity.value,
      countries: target.countries.value.split(new RegExp(", +")),
      price: parseInt(target.price.value),
      tripDurationDays: parseInt(target.tripDurationDays.value),
      degreesCelcius: parseInt(target.degreesCelcius.value),
      tripLengthKm: parseInt(target.tripLengthKm.value),
      description: target.description.value,
      attractions: target.attractions.value.split(new RegExp(", +")),
      imageIds: imageIds,
      posterUid: currentUser?.userUid!,
    };

    setIsLoading(true);
    if (trip) {
      await putTrip(trip.tripId, tripSubmission);
      await uploadFiles(trip.tripId);
      navigate("/reiserute/" + trip.tripId);
    } else {
      const { tripId } = await postTrip(tripSubmission);
      await uploadFiles(tripId);
      navigate("/reiserute/" + tripId);
    }
    setIsLoading(false);
  };

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <LoadingIndicator isLoading={isLoading} />
      <div className="trip-form-container">
        <h1>Del din reiseopplevelse med andre!</h1>
        <div
          style={{
            height: ".5vh",
            width: "70%",
            backgroundColor: "var(--accent)",
            borderRadius: "1000px",
            margin: "auto",
          }}
        />
        <div className="trip-form-top flex-row">
          <div className="trip-form-top-left">
            <h2>1. Litt generelt om reisen</h2>
            <div className="field">
              <label htmlFor="startCity">Hvilken by reiste du fra?</label>
              <input
                defaultValue={trip?.startCity}
                className="input-box"
                id="startCity"
                placeholder="Roma"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="destinationCity">Hvilken by reiste du til?</label>
              <input
                defaultValue={trip?.destinationCity}
                className="input-box"
                id="destinationCity"
                placeholder="Paris"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="countries">Hvilke land var du innom?</label>
              <input
                defaultValue={trip?.countries.join(", ")}
                className="input-box"
                id="countries"
                placeholder="Norge, USA, Island"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="price">Hva kostet reisen?</label>
              <input
                defaultValue={trip?.price}
                className="input-box"
                type="number"
                min="0"
                max="999999"
                id="price"
                placeholder="4500"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="tripDurationDays">
                Hvor mange dager brukte du på reisen?
              </label>
              <input
                defaultValue={trip?.tripDurationDays}
                className="input-box"
                type="number"
                min="0"
                max="365"
                id="tripDurationDays"
                placeholder="7"
                required
              />
            </div>
          </div>
          <div className="trip-form-top-right">
            <h2>2. Legg inn noen fine bilder fra reisen din!</h2>
            {trip ? (
              <ImageUpload
                {...{
                  setImageIds,
                  setFiles,
                  defaultImageIds: trip.imageIds,
                  tripId: trip.tripId,
                }}
              />
            ) : (
              <ImageUpload
                {...{
                  setImageIds,
                  setFiles,
                  defaultImageIds: [],
                  tripId: "",
                }}
              />
            )}
          </div>
        </div>
        <div className="trip-form-middle flex-row">
          <div className="trip-form-middle-left">
            <h2>3. Fortell oss litt om reisen din!</h2>
            <textarea
              defaultValue={trip?.description}
              className="input-description"
              id="description"
              placeholder="Det var godt og varmt!"
              required
            ></textarea>
          </div>
          <div className="trip-form-middle-right">
            <h2>4. Noen få reisedetaljer til</h2>
            <div className="field orange">
              <label htmlFor="degreesCelcius">Omtrentlig Temperatur</label>
              <input
                defaultValue={trip?.degreesCelcius}
                className="input-box"
                type="number"
                min="-100"
                max="70"
                step="0.1"
                id="degreesCelcius"
                placeholder="20"
                required
              />
            </div>
            <div className="field orange">
              <label htmlFor="tripLengthKm">Lengde (km)</label>
              <input
                defaultValue={trip?.tripLengthKm}
                className="input-box"
                type="number"
                min="0"
                max="40000"
                id="tripLengthKm"
                placeholder="300"
                required
              />
            </div>
            <div className="field orange">
              <label htmlFor="attractions">Attraksjoner</label>
              <input
                defaultValue={trip?.attractions.join(", ")}
                className="input-box"
                id="attractions"
                placeholder="Eiffeltårnet, Sfinx, Colosseum"
                required
              />
            </div>
          </div>
        </div>
        <div className="trip-form-container-bottom">
          <h2>5. Publiser reisen!</h2>
          <p>Har du husket på alt?</p>
          <Button
            width="30vw"
            height="4vh"
            text="Publiser reisen min!"
            styling={"secondary-fill"}
            fontSize="1.6vw"
          ></Button>
        </div>
      </div>
    </form>
  );
};
