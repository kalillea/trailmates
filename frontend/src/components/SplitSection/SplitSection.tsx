import React from "react";
import "./SplitSection.css";
import img from "../assets/splitsec.svg";
import { TitleSeperator } from "../TitleSeperator/TitleSeperator";

export const SplitSection = () => {
  return (
    <div className="container">
      <img
        src={img}
        alt="Image of moped in the streets"
        className="split-img"
      />
      <div className="splitsec-right">
        <h2>
          Vurderer du backpacking som <br /> ditt neste eventyr?
        </h2>
        <TitleSeperator width="70%" height="1%" color="secondary" />
        <p>
        Velkommen til TrailMates, den ultimate destinasjonen for backpackere 
        som ønsker å utforske verden på en autentisk og uforglemmelig måte! 
        Vi er glade for å ha deg her, og vi er her for å hjelpe deg med å få 
        mest mulig ut av backpacking-opplevelsene dine.
        </p>
        <p>
        På TrailMates finner du alt du trenger for å planlegge den perfekte 
        backpacking-turen, enten du skal til fjerne, eksotiske steder eller 
        utforske lokale ruter. Vi har omfattende guider til de beste 
        backpacking-stiene, detaljerte kart og ruteplanlegger, og en mengde 
        nyttige tips og triks for å hjelpe deg med å pakke lett og få mest 
        mulig ut av opplevelsen.
        </p>
        <p>
        Takk for at du har valgt TrailMates som din guide til backpacking-verdenen. 
        Vi er her for å hjelpe deg med å få mest mulig ut av opplevelsen og utforske 
        verden på en unik og autentisk måte. Lykke til med din neste eventyrlystne reise!
        </p>
        
      </div>
    </div>
  );
};
