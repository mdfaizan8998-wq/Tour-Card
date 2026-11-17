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
      { label: "Signature", value: "Yacht cruise & coral snorkeling" },
      { label: "Stay", value: "Private coastal hideaway" },
    ],
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
      { label: "Signature", value: "Waterfalls & canopy trails" },
      { label: "Stay", value: "Elevated woodland lodge" },
    ],
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
      { label: "Signature", value: "Alpine skiing & fireside dining" },
      { label: "Stay", value: "Boutique mountain chalet" },
    ],
  },
];

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
          <div>
            <span>{tour.eyebrow}</span>
            <h2>{tour.title}</h2>
            <p>
              {tour.duration} · {tour.group}
            </p>
          </div>
          <div className="tour-card__compact-price">
            <span>From</span>
            <strong>${tour.price}</strong>
          </div>
          <a href={`#book-${tour.id}`} aria-label={`Book ${tour.title}`}>
            <span>View journey</span>
            <span aria-hidden="true">↗</span>
          </a>
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
            >
              <span className="view-toggle__icon" aria-hidden="true">
                <i />
                <i />
              </span>
              {compact ? "Show immersive view" : "Show compact view"}
            </button>
          </div>
        </header>

        <div className={`tours-grid${compact ? " is-compact" : ""}`}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} compact={compact} />
          ))}
        </div>

        <footer className="section-footer">
          <p>
            <span>03</span> signature journeys
          </p>
          <a href="#all-tours">
            Discover all journeys
            <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    </main>
  );
}
