import React from "react";
import Breadcrumb from "../components/Breadcrumb";

const Legacy = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Legacy", path: "/about/legacy" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* PAGE HEADER */}
      <header className="p-6 mt-24 sm:ml-24">
        <h1 className="sm:text-4xl text-2xl font-bold">Legacy</h1>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <main className="container mx-auto px-6 py-10">
        <div className="bg-white p-8 rounded-xl shadow-lg text-gray-800 space-y-8">

          {/* INTRO */}
          <p className="text-lg leading-relaxed">
            The legacy of the <strong>Hazaribag Jesuits</strong> is one of pioneering
            mission, education, and solidarity with marginalized communities,
            beginning with Australian Jesuits in 1951 and continuing today through
            indigenous leadership in Jharkhand.
          </p>

          {/* ORIGINS */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-navy">
              Origins of the Mission
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Arrival in 1951:</strong> Six young Australian Jesuits arrived
                in Hazaribag, inspired by Ignatian spirituality and a call to serve
                people at the margins.
              </li>
              <li>
                <strong>Education and community development:</strong> They established
                schools, parishes, and social programs, especially among Dalit and
                tribal communities.
              </li>
            </ul>
          </section>

          {/* CONTRIBUTIONS */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-navy">
              Key Contributions
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Education:</strong> Institutions became centres of learning,
                offering quality education to tribal and rural children.
              </li>
              <li>
                <strong>Social Justice:</strong> Advocacy for the rights and dignity of
                marginalized communities, particularly in mining-affected regions.
              </li>
              <li>
                <strong>Local Leadership:</strong> Indigenous priests gradually assumed
                leadership, grounding the mission in local culture and needs.
              </li>
              <li>
                <strong>Witness of Martyrdom:</strong> Jesuits like Fr. A. T. Thomas gave
                their lives defending Dalit and tribal rights.
              </li>
            </ul>
          </section>

          {/* ENDURING LEGACY */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-navy">
              Enduring Legacy
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Integration of faith and tribal culture with Ignatian spirituality.
              </li>
              <li>
                Formation of “men and women for others” through education and social work.
              </li>
              <li>
                Global solidarity linking Australian Jesuit vision with Jharkhand’s struggles.
              </li>
              <li>
                Resilience despite poverty, mining exploitation, and violence.
              </li>
            </ul>
          </section>

          {/* SIGNIFICANCE TODAY */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-navy">
              Significance Today
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Educational empowerment for tribal and Dalit youth</li>
              <li>Advocacy for social justice in Jharkhand’s mining regions</li>
              <li>Spiritual renewal through Ignatian retreats and pastoral ministry</li>
              <li>
                Local–global collaboration showing the evolution of mission leadership
              </li>
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Legacy;