"use client";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { createSlug, getPrice } from "src/helpers";
import { dataObj, serviceType } from "../types";
import { marked } from 'marked';

type Props = {
    services: dataObj
}

export default function Home({ services }: Props) {
    const { isMobile } = useContext(AppContext)

    const ServiceCard = ({ service, width }: dataObj) => {
        return (
            <a href={`/servicio/${createSlug(service.title || '')}`} className="home__service-item" style={{ width: isMobile ? '' : width }}>
                <div className="home__service-item-wrapper">
                    <h4 className="home__service-item-title">{service.title}</h4>
                </div>
                {/* <p className="home__service-item-price">{`${getPrice(service.priceEUR)}`}</p> */}
                <div className="home__service-item-text" dangerouslySetInnerHTML={{ __html: marked.parse(service.description) }} />
            </a>
        )
    }

    return <div className="home__container">
        <div className="home__wrapper">
            <div className="home__row" style={{ gap: '3rem' }}>
                {!isMobile ?
                    <div className="home__col">
                        <div className="home__profile">
                            <img
                                className="home__profile-image"
                                src='/assets/images/profile.png'
                                alt="Ángela Sanguino García, psicóloga clínica"
                                width={230}
                                height={272}
                                draggable={false}
                            />
                        </div>
                    </div> : ''}
                <div className="home__col">
                    <div className="home__profile-info">
                        <h1 className="home__title">ÁNGELA SANGUINO GARCÍA</h1>
                        <h2 className="home__subtitle">PSICÓLOGA CLÍNICA</h2>
                        <p className="home__text">Registro 001565 F.U.K.L. 2,000 Colombia</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Experiencia: </span></strong>25 años</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Abordaje: </span></strong>Integrativo Transpersonal</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Modalidad: </span></strong>Individual y Grupal</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Población: </span></strong>Jóvenes, Adultos, Pareja, Familia</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Encuentro: </span></strong>Online - Google Meet</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Atención: </span></strong>Jueves a Martes (fin de semana inclusive)</p>
                        <p className="home__profile-info-item"><strong><span className="home__profile-info-span">Restricción: </span></strong>Servicio aún no homologado en España, aplica sólo en relación al Registro Profesional en Colombia</p>
                    </div>
                </div>
                {isMobile ?
                    <div className="home__col">
                        <div className="home__profile">
                            <img
                                className="home__profile-image"
                                src='/assets/images/profile.png'
                                alt="Ángela Sanguino García, psicóloga clínica"
                                width={230}
                                height={272}
                                draggable={false}
                            />
                        </div>
                    </div> : ''}
            </div>
            <div className="home__row">
                <p className="home__text" style={{ margin: '4rem' }}><strong>¡Me entusiasma que hayamos coincidido aquí, recibe un afectuoso saludo!</strong></p>
            </div>

            <div className="home__row" style={{ gap: isMobile ? '' : '2rem' }}>
                <div className="home__col" style={{ width: isMobile ? '' : '45%' }}>
                    <p className="home__p" style={{ marginBottom: isMobile ? '.25rem' : '', textAlign: 'justify', lineHeight: '1.4rem' }}>
                        La Psicología es un medio para reflexionar, conocerse y encontrar un sano sentido a inquietudes sobre la existencia, bienestar, decisiones y relaciones. Su finalidad es ajustar, actualizar y enriquecer la experiencia de vida.
                        <br /><br />
                        Culminé la carrera profesional en la Fundación Universitaria Konrad Lorenz en Bogotá - Colombia en el año 2000 y desde entonces he ganado valiosa experiencia asesorando, formando y fortaleciendo psicológicamente a individuos, grupos y organizaciones.
                        <br /><br />
                        Mi formación comenzó en el Modelo Cognitivo Conductual, pero con el tiempo evolucioné hacia un Modelo más Integral e Introspectivo, donde la conducta, el sentimiento y la percepción es una manifestación de estados interpretativos internos o de conciencia y donde la mente es el único epicentro creativo y de transformación para diluir la responsabilidad a agentes externos.
                        <br /><br />
                        Mi objetivo central estará en que sientas calma y percibas correctamente en medio de algún conflicto y que operes consciente de la libertad que dispones para dirigir tu propio mundo mental al comunicarte y relacionarte.
                    </p>
                </div>
                <div className="home__col" style={{ width: isMobile ? '' : '45%' }}>
                    <div className="home__p" style={{ textAlign: 'justify', lineHeight: '1.4rem', margin: '1rem 0' }}>
                        En este espacio profesional, seguro, libre de juicios, presiones e influencias externas podrás:
                        <br />
                        <ul>
                            <li>
                                Expresarte con libertad, sin sesgos ni manipulaciones.
                            </li>
                            <li>
                                Distinguir entre la realidad y la fantasía interna proyectada sobre un agente externo a ti.
                            </li>
                            <li>
                                Liberar tu identidad de distorsiones, condicionamientos limitantes y mecanismos de retraso.
                            </li>
                            <li>
                                Identificar la causa raíz en las situaciones desafiantes, corregirlas con la comprensión del error psicológico y el uso de diversas estrategias y herramientas.
                            </li>
                            <li>
                                Reflexionar sobre ti, tu vida, propósito y elecciones.
                            </li>
                            <li>
                                Elegir pensamientos para encausar emociones y decisiones favorables.
                            </li>
                            <li>
                                Liberar el uso sano, creativo y expansivo de la mente.
                            </li>
                            <li>
                                Constatar que eres libre de ser feliz, vivir pleno y en paz.
                            </li>
                            <li>
                                Expresar y actuar desde un estado mental pacífico con autenticidad, actuando en coherencia con tu propósito.
                            </li>
                            <li>
                                Relacionarte sin complejos, en confianza y afecto genuino.
                            </li>
                            <li>
                                Actuar según tus valores asumidos conscientemente.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="home__row" style={{ borderTop: '3px solid #caddd8', width: '60%', margin: '2rem auto 0' }}>
            </div>
            <div className="home__row">
                <div className="home__col" style={{ width: isMobile ? '95%' : '' }}>
                    <h2 className="home__text" style={{ margin: '2rem auto', fontSize: '2rem' }}>SERVICIOS, PRECIOS Y PROCEDIMIENTO DE CITA</h2>
                    <p className="home__p" style={{ textAlign: 'center', marginBottom: isMobile ? '4rem' : '', width: '100%' }}>
                        Elige un servicio, completa tus datos y reserva tu cita de manera fácil y rápida
                    </p>

                    <div className="home__row" style={{ gap: '2rem' }}>
                        <div className="home__service-group">
                            <h3 className="home__service-group-title">SESIONES PRIVADAS</h3>
                            <div className="home__service-row">
                                {services ? services.filter((s: serviceType) => s.type === 'Privada' && s.active).map((s: serviceType, i: number, arr: dataObj[]) =>
                                    <ServiceCard key={i} service={s} width={`${95 / arr.length}%`} />
                                ) : ''}
                            </div>
                        </div>

                        <div className="home__service-group">
                            <h3 className="home__service-group-title">SESIONES GRUPALES</h3>
                            <div className="home__service-row">
                                {services ? services.filter((s: serviceType) => s.type === 'Grupal' && s.active).map((s: serviceType, i: number, arr: dataObj[]) =>
                                    <ServiceCard key={i} service={s} width={`${95 / arr.length}%`} />
                                ) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home__p" style={{ textAlign: 'center', margin: '4rem auto', fontSize: '1.3rem', width: 'fit-content' }}>
                <br /><br />
                <a className="home__whatsapp-container" href="https://wa.me/+34650609282" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp al +34 650 60 92 82">
                    <img className="home__whatsapp-svg" src="/assets/icons/whatsapp.svg" alt="" aria-hidden="true" width={32} height={32} />
                    <p>+34 650 60 92 82</p>
                </a>
            </div>
        </div>
    </div>
}