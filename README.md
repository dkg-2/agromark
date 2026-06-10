# 🌾 AgroMark: AI-Powered Crop Management Platform

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-AgroMark-green?style=for-the-badge&logo=vercel)](https://agromark.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-dkg--2%2Fagromark-181717?style=for-the-badge&logo=github)](https://github.com/dkg-2/agromark)

AgroMark is a full-stack web platform that gives farmers access to three AI-powered tools: plant disease diagnosis via computer vision, soil-based crop recommendation, and a conversational AI farming assistant.

![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)
![TensorFlow](https://img.shields.io/badge/CV%20Model-TensorFlow%20Xception-FF6F00?style=for-the-badge&logo=tensorflow)
![Scikit-learn](https://img.shields.io/badge/ML%20Model-Scikit--learn%20RF-F7931E?style=for-the-badge&logo=scikitlearn)
![Groq](https://img.shields.io/badge/Chat-Groq%20API-orange?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)

---

## ✨ Features

- **🌿 Plant Disease Detection** — Upload a leaf image and get an instant diagnosis from an Xception CNN trained on 54,000+ images across 38 disease classes
- **🌾 Crop Recommendation** — Enter NPK, temperature, humidity, pH, and rainfall values to receive a data-driven crop suggestion from a Random Forest classifier
- **🤖 AI Chat Assistant** — Conversational farming assistant powered by Groq's LLM API for general agricultural queries
- **🌓 Dark / Light Mode** — Theme toggle for comfortable use in any environment
- **📱 Responsive Design** — Mobile-friendly UI built with Tailwind CSS and shadcn/ui

---

## 🧠 AI & ML Models

### 🌿 Plant Disease Detection — Xception CNN

| Parameter | Value |
|---|---|
| Base Architecture | Xception (ImageNet pretrained) |
| Input Size | 224 × 224 × 3 |
| Pooling | GlobalAveragePooling (avg) |
| Custom Head | BatchNorm → Dense(256, ReLU) → Dropout(0.5) → Dense(38, Softmax) |
| Dataset | PlantVillage (color) — 54,306 images, 38 classes |
| Train / Val / Test Split | 64% / 16% / 20% (random_state=42) |
| Augmentation | Rotation ±20°, width/height shift 0.2, shear 0.2, zoom 0.2, horizontal flip |
| Phase 1 Optimizer | Adamax (lr=0.001), 5 epochs — base frozen |
| Phase 2 Optimizer | Adam (lr=0.00001), 5 epochs — last 40 layers unfrozen |
| Final Test Accuracy | **99.78%** |
| Model Format | `.h5` / `.keras` served via HuggingFace Spaces (Gradio) |

**38 Disease Classes across 14 crop species:**
Apple (4), Blueberry (1), Cherry (2), Corn/Maize (4), Grape (4), Orange (1), Peach (2), Bell Pepper (2), Potato (3), Raspberry (1), Soybean (1), Squash (1), Strawberry (2), Tomato (10)

> **Training notebooks:** See [`notebooks/Agroshield_disease_prediction_mark3.ipynb`](notebooks/Agroshield_disease_prediction_mark3.ipynb)

---

### 🌾 Crop Recommendation — Random Forest

| Parameter | Value |
|---|---|
| Algorithm | RandomForestClassifier (scikit-learn) |
| Input Features | N, P, K, Temperature (°C), Humidity (%), pH, Rainfall (mm) |
| Target Classes | 22 crop types |
| Dataset | Crop Recommendation Dataset (Kaggle) |
| Train / Test Split | 80% / 20% stratified (random_state=42) |
| Preprocessing | MinMaxScaler |
| Model Selection | Best performer across 10 algorithms (LR, NB, SVM, KNN, DT, RF, Bagging, AdaBoost, GBM, Extra Trees) |
| Test Accuracy | **99.55%** |
| Model Format | `model.pkl` + `scaler.pkl` served via HuggingFace Spaces (Gradio) |

**22 Supported Crops:**
Rice, Maize, Jute, Cotton, Coconut, Papaya, Orange, Apple, Muskmelon, Watermelon, Grapes, Mango, Banana, Pomegranate, Lentil, Blackgram, Mungbean, Mothbeans, Pigeonpeas, Kidneybeans, Chickpea, Coffee

**Input Parameter Ranges:**
- Nitrogen (N): 0–140 | Phosphorus (P): 5–145 | Potassium (K): 5–205
- Temperature: 8–43°C | Humidity: 14–100% | pH: 3.5–9.9 | Rainfall: 20–300 mm

> **Training notebooks:** See [`notebooks/Agroshield_Crop_Recommendation_mark2.ipynb`](notebooks/Agroshield_Crop_Recommendation_mark2.ipynb) (final) and [`notebooks/Agroshield_Crop_Recommendation_mark1.ipynb`](notebooks/Agroshield_Crop_Recommendation_mark1.ipynb) (model comparison)

---

## 🏗️ System Architecture

```
User (Browser)
    │
    ▼
Next.js Frontend (Vercel)
    │
    ├── /api/plant-disease     ──► HuggingFace Spaces (Gradio)
    │                               └── Xception CNN (.h5)
    │
    ├── /api/crop-recommendation ──► HuggingFace Spaces (Gradio)
    │                               └── Random Forest (model.pkl)
    │
    └── /api/chat              ──► Groq API (LLM)
```

> ML models are trained, saved, and hosted independently on HuggingFace Spaces via Gradio. The Next.js API routes call the Gradio inference endpoints.

---

## 🛠️ Technology Stack

**Frontend**
- Next.js (React Framework) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion

**Backend**
- Next.js API Routes · Node.js

**AI & Machine Learning**
- Disease Detection: TensorFlow/Keras — Xception CNN
- Crop Recommendation: Scikit-learn — Random Forest Classifier
- Chat Assistant: Groq API
- Model Serving: Gradio on HuggingFace Spaces

**Deployment**
- Frontend: Vercel · Models: HuggingFace Spaces

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later) · npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/dkg-2/agromark.git
cd agromark
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create `.env.local` in the root directory:
```env
# Groq API Key for the AI Chat Assistant
GROQ_API_KEY="your_groq_api_key_here"

# HuggingFace Token for accessing Gradio model endpoints
HF_TOKEN="your_hugging_face_token_here"
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
agromark/
├── src/
│   └── app/
│       ├── api/
│       │   ├── chat/                  # Groq LLM chat handler
│       │   ├── crop-recommendation/   # Calls RF model on HF Spaces
│       │   └── plant-disease/         # Calls Xception model on HF Spaces
│       ├── chat/                      # Chat page
│       ├── crop-recommendation/       # Crop recommendation page
│       └── plant-disease/             # Disease detection page
├── notebooks/
│   ├── Agroshield_disease_prediction_mark3.ipynb      # Xception training
│   ├── Agroshield_Crop_Recommendation_mark2.ipynb     # RF training (final)
│   └── Agroshield_Crop_Recommendation_mark1.ipynb     # Model comparison
├── components/
│   ├── ui/                            # shadcn/ui components
│   └── hooks/                         # Custom React hooks
└── lib/                               # Utility functions
```

---

## ⚠️ Known Limitations

- **Controlled dataset conditions** — PlantVillage images are lab-condition photographs. Real-field images (variable lighting, partial occlusion, different angles) will produce lower accuracy. The 99.78% reflects benchmark performance, not production-level real-world accuracy.
- **External model hosting** — ML models are hosted on HuggingFace Spaces free tier. Cold starts (after inactivity) can add 30–60 seconds to the first prediction request.
- **No retraining pipeline** — Models are static. Domain drift (new disease strains, new crop varieties) is not handled automatically.

---

## 📊 Datasets

- [PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset) — Kaggle
- [Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset) — Kaggle

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
