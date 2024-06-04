// cardHome.js
import React from "react";
import imageHome from "@/assets/imageHome.png"; // Ruta de la imagen de inicio
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "./HomePage.css"; // Estilos CSS para la página de inicio

function CardHome({ onViewContacts }) {
    return (
        <div className="home-container">
            <div className="content">
                <div className="text">
                    <h1 className="title text-center">¡Bienvenido!</h1>
                    <p className="description">En este espacio, podrás gestionar de forma sencilla y rápida todos tus contactos. Desde amigos y familiares hasta colegas y clientes, nuestro directorio te permite organizar y localizar información de manera eficiente. ¡Explora nuestras funciones y comienza a simplificar tu vida hoy mismo!</p>
                    <button className="cta-button" onClick={onViewContacts}>Ver Contactos <FontAwesomeIcon icon={faArrowRight} /> </button>
                </div>
                <div className="image">
                    <img src={imageHome} alt="Imagen de inicio" />
                </div>
            </div>
        </div>
    );
}

export default CardHome;
