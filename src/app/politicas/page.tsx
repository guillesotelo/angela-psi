import React from 'react'
import type { Metadata } from 'next'

const title = 'Política de Privacidad'
const description =
    'Política de privacidad y tratamiento de datos personales conforme al RGPD para los servicios de psicología de Ángela Sanguino García.'

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/politicas' },
    robots: { index: true, follow: true },
    openGraph: {
        title,
        description,
        url: '/politicas',
        type: 'article',
    },
}

type Props = {}

export default function Policy({ }: Props) {
    return (
        <div className="policy__container">
            <h1 className='page__title'>Política de Privacidad</h1>
            <p className='page__text'>Actualizado: 8 de Octubre, 2025</p>
            <section>
                <p className='page__text'>
                    En Ángela Sanguino García - Psicóloga Clínica, nos tomamos muy en serio tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tus datos personales en cumplimiento con el Reglamento General de Protección de Datos (GDPR).
                </p>

                <h2 className='page__subtitle'>1. Responsable del Tratamiento</h2>
                <p className='page__text'>
                    Ángela Sanguino García - Psicóloga Clínica. Para cualquier consulta sobre privacidad, puedes contactarnos a través del correo electrónico proporcionado en nuestro sitio web.
                </p>

                <h2 className='page__subtitle'>2. Datos que Recogemos</h2>
                <p className='page__text'>
                    Recogemos los datos personales necesarios para ofrecer nuestros servicios:
                </p>
                <ul>
                    <li>Datos de contacto (nombre, correo electrónico, teléfono) para agendar citas.</li>
                    <li>Datos de pago procesados de forma segura a través de Stripe (nunca almacenamos tu tarjeta).</li>
                    <li>Datos de uso y navegación a través de cookies para fines analíticos (Google Analytics u otros).</li>
                </ul>

                <h2 className='page__subtitle'>3. Finalidad del Tratamiento</h2>
                <p className='page__text'>
                    Usamos tus datos para:
                </p>
                <ul>
                    <li>Gestionar y confirmar tus citas.</li>
                    <li>Procesar tus pagos de forma segura mediante Stripe.</li>
                    <li>Analizar el uso de la web para mejorar nuestros servicios.</li>
                </ul>

                <h2 className='page__subtitle'>4. Base Legal para el Tratamiento</h2>
                <p className='page__text'>
                    Tratamos tus datos en base a:
                </p>
                <ul>
                    <li>El cumplimiento de un contrato (prestación del servicio de psicología).</li>
                    <li>Tu consentimiento explícito (para marketing o comunicaciones, si aplica).</li>
                    <li>Intereses legítimos (mejora del servicio mediante análisis de uso).</li>
                </ul>

                <h2 className='page__subtitle'>5. Pagos Seguros con Stripe</h2>
                <p className='page__text'>
                    Usamos Stripe como proveedor de pagos seguro. Stripe cumple con los más altos estándares de seguridad (PCI DSS). Nosotros no almacenamos tus datos de tarjeta en nuestros servidores.
                </p>

                <h2 className='page__subtitle'>6. Uso de Cookies y Analytics</h2>
                <p className='page__text'>
                    Usamos cookies para ofrecer funcionalidades esenciales y para analizar el uso de la página con herramientas como Google Analytics. Puedes gestionar tus preferencias de cookies en nuestro banner de consentimiento.
                </p>

                <h2 className='page__subtitle'>7. Conservación de Datos</h2>
                <p className='page__text'>
                    Conservaremos tus datos solo el tiempo necesario para cumplir con las finalidades para las que fueron recogidos y las obligaciones legales aplicables.
                </p>

                <h2 className='page__subtitle'>8. Derechos del Usuario</h2>
                <p className='page__text'>
                    Según el GDPR, tienes derecho a:
                </p>
                <ul>
                    <li>Acceder a tus datos personales.</li>
                    <li>Solicitar la rectificación o supresión de tus datos.</li>
                    <li>Limitar u oponerte al tratamiento.</li>
                    <li>Solicitar la portabilidad de tus datos.</li>
                    <li>Retirar tu consentimiento en cualquier momento.</li>
                </ul>
                <p className='page__text'>
                    Para ejercer tus derechos, contáctanos a través del correo electrónico de contacto.
                </p>

                <h2 className='page__subtitle'>9. Destinatarios y Transferencias Internacionales</h2>
                <p className='page__text'>
                    Tus datos pueden ser tratados por proveedores de servicios (como Stripe o Google) que actúan como encargados de tratamiento, siempre bajo acuerdos de protección de datos adecuados. En caso de transferencias internacionales, nos aseguramos de que existan garantías adecuadas.
                </p>

                <h2 className='page__subtitle'>10. Cambios en la Política de Privacidad</h2>
                <p className='page__text'>
                    Esta política puede actualizarse. Te notificaremos en la web o por email si se producen cambios importantes.
                </p>

                <h2 className='page__subtitle'>11. Contacto</h2>
                <p className='page__text'>
                    Si tienes preguntas sobre esta Política de Privacidad, puedes escribirnos a la dirección de contacto disponible en nuestro sitio web.
                </p>
            </section>
            <footer style={{ marginTop: '5rem' }}>
                &copy; 2025 Ángela Sanguino García - Psicóloga Clínica. Todos los derechos reservados.
            </footer>
        </div>
    )
}