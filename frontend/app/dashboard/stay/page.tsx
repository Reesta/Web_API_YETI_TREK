import { BedDouble, MapPin, Star } from "lucide-react";

const stays = [
  {
    name: "Namche Mountain Lodge",
    area: "Namche Bazaar",
    rating: "4.8",
    type: "Lodge",
    image: "/home.png",
  },
  {
    name: "Annapurna Tea House",
    area: "Chhomrong",
    rating: "4.6",
    type: "Tea House",
    image: "/login.png",
  },
  {
    name: "Gokyo Lakeside Stay",
    area: "Gokyo",
    rating: "4.7",
    type: "Guest House",
    image: "/mount.png",
  },
];

export default function StayPage() {
  return (
    <section className="yt-page-section">
      <div className="yt-page-heading">
        <p>Stay</p>
        <h1>Mountain Stays</h1>
        <span>Find lodge and tea house options for upcoming trekking routes.</span>
      </div>

      <div className="yt-trek-grid">
        {stays.map((stay) => (
          <article key={stay.name} className="yt-trek-card">
            <div
              className="yt-trek-image"
              style={{ backgroundImage: `url(${stay.image})` }}
            >
              <span>{stay.type}</span>
            </div>
            <div className="yt-trek-body">
              <h3>{stay.name}</h3>
              <p>Comfortable trekking accommodation in {stay.area}.</p>

              <div className="yt-trek-meta">
                <div>
                  <MapPin size={15} />
                  <small>Area</small>
                  <strong>{stay.area}</strong>
                </div>
                <div>
                  <Star size={15} />
                  <small>Rating</small>
                  <strong>{stay.rating}</strong>
                </div>
                <div>
                  <BedDouble size={15} />
                  <small>Type</small>
                  <strong>{stay.type}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
