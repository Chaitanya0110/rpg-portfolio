# [Interactive RPG Developer Portfolio](https://portfolio-cs0110.netlify.app/)

A fully interactive, 2D RPG-style developer portfolio built with React and Phaser 3. Instead of scrolling through a standard webpage, visitors can walk a character around a custom-built 2D map and interact with buildings to discover my projects, skills, and experience.

## 🎮 Features
* **Gamified Experience:** Top-down 2D movement with collision detection and animated sprites.
* **Cinematic Intro:** Automated camera panning and a retro typewriter dialogue box on load.
* **Dynamic Data Rendering:** All portfolio data (projects, skills, resume links) is fetched dynamically from a single JSON file, making updates seamless.
* **Integrated PDF Viewer:** Recruiters can view and download my resume directly inside the game's UI modal without leaving the page.
* **Fast Travel Navigation:** A sleek React UI overlay allows recruiters to bypass the game and access data instantly if they are short on time.

## 🛠️ Tech Stack
* **Frontend UI:** React.js (Hooks, Custom Components)
* **Game Engine:** Phaser 3 (Arcade Physics, Camera bounds, Custom Interaction Zones)
* **Build Tool:** Vite
* **Map Design:** Tiled Map Editor (Exported as JSON)
* **Styling:** CSS & Inline React Styles

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git)
   ```
2. Navigate into the project directory:
  ```cd YOUR-REPO-NAME```
3. Install the dependencies:
   ```npm install```
4. Start the local development server:
   ```npm run dev```
5. Open your browser and visit http://localhost:5173 (or the port provided in your terminal).

## 📁 Customizing the Data
You do not need to edit the React or Phaser code to update the portfolio content.

Navigate to public/portfolioData.json.

Update the JSON objects to replace the placeholder data with your own text, links, and project details.

Replace public/resume.pdf with your own resume file.
