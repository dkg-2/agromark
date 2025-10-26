# AGROMARK: AI-Powered Crop Management

AGROMARK is a modern, full-stack web application designed to empower farmers by providing accessible AI-powered tools for crop management. The platform offers features for diagnosing plant diseases, receiving intelligent crop recommendations, and getting expert advice from a generative AI assistant.

---

### ➤ [Live Demo](https://agromark.vercel.app/)

## ✨ Features

-   **🌿 Plant Disease Detection:** Upload an image of a plant leaf and get an instant diagnosis from a powerful CNN model, identifying whether the plant is healthy or diseased.
-   **🌾 Crop Recommendation:** Input environmental and soil data (NPK values, temperature, humidity, pH, rainfall) to receive a data-driven recommendation for the most suitable crop to cultivate.
-   **🤖 AI Chat Assistant:** Engage in a real-time, conversational chat with a Large Language Model (powered by the Groq API) to ask questions and get detailed answers on a wide range of agricultural topics.
-   **🌓 Theme Toggle:** Switch between light and dark modes for comfortable viewing in any environment.
-   **📱 Responsive Design:** A clean, modern, and fully responsive user interface built with Next.js, Tailwind CSS, and shadcn/ui.

## 🛠️ Technology Stack

-   **Frontend:**
    -   [Next.js](https://nextjs.org/) (React Framework)
    -   [React](https://reactjs.org/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [shadcn/ui](https://ui.shadcn.com/) (UI Components)
    -   [Framer Motion](https://www.framer.com/motion/) (Animations)

-   **Backend:**
    -   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
    -   [Node.js](https://nodejs.org/)

-   **AI & Machine Learning:**
    -   **Disease Detection:** TensorFlow/Keras (Xception CNN Model)
    -   **Crop Recommendation:** Scikit-learn (Random Forest Classifier)
    -   **Chat Assistant:** [Groq API](https://groq.com/) (Large Language Model Inference)
    -   **Prototyping:** [Gradio](https://www.gradio.app/) & [Hugging Face Spaces](https://huggingface.co/spaces)

-   **Deployment & Tools:**
    -   [Vercel](https://vercel.com/)
    -   [Git & GitHub](https://github.com/)

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/dkg-2/agromark.git
cd agromark
```

### 2. Install Dependencies

Install the required npm packages.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a new file named `.env.local` in the root of the project directory and add the following environment variables. You will need to get your own API keys from the respective services.

```env
# Groq API Key for the AI Chat Assistant
GROQ_API_KEY="your_groq_api_key_here"

# Hugging Face Token for accessing private Gradio models (if applicable)
HF_TOKEN="your_hugging_face_token_here"
```

### 4. Run the Development Server

Start the Next.js development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## 📂 Project Structure

A brief overview of the key directories:

```
/src
|-- app/                # Main application routes (pages)
|   |-- api/            # Backend API route handlers
|   |   |-- chat/
|   |   |-- crop-recommendation/
|   |   `-- plant-disease/
|   |-- chat/           # Frontend page for AI Chat
|   |-- crop-recommendation/ # Frontend page for Crop Recommendation
|   `-- plant-disease/  # Frontend page for Disease Detection
|-- components/
|   |-- ui/             # Reusable UI components (shadcn/ui)
|   `-- hooks/          # Custom React hooks
`-- lib/                # Utility functions
```

## 🤝 Acknowledgments

-   This project was developed in a collaborative pair-programming session with **Google's Gemini AI**.
-   The AI models were trained on datasets from Kaggle:
    -   [PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset)
    -   [Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
