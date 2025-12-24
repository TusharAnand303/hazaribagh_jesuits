import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import h5 from '../assets/images/foundation_history.jpeg';


const Foundation = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Foundation History", path: "/foundation" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* PAGE HEADER */}
      <header className="p-6 mt-24 sm:ml-24">
        <h1 className="sm:text-4xl text-2xl font-bold">
          Foundation of Hazaribag Jesuit Mission
        </h1>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <main className="container mx-auto px-6 py-10">

        {/* ✅ TOP IMAGE */}

        <div className="bg-white p-8 rounded-xl shadow-lg text-gray-800 leading-relaxed space-y-4">
          <div className="flex items-center justify-center">
<img src={h5} alt="" className='w-[50%] mb-10 rounded-md' />

          </div>
            <p>
            <strong>1.</strong> In May, 1949, Fr. Janssens, the Jesuit Superior
            General wrote to Fr. Kelly, the Jesuit Vice Provincial of Australia,
            suggesting the Australian Vice Province could sent men to held in
            the Ranchi Mission and in July 1949, Fr. Kelly replied saying all his
            advisors agreed to take up this mission.
          </p>

          <p>
            <strong>2.</strong> The first six are chosen and sailed from
            Melbourne on 6th Feb, 1951, arriving in Ranchi on 28th February to
            begin Hindi studies.
          </p>

          <p>
            <strong>3.</strong> After various suggestions on starting schools in
            different places, it was finally decided to start an English medium
            school in Hazaribag. In July 1951, a large house called Balmoral on
            five acres of land was bought for the proposed school and in
            September 1951 John Moore was informed that he was to be the
            principal of the school which should be opened in January 1952!
            There was good news that Br. Nicolai Bilic s.j. expert carpenter and
            all trades person who was working in the Kolkata mission was
            transferred to Hazaribag to help build the school.
          </p>

          <p>
            <strong>4.</strong> Hectic work by John Moore getting materials,
            making out a syllabus, appointing staff resulted in St. Xavier’s
            School opening for boarders on Sunday 27th January 1952 and on 28th
            January classes began with 22 boarders and 15 dayscholars. There were
            four standards, 3,4,5,6 and the boys ages were from eight to
            fourteen. By the end of the year, there were 70 boarders and thirty
            day scholars.
          </p>

          <p>
            <strong>5.</strong> After experience in other parishes, in 1953 Fr.
            Lou Lachal was appointed parish priest of Mahuadanr and Fr. Kevin
            Grogan parish priest of Hazaribag. Fr. Lou had as one of his main
            catechists Philip Xaxa, the father of Br. Francis Xaxa s.j. The
            proposal to raise St. Joseph’s middle school to high school level
            was not approved by the Ranchi mission superior to the
            disappointment of many in the Chechari. Disappointed by the
            decision, the government decided to open a welfare department high
            school.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Summary</h2>

          <p>
            <strong>1949:</strong> May 1949: Fr. Janssens, Jesuit Superior
            General, wrote to Fr. Kelly (Jesuit Vice Provincial of Australia)
            suggesting that the Australian Vice Province could send men to help
            in the Ranchi Mission. July 1949: Fr. Kelly replied, confirming that
            all his advisors agreed to take up this mission.
          </p>

          <p>
            <strong>1951:</strong> 6 February: The first six Jesuits sailed from
            Melbourne. 28 February 1951: They arrived in Ranchi to begin Hindi
            studies. July 1951: A large house called Balmoral on five acres of
            land was purchased in Hazaribag for the proposed English medium
            school. September 1951: John Moore was informed he would be the
            principal of the school, scheduled to open in January 1952. Around
            this time, Br. Nicolai Bilic s.j., an expert carpenter and tradesman
            from the Kolkata mission, was transferred to Hazaribag to help build
            the school.
          </p>

          <p>
            <strong>1952:</strong> 27 January 1952 (Sunday): St. Xavier’s School
            opened for boarders. 28 January 1952: Classes began with 22 boarders
            and 15-day scholars. By the end of 1952: The school had grown to 70
            boarders and 30-day scholars, covering four standards (3–6) for boys
            aged 8–14.
          </p>

        </div>
      </main>
    </div>
  );
};

export default Foundation;