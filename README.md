# Djida Tech Store 

A modern, responsive e-commerce storefront built with **React**, **Vite**, and **Redux Toolkit**. Djida Tech Store provides a clean shopping interface with a warm, elegant visual identity.

## Features

- **Product catalog** — Display products in an organized storefront.
- **Shopping cart** — Manage cart state using Redux Toolkit.
- **Product search** — Find products through the search interface, if enabled in the current implementation.
- **Responsive design** — A layout designed to adapt to different screen sizes.
- **Custom branding** — A dedicated Djida Tech Store logo and visual identity.
- **Modern frontend tooling** — Fast development and build workflows powered by Vite.

## Technologies

- [React](https://react.dev/) — Component-based user interface.
- [Vite](https://vite.dev/) — Frontend development server and build tool.
- [Redux Toolkit](https://redux-toolkit.js.org/) — Application state management.
- JavaScript (ES6+)
- CSS3
- npm — Package management.

## Preview

Run the project locally to explore the storefront and its current features.

<!-- Add a screenshot here when one is available.
Example:
![Djida Tech Store preview](./screenshots/store-preview.png)
-->

##  Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) — preferably a current LTS version.
- npm, which is included with Node.js.
- Git.

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:djiya19/djida-tech-store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd djida-tech-store
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## Build for Production

To create an optimized production build, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
dztech-store/
├── public/                 # Public static assets
├── src/
│   ├── app/
│   │   └── store.js        # Redux store configuration
│   ├── assets/             # Logo and visual assets
│   ├── components/         # Reusable UI components
│   ├── data/               # Product data
│   ├── features/
│   │   └── cart/            # Cart state and Redux logic
│   ├── pictures/           # Product images
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Design

Djida Tech Store uses a warm, understated visual style with cream backgrounds, sand-colored accents, and terracotta details. The goal is to create a friendly, readable, and welcoming shopping experience.

##  Future Improvements

Potential enhancements include:

- Product category filtering and sorting.
- Improved product search and cart interactions.
- Product detail pages.
- Persistent cart storage.
- Checkout and payment integration.
- Deployment to a public hosting platform.

## Author

**Djida Acheuk**

GitHub: [@djiya19](https://github.com/djiya19)

## License

No license has been specified yet. All rights are reserved unless a license is added to this repository.
