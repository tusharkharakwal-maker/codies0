import type { ArtKind } from "@/data/projects";

export function Scribble({
  className = "",
  variant = "underline",
}: {
  className?: string;
  variant?: "underline" | "star" | "arrow" | "circle";
}) {
  return (
    <svg
      className={`scribble ${className}`}
      viewBox={variant === "underline" ? "0 0 500 60" : "0 0 200 200"}
      fill="none"
      aria-hidden="true"
    >
      {variant === "underline" && (
        <>
          <path
            d="M9 29C114 7 233 42 491 18M24 47C211 16 336 42 470 33"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="square"
          />
          <path d="M32 18L476 13" stroke="currentColor" strokeWidth="3" />
        </>
      )}
      {variant === "star" && (
        <>
          <path
            d="m91 14 17 169M21 55l156 93M27 151 146 32M10 111l178-23"
            stroke="currentColor"
            strokeWidth="13"
            strokeLinecap="square"
          />
          <path
            d="m99 8 13 181M17 47l168 105"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}
      {variant === "arrow" && (
        <path
          d="M26 24c-13 128 121 153 139 44M125 97l44-37 13 64"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {variant === "circle" && (
        <path
          d="M155 26C34-3-22 110 51 162c62 44 145-2 133-74C173 20 58 12 33 79c-29 77 79 123 143 58"
          stroke="currentColor"
          strokeWidth="5"
        />
      )}
    </svg>
  );
}

export function ChromeMark() {
  return (
    <svg
      className="chrome-mark"
      viewBox="0 0 500 510"
      fill="none"
      role="img"
      aria-label="Sculptural metallic Codie C monogram"
    >
      <defs>
        <linearGradient
          id="chrome-face"
          x1="140"
          y1="80"
          x2="380"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#eeeae4" />
          <stop offset=".18" stopColor="#8b8b87" />
          <stop offset=".25" stopColor="#f5f4ef" />
          <stop offset=".37" stopColor="#363635" />
          <stop offset=".52" stopColor="#c7c7bf" />
          <stop offset=".61" stopColor="#ecece6" />
          <stop offset=".7" stopColor="#353633" />
          <stop offset=".82" stopColor="#d5d5cf" />
          <stop offset="1" stopColor="#71736e" />
        </linearGradient>
        <linearGradient id="chrome-side" x1="75" y1="150" x2="430" y2="380">
          <stop stopColor="#474945" />
          <stop offset=".43" stopColor="#171916" />
          <stop offset=".55" stopColor="#c7c7bc" />
          <stop offset=".76" stopColor="#353630" />
          <stop offset="1" stopColor="#8d9186" />
        </linearGradient>
      </defs>
      <g transform="rotate(-15 250 250)">
        <path
          d="M417 138C371 78 307 54 232 67 119 86 63 179 80 288s102 179 211 160c75-13 126-48 153-108l-95-36c-15 32-37 50-69 56-50 8-88-23-96-77s17-92 66-100c32-6 59 7 80 31z"
          fill="url(#chrome-side)"
          transform="translate(17 18)"
        />
        <path
          d="M417 138C371 78 307 54 232 67 119 86 63 179 80 288s102 179 211 160c75-13 126-48 153-108l-95-36c-15 32-37 50-69 56-50 8-88-23-96-77s17-92 66-100c32-6 59 7 80 31z"
          fill="url(#chrome-face)"
          stroke="#b9bcb5"
          strokeWidth="1.5"
        />
        <path
          d="M407 140c-41-53-100-77-174-64C127 94 76 181 91 286s96 168 199 150c69-12 118-44 142-90M333 204c-25-32-53-42-86-36-58 10-85 52-75 116s52 97 110 87c36-6 62-26 79-60"
          stroke="#f4f4ec"
          strokeOpacity=".58"
          strokeWidth="2"
        />
        <path
          d="m417 138 17 18-87 76-17-18m19 90 17 18 95 36-17-18"
          stroke="#666960"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export function ProjectArtwork({
  kind,
  variant = 0,
  className = "",
}: {
  kind: ArtKind;
  variant?: number;
  className?: string;
}) {
  return (
    <div
      className={`project-art art-${kind} ${className} art-variant-${variant}`}
      role="img"
      aria-label={
        {
          soda: "OTHER soda packaging in acid lime and pink",
          echo: "ECHO festival poster with warped concentric sound waves",
          form: "FORM sculptural green object and editorial typography",
          offbeat: "OFFBEAT running campaign with hand-drawn race lines",
          goodkind: "GOODKIND botanical identity in lime and dark green",
          lumen: "LUMEN optical identity with radiating orange lines",
          club: "AFTER HOURS purple typographic music poster",
          field: "FIELDWORK architectural composition of geometric arches",
          kin: "KIN coffee packaging with pink cups and warm typography",
        }[kind]
      }
    >
      {kind === "soda" && (
        <>
          <div className="art-small">A DIFFERENT KIND OF THIRST.</div>
          <span className="soda-bg-word">OTHER</span>
          <div className="soda-can can-one">
            <div className="can-top" />
            <span className="can-side">FULL FLAVOR. ZERO BORING.</span>
            <b>
              OTHER<span>SODA</span>
            </b>
            <span className="can-flavor">YUZU + GOOD ENERGY</span>
            <div className="can-bottom" />
          </div>
          <div className="soda-can can-two">
            <div className="can-top" />
            <b>
              OTHER<span>SODA</span>
            </b>
            <span className="can-flavor">BLOOD ORANGE. BIG MOOD.</span>
            <div className="can-bottom" />
          </div>
          <Scribble variant="star" className="soda-star" />
          <span className="art-foot">NOT YOUR USUAL.</span>
        </>
      )}
      {kind === "echo" && (
        <>
          <span className="art-small">SOUND. SPACE. SOMETHING ELSE.</span>
          <div className="echo-rings">
            {Array.from({ length: 12 }, (_, i) => (
              <i
                key={i}
                style={{ width: `${30 + i * 7}%`, height: `${18 + i * 8}%` }}
              />
            ))}
          </div>
          <b className="echo-title">
            ECHO
            <br />
            ECHO
            <br />
            ECHO
          </b>
          <div className="art-foot">
            FEEL EVERYTHING. <span>26.09.26</span>
          </div>
        </>
      )}
      {kind === "form" && (
        <>
          <b className="form-title">
            form<span>®</span>
          </b>
          <div className="form-sculpture">
            <i />
            <i />
            <i />
          </div>
          <span className="art-foot">OBJECTS FOR A CONSIDERED LIFE.</span>
          <span className="form-index">
            LESS,
            <br />
            BUT BETTER.
          </span>
        </>
      )}
      {kind === "offbeat" && (
        <>
          <span className="art-small">OFFBEAT RUN CLUB</span>
          <b className="offbeat-title">
            YOUR
            <br />
            PACE.
            <br />
            <span>YOUR</span>
            <br />
            PEOPLE.
          </b>
          <svg className="run-lines" viewBox="0 0 400 400" aria-hidden="true">
            <path
              d="M-10 330C180-140 70 600 440 70M-10 360C170-130 60 650 440 110M-10 390C160-100 50 700 440 150"
              stroke="currentColor"
              strokeWidth="11"
              fill="none"
            />
          </svg>
          <span className="art-foot">COME AS YOU ARE. KEEP MOVING.</span>
        </>
      )}
      {kind === "goodkind" && (
        <>
          <span className="art-small">GOOD FOR YOU. GOOD BY NATURE.</span>
          <div className="goodkind-flower">
            {Array.from({ length: 8 }, (_, i) => (
              <i key={i} style={{ transform: `rotate(${i * 45}deg)` }} />
            ))}
          </div>
          <b className="goodkind-title">
            good
            <br />
            kind<span>®</span>
          </b>
          <span className="art-foot">A LITTLE CARE GOES A LONG WAY.</span>
        </>
      )}
      {kind === "lumen" && (
        <>
          <div className="lumen-lines">
            {Array.from({ length: 18 }, (_, i) => (
              <i key={i} style={{ transform: `rotate(${i * 10}deg)` }} />
            ))}
          </div>
          <b className="lumen-title">LUMEN</b>
          <span className="art-foot">MAKE LIGHT WORK.</span>
        </>
      )}
      {kind === "club" && (
        <>
          <span className="art-small">WHEN THE DAY ENDS, WE BEGIN.</span>
          <b className="club-title">
            AFTER
            <br />
            HOURS
            <br />
            AFTER
            <br />
            HOURS
          </b>
          <Scribble variant="star" className="club-star" />
          <span className="art-foot">LOSE TRACK. FIND YOUR PEOPLE.</span>
        </>
      )}
      {kind === "field" && (
        <>
          <span className="art-small">A PRACTICE IN POSSIBILITY.</span>
          <div className="field-arches">
            <i />
            <i />
            <i />
          </div>
          <b className="field-title">
            FIELD
            <br />
            WORK.
          </b>
          <span className="art-foot">SPACES FOR LIVING.</span>
        </>
      )}
      {kind === "kin" && (
        <>
          <span className="art-small">BETTER DAYS START HERE.</span>
          <b className="kin-title">kin.</b>
          <div className="coffee-cup cup-one">
            <span>kin.</span>
            <i />
          </div>
          <div className="coffee-cup cup-two">
            <span>kin.</span>
            <i />
          </div>
          <span className="art-foot">GOOD COFFEE. BETTER COMPANY.</span>
        </>
      )}
    </div>
  );
}
