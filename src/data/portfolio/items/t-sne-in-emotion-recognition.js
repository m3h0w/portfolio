const tSneInEmotionRecognition = {
  slug: "t-sne-in-emotion-recognition",
  categories: ["Science", "machine learning", "AI"],
  stack: "Python, Keras, Parametric t-SNE",
  work: { kind: "school", entity: "University of Copenhagen" },
  i18n: {
    en: {
      title: "Parametric t-SNE for temporal, multimodal emotion recognition",
      subtitle: "University of Copenhagen, group work",
      thumbnail: "/images/thumbnails/emotion_recognition.webp",
      heroImage: "/images/emotion_recognition.png",
      description:
        'A novel technique for visualizing emotion recognition results including the temporal dimension. An "emotion space" is created using parametric t-SNE, where machine learning models can be visually compared with respect to modalities, models, and hyperparameters used.',
      links: [
        {
          label: "Report",
          href: "https://drive.google.com/file/d/1j5ZXntRgbDE_mr_5zZtdQdE6zzUx7Mts/view?usp=sharing",
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The research aimed at improving understanding of multimodal emotion recognition models by introducing a framework for visualizing non-temporal and temporal outputs of models predicting multiple related values for each data entry.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Various emotion recognition models are being introduced with the rise of powerful Machine Learning, computational power, and data sources. Most of them rely on Paul Ekman’s concept of 6 basic emotions, thus predict 6 values in parallel to describe single emotional state.",
        },
        {
          type: "paragraph",
          html: "This, together with data being merged from different modalities, makes interpreting the results a challenge and opens up opportunities for introducing better visualization techniques that could enable deeper insights, better understanding of the inner workings of machine learning, and ultimately better models.",
        },
        {
          type: "paragraph",
          html: "Our work introduces a concept called emotion space, and overlays temporal information over that space, allowing for comparison between models and modality-dependent data sources. We present our results for training KNN and LSTM models on the <a href='https://github.com/A2Zadeh/CMU-MultimodalSDK' target='_blank' rel='noreferrer'>CMU MOSEI dataset</a> and a dataset exploring emotion in music.",
        },
        {
          type: "paragraph",
          html: "The project was developed for a Cognitive Science course.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "The emotion space is created using Parametric t-SNE by embedding the 6-dimensional emotional state into a 2-dimensional space. It represents relationships between the emotions as understand through the prism of training data, grouping similar emotions together and e.g. placing sadness and happiness on one axis where high sadness and high happiness never coincide.",
        },
        {
          type: "image",
          src: "/images/t-SNE/emotion_space.PNG",
          alt: "Emotion space",
          caption: "Emotion Space",
        },
        {
          type: "paragraph",
          html: "The crucial point is the use of Parametric t-SNE instead of classical t-SNE. Given that we’ve trained a network that maps training data successfully from 6-, to 2-dimensional space, we can then map any unseen data point into that space again later, visualizing for example predictions of a model trying to learn multimodal emotion recognition task.",
        },
        {
          type: "image",
          src: "/images/t-SNE/visualization_example.png",
          alt: "Visualization example",
          caption:
            "LSTM minimizing MSE by distinguishing only between happy and not-happy",
        },
        {
          type: "paragraph",
          html: "An example could be an LSTM model that produced better MAE than KNN, yet after visualizing the results we could see that it only learned to differentiate between happy and sad. For more information, the full report is available <a href='https://drive.google.com/file/d/1j5ZXntRgbDE_mr_5zZtdQdE6zzUx7Mts/view?usp=sharing' target='_blank' rel='noreferrer'>here</a>.",
        },
        { type: "heading", text: "My contribution" },
        {
          type: "paragraph",
          html: "I authored the idea, worked with parametric t-SNE to create the emotion space, and trained the LSTM model on multiple modalities.",
        },
      ],
    },
    pl: {
      title: "Parametryczne t-SNE dla czasowej, multimodalnej analizy emocji",
      subtitle: "University of Copenhagen, praca zespołowa",
      thumbnail: "/images/thumbnails/emotion_recognition.webp",
      heroImage: "/images/emotion_recognition.png",
      description:
        "Technika wizualizacji wyników rozpoznawania emocji z uwzględnieniem czasu, oparta o parametryczne t‑SNE.",
      links: [
        {
          label: "Raport",
          href: "https://drive.google.com/file/d/1j5ZXntRgbDE_mr_5zZtdQdE6zzUx7Mts/view?usp=sharing",
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Celem badań było lepsze zrozumienie modeli rozpoznawania emocji poprzez wizualizację wyników nietemporalnych i temporalnych.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Wraz z rozwojem ML i dostępnością danych pojawia się wiele modeli rozpoznawania emocji. Większość z nich opiera się na 6 podstawowych emocjach Paula Ekmana i przewiduje 6 wartości jednocześnie.",
        },
        {
          type: "paragraph",
          html: "Łączenie wielu modalności utrudnia interpretację wyników i otwiera możliwość lepszych technik wizualizacji, które pomagają w zrozumieniu działania modeli.",
        },
        {
          type: "paragraph",
          html: "Wprowadzamy pojęcie przestrzeni emocji i nakładamy na nią informację temporalną, co pozwala porównywać modele i źródła danych. Wyniki prezentujemy m.in. dla modeli KNN i LSTM trenowanych na <a href='https://github.com/A2Zadeh/CMU-MultimodalSDK' target='_blank' rel='noreferrer'>CMU MOSEI</a>.",
        },
        {
          type: "paragraph",
          html: "Projekt powstał na kursie Cognitive Science.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Przestrzeń emocji tworzymy przez osadzenie 6‑wymiarowego stanu emocji do 2D za pomocą parametrycznego t‑SNE. Odzwierciedla to relacje między emocjami w danych treningowych.",
        },
        {
          type: "image",
          src: "/images/t-SNE/emotion_space.PNG",
          alt: "Przestrzeń emocji",
          caption: "Przestrzeń emocji",
        },
        {
          type: "paragraph",
          html: "Kluczowe jest użycie parametrycznego t‑SNE – wytrenowana sieć pozwala mapować nowe próbki do tej samej przestrzeni, co umożliwia wizualizację predykcji modeli.",
        },
        {
          type: "image",
          src: "/images/t-SNE/visualization_example.png",
          alt: "Przykład wizualizacji",
          caption:
            "LSTM minimalizuje MSE, rozróżniając głównie happy/not‑happy",
        },
        {
          type: "paragraph",
          html: "Przykładowo model LSTM osiąga lepsze MAE od KNN, ale wizualizacja pokazuje, że uczy się głównie rozróżniać happy/sad. Raport dostępny jest <a href='https://drive.google.com/file/d/1j5ZXntRgbDE_mr_5zZtdQdE6zzUx7Mts/view?usp=sharing' target='_blank' rel='noreferrer'>tutaj</a>.",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Byłem autorem pomysłu, pracowałem z parametrycznym t‑SNE i trenowałem model LSTM na wielu modalnościach.",
        },
      ],
    },
  },
};

export default tSneInEmotionRecognition;
