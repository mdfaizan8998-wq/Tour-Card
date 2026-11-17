import { useRef, useState, type PointerEvent } from "react";

type Tour = {
  id: string;
  eyebrow: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  group: string;
  image: string;
  alt: string;
  accent: string;
  details: { label: string; value: string }[];
  comparison: {
    vibe: string;
    climate: string;
    range: number;
    intensity: number;
    intensityLabel: string;
    highlight: string;
  };
};

const tours: Tour[] = [
  {
    id: "sea",
    eyebrow: "Coastal escape",
    title: "The Sea Explorer",
    location: "Nusa Penida, Indonesia",
    price: 297,
    duration: "3 days",
    group: "Max 8 guests",
    image:
      "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1200&q=88",
    alt: "Aerial view of palms along a turquoise tropical coast",
    accent: "aqua",
    details: [
      { label: "Best for", value: "Beach lovers & first-time travelers" },
      { label: "Weather", value: "Warm & sunny · 26–30°C" },
      { label: "Highlight", value: "Yacht cruise & coral snorkeling" },
      { label: "Stay / pace", value: "Coastal hotel · Easygoing" },
    ],
    comparison: {
      vibe: "Coastal & Relax",
      climate: "28°C Warm",
      range: 78,
      intensity: 1,
      intensityLabel: "Easy",
      highlight: "Sunset Yacht & Snorkeling",
    },
  },
  {
    id: "forest",
    eyebrow: "Wild immersion",
    title: "The Forest Hiker",
    location: "Black Forest, Germany",
    price: 497,
    duration: "7 days",
    group: "Max 10 guests",
    image:
      "https://images.unsplash.com/photo-1544039161-b0c20826c6f6?auto=format&fit=crop&w=1200&q=88",
    alt: "A winding trail through a dense misty forest",
    accent: "moss",
    details: [
      { label: "Best for", value: "Nature explorers & keen hikers" },
      { label: "Weather", value: "Cool & misty · 16–22°C" },
      { label: "Highlight", value: "Waterfalls & canopy trails" },
      { label: "Stay / pace", value: "Luxury tents · Moderate" },
    ],
    comparison: {
      vibe: "Deep Nature Trek",
      climate: "18°C Crisp",
      range: 55,
      intensity: 2,
      intensityLabel: "Moderate",
      highlight: "Waterfall & Canopy Camping",
    },
  },
  {
    id: "snow",
    eyebrow: "Alpine adventure",
    title: "The Snow Adventurer",
    location: "Dolomites, Italy",
    price: 897,
    duration: "5 days",
    group: "Max 6 guests",
    image:
      "https://images.unsplash.com/photo-1673100938846-1d6c184ecb69?auto=format&fit=crop&w=1200&q=88",
    alt: "Snow-covered alpine mountain and a cabin",
    accent: "ice",
    details: [
      { label: "Best for", value: "Snow sports & quiet luxury" },
      { label: "Weather", value: "Crisp & snowy · −4–2°C" },
      { label: "Highlight", value: "Alpine skiing & fireside dining" },
      { label: "Stay / pace", value: "Alpine chalet · Easy-guided" },
    ],
    comparison: {
      vibe: "Alpine Snow Thrill",
      climate: "−4°C Sub-Zero",
      range: 20,
      intensity: 1,
      intensityLabel: "Guided Easy",
      highlight: "Alpine Skiing & Bonfire",
    },
  },
];

