const cnnForFurnitureRecognition = {
  slug: "cnn-for-furniture-recognition",
  categories: ["Science", "computer vision", "AI", "machine learning"],
  stack: "Azure, CNNs, Keras, Kaggle",
  mainLanguage: "Python",
  work: { kind: "school", entity: "University of Copenhagen" },
  country: "Denmark",
  i18n: {
    en: {
      title: "CNNs & Transfer Learning for furniture recognition",
      subtitle: "Deep learning image classification and Kaggle competition",
      thumbnail: "/images/thumbnails/furniture.webp",
      heroImage: "/images/furniture.png",
      description:
        "Transfer learning CNN model for 128-class furniture recognition (Kaggle).",
      links: [
        { label: "GitHub", href: "https://github.com/m3h0w/imaterialist_kaggle_competition" },
        {
          label: "Report",
          href: "https://drive.google.com/file/d/1BYiLsxVw_Q7rH3k4cbf1DKgqedVDAB_2/view?usp=sharing",
        },
        {
          label: "Kaggle",
          href: "https://www.kaggle.com/competitions/imaterialist-challenge-furniture-2018/leaderboard?tab=public",
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The model was built on approx. 200.000 images of furniture to distinguish with over 80% accuracy between 128 classes of furniture and accessories.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "iMaterialist Challenge (Furniture) at FGVC5 introduced a large dataset of furniture for the purpose of performing classification of 128 classes. We’ve used well known pre-trained CNN architectures and ended up with over 80% accuracy on the 175th place out of 428 teams and a maximum grade in the course.",
        },
        { type: "paragraph", html: "The project was part of a Large Scale Data Analysis course." },
        { type: "image", src: "/images/furniture/rank.PNG", alt: "Kaggle ranking" },
        { type: "heading", text: "Technologies" },
        { type: "paragraph", html: "Keras, CNNs, Transfer Learning, Ubuntu in Microsoft Azure Cloud" },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "We’ve tried many approaches from which we’ve converged on using a full transfer learning approach that combined bottleneck features from 2 different architectures and used test-time augmentation to improve the results further.",
        },
        {
          type: "paragraph",
          html: "The final model included ResNet50 and DenseNet models proposing predictions in 2 different modes: with and without test-time augmentation, thus the final prediction was a weighted average of probabilities predicted by 4 different modelling pipelines.",
        },
        {
          type: "paragraph",
          html: "Through the project we’ve worked with Keras using GPU-accelerated Tensorflow in the backend on an Ubuntu machine that we’ve configured ourselves in the Microsoft Azure cloud. An especially challenging part of the project was managing the data in the cloud and working with it efficiently.",
        },
        { type: "heading", text: "My contribution" },
        {
          type: "paragraph",
          html: "I’ve built our transfer learning approach from grounds up, built a framework for extracting and storing bottleneck features, created a data generator because of memory issues, performed test-time augmentation, and created the ensemble that became our final submission.",
        },
      ],
    },
    pl: {
      title: "CNN i transfer learning do rozpoznawania mebli",
      subtitle: "Klasyfikacja obrazów w deep learningu i konkurs Kaggle",
      thumbnail: "/images/thumbnails/furniture.webp",
      heroImage: "/images/furniture.png",
      description:
        "Transfer learning CNN do rozpoznawania 128 klas mebli (Kaggle).",
      links: [
        { label: "GitHub", href: "https://github.com/m3h0w/imaterialist_kaggle_competition" },
        {
          label: "Raport",
          href: "https://drive.google.com/file/d/1BYiLsxVw_Q7rH3k4cbf1DKgqedVDAB_2/view?usp=sharing",
        },
        {
          label: "Kaggle",
          href: "https://www.kaggle.com/competitions/imaterialist-challenge-furniture-2018/leaderboard?tab=public",
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Model zbudowano na ok. 200 tys. obrazów mebli, osiągając ponad 80% trafności dla 128 klas.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "iMaterialist Challenge (Furniture) na FGVC5 dostarczył duży zbiór danych do klasyfikacji 128 klas. Użyliśmy pre‑trenowanych architektur CNN, uzyskując 175. miejsce na 428 zespołów oraz maksymalną ocenę w kursie.",
        },
        { type: "paragraph", html: "Projekt realizowany w ramach kursu Large Scale Data Analysis." },
        { type: "image", src: "/images/furniture/rank.PNG", alt: "Ranking Kaggle" },
        { type: "heading", text: "Technologie" },
        { type: "paragraph", html: "Keras, CNN, transfer learning, Ubuntu w chmurze Microsoft Azure" },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Zastosowaliśmy pełny transfer learning, łącząc cechy z dwóch architektur i używając test‑time augmentation.",
        },
        {
          type: "paragraph",
          html: "Końcowy model łączył ResNet50 i DenseNet w dwóch trybach (z i bez TTA), a predykcja była ważoną średnią wyników czterech pipeline’ów.",
        },
        {
          type: "paragraph",
          html: "Pracowaliśmy z Keras i GPU‑akcelerowanym Tensorflow na maszynie Ubuntu w Azure. Dużym wyzwaniem było efektywne zarządzanie danymi w chmurze.",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Zbudowałem podejście transfer learning, framework do ekstrakcji cech, generator danych z uwagi na pamięć, test‑time augmentation oraz ensemble końcowy.",
        },
      ],
    },
  },
};

export default cnnForFurnitureRecognition;
