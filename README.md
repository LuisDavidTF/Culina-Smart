# Smart Recipe Planner

Smart Recipe Planner is a modern, AI-powered web application that helps users discover, plan, and create recipes. Built with the latest web technologies, it offers a seamless experience across all devices with full PWA (Progressive Web App) support.

## Features

*   **AI-Powered Chef:** Generate creative recipes tailored to your preferences using advanced AI (Backend Integration).
*   **PWA Support:** Installable on mobile and desktop with offline capabilities.
*   **Modern UI/UX:** A premium, responsive design featuring a "Modern Rustic" aesthetic with dark mode support.
*   **Recipe Management:** Create, edit, and organize your favorite recipes.
*   **Smart Search:** Filter recipes by ingredients, categories, and more.
*   **Legal Compliance:** Integrated Privacy Policy, Terms of Service, and Cookie Consent.
*   **SEO Optimized:** Fully optimized for search engines with dynamic sitemaps and metadata.

## Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Core:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Language:** JavaScript / TypeScript
*   **Icons:** Heroicons

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v20 or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/LuisDavidTF/smart-recipe-planner.git
    cd smart-recipe-planner
    ```

2.  Install dependencies:
    ```sh
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env.local` file in the root directory:
    ```sh
    NEXT_PUBLIC_API_URL="your_api_url"
    NEXT_PUBLIC_BASE_URL="your_base_url"
    ```

4.  Run the development server:
    ```sh
    npm run dev
    ```

5.  Open [your_base_url](your_base_url) in your browser.

## Project Structure

```
smart-recipe-planner/
├── app/
│   ├── api/                # API proxies/routes
│   ├── recipes/            # Recipe pages
│   ├── privacy/            # Legal pages
│   ├── layout.jsx          # Root layout with providers
│   └── page.jsx            # Landing page
├── components/
│   ├── recipes/            # Recipe cards, feed, and forms
│   ├── ui/                 # Reusable UI library (Modal, Buttons, etc.)
│   └── auth/               # Authentication forms
├── lib/
│   └── services/           # API service layer
├── hooks/                  # Custom React hooks (useRecipeFeed, etc.)
└── public/                 # Static assets (PWA icons, manifests)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request