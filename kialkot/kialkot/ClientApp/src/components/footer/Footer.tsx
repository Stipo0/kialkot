import SzeLogo from "../../images/Footer/szelogo.png";
import Home from "../../images/Footer/home.png";
import Mobile from "../../images/Footer/mobil.png";
import Email from "../../images/Footer/email.png";

import "./Footer.scss";

const Footer = () => {

  return (
    <footer>
      <table width="100%">
        <tr>
          <td>
            <h4>Kapcsolatok:</h4>
            <p>
              <img className="ikon" alt="ikon" src={Home} />
              Győr, Széchényi István Egyetem
            </p>
            <p>
              <img className="ikon" alt="ikon" src={Mobile} />
              06309101195
            </p>
            <p>
              <img className="ikon" alt="ikon" src={Email} />
              paptutu@gmail.com
            </p>
          </td>
          <td>
            <img id="SzeLogo" src={SzeLogo} alt="Egyetemi logo" />
          </td>
        </tr>
      </table>
    </footer>
  );
};

export default Footer;
