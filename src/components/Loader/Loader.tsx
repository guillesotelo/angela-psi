import React from 'react'
import { HashLoader } from 'react-spinners'

type Props = {
    color?: string
    label?: string
    style?: React.CSSProperties
}

export default function Loader({ label, color, style }: Props) {
    return (
        <div className='loader__container' style={style}>
            <HashLoader color={color || '#114b5f'} />
            {label ? <p style={{ color }}>{label}</p> : ''}
        </div>
    )
}