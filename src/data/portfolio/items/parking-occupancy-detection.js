const parkingOccupancyDetection = {
  slug: "parking-occupancy-detection",
  categories: ["computer vision", "AI"],
  stack: "Python, OpenCV, Google Cloud Storage",
  work: { kind: "company", entity: "Smart in" },
  country: "Poland",
  i18n: {
    en: {
      title: "Parking Occupancy Detection",
      subtitle: "Real-time parking occupancy detection (computer vision POC)",
      thumbnail: "/images/thumbnails/parking.webp",
      heroImage: "/images/parking.jpg",
      description:
        "Camera-based parking occupancy detection POC to replace expensive sensors.",
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The software was supposed to output information about parking occupancy given a camera feed.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Poland is drastically developing technologies in the area of urban efficiency and smart cities. The city of Katowice has one of the largest surveillance systems in eastern Europe and is developing complementary technologies to improve quality of life for its citizens. The entire region is now striving to become “smarter” and a part of that goal is being able to improve traffic efficiency and drivers’ comfort by real-time monitoring of parking spaces.",
        },
        {
          type: "paragraph",
          html: "Current technologies involve expensive electromagnetic sensors that are installed under each parking space. Camera-based technology would theoretically provide much cheaper solution to the problem and could make use of existing surveillance systems.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "The software used a simple Python interface to mark parking spaces on the camera feed and extract high frequency information from these areas to decide if given space has been taken or not. This problem is a perfect case for Machine Learning of course but at the time I haven’t had that expertise yet, thus the use of classical Computer Vision.",
        },
        {
          type: "image",
          src: "/images/parking/animation.gif",
          alt: "Parking detection animation",
        },
        {
          type: "paragraph",
          html: "The software has never been tested or sold, given that I left to study in Copenhagen and the company decided to use the electromagnetic sensors instead of camera-based solutions.",
        },
        { type: "heading", text: "My contribution as Software Engineer" },
        { type: "paragraph", html: "I developed the software myself." },
      ],
    },
    pl: {
      title: "Detekcja zajętości parkingów",
      subtitle: "Detekcja zajętości miejsc parkingowych (POC, wizja komputerowa)",
      thumbnail: "/images/thumbnails/parking.webp",
      heroImage: "/images/parking.jpg",
      description:
        "Kamerowa detekcja zajętości parkingu (POC) jako alternatywa dla drogich sensorów.",
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Oprogramowanie miało zwracać informację o zajętości miejsc parkingowych na podstawie obrazu z kamer.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Polska intensywnie rozwija technologie smart city. Katowice mają jeden z największych systemów monitoringu w Europie Wschodniej, co otwiera drogę do optymalizacji ruchu i komfortu kierowców poprzez monitorowanie miejsc parkingowych.",
        },
        {
          type: "paragraph",
          html: "Obecne rozwiązania opierają się na drogich sensorach elektromagnetycznych montowanych pod każdym miejscem. Wariant oparty o kamery mógłby być tańszy i wykorzystywać istniejącą infrastrukturę.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Zastosowano prosty interfejs w Pythonie do oznaczania miejsc i analizy zmian w obrazie. To klasyczny problem ML, ale wówczas korzystałem z klasycznej wizji komputerowej.",
        },
        {
          type: "image",
          src: "/images/parking/animation.gif",
          alt: "Animacja detekcji parkingu",
        },
        {
          type: "paragraph",
          html: "Projekt nie trafił do produkcji – po moim wyjeździe firma wybrała sensory elektromagnetyczne.",
        },
        { type: "heading", text: "Mój wkład" },
        { type: "paragraph", html: "Oprogramowanie stworzyłem samodzielnie." },
      ],
    },
  },
};

export default parkingOccupancyDetection;
