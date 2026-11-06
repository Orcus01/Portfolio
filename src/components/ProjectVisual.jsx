import { useId } from "react";
import seats from "../assets/projects/seats-storefront.png";
import kissanHome from "../assets/projects/kissan-home.png";
import kissanDiagnosis from "../assets/projects/kissan-diagnosis.png";
import raahi from "../assets/projects/raahi-home.png";

export function LabArchitecture() {
  const arrowId = useId().replace(/:/g, "");
  const nodes = [
    [50, 165, 130, 60, "Angular", "Client interface"],
    [235, 165, 145, 60, "API Gateway", "Authenticated requests"],
    [440, 60, 200, 60, "Order service", "Laboratory orders"],
    [440, 165, 200, 60, "Results service", "Test results"],
    [440, 270, 200, 60, "Quality control", "Quality workflows"],
  ];
  return (
    <svg
      className="lab-architecture"
      viewBox="0 0 720 450"
      role="img"
      aria-label="LabConnect architecture: Angular sends authenticated requests through an API Gateway to order, results and quality-control services, with Eureka discovery and MySQL persistence."
    >
      <defs>
        <marker
          id={arrowId}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0 0L6 3L0 6" fill="currentColor" />
        </marker>
      </defs>
      <text x="50" y="32" className="diagram-kicker">
        LABCONNECT / SERVICE ARCHITECTURE
      </text>
      <g
        fill="none"
        stroke="currentColor"
        opacity=".5"
        markerEnd={`url(#${arrowId})`}
      >
        <path d="M180 195H230" />
        <path d="M380 195H435" />
        <path d="M405 195V90H435" />
        <path d="M405 195V300H435" />
      </g>
      {nodes.map(([x, y, w, h, title, sub]) => (
        <g key={title}>
          <rect x={x} y={y} width={w} height={h} rx="8" />
          <text
            x={x + w / 2}
            y={y + 25}
            textAnchor="middle"
            className="node-title"
          >
            {title}
          </text>
          <text
            x={x + w / 2}
            y={y + 45}
            textAnchor="middle"
            className="node-sub"
          >
            {sub}
          </text>
        </g>
      ))}
      <path d="M50 365H640" stroke="currentColor" opacity=".2" />
      <text x="50" y="395" className="diagram-foot">
        SPRING BOOT · EUREKA DISCOVERY
      </text>
      <text x="50" y="420" className="diagram-foot">
        JWT SECURITY · OPENFEIGN · MYSQL
      </text>
    </svg>
  );
}
function ProjectCover({ project }) {
  const kissan = project.id === "kissan";
  return (
    <figure className={`project-visual project-cover cover-${project.id}`}>
      <div className="cover-copy">
        <span>{kissan ? "AGRICULTURE / AI" : "EDUCATION / WEB"}</span>
        <strong>{kissan ? <>Kissan<br />Konnect</> : "Raahi"}</strong>
        <small>{kissan ? "Plant disease diagnosis" : "Mentorship & placement"}</small>
      </div>
      {kissan ? (
        <svg viewBox="0 0 320 300" aria-hidden="true">
          <path d="M42 228C61 79 162 49 276 46c-14 133-79 214-196 208Z" fill="#b8da85" />
          <path d="M28 275 225 84M81 225l-4-73m50 29 73 5m-38-41 6-55" fill="none" stroke="#346749" strokeWidth="4" />
          <path d="M68 112V81h31m127 0h31v31m0 90v31h-31m-127 0H68v-31" fill="none" stroke="#eaf6de" strokeWidth="2" />
          <circle cx="171" cy="154" r="31" fill="none" stroke="#fff" strokeDasharray="3 5" />
          <circle cx="171" cy="154" r="5" fill="#fff" />
        </svg>
      ) : (
        <svg viewBox="0 0 320 300" aria-hidden="true">
          <circle cx="195" cy="117" r="92" fill="#efb985" />
          <path d="M26 247C68 247 63 177 113 177s38 46 81 46 65-54 91-112" fill="none" stroke="#733d35" strokeWidth="10" strokeLinecap="round" />
          <path d="m262 121 25-18 6 30" fill="none" stroke="#733d35" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <g fill="#fff4e4" stroke="#733d35" strokeWidth="4">
            <circle cx="26" cy="247" r="10" /><circle cx="113" cy="177" r="10" /><circle cx="194" cy="223" r="10" />
          </g>
        </svg>
      )}
      <figcaption>{kissan ? "Capture → Diagnose → Learn" : "Explore → Connect → Prepare"}</figcaption>
    </figure>
  );
}

export default function ProjectVisual({ project, detail = false }) {
  if (!detail && (project.id === "kissan" || project.id === "raahi")) {
    return <ProjectCover project={project} />;
  }
  if (project.id === "lab")
    return (
      <figure className="project-visual visual-lab">
        <LabArchitecture />
        <figcaption>
          Angular → API Gateway → laboratory workflows. Spring Boot, JWT, Eureka
          and MySQL. Architecture overview of the training project.
        </figcaption>
      </figure>
    );
  if (project.id === "kissan")
    return (
      <figure className="project-visual visual-kissan">
        <div className="product-phones">
          <img
            src={kissanHome}
            alt="Kissan Konnect home screen"
            loading="lazy"
          />
          <img
            src={kissanDiagnosis}
            alt="Kissan Konnect diagnosis results screen"
            loading="lazy"
          />
        </div>
        <figcaption>Application screens · Flutter / Firebase</figcaption>
      </figure>
    );
  return (
    <figure className={`project-visual visual-${project.id}`}>
      <div className="product-browser">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span>
            {project.id === "seats"
              ? "seatsandspaces.com.au"
              : "raahi / mentorship & placement"}
          </span>
        </div>
        <img
          src={project.id === "seats" ? seats : raahi}
          alt={
            project.id === "seats"
              ? "Seats & Spaces live storefront"
              : "Raahi mentorship and placement website"
          }
          loading="lazy"
        />
      </div>
      <figcaption>
        {project.id === "seats"
          ? "Live storefront capture · October 2026"
          : "Project interface · React / Tailwind CSS"}
      </figcaption>
    </figure>
  );
}
