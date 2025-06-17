'use client'

import { useEffect } from "react";
import { serviceType } from "src/app/types"
import { STRIPE_PIBLISHABLE_KEY } from "src/constants";

type Props = {
    service?: serviceType
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export default function Service({ service }: Props) {

    const {
        title,
        subtitle,
        description,
        image,
        priceCOP,
        priceEUR,
        paymentLink,
        buy_button_id
    } = service || {}

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://js.stripe.com/v3/buy-button.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script)
        };
    }, [])

    const getPrice = () => {
        let price = ''
        if (priceCOP) {
            price += `$${parseFloat(priceCOP).toFixed(2)} COP`
        }
        if (priceEUR) {
            price += ` / €${parseFloat(priceEUR).toFixed(2)}`
        }
        return price
    }

    const renderStripeButton = () => {
        return (
            <div className="service__stripe">
                <stripe-buy-button
                    buy-button-id={buy_button_id}
                    publishable-key={STRIPE_PIBLISHABLE_KEY}
                >
                </stripe-buy-button>
            </div >
        )
    }

    return (
        <div className="service__container">
            <div className="service__card">
                <div className="service__card-wrapper">
                    <h1 className="service__title">{title}</h1>
                    <h2 className="service__subtitle">{subtitle}</h2>
                    <p className="service__description">{description}</p>
                    <p className="service__price">{getPrice()}</p>
                    {renderStripeButton()}
                    {/* <a href={paymentLink} className="service__paybutton">Pagar</a> */}
                </div>
            </div>
        </div>
    )
}