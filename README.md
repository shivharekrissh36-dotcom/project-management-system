# ProManage — Premium Project Management System

ProManage is a modern, responsive project management web application built with clean HTML5, custom CSS design system, and Vanilla JavaScript. It offers an intuitive dashboard, interactive Kanban boards, task tracking, and team management.

## 🚀 Features

- **Interactive Dashboard**: Real-time project metrics, animated statistical counters, activity feeds, and HTML5 canvas chart visualizations.
- **Kanban Board**: Drag-and-drop task management across customizable workflow columns with live task counting.
- **Task Management**: Structured task listings, priority indicators, progress bars, and project timelines.
- **Team Collaboration**: Team member directory, role tracking, workload visualization, and activity logs.
- **Modern UI/UX**: Built with a sleek dark/light design system, micro-animations, glassmorphism elements, and full mobile responsiveness.

## 📁 Project Structure

```
pms-frontend/
├── index.html        # Landing page & features overview
├── dashboard.html    # Dashboard metrics & canvas charts
├── projects.html     # Interactive Kanban board
├── tasks.html        # Task listings & timeline view
├── team.html         # Team member directory & workload
├── css/              # Design system stylesheets
│   ├── main.css      # Core styles & CSS variables
│   ├── animations.css# Keyframe animations & transitions
│   └── components.css# UI components & layout grids
├── js/               # Application logic
│   ├── main.js       # Navigation, scrolling & counters
│   ├── dashboard.js  # Canvas chart rendering
│   └── kanban.js     # Drag-and-drop Kanban functionality
├── netlify.toml      # Netlify deployment configuration
└── _redirects        # Web routing rules
```

## 💻 Getting Started

Simply open `index.html` in any web browser, or serve using a static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js npx
npx serve .
```

## 🛠️ Built With

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom design system, CSS variables, flexbox & grid
- **JavaScript (ES6+)** — Modular DOM manipulation & HTML5 Canvas graphics

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
