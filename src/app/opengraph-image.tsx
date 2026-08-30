import { ImageResponse } from 'next/og'
import { AUTHOR_NAME, SITE_NAME } from '../constants/site'

export const runtime = 'edge'
export const alt = `${AUTHOR_NAME} - Psicóloga Clínica`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Generated at request time so social previews always resolve, instead of
// pointing at a static file that has to be kept in /public.
export default async function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f4faf8',
                    backgroundImage:
                        'linear-gradient(135deg, #f4faf8 0%, #caddd8 100%)',
                    padding: '80px',
                }}
            >
                <div
                    style={{
                        fontSize: 40,
                        letterSpacing: 8,
                        color: '#1f9b7e',
                        textTransform: 'uppercase',
                    }}
                >
                    {SITE_NAME}
                </div>
                <div
                    style={{
                        fontSize: 78,
                        fontWeight: 700,
                        color: '#14322b',
                        textAlign: 'center',
                        marginTop: 28,
                        lineHeight: 1.15,
                    }}
                >
                    {AUTHOR_NAME}
                </div>
                <div
                    style={{
                        fontSize: 44,
                        color: '#2f6d5e',
                        marginTop: 20,
                        letterSpacing: 2,
                    }}
                >
                    Psicóloga Clínica
                </div>
                <div
                    style={{
                        width: 220,
                        height: 5,
                        backgroundColor: '#1f9b7e',
                        marginTop: 40,
                    }}
                />
                <div
                    style={{
                        fontSize: 30,
                        color: '#3c5f57',
                        marginTop: 40,
                        textAlign: 'center',
                    }}
                >
                    Terapia online · Individual · Pareja · Familia · Grupal
                </div>
            </div>
        ),
        { ...size }
    )
}
