import { Clock, MapPin, Mountain } from "lucide-react";

const trails = [
  {
    title: "Everest Base Camp",
    region: "Khumbu",
    altitude: "5,364m",
    duration: "8 Days",
    image: "/mount.png",
    difficulty: "Hard",
  },
  {
    title: "Annapurna Base Camp",
    region: "Annapurna",
    altitude: "4,130m",
    duration: "7 Days",
    image: "/home.png",
    difficulty: "Mod",
  },
  {
    title: "Gokyo Lakes",
    region: "Everest",
    altitude: "4,790m",
    duration: "5 Days",
    image: "/login.png",
    difficulty: "Hard",
  },
];

export default function TrailsPage() {
  return (
    <section className="yt-page-section">
      <div className="yt-page-heading">
        <p>Trails</p>
        <h1>Trekking Trails</h1>
        <span>Browse routes that can share the same backend data with Flutter.</span>
      </div>

      <div className="yt-trek-grid">
        {trails.map((trail) => (
          <article key={trail.title} className="yt-trek-card">
            <div
              className="yt-trek-image"
              style={{ backgroundImage: `url(${trail.image})` }}
            >
              <span>{trail.difficulty}</span>
            </div>
            <div className="yt-trek-body">
              <h3>{trail.title}</h3>
              <p>{trail.region} route with high-altitude views and guided stops.</p>

              <div className="yt-trek-meta">
                <div>
                  <MapPin size={15} />
                  <small>Region</small>
                  <strong>{trail.region}</strong>
                </div>
                <div>
                  <Mountain size={15} />
                  <small>Altitude</small>
                  <strong>{trail.altitude}</strong>
                </div>
                <div>
                  <Clock size={15} />
                  <small>Duration</small>
                  <strong>{trail.duration}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
