import { serviceType } from "src/app/types"

type Props = {
    service: serviceType
}

export default function Service({ service }: Props) {

    const {
        title,
        subtitle,
        description,
        image,
        priceCOP,
        priceEUR,
        paymentLink
    } = service

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

    return (
        <div className="service__container">
            <h1 className="service__title">{title}</h1>
            <h2 className="service__subtitle">{subtitle}</h2>
            <p className="service__description">{description}</p>
            <p className="service__price">{getPrice()}</p>
            <a href={paymentLink} className="service__paybutton"></a>
        </div>
    )
}