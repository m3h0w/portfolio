const endoscopyQualityEvaluation = {
  slug: "endoscopy-quality-evaluation",
  categories: ["Science", "image processing", "AI"],
  i18n: {
    en: {
      title: "Endoscopy Quality Evaluation",
      subtitle: "Carnegie Mellon University",
      thumbnail: "/images/thumbnails/colonoscopy.webp",
      heroImage: "/images/colonoscopy.png",
      description:
        "Software that created a real time map for assesing quality of a colonoscopy exam. The project was developed as a desktop app based on gastroentherologist's expertise.",
      stack: "C++, OpenCV, OpticalFlow",
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The project aimed to improve the ability to evaluate the performance of a gastroenterologist performing a colonoscopy exam. Software was developed to provide a real-time feedback as well as an after-exam report.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Due to a relatively high technical difficulty of operating the endoscope during a colonoscopy exam (complicated, unintuitive interface) the success of the procedure is largely dependent on the skills of the doctor. Further, almost no quantitative, universal ways of measuring these skills exist, besides examining the post-factum statistic.",
        },
        {
          type: "paragraph",
          html: "The project aimed to use only the camera feed in order to objectively and quantitatively evaluate doctor’s performance and output it in real-time for the doctor, as well as provide a report that can then be used to asses doctor’s performance and improvement over time and gather data about how the quality of the examination correlates with detected and missed cancers.",
        },
        { type: "heading", text: "Technologies" },
        { type: "paragraph", html: "C++, OpenCV, Optical Flow" },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "The software used classical computer vision techniques to asses multiple ways of measuring the quality of the examination. Clarity of the image, how well the patient has been prepared and so on. The most challenging part was a map that was going to approximate directly doctor’s technique in operating the endoscope.",
        },
        {
          type: "image",
          src: "/images/endoscopy/optical_flow.png",
          alt: "Optical flow frame",
          caption: "One frame of Optical Flow in backwards motion",
        },
        {
          type: "paragraph",
          html: "For that optical flow was used to calculate the distance traveled by the endoscope in patient’s body and a map was outputted real time that approximated the examined parts of the colon.",
        },
        {
          type: "image",
          src: "/images/endoscopy/surface_map.png",
          alt: "Surface map",
          caption: "The real-time map of visited areas of the colon",
        },
        { type: "heading", text: "My contribution as a Research Assistant" },
        {
          type: "paragraph",
          html: "I combined together previous work conducted by other Research Assistants and used optical flow to calculate the distance traveled by the camera inside patient’s body. I worked closely with a gastroenterologist and performed a live demo with him during an actual exam.",
        },
      ],
    },
    pl: {
      title: "Ocena jakości kolonoskopii",
      subtitle: "Carnegie Mellon University",
      thumbnail: "/images/thumbnails/colonoscopy.webp",
      heroImage: "/images/colonoscopy.png",
      description:
        "Oprogramowanie tworzące mapę jakości badania kolonoskopowego, oparte o wiedzę gastroenterologa.",
      stack: "C++, OpenCV, OpticalFlow",
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Celem projektu było usprawnienie oceny pracy lekarza wykonującego kolonoskopię. Powstało oprogramowanie zapewniające feedback w czasie rzeczywistym oraz raport po badaniu.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Obsługa endoskopu jest technicznie trudna, a sukces badania zależy w dużej mierze od umiejętności lekarza. Brakuje też obiektywnych metod oceny – poza statystykami po fakcie.",
        },
        {
          type: "paragraph",
          html: "Projekt wykorzystywał wyłącznie obraz z kamery do ilościowej oceny jakości badania i generował raporty, które pomagają w poprawie jakości oraz analizie korelacji z wykrywalnością zmian.",
        },
        { type: "heading", text: "Technologie" },
        { type: "paragraph", html: "C++, OpenCV, Optical Flow" },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Wykorzystano klasyczne techniki wizji komputerowej do oceny jakości obrazu i przygotowania pacjenta. Najtrudniejsze było stworzenie mapy obrazującej technikę poruszania endoskopem.",
        },
        {
          type: "image",
          src: "/images/endoscopy/optical_flow.png",
          alt: "Przepływ optyczny",
          caption: "Klatka z analizą przepływu optycznego",
        },
        {
          type: "paragraph",
          html: "Na podstawie przepływu optycznego obliczaliśmy drogę endoskopu i tworzyliśmy mapę badanych obszarów.",
        },
        {
          type: "image",
          src: "/images/endoscopy/surface_map.png",
          alt: "Mapa powierzchni",
          caption: "Mapa odwiedzonych obszarów jelita",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Połączyłem wcześniejsze prace zespołu, wykorzystałem przepływ optyczny do estymacji przebytej odległości i przeprowadziłem demo z gastroenterologiem podczas realnego badania.",
        },
      ],
    },
  },
};

export default endoscopyQualityEvaluation;
