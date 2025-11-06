# 🚀 Subham Mahapatra Portfolio Website

A modern, fully-featured portfolio website built with Next.js 14, showcasing projects, skills, blog posts, and professional services. Features advanced SEO optimization, 3D graphics, interactive animations, and a comprehensive content management system.

**Live Site:** [www.devxsubh.com](https://www.devxsubh.com)

## ✨ Features

### 🎨 User Interface
- **Modern Design**: Clean, responsive UI with dark theme optimized for all devices
- **3D Interactive Gallery**: Three.js powered 3D gallery with smooth navigation
- **Smooth Animations**: Framer Motion and GSAP animations for enhanced UX
- **Custom Cursor**: Interactive custom cursor with smooth tracking
- **Page Transitions**: Seamless transitions between pages

### 📄 Pages & Sections
- **Home**: Hero section, about, skills, projects showcase, timeline, gallery, services, testimonials, and contact
- **About**: Detailed professional background and experience
- **Projects**: Filterable project gallery with detailed case studies
- **Blog**: Dynamic blog system with markdown support
- **Gallery**: 3D interactive photo gallery
- **Resume**: Downloadable resume/CV
- **Contact**: Contact form with email integration
- **Discuss Project**: Multi-step project discussion form

### 🔍 SEO & Performance
- **Advanced SEO**: Comprehensive metadata, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD schema for Person, Organization, Website, and more
- **Dynamic Sitemap**: Auto-generated sitemap with all pages
- **Robots.txt**: Properly configured for search engine crawling
- **Canonical URLs**: Prevents duplicate content issues
- **Static Site Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Next.js Image component with WebP support

### 🛠️ Technical Features
- **TypeScript**: Full type safety across the application
- **State Management**: Redux Toolkit for global state
- **Email Service**: Nodemailer integration for contact forms
- **API Routes**: RESTful API endpoints for blogs, contact, and portfolio data
- **ChatBot Integration**: AI-powered chatbot for user interaction
- **GitHub Activity**: Real-time GitHub contribution calendar
- **News Integration**: Automated news fetching (optional)

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Animation & 3D
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **GSAP**: [GSAP](https://greensock.com/gsap/) for advanced animations
- **3D Graphics**: [Three.js](https://threejs.org/) with React Three Fiber
- **3D Utilities**: [React Three Drei](https://github.com/pmndrs/drei)

### State & Data
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Validation**: [Zod](https://zod.dev/)
- **Database**: MongoDB with Mongoose (optional)

### Email & Services
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Email Templates**: Handlebars
- **Payment**: Razorpay integration (optional)

### Content & Markdown
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown)
- **Markdown Features**: [remark-gfm](https://github.com/remarkjs/remark-gfm)

### Analytics & Monitoring
- **Analytics**: Vercel Analytics
- **Google Analytics**: Next.js Third Party integration

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm
- (Optional) MongoDB for dynamic content

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```
   
   **Edit `.env.local` with your actual values:**
   ```env
   # Required: Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=your-email@gmail.com
   
   # Required: Site URL
   NEXT_PUBLIC_SITE_URL=https://www.devxsubh.com
   
   # Optional: MongoDB
   MONGODB_URI=mongodb://localhost:27017/portfolio
   
   # Optional: API Keys
   GEMINI_API_KEY=your-gemini-api-key
   NEWS_API_KEY=your-newsapi-key

   
   # Optional: Search Engine Verification
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-code
   ```
   
   **⚠️ Important:** Never commit `.env.local` to version control! It's already in `.gitignore`.
   
   See `.env.example` for all available options and `SECURITY.md` for security best practices.

4. **Update portfolio data**
   - Edit `src/dummy.json` with your portfolio information
   - Add blog posts to `src/data/blogs.json`
   - Update images in `public/images/`

5. **Update SEO configuration**
   - Modify `src/config/advanced-seo.ts` with your site information
   - Update `src/config/seo.ts` for base SEO settings

6. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── images/            # Images (gallery, projects, personal)
│   ├── videos/            # Video assets
│   ├── Company/           # Company logos
│   ├── robots.txt         # SEO robots file
│   └── site.webmanifest   # PWA manifest
│
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/         # About page
│   │   ├── blogs/         # Blog pages (list & detail)
│   │   ├── contact/       # Contact page
│   │   ├── gallery/       # Gallery page
│   │   ├── projects/      # Projects pages (list & detail)
│   │   ├── resume/        # Resume page
│   │   ├── discuss-project/# Project discussion form
│   │   ├── api/           # API routes
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── sitemap.ts     # Dynamic sitemap
│   │   └── robots.ts     # Dynamic robots.txt
│   │
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── common/        # Common components
│   │   ├── svgs/          # SVG components
│   │   ├── technologies/  # Technology icons
│   │   └── blocks/        # Feature blocks
│   │
│   ├── config/            # Configuration files
│   │   ├── advanced-seo.ts# Advanced SEO config
│   │   ├── seo.ts         # Base SEO config
│   │   ├── Experience.ts  # Experience config
│   │   └── Github.ts      # GitHub config
│   │
│   ├── lib/               # Utility libraries
│   │   ├── email.ts       # Email utilities
│   │   ├── enhanced-email.ts # Email templates
│   │   ├── newsService.ts # News service
│   │   ├── projectUtils.ts # Project utilities
│   │   └── utils.ts       # General utilities
│   │
│   ├── store/             # Redux store
│   │   ├── slices/        # Redux slices
│   │   └── index.ts       # Store configuration
│   │
│   ├── data/              # Static data
│   │   └── blogs.json     # Blog posts data
│   │
│   ├── utils/             # Helper utilities
│   │   ├── index.ts       # Metadata helpers
│   │   ├── interface.ts   # TypeScript interfaces
│   │   └── site.ts        # Site configuration
│   │
│   └── types/             # TypeScript type definitions
│
├── .env.local            # Environment variables (create this)
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Configuration

### SEO Configuration
The project uses a centralized SEO system located in `src/config/advanced-seo.ts`:

- **Base URL**: Update `baseUrl` with your domain
- **Keywords**: Add primary, long-tail, technical, and location-based keywords
- **Structured Data**: Configure Person, Organization, and Website schemas
- **Page Configs**: Update `pageSEOConfigs` for each page

### Portfolio Data
Edit `src/dummy.json` to customize:
- About information
- Skills and technologies
- Projects and case studies
- Timeline/experience
- Services offered
- Testimonials
- Social handles

### Email Setup
For email functionality, see `EMAIL_SETUP_GUIDE.md` in the project root.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The project can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

### Build for Production

```bash
npm run build
npm start
```

## 📝 Development

### Available Scripts

```bash
# Development server with debugging
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add `page.tsx` with metadata export:
   ```tsx
   import { Metadata } from 'next';
   import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';
   
   export const metadata: Metadata = generateAdvancedMetadata({
     title: pageSEOConfigs.yourPage.title,
     // ... other config
   });
   ```
3. Add page config to `src/config/advanced-seo.ts`
4. Update navigation in `src/components/header.tsx`
5. Add to sitemap in `src/app/sitemap.ts`

### Adding Blog Posts

1. Add new post to `src/data/blogs.json`:
   ```json
   {
     "id": "6",
     "title": "Your Blog Title",
     "slug": "your-blog-slug",
     "excerpt": "Brief description",
     "content": "Full markdown content",
     "publishedAt": "2024-01-20T10:00:00Z",
     // ... other fields
   }
   ```

### Customizing Styles

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline Tailwind classes or CSS modules

## 🎯 SEO Features

### Implemented SEO Best Practices

- ✅ **Metadata Management**: Centralized metadata configuration
- ✅ **Open Graph Tags**: Full OG tags for social sharing
- ✅ **Twitter Cards**: Optimized Twitter card metadata
- ✅ **Structured Data**: JSON-LD schemas (Person, Organization, Website, Article)
- ✅ **Dynamic Sitemap**: Auto-generated sitemap with all pages
- ✅ **Robots.txt**: Proper crawling directives
- ✅ **Canonical URLs**: Prevents duplicate content
- ✅ **Static Generation**: Pre-rendered pages for better SEO
- ✅ **Image Optimization**: Next.js Image with WebP support
- ✅ **Semantic HTML**: Proper HTML5 semantic elements

### Page-Specific SEO

Each page includes:
- Unique title and description
- Relevant keywords
- Custom Open Graph image
- Canonical URL
- Structured data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 👨‍💻 Author

**Subham Mahapatra (devxsubh)**
- Website: [www.devxsubh.com](https://www.devxsubh.com)
- LinkedIn: [devxsubh](https://www.linkedin.com/in/devxsubh/)
- GitHub: [devxsubh](https://github.com/devxsubh)
- Email: connect.at.subham@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Three.js community for 3D graphics libraries
- All open-source contributors whose packages made this possible

---

⭐ If you find this project helpful, consider giving it a star!

