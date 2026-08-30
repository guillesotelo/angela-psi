export default function Footer({ }) {
    return (<footer className="footer__container">
        <nav className="footer__nav" aria-label="Enlaces legales">
            <a href={`/politicas`} className="footer__nav-link">Políticas</a>
            {/* <a href={`${webUrl}/`} className="footer__nav-link"></a> */}
            <a href={`/login`} className="footer__nav-link" rel="nofollow">Login</a>
        </nav>
    </footer>)
}
