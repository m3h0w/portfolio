const proteinStructurePrediction = {
  slug: "protein-structure-prediction",
  categories: ["Science", "machine learning", "AI"],
  stack: "Python, RNNs, Tensorflow, Jupyter Notebook",
  work: { kind: "school", entity: "IT University of Copenhagen" },
  i18n: {
    en: {
      title: "Protein tertiary structure prediction",
      subtitle: "ITU University of Copenhagen, group work",
      thumbnail: "/images/thumbnails/protein.webp",
      heroImage: "/images/protein.png",
      description:
        "Predicting the tertiary (3-dimensional) structure of a folded protein given its primary structure (sequence of amino acids).",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/m3h0w/protein-dihedral-angles-prediction",
        },
        {
          label: "Report",
          href: "https://drive.google.com/file/d/1-SFavU5i6XlHK2sswy60k5TowgButezy/view?usp=sharing",
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The goal of the project was to predict the angles that create the main structure (backbone) of the protein, given information about its aminoacid sequence.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Predicting proteins’ tertiary structure from their primary structure is one of the most important unsolved problems of biochemistry. Current methods are inaccurate and expensive. Machine Learning offers new toolset that promises cheaper and much more efficient solutions. One of the recent breakthroughs is Mohammed AlQuraishi’s paper on <a href='https://www.biorxiv.org/content/early/2018/02/14/265231.full.pdf' target='_blank' rel='noreferrer'>End-to-end differentiable learning of protein structure</a>, which together with <a href='https://bmcbioinformatics.biomedcentral.com/track/pdf/10.1186/s12859-018-2065-x' target='_blank' rel='noreferrer'>RaptorX-Angle</a>, inspired this project.",
        },
        {
          type: "paragraph",
          html: "The model was developed for a course but the results go beyond the regular scope of the class.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "We use ProteinNet dataset as introduced by AlQuraishi and write the entire data processing pipeline in Tensorflow. The heart of the model is a Convolutional Neural Network, similar to the one introduced in RaptorX. The model is trained using ADAM optimizer on an MSE and MAE losses between predicted and true dihedral (torsional) angles.",
        },
        {
          type: "paragraph",
          html: "The LSTM from the image below is thus replaced with a CNN and we don't implement the pink part that would convert the angles into a 3-dimensional, Euclidean space.",
        },
        {
          type: "image",
          src: "/images/protein/protein_architecture.png",
          alt: "Protein architecture diagram",
          caption:
            "Source: AlQuraishi, End-to-end differentiable learning of protein structure",
        },
        {
          type: "paragraph",
          html: "The main challenge in going from a sequence of letters representing amino acids to a 3-dimensional protein structure is 1) an efficient loss calculation and 2) output of the network being angular.",
        },
        {
          type: "orderedList",
          items: [
            "In the AlQuraishi's paper, protein’s tertiary structure is approximated by 3 torsional angles per amino acid, which then are used to reproduce the 3-dimensional structure to compute loss in that space. That process though is very computationally expensive, thus we’re focusing on a regression task that minimizes the loss between angles directly as also done in the RaptorX paper.",
            "We need to angularize the output of the network to compare it with true angles. As one approach, we predict 3 values directly squeezed into the range of [-pi, pi] by a scaled tanh. Another approach is to predict 6 values split into 3 pairs of 2 where each pair represents a vector in a 2-dimensional space, that can then be converted into an angle using atan2 function.",
          ],
        },
        { type: "heading", text: "Results" },
        {
          type: "paragraph",
          html: "The model developed in this project achieved results on par with results reported in RaptorX while using a smaller feature space. The final report can be found <a href='https://drive.google.com/file/d/1-SFavU5i6XlHK2sswy60k5TowgButezy/view?usp=sharing' target='_blank' rel='noreferrer'>here</a>.",
        },
        { type: "heading", text: "My contribution" },
        {
          type: "paragraph",
          html: "I used Tensorflow to load the data from files saved in the tensor format, prepared a que-based pipeline and a fully differentiable graph that first converts Euclidean coordinates of the protein atoms into its corresponding dihedral angles and then minimizes the loss between angles predicted by the core model and the true angles in the training dataset.",
        },
        {
          type: "paragraph",
          html: "I experimented with many ways of angularizing the output of the model and developed a clean, modular code available on GitHub.",
        },
      ],
    },
    pl: {
      title: "Predykcja struktury trzeciorzędowej białek",
      subtitle: "ITU University of Copenhagen, praca zespołowa",
      thumbnail: "/images/thumbnails/protein.webp",
      heroImage: "/images/protein.png",
      description:
        "Predykcja struktury trzeciorzędowej (3D) białka na podstawie sekwencji aminokwasów.",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/m3h0w/protein-dihedral-angles-prediction",
        },
        {
          label: "Raport",
          href: "https://drive.google.com/file/d/1-SFavU5i6XlHK2sswy60k5TowgButezy/view?usp=sharing",
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Celem projektu było przewidywanie kątów tworzących główną strukturę (szkielet) białka na podstawie sekwencji aminokwasów.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Predykcja struktury trzeciorzędowej białek to jedno z najważniejszych nierozwiązanych zagadnień biochemii. Obecne metody są kosztowne i niedokładne. Uczenie maszynowe daje szansę na tańsze i skuteczniejsze rozwiązania. Przełomem była praca Mohammeda AlQuraishiego <a href='https://www.biorxiv.org/content/early/2018/02/14/265231.full.pdf' target='_blank' rel='noreferrer'>End-to-end differentiable learning of protein structure</a>, która wraz z <a href='https://bmcbioinformatics.biomedcentral.com/track/pdf/10.1186/s12859-018-2065-x' target='_blank' rel='noreferrer'>RaptorX-Angle</a> zainspirowała ten projekt.",
        },
        {
          type: "paragraph",
          html: "Model powstał na potrzeby kursu, ale wyniki wykraczały poza standardowy zakres zajęć.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Korzystamy z zestawu ProteinNet oraz piszemy cały pipeline przetwarzania danych w Tensorflow. Rdzeniem modelu jest CNN podobny do tego z RaptorX. Model trenujemy optymalizatorem ADAM na stratach MSE i MAE pomiędzy przewidywanymi i prawdziwymi kątami torsyjnymi.",
        },
        {
          type: "paragraph",
          html: "LSTM z diagramu poniżej zastępujemy CNN i nie implementujemy różowej części, która zamieniałaby kąty na przestrzeń euklidesową 3D.",
        },
        {
          type: "image",
          src: "/images/protein/protein_architecture.png",
          alt: "Schemat architektury modelu",
          caption:
            "Źródło: AlQuraishi, End-to-end differentiable learning of protein structure",
        },
        {
          type: "paragraph",
          html: "Główne wyzwanie to 1) wydajna funkcja straty oraz 2) kątowy charakter wyjścia sieci.",
        },
        {
          type: "orderedList",
          items: [
            "W pracy AlQuraishiego struktura trzeciorzędowa jest aproksymowana przez 3 kąty torsyjne na aminokwas, a następnie odtwarzana w 3D do obliczenia straty. To kosztowne obliczeniowo, więc minimalizujemy stratę bezpośrednio na kątach, jak w pracy RaptorX.",
            "Wyjście sieci musi być zmapowane na zakres kątów. Jedna metoda to bezpośrednie przewidywanie 3 wartości ograniczonych do [-pi, pi] przez skalowany tanh. Inna to przewidywanie 6 wartości tworzących 3 pary wektorów 2D, które następnie zamieniamy na kąty funkcją atan2.",
          ],
        },
        { type: "heading", text: "Wyniki" },
        {
          type: "paragraph",
          html: "Model osiągnął wyniki porównywalne z RaptorX przy mniejszej przestrzeni cech. Raport końcowy dostępny jest <a href='https://drive.google.com/file/d/1-SFavU5i6XlHK2sswy60k5TowgButezy/view?usp=sharing' target='_blank' rel='noreferrer'>tutaj</a>.",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Wykorzystałem Tensorflow do wczytywania danych, przygotowałem pipeline kolejkowy i w pełni różniczkowalny graf, który konwertuje współrzędne euklidesowe atomów białka do kątów torsyjnych i minimalizuje stratę między przewidywaniami a prawdziwymi kątami.",
        },
        {
          type: "paragraph",
          html: "Testowałem różne sposoby „angularizacji” wyjścia modelu i przygotowałem modularny kod dostępny na GitHubie.",
        },
      ],
    },
  },
};

export default proteinStructurePrediction;
