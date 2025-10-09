export default function Footer({ }) {
    return (<div className="footer__container">
        <nav className="footer__nav">
            <a href={`/politicas`} className="footer__nav-link">Políticas</a>
            {/* <a href={`${webUrl}/`} className="footer__nav-link"></a> */}
            <a href={`/login`} className="footer__nav-link">Login</a>
        </nav>
    </div>)
}