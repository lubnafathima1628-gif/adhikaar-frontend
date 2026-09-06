# ADHIKAAR Frontend

**ADHIKAAR** - Discover. Verify. Reclaim.

A modern web application for discovering and reclaiming unclaimed assets in India.

## Features

- 🔐 **Secure Authentication** - OTP-based login with phone or email
- 🔍 **Asset Discovery** - AI-powered search across multiple asset categories
- 📊 **Results Dashboard** - View discovered assets with confidence scores
- 📋 **Recovery Guide** - Step-by-step document submission and verification
- 🎨 **Beautiful UI** - Modern, accessible, and responsive design
- 🌊 **Smooth Animations** - Engaging user experience with Framer Motion

## Asset Categories

- Bank Deposits
- Insurance Claims
- Investments & IEPF
- EPF / PF
- Property & Real Estate
- Government Benefits
- Other Unclaimed Assets

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lubnafathima1628-gif/adhikaar-frontend.git
cd adhikaar-frontend

# Install dependencies
npm install

# Create .env.local with required environment variables
cp .env.example .env.local
```

### Development

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with 3D background
│   ├── login/             # Login page
│   ├── discover/          # Asset discovery flow
│   ├── search/            # Search progress page
│   ├── results/           # Results display page
│   └── recovery/          # Recovery guide page
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── discovery/         # Discovery flow components
│   ├── results/           # Results display components
│   ├── recovery/          # Recovery process components
│   ├── ui/                # Base UI components
│   └── 3d/                # 3D animated components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and constants
└── public/                # Static assets
```

## Color Palette

- **Cream**: `#FFFEF9` - Primary text
- **Forest Dark**: `#0F2626` - Background
- **Teal**: `#5A9FA8` - Primary accent
- **Sage**: `#6B8E7F` - Secondary accent
- **Gold**: `#D4A574` - Highlights

## API Integration

Update the following API endpoints in `hooks/`:

- `POST /api/auth/login` - Send OTP
- `POST /api/auth/verify` - Verify OTP
- `POST /api/discovery/search` - Search for assets
- `POST /api/recovery/submit` - Submit recovery claim

## Performance

- Optimized images with Next.js Image component
- Code splitting and lazy loading
- CSS-in-JS minimization
- Server-side rendering where beneficial

## Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML
- ARIA labels and descriptions
- Focus management
- Keyboard navigation support

## Security

- Environment variables for sensitive data
- HTTPS enforced in production
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints

## Contributing

Please read CONTRIBUTING.md for details on the code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see LICENSE.md file for details.

## Support

For support, email support@adhikaar.in or open an issue on GitHub.

## Changelog

### v1.0.0 (Initial Release)
- Initial frontend implementation
- Authentication flow
- Asset discovery interface
- Results display and filtering
- Recovery guide workflow

---

**Made with ❤️ for better financial inclusion**
