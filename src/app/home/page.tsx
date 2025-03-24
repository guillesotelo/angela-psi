"use client";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Home() {
    const { isMobile } = useContext(AppContext)

    return <div className="home__container">
        <div className="home__wrapper">
            <div className="home__row" style={{ gap: '3rem' }}>
                {!isMobile ?
                    <div className="home__col">
                        <img className="home__profile-image" src='/assets/images/profile.png' draggable={false} />
                    </div> : ''}
                <div className="home__col">
                    <div className="home__profile-info">
                        <h1 className="home__title">ÁNGELA SANGUINO GARCÍA</h1>
                        <h1 className="home__subtitle">PSICÓLOGA CLÍNICA</h1>
                        <p className="home__text">Registro 001565 F.U.K.L. 2,000 Colombia</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Experiencia: </span></strong>20 años</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Abordaje: </span></strong>Integrativo</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Modalidad: </span></strong>Individual y Grupal</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Población: </span></strong>Jóvenes, Adult@s, Pareja, Familia</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Encuentro: </span></strong>Online - Google Meets</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Atención: </span></strong>Sábado a Jueves en Horario de España</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Restricción: </span></strong>Servicio aún no homologado en España, aplica sólo en relación al Registro Profesional en Colombia</p>
                    </div>
                </div>
                {isMobile ?
                    <div className="home__col">
                        <img className="home__profile-image" src='/assets/images/profile.png' draggable={false} />
                    </div> : ''}
            </div>
            <div className="home__row">
                <p className="home__text" style={{ margin: '4rem' }}><strong>¡Me entusiasma que hayamos coincidido aquí, recibe un afectuoso saludo!</strong></p>
            </div>

            <div className="home__row" style={{ gap: '2rem' }}>
                <div className="home__col" style={{ width: isMobile ? '' : '45%' }}>
                    <p className="home__p">
                        La Psicología es un medio para reflexionar, conocerse y encontrar un sano sentido a inquietudes sobre la existencia, bienestar, decisiones y relaciones. Su finalidad es ajustar, actualizar y enriquecer la experiencia de vida.
                        <br /><br />
                        Culminé mi carrera profesional en la Fundación Universitaria Konrad Lorenz en Bogotá - Colombia en el año 2000 y desde entonces he ganado valiosa experiencia asesorando, formando y fortaleciendo psicológicamente a individuos, grupos y organizaciones.
                        <br /><br />
                        Mi formación comenzó en el Modelo Cognitivo Conductual, pero con el tiempo evolucioné hacia un Modelo más Integral e Introspectivo, donde la conducta, el sentimiento y la percepción es una manifestación de estados interpretativos internos o de conciencia y donde la mente es el único epicentro creativo y de transformación para diluir la responsabilidad a agentes externos.
                        <br /><br />
                        Mi objetivo central estará en que sientas calma y percibas correctamente en medio de algún conflicto y que operes consciente de la libertad que dispones para dirigir tu propio mundo mental al comunicarte y relacionarte.
                    </p>
                </div>
                <div className="home__col" style={{ width: isMobile ? '' : '45%' }}>
                    <p className="home__p">
                        En este espacio profesional, seguro, libre de juicios, presiones e influencias externas podrás:
                        <br />
                        <br />• Expresarte con libertad, sin sesgos ni manipulaciones.

                        <br />• Distinguir entre la realidad y la fantasía interna proyectada sobre un agente externo a ti.

                        <br />• Liberar tu identidad de distorsiones, condicionamientos limitantes y mecanismos de retraso.

                        <br />• Identificar la causa raíz en las situaciones desafiantes, corregirlas con la comprensión del error psicológico y el uso de diversas estrategias y herramientas.

                        <br />• Reflexionar sobre ti, tu vida, propósito y elecciones.

                        <br />• Elegir pensamientos para encausar emociones y decisiones favorables.

                        <br />• Liberar el uso sano, creativo y expansivo de la mente.

                        <br />• Constatar que eres libre de ser feliz, vivir pleno y en paz.

                        <br />• Expresar y actuar desde un estado mental pacífico con autenticidad, actuando en coherencia con tu propósito.

                        <br />• Relacionarte sin complejos, en confianza y afecto genuino.

                        <br />• Actuar según tus valores asumidos conscientemente.
                    </p>
                </div>
            </div>
            <div className="home__row" style={{ borderTop: '3px solid #caddd8', width: '60%', margin: '2rem auto 0' }}>
            </div>
            <div className="home__row">
                <div className="home__col" style={{ width: isMobile ? '95%' : '80%' }}>
                    <p className="home__text" style={{ margin: '2rem auto', fontSize: '2rem' }}><strong>SERVICIOS - PRECIOS - PROCEDIMIENTO DE CITA
                    </strong></p>
                    <p className="home__p" style={{ textAlign: 'center' }}>
                        Como cualquier Servicio Profesional Virtual, se requiere pago anticipado completo, sin excepción.
                        Una vez efectuado el pago, envía el comprobante de transferencia por WhatsApp y coordinamos la cita.
                    </p>

                    <div className="home__row" style={{ gap: '2rem' }}>
                        <div className="home__price-group">
                            <p className="home__price-group-title">SESIONES PRIVADAS</p>
                            <div className="home__price-row">
                                <div className="home__price-item">
                                    <p className="home__price-title">PRIMERA CONSULTA DE 90 MINUTOS</p>
                                    <p className="home__price-text">$90,000 COP | €30</p>
                                </div>
                                <div className="home__price-item">
                                    <p className="home__price-title">CONSULTA INDIVIDUAL</p>
                                    <p className="home__price-text">$130,000 COP x 1 hora | $200,000 COP x 2 horas</p>
                                    <p className="home__price-text">€40 x 1 hora | €60 x 2 horas</p>
                                </div>
                                <div className="home__price-item">
                                    <p className="home__price-title">PAQUETE DE 4 SESIONES (Semanales y consecutivas)</p>
                                    <p className="home__price-text">$400,000 COP x 4 horas | $600,000 COP x 2 horas</p>
                                    <p className="home__price-text">€120 x 4 horas | €200 x 2 horas</p>
                                </div>
                            </div>
                        </div>

                        <div className="home__price-group">
                            <p className="home__price-group-title">SESIONES GRUPALES</p>
                            <div className="home__price-row">
                                <div className="home__price-item">
                                    <p className="home__price-title">GRUPO DE APOYO PSICOTERAPÉUTICO (4 sesiones, semanales y consecutivas. Jueves 18:00 horas de España)</p>
                                    <p className="home__price-text">$200,000 COP | €40</p>
                                </div>
                                <div className="home__price-item">
                                    <p className="home__price-title">GRUPO DE APOYO ESPIRITUAL (Sesiones semanales, sin continuidad fija)</p>
                                    <p className="home__price-text">$ Aporte Voluntario</p>
                                </div>
                                <div className="home__price-item">
                                    <p className="home__price-title">CHARLAS & ENCUENTROS FORMATIVOS (Online o presenciales. 4 horas)</p>
                                    <p className="home__price-text">$1,000,000 COP | €200</p>
                                    <p className="home__price-text">(Valor de Transporte y Alojamiento en caso de ser presencial no está incluido.)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="home__p" style={{ textAlign: 'center', margin: '4rem 0 0', fontSize: '1.3rem' }}>
                Si te decides por algún servicio, comunícate vía WhatsApp
                <br />y con gusto acordaremos canal de pago, fecha y hora de nuestra cita.
                <br /><br /><span style={{ fontSize: '1.6rem', fontWeight: 'bold', }}>WHATSAPP {isMobile ? <br /> : ''}+34 650 60 92 82</span>
            </p>
        </div>
    </div>
}