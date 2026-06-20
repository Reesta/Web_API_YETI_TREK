import Link from "next/link";
import { Clock, Mountain } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/lib/actions/auth-action";

export default async function DashboardPage() {
  const response = await getCurrentUserAction();

  if (!response?.success || !response.data) {
    redirect("/login");
  }

  const user = response.data;

  const treks = [
    {
      title: "Everest Base Camp",
      image: "/mount.png",
      difficulty: "Hard",
      altitude: "5,364m",
      duration: "8 Days",
      text: "The classic journey to the foot of the world's highest peak.",
    },
    {
      title: "Annapurna Base Camp",
      image: "/home.png",
      difficulty: "Mod",
      altitude: "4,130m",
      duration: "7 Days",
      text: "A deep dive into the heart of the Annapurna massif.",
    },
    {
      title: "Gokyo Lakes",
      image: "/login.png",
      difficulty: "Hard",
      altitude: "4,790m",
      duration: "5 Days",
      text: "Emerald lakes and wide Himalayan views.",
    },
  ];

  return (
    <section className="yt-dashboard-home">
      <div className="yt-welcome-row">
        <div>
          <h1>Welcome Back, {user.fullName}!</h1>
          <p>Ready for your next adventure?</p>
        </div>

      </div>

      <div className="yt-hero-card">
        <div>
          <h2>Majestic High-Altitude Lodge</h2>
          <p>Experience luxury and comfort at the heart of the Himalayas.</p>
        </div>
        <Link href="/dashboard/stay">View Details</Link>
      </div>

      <div className="yt-section-title">
        <h2>Popular Treks</h2>
        <span>View All</span>
      </div>

      <div className="yt-trek-grid">
        {treks.map((trek) => (
          <article key={trek.title} className="yt-trek-card">
            <div
              className="yt-trek-image"
              style={{ backgroundImage: `url(${trek.image})` }}
            >
              <span>{trek.difficulty}</span>
            </div>
            <div className="yt-trek-body">
              <h3>{trek.title}</h3>
              <p>{trek.text}</p>

              <div className="yt-trek-meta">
                <div>
                  <Mountain size={15} />
                  <small>Altitude</small>
                  <strong>{trek.altitude}</strong>
                </div>
                <div>
                  <Clock size={15} />
                  <small>Duration</small>
                  <strong>{trek.duration}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
