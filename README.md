# Starter Dashboard

A premium admin dashboard built with React, TypeScript, and Tailwind CSS. Features glassmorphism UI, interactive charts, smooth animations, and a fully responsive design.

![Dashboard Preview](https://raw.githubusercontent.com/radioheavy/admin-dashboard/main/preview.png)

## Features

- **Glassmorphism UI** - Modern frosted glass effects with backdrop blur
- **Interactive Charts** - Area, Bar, Pie, and Line charts powered by Recharts
- **Smooth Animations** - Fluid transitions and micro-interactions with Framer Motion
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Dark Mode** - Beautiful dark theme, easy on the eyes
- **Command Palette** - Quick navigation with `Cmd/Ctrl + K`
- **CRUD Operations** - User and order management with modals
- **Data Tables** - Sortable, searchable, and paginated tables
- **Toast Notifications** - Elegant notification system
- **Auth Pages** - Login, Register, and Forgot Password pages

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev) | UI Library |
| [TypeScript](https://www.typescriptlang.org) | Type Safety |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Vite](https://vite.dev) | Build Tool |
| [Recharts](https://recharts.org) | Charts |
| [Framer Motion](https://www.framer.com/motion) | Animations |
| [Lucide React](https://lucide.dev) | Icons |
| [React Router](https://reactrouter.com) | Routing |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/radioheavy/admin-dashboard.git

# Navigate to the project
cd admin-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── charts/          # Chart components (Area, Bar, Pie, Line)
│   ├── crud/            # CRUD forms and modals
│   ├── forms/           # Form components (Input, Select, Button)
│   ├── ui/              # UI primitives (Modal, Drawer, Skeleton)
│   ├── DataTable.tsx    # Advanced data table
│   ├── Header.tsx       # Top navigation
│   ├── Sidebar.tsx      # Side navigation
│   └── StatCard.tsx     # Statistics cards
├── context/
│   ├── SidebarContext   # Sidebar state management
│   └── ToastContext     # Toast notifications
├── data/
│   ├── analytics.ts     # Chart mock data
│   ├── orders.ts        # Orders mock data
│   ├── products.ts      # Products mock data
│   └── users.ts         # Users mock data
├── layouts/
│   └── AuthLayout.tsx   # Auth pages layout
├── pages/
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Login.tsx        # Login page
│   ├── Register.tsx     # Registration page
│   ├── ForgotPassword.tsx
│   └── Showcase.tsx     # Presentation showcase
├── App.tsx              # Root component
├── index.css            # Global styles
└── main.tsx             # Entry point
```

## Components

### Charts

```tsx
import { AreaChart, BarChart, PieChart, LineChart } from './components/charts';

<AreaChart
  data={revenueData}
  title="Revenue"
  color="#ec4899"
/>
```

### StatCard

```tsx
import StatCard from './components/StatCard';

<StatCard
  title="Revenue"
  value={284500}
  prefix="$"
  change={12.5}
  trend="up"
  icon={<DollarSign />}
  variant="pink"
/>
```

### DataTable

```tsx
import DataTable from './components/DataTable';

<DataTable
  data={orders}
  columns={columns}
  searchable
  sortable
  pagination
/>
```

## Customization

### Colors

The dashboard uses a pink/purple accent color scheme. Modify `tailwind.config.js` to customize:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ec4899', // pink-500
        secondary: '#8b5cf6', // purple-500
      }
    }
  }
}
```

### Background

The animated background can be customized in `src/components/ui/AnimatedBackground.tsx`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Main Dashboard |
| `/login` | Login Page |
| `/register` | Registration Page |
| `/forgot-password` | Password Reset |
| `/showcase` | Presentation Mode |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1s
- Fully optimized with Vite

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

**radioheavy**

- GitHub: [@radioheavy](https://github.com/radioheavy)

---

If you found this project helpful, please consider giving it a star!
