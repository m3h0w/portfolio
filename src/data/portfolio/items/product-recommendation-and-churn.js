const productRecommendationAndChurn = {
  slug: "product-recommendation-and-churn",
  categories: ["machine learning", "AI"],
  stack: "Python, Sklearn, Keras, SQL, Docker, Flask",
  work: { kind: "company", entity: "TIA Technology" },
  i18n: {
    en: {
      title: "Product recommendation and churn in insurance",
      subtitle: "TIA Technology",
      thumbnail: "/images/thumbnails/product_recommendation.webp",
      heroImage: "/images/product_recommendations_and_churn/main.png",
      description:
        "A product recommendation system and churn model for insurance companies.",
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The goal is to build a product-grade system for predicting buying behavior of current and prospect customers of insurance companies and a model for predicting the probability of the customer resigning their policy next year.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "The entire insurance industry in Denmark is buzzing with machine learning- and data-driven opportunities yet not many companies attempted to improve their processes using related technologies. As a collaboration between TIA Technology and one of our customers, we set ourselves to build a product recommendation system and a churn model that are going to bring measurable business value and set a precedence for how machine learning can be efficiently used in Nordic insurance market. We use a KNN and Neural Network model for product recommendations and an LSTM and XGBoost for the churn.",
        },
        {
          type: "paragraph",
          html: "The gif below shows a live integration between a front-end platform and a machine learning API. The predictions of the model change upon an insurance product being added to a customer's profile.",
        },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/icp_demo.gif",
          alt: "Product recommendation demo",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "We're mostly working with data stored in a data warehouse prepared for the purposes of our BI department, which provides us with expertise regarding the data extraction. We’re using Pandas for data transformations, Sklearn for the product recommendations and Keras for time series modelling. The slides are a part of a presentation for a client we’re working with.",
        },
        { type: "subheading", text: "Product recommendation" },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/product_recommendation_large.png",
          alt: "Product recommendation architecture",
        },
        {
          type: "paragraph",
          html: "The product recommendation system is built out of 2 parts. KNN model that automatically approximates current customers’ buying behavior by comparing each customer to their closest neighbor, and a Neural Network that does the same for new customers. We use XGBoost to interpret the results in terms of feature importances.",
        },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/knn.PNG",
          alt: "KNN overview",
        },
        { type: "subheading", text: "Churn" },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/churn_large.png",
          alt: "Churn model architecture",
        },
        {
          type: "paragraph",
          html: "The churn model works on an insurance policy level, where a year-by-year time series data is used to come up with a probability of the policy not being extended next year. As the baseline we use an XGBoost linear model on the last row before prediction and try to use an RNN to beat its performance.",
        },
        { type: "heading", text: "My contribution as an ML Software Engineer" },
        {
          type: "paragraph",
          html: "I am involved in every part of the pipeline and I'm responsible for the entire process from the data being available in a CSV format, through the conceptualizing, experimentation, model building, communication with the client, to a live API.",
        },
        {
          type: "paragraph",
          html: "I developed a product recommendation and churn model and created a Flask API for retraining it and exposing its predictions. I integrated it with a front-end application and used docker-compose to make an online version of the product available for demo purposes.",
        },
      ],
    },
    pl: {
      title: "Rekomendacje produktów i churn w ubezpieczeniach",
      subtitle: "TIA Technology",
      thumbnail: "/images/thumbnails/product_recommendation.webp",
      heroImage: "/images/product_recommendations_and_churn/main.png",
      description:
        "System rekomendacji produktów i model churnu dla firm ubezpieczeniowych.",
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Celem było stworzenie produkcyjnego systemu przewidującego zachowania zakupowe klientów oraz modelu prognozującego prawdopodobieństwo rezygnacji z polisy w kolejnym roku.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Branża ubezpieczeniowa w Danii intensywnie poszukuje zastosowań ML i analityki danych, jednak niewiele firm realnie usprawnia procesy. W ramach współpracy TIA Technology z klientem zbudowaliśmy system rekomendacji oraz model churnu, który miał wnieść mierzalną wartość biznesową. Do rekomendacji użyliśmy KNN i sieci neuronowej, a do churnu – LSTM i XGBoost.",
        },
        {
          type: "paragraph",
          html: "Poniższy gif pokazuje integrację platformy front‑end z API ML. Predykcje zmieniają się, gdy do profilu klienta dodawany jest produkt.",
        },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/icp_demo.gif",
          alt: "Demo rekomendacji produktów",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Pracujemy głównie na danych z hurtowni przygotowanej przez dział BI. Transformacje wykonujemy w Pandas, rekomendacje w Sklearn, a modele czasowe w Keras. Slajdy pochodziły z prezentacji dla klienta.",
        },
        { type: "subheading", text: "Rekomendacje produktów" },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/product_recommendation_large.png",
          alt: "Architektura rekomendacji produktów",
        },
        {
          type: "paragraph",
          html: "System rekomendacji składa się z dwóch części: KNN dopasowuje klientów do najbliższych sąsiadów, a sieć neuronowa obsługuje nowych klientów. Wykorzystujemy XGBoost do interpretacji ważności cech.",
        },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/knn.PNG",
          alt: "Podgląd KNN",
        },
        { type: "subheading", text: "Churn" },
        {
          type: "image",
          src: "/images/product_recommendations_and_churn/churn_large.png",
          alt: "Architektura modelu churnu",
        },
        {
          type: "paragraph",
          html: "Model churnu działa na poziomie polis. Dane szeregów czasowych pozwalają przewidzieć prawdopodobieństwo nieprzedłużenia polisy. Jako baseline użyliśmy liniowego XGBoost, a następnie próbowaliśmy poprawić wynik przy użyciu RNN.",
        },
        { type: "heading", text: "Mój wkład jako ML Software Engineer" },
        {
          type: "paragraph",
          html: "Byłem zaangażowany w cały pipeline – od danych w CSV, przez eksperymenty i budowę modeli, po komunikację z klientem i wdrożenie API.",
        },
        {
          type: "paragraph",
          html: "Zbudowałem modele rekomendacji i churnu oraz stworzyłem API Flask do retrainingu i ekspozycji predykcji. Zintegrowałem je z frontendem i użyłem docker‑compose do wersji demo.",
        },
      ],
    },
  },
};

export default productRecommendationAndChurn;
