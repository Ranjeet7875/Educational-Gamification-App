# 🎮 Educational Gamification App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-v18.2.0-61DAFB.svg?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-v18.x-339933.svg?logo=node.js)

An interactive learning platform that transforms education through gamification elements including quizzes, rewards, leaderboards, and AI-driven recommendations.

![App Preview](https://via.placeholder.com/800x400?text=Educational+Gamification+App)

## ✨ Features

### 🏠 Interactive Home Page
- Engaging welcome banner with motivational quotes that change daily
- Quick access navigation to key app sections
- AI-driven personalized quiz recommendations
- Real-time user profile summary showing points, badges, and rank

### 📝 Dynamic Quiz System with Multiple Input Methods
- **Text Input**: Answer questions with typed responses
- **Voice Recognition**: Speak your answers for accessibility and convenience
- **Multiple Choice**: Select from options with interactive buttons
- **Drawing/Sketching**: Draw answers for geometry, diagrams, or art-related quizzes
- **Math Equation Input**: Type or draw mathematical equations and formulas
- **Code Input**: Built-in code editor for programming-related quizzes
- Instant visual feedback for all answer types
- Performance breakdown and score calculation

### 🔍 Diverse Content Creation Tools
- Quiz creation interface supporting all input types
- Rich text editor for creating educational content
- Ability to import questions from various formats (CSV, Excel, PDF)
- Media upload supports images, audio files, and videos
- Code snippet creation with syntax highlighting

### 🏆 Rewards & Achievements
- Collectible badges and trophies to showcase progress
- Celebratory animations when leveling up or earning achievements
- Visual progress trackers for upcoming rewards

### 🥇 Real-time Leaderboards
- Live rankings of top-performing students
- Rank change animations and notifications
- Customizable filters by subject, quiz type, or timeframe
- Personalized view highlighting your position among peers

### 📊 Detailed Progress Dashboard
- Visual performance analysis with interactive charts
- Subject-by-subject breakdown highlighting strengths and improvement areas
- Customizable goal setting and tracking
- Input method preference analysis to identify learning style

### 🤖 AI-Powered Learning Path
- Smart recommendations based on performance patterns
- Targeted quizzes focusing on improvement areas
- Adaptive difficulty based on user progress
- Input method suggestions based on learning style analysis

## 🛠️ Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT for secure access
- **AI/ML**: TensorFlow.js for quiz recommendations and input analysis
- **Real-time Features**: Socket.io
- **Voice Recognition**: Web Speech API integration
- **Drawing Interface**: Canvas API with touch support
- **Math Input**: MathJax/KaTeX integration
- **Code Editor**: Monaco Editor integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm (v7 or later)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/educational-gamification-app.git
   cd educational-gamification-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment setup**
   - Create a `.env` file in the root directory based on `.env.example`
   - Create a `.env` file in the backend directory based on `backend/.env.example`

5. **Start development servers**
   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm run dev

   # Terminal 2: Start frontend development server
   # (from project root)
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## 📱 Application Structure

```
educational-gamification-app/
├── public/                 # Static assets
├── src/                    # Frontend source code
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   │   ├── inputs/         # Various input method components
│   │   │   ├── TextInput/      
│   │   │   ├── VoiceInput/     
│   │   │   ├── DrawingInput/   
│   │   │   ├── MathInput/      
│   │   │   └── CodeInput/      
│   │   ├── quizzes/        # Quiz-related components
│   │   └── ...
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API service integration
│   ├── utils/              # Utility functions
│   └── App.js              # Main application component
├── backend/                # Backend source code
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── server.js           # Entry point
└── README.md               # Project documentation
```

## 📦 API Endpoints

The API documentation is available at `/api/docs` when running the development server.

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
npm test
```

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Project Lead - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/educational-gamification-app](https://github.com/yourusername/educational-gamification-app)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [MathJax](https://www.mathjax.org/)
- All our amazing contributors and supporters!