function MetricIcon({ type }: { type: "vibe" | "climate" | "highlight" }) {
  if (type === "climate") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4.5 4.5 0 1 0 4 0Z" />
        <path d="M12 9v8" />
      </svg>
    );
  }

  if (type === "highlight") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <path d="m15 9-2 4-4 2 2-4 4-2Z" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-5.1 7-12a7 7 0 0 0-14 0c0 6.9 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ComparisonPanel() {
  return (
    <section className="comparison-panel" aria-labelledby="comparison-heading">
      <div className="comparison-panel__heading">
        <p>Side-by-side guide</p>
        <h2 id="comparison-heading">Find your kind of adventure.</h2>
      </div>

      <div className="comparison-grid">
        {tours.map((tour) => (
          <article className={`comparison-column comparison-column--${tour.accent}`} key={tour.id}>
            <div className="comparison-column__title">
              <span>0{tours.indexOf(tour) + 1}</span>
              <h3>{tour.title}</h3>
            </div>

            <div className="comparison-metric">
              <span className="comparison-metric__icon">
                <MetricIcon type="vibe" />
              </span>
              <div>
                <p>Best vibe</p>
                <strong className="vibe-tag">{tour.comparison.vibe}</strong>
              </div>
            </div>

            <div className="comparison-metric">
              <span className="comparison-metric__icon">
                <MetricIcon type="climate" />
              </span>
              <div className="comparison-metric__content">
                <p>Climate & temperature</p>
                <strong>{tour.comparison.climate}</strong>
                <span className="temperature-bar" aria-hidden="true">
                  <i style={{ width: `${tour.comparison.range}%` }} />
                </span>
              </div>
            </div>

            <div className="comparison-metric">
              <span className="comparison-metric__number" aria-hidden="true">
                {tour.comparison.intensity}/3
              </span>
              <div className="comparison-metric__content">
                <p>Physical intensity</p>
                <strong>{tour.comparison.intensityLabel}</strong>
                <span
                  className="intensity-meter"
                  aria-label={`${tour.comparison.intensity} out of 3 intensity`}
                >
                  {[1, 2, 3].map((level) => (
                    <i
                      className={level <= tour.comparison.intensity ? "is-active" : ""}
                      key={level}
                    />
                  ))}
                </span>
              </div>
            </div>

            <div className="comparison-metric">
              <span className="comparison-metric__icon">
                <MetricIcon type="highlight" />
              </span>
              <div>
                <p>Key highlight</p>
                <strong>{tour.comparison.highlight}</strong>
              </div>
            </div>

            <a className="comparison-book" href={`#book-${tour.id}`}>
              <span>Book now</span>
              <small>${tour.price} per person</small>
              <b aria-hidden="true">↗</b>
            </a>
          </article>
        ))}
      </div>

      <a className="comparison-discover" href="#all-tours">
        Discover all tours
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

function TourCard({ tour, compact }: { tour: Tour; compact: boolean }) {
  const cardRef = useRef<HTMLElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (compact || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--rotate-x", `${(0.5 - y) * 9}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 11}deg`);
    card.style.setProperty("--glow-x", `${x * 100}%`);
    card.style.setProperty("--glow-y", `${y * 100}%`);
  }

  function resetTilt() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "30%");
  }

  return (
    <article
      ref={cardRef}
      className={`tour-card tour-card--${tour.accent}${compact ? " is-compact" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="tour-card__surface">
        <div className="tour-card__image-wrap">
          <img className="tour-card__image" src={tour.image} alt={tour.alt} />
          <div className="tour-card__image-shade" />
          <div className="tour-card__topline">
            <span>{tour.eyebrow}</span>
            <span className="tour-card__index">0{tours.indexOf(tour) + 1}</span>
          </div>
          <div className="tour-card__hero-copy">
            <p>{tour.location}</p>
            <h2>{tour.title}</h2>
          </div>
        </div>

        <div className="tour-card__body">
          <div className="tour-card__meta">
            <span>{tour.duration}</span>
            <span aria-hidden="true" />
            <span>{tour.group}</span>
          </div>
          <dl className="tour-card__details">
            {tour.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
          <div className="tour-card__footer">
            <div className="tour-card__price">
              <span>From</span>
              <strong>${tour.price}</strong>
              <small>/ person</small>
            </div>
            <a
              className="tour-card__book"
              href={`#book-${tour.id}`}
              aria-label={`Book ${tour.title}`}
            >
              Explore
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="tour-card__compact">
          <h2>{tour.title}</h2>
          <div className="tour-card__compact-price">
            <span>Trip price</span>
            <strong>${tour.price}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [compact, setCompact] = useState(false);

  return (
    <main>
      <section className="tours-section" id="tours">
        <div className="ambient ambient--one" />
        <div className="ambient ambient--two" />

        <header className="section-header">
          <div>
            <p className="section-kicker">
              <span /> Curated escapes
            </p>
            <h1>
              Go further.
              <br />
              <em>Feel more.</em>
            </h1>
          </div>
          <div className="section-intro">
            <p>
              Small-group journeys to remarkable places, thoughtfully designed for people who want
              to travel deeper.
            </p>
            <button
              className="view-toggle"
              type="button"
              onClick={() => setCompact((current) => !current)}
              aria-pressed={compact}
              aria-controls="tours-container"
            >
              <span className="view-toggle__icon" aria-hidden="true">
                <i />
                <i />
              </span>
              {compact ? "Expand to full details (520px)" : "Compare prices (100px)"}
            </button>
          </div>
        </header>

        <div
          className={`tours-grid${compact ? " is-compact" : ""}`}
          id="tours-container"
          aria-live="polite"
        >
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} compact={compact} />
          ))}
        </div>

        {compact && <ComparisonPanel />}

        <footer className={`booking-actions${compact ? " is-hidden" : ""}`}>
          <div className="booking-actions__intro">
            <p>
              <span>03</span> signature journeys
            </p>
            <h2>Ready when you are.</h2>
          </div>
          <div className="booking-actions__buttons">
            {tours.map((tour) => (
              <a
                key={tour.id}
                className={`booking-button booking-button--${tour.accent}`}
                href={`#book-${tour.id}`}
              >
                <span>
                  Book {tour.title.replace("The ", "")}
                  <small>${tour.price} per person</small>
                </span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
          <a className="discover-link" href="#all-tours">
            Discover all tours
            <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    </main>
  );
}
