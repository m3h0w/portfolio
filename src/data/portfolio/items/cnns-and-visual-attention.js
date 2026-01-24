const cnnsAndVisualAttention = {
  slug: "cnns-and-visual-attention",
  categories: ["Science", "computer vision", "AI", "machine learning"],
  stack: "Python, CNN, Tensorflow, Keras, Eye-tracking",
  mainLanguage: "Python",
  work: { kind: "school", entity: "University of Copenhagen" },
  country: "Denmark",
  i18n: {
    en: {
      title: "Visual Attention applied to Object Recognition",
      subtitle: "Eye-tracking and attention visualization for object recognition",
      thumbnail: "/images/thumbnails/attention.webp",
      heroImage: "/images/attention.png",
      description:
        "Comparing CNN attention with human eye-tracking.",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/m3h0w/visual-attention-cnn-and-eye-tracking",
        },
        {
          label: "Report",
          href: "https://drive.google.com/file/d/1YyhQtbGRLxEe5YRLwyaGAAHkHMd_Escl/view?usp=sharing",
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The aim of the project is to compare how Convolutional Neural Networks and Humans see the world by comparing where computer and human pay attention to during an object recognition task.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Due to the rise of Visual Attention mechanisms in machine learning it is now possible to model the cognitive process of paying attention in a computer. For a Cognitive Science course project we decided to see if the computer will choose to look at the same thing as a human does to recognize objects of 10 categories and if human eye-tracking data can be used to speed up the process of training the machine learning algorithm.",
        },
        {
          type: "paragraph",
          html: "The project is part of a Cognitive Science course at the University of Copenhagen.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "We use the <a href='http://calvin.inf.ed.ac.uk/datasets/poet-dataset/' target='_blank' rel='noreferrer'>POET dataset</a> that provides eye-tracking data from multiple annotators that classified over 6 thousand images into 10 categories.",
        },
        {
          type: "image",
          src: "/images/attention/eye-tracking-fixations.png",
          alt: "Eye tracking fixations",
        },
        {
          type: "image",
          src: "/images/attention/eye-tracking-heatmaps.png",
          alt: "Eye tracking heatmaps",
          caption: "Source: http://calvin.inf.ed.ac.uk/datasets/poet-dataset/",
        },
        {
          type: "paragraph",
          html: "The project is divided into multiple parts that explore different training environments and relationships between the machine and the human attention:",
        },
        {
          type: "orderedList",
          items: [
            "Standard CNN trained with a global pooling layer on top to gain spatially-dependent class activations (<a href='http://cnnlocalization.csail.mit.edu/Zhou_Learning_Deep_Features_CVPR_2016_paper.pdf' target='_blank' rel='noreferrer'>reference</a>).",
            "CNN with attention (<a href='https://arxiv.org/pdf/1502.03044.pdf' target='_blank' rel='noreferrer'>reference</a>).",
            "Using eye-tracking data to improve machine learning.",
          ],
        },
        { type: "heading", text: "Results" },
        {
          type: "paragraph",
          html: "The final report can be found <a href='https://drive.google.com/file/d/1YyhQtbGRLxEe5YRLwyaGAAHkHMd_Escl/view?usp=sharing' target='_blank' rel='noreferrer'>here</a>. My work can be found under sections about developing the attention visualization based on gradient theory and comparing CAM, soft attention and human attention.",
        },
        { type: "heading", text: "My contribution" },
        {
          type: "paragraph",
          html: "I came up with the idea for the project and devised the approach. I proposed a novel approach to visualizing human attention from eye-tracking data using gradient theory.",
        },
        {
          type: "paragraph",
          html: "I developed a soft attention model in Tensorflow and extended an open-source CAM model. I visualized both attention mechanisms and compared them to human attention using PCC.",
        },
      ],
    },
    pl: {
      title: "Uwaga wzrokowa w rozpoznawaniu obiektów",
      subtitle: "Eye‑tracking i wizualizacja uwagi w rozpoznawaniu obiektów",
      thumbnail: "/images/thumbnails/attention.webp",
      heroImage: "/images/attention.png",
      description: "Porównanie uwagi CNN z uwagą człowieka (eye‑tracking).",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/m3h0w/visual-attention-cnn-and-eye-tracking",
        },
        {
          label: "Raport",
          href: "https://drive.google.com/file/d/1YyhQtbGRLxEe5YRLwyaGAAHkHMd_Escl/view?usp=sharing",
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Celem projektu było porównanie tego, jak sieci CNN i ludzie postrzegają świat, analizując obszary uwagi podczas rozpoznawania obiektów.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Rozwój mechanizmów uwagi w ML pozwala modelować proces koncentracji uwagi w komputerze. W projekcie z kognitywistyki sprawdzaliśmy, czy model zwraca uwagę na te same obszary co człowiek, oraz czy dane eye‑tracking pomagają w trenowaniu modelu.",
        },
        {
          type: "paragraph",
          html: "Projekt realizowany w ramach kursu Cognitive Science na University of Copenhagen.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Wykorzystujemy <a href='http://calvin.inf.ed.ac.uk/datasets/poet-dataset/' target='_blank' rel='noreferrer'>POET dataset</a> z danymi eye‑tracking dla ponad 6 tys. obrazów i 10 klas.",
        },
        {
          type: "image",
          src: "/images/attention/eye-tracking-fixations.png",
          alt: "Punkty fiksacji oka",
        },
        {
          type: "image",
          src: "/images/attention/eye-tracking-heatmaps.png",
          alt: "Mapy cieplne uwagi",
          caption: "Źródło: http://calvin.inf.ed.ac.uk/datasets/poet-dataset/",
        },
        {
          type: "paragraph",
          html: "Projekt dzieli się na kilka części badających relacje między uwagą człowieka i modelu:",
        },
        {
          type: "orderedList",
          items: [
            "Standardowy CNN z global pooling i mapami aktywacji klas (<a href='http://cnnlocalization.csail.mit.edu/Zhou_Learning_Deep_Features_CVPR_2016_paper.pdf' target='_blank' rel='noreferrer'>reference</a>).",
            "CNN z mechanizmem uwagi (<a href='https://arxiv.org/pdf/1502.03044.pdf' target='_blank' rel='noreferrer'>reference</a>).",
            "Wykorzystanie danych eye‑tracking do poprawy uczenia.",
          ],
        },
        { type: "heading", text: "Wyniki" },
        {
          type: "paragraph",
          html: "Raport końcowy dostępny jest <a href='https://drive.google.com/file/d/1YyhQtbGRLxEe5YRLwyaGAAHkHMd_Escl/view?usp=sharing' target='_blank' rel='noreferrer'>tutaj</a>.",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Byłem autorem pomysłu i opracowałem podejście. Zaproponowałem nowe metody wizualizacji uwagi człowieka na podstawie danych eye‑tracking.",
        },
        {
          type: "paragraph",
          html: "Zbudowałem model soft‑attention w Tensorflow oraz rozszerzyłem otwarty model CAM. Porównałem mechanizmy uwagi z ludzką uwagą używając PCC.",
        },
      ],
    },
  },
};

export default cnnsAndVisualAttention;
