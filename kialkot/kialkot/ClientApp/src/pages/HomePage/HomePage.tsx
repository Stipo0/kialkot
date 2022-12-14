
import "./HomePage.scss";

import Foltok from "../../images/foltok.png";

const HomePage = () => {
  return (
    <div className="HomePage">
      <h5>Üdvözlünk oldalunkon!</h5>
        <section>
          Ezt az oldalt a Jókérdés csapata alkotta a Projektmunka2 tárgy
          teljesítésére.
        </section>
        <section>
          Ez a weboldal, azért lett létrehozva, hogy a grafikusok és a munkaadók
          munkáját segítse. Bejelentkezés nélkül csak minimális hozzáférést ad a
          látogatóknak, viszont bejelentkezéssel/regisztrációval több lehetőség
          tárul a felhasználó elé. Regisztrálni lehet, mint munkaadó és
          grafikusként is. A munkaadó létrehozhat munkákat, és ezeknek különböző
          tulajdonságait adhatja meg. A grafikus elfogadhatja a munkát és rakhat
          fel munkáiból képeket. Csevegést kezdeményezhetnek egymás között, így
          megbeszélni a munkával kapcsolatos dolgokat.
        </section>
			<img src={Foltok} alt="Background"/>
    </div>
  );
};

export default HomePage;
