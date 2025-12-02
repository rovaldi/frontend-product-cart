import { FOOTER_TEXTS } from "./constants";

import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <p className="footer__text">{FOOTER_TEXTS.legal}</p>
  </footer>
);

export default Footer;
