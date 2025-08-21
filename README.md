# 📄 Resume Enhancer UI

A modern, AI-powered resume enhancement tool built with Vue 3 and TypeScript. Upload your resume and get intelligent feedback and improvements to boost your job search success.

URL: https://resume-enhancer-ui.vercel.app/

![Resume Enhancer Preview](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **🤖 AI-Powered Analysis**: Intelligent resume analysis and enhancement suggestions
- **💡 Smart Feedback**: Categorized feedback with positive reinforcement and improvement areas
- **📥 Enhanced Download**: Download your improved resume with AI enhancements
- **🎨 Modern UI**: Clean, responsive design built with Tailwind CSS
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds

## 🏗️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Reka UI with custom component library
- **Icons**: Lucide Vue Next
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd resume-enhancer-ui
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your API endpoint:

   ```env
   VITE_API_ROOT=http://localhost:8000/api
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run test suite (when tests are added)

## 📁 Project Structure

```
resume-enhancer-ui/
├── src/
│   ├── components/          # Vue components
│   │   ├── ui/             # Reusable UI components
│   │   ├── AppMain.vue     # Main application component
│   │   └── ResumeSection.vue
│   ├── types/              # TypeScript type definitions
│   │   └── resume.ts       # Resume-related types
│   ├── lib/                # Utility functions and mocks
│   │   ├── utils.ts        # General utilities
│   │   └── mock.ts         # Mock data for development
│   ├── assets/             # Static assets
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── public/                 # Public assets
└── package.json
```

## 🎨 UI Components

The project includes a custom UI component library built on top of Reka UI:

- **Button** - Customizable button component with variants
- **Card** - Flexible card layout components
- **Input** - Form input components
- **Collapsible** - Expandable content sections

## 📝 API Integration

The application expects a backend API with the following endpoints:

- `POST /resumes/enhance` - Upload and analyze resume
- `POST /resumes/download` - Download enhanced resume

### Request Format

```typescript
// Upload endpoint expects multipart/form-data with file
FormData {
  file: File // PDF resume file
}

// Download endpoint expects JSON
{
  feedback: Feedback[],
  personal_information: string,
  about: string,
  skills: string[],
  education: string[],
  experiences: ResumeExperience[],
  projects: string[],
  certifications: string[],
  interests: string[]
}
```

## 🔧 Configuration

### Environment Variables

- `VITE_API_ROOT` - Backend API base URL

### Tailwind CSS

The project uses Tailwind CSS v4 with custom configuration. Styles are defined in `src/style.css`.

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Deploy directly from Git repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Docker**: Containerize with nginx for self-hosting

## 🧪 Development

### Adding New Components

1. Create component in `src/components/`
2. Add TypeScript interfaces in `src/types/`
3. Export from appropriate index files
4. Follow the existing component patterns

### Code Style

The project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

Run linting:

```bash
pnpm lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

This means you are free to use, modify, and distribute this software, but any derivative works must also be licensed under GPL v3.0.

## 🙏 Acknowledgments

- Vue.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- Reka UI for accessible UI primitives
