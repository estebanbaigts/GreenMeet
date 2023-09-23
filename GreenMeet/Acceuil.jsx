import React from "react";
import "./style.css";

export const Accueil = () => {
    return (
    <div className="accueil">
        <div className="overlap-wrapper">
        <div className="overlap">
            <img className="image"/>
            <div className="title">Bienvenue sur GreenMeet</div>
            <div className="group">
                <div className="overlap-group">
                    <div className="text-wrapper">Identifiant</div>
                </div>
            </div>
            <div className="overlap-group-wrapper">
                <div className="subtitle-wrapper">
                <div className="subtitle">Mot de passe</div>
                </div>
            </div>
            <div className="submit-button">
                <div className="title-wrapper">
                <div className="div">Connexion</div>
                </div>
            </div>
            <div className="title-2">Je n'ai pas de compte</div>
            </div>
        </div>
        </div>
    );
};
