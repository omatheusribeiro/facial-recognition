# 🤖 Facial Recognition System 

## 📌 Overview
The **Facial Recognition** project is a powerful system designed to detect facial expressions, recognize faces, and estimate age using the **face-api** library. 🚀

This repository contains an implementation of:

✅ **Facial Expression Recognition** 😊😡😢  
✅ **Facial Recognition** 🧑🔍  
✅ **Age Estimation** 🎯

## 📝 Description
The aim of this project is to demonstrate the usage of the **face-api** library to perform facial expression recognition, facial recognition, and age estimation in images or videos. **face-api** is an open-source JavaScript library that enables real-time face detection and analysis.

## 🏗️ Project Structure
``` 
facial-recognition
├── assets/             # Assets such as images or models
├── css/
│   └── styles.css      # CSS for styling the interface
├── js/
│   └── app.js          # JavaScript logic for face detection and analysis
├── lib/
│   └── face-api/       # face-api library files
└── index.html          # Main HTML file
```

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (optional, for local server setup)
- Modern web browser (Chrome, Firefox, etc.)
- Live Server Extension for VS Code (recommended) ⚡

### 🔧 Installation
```bash
# Clone the repository
git clone https://github.com/omatheusribeiro/facial-recognition.git
cd facial-recognition
```

### ▶️ Running the Project

#### Using Live Server in VS Code (Recommended)
1. Install the **Live Server** extension in VS Code:
   - Open VS Code.
   - Go to the Extensions tab (`Ctrl+Shift+X` or `Cmd+Shift+X` on Mac).
   - Search for "Live Server" and install it.
2. Open the project folder in VS Code.
3. Right-click on `index.html` and select **'Open with Live Server'**.
4. The project will open automatically in your browser at **http://127.0.0.1:5500/index.html** 🚀

#### Alternative Methods
If you prefer using a simple local server:
```bash
# Using a simple Python server
python -m http.server

# Or using Node.js
npx http-server
```
Then go to: **http://127.0.0.1:8000/index.html** (or the displayed port).

## ⚙️ How It Works
1. Upload an image or enable your webcam.
2. The system detects faces in real-time.
3. It analyzes facial features to identify expressions, recognize identities, and estimate age.

## 🛠️ Technologies Used
- **HTML & CSS**
- **JavaScript & TypeScript**
- **face-api.js** (for facial recognition and analysis)

## 📜 License
This project is licensed under the BSD 3-Clause License.
