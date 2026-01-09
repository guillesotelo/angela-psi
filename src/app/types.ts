export type AppContextType = {
    isMobile: boolean
    isLoggedIn: boolean | null
    setIsLoggedIn: (value: boolean) => void
    darkMode: boolean
    setDarkMode: (value: boolean) => void
}

export type onChangeEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export type dataObj<T = any> = Record<string | number, T>

export type userType = {
    _id?: string
    username?: string
    email?: string
    password?: string
    newData?: { [key: string]: string }
    token?: string
}

export type serviceType = {
    _id?: string
    title?: string
    slug?: string
    subtitle?: string
    description?: string
    type?: string
    active?: boolean
    image?: string
    priceEUR?: string
    paymentLink?: string
    buy_button_id?: string
    discounts?: string
    discountsApply?: string
    bulkBook?: boolean
}