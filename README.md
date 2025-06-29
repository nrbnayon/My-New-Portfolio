# 🚀 Nayon Kanti Halder - AI-Powered Portfolio

> A futuristic, AI-driven portfolio website showcasing cutting-edge web development skills with neural network animations, interactive code editors, and immersive digital experiences.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue) ![AI Powered](https://img.shields.io/badge/AI-Powered-purple)

## ✨ Features

### 🎨 **Futuristic Design**
- **Neural Network Background**: Animated particle system with real-time connections
- **Custom Cursor**: Interactive cursor with mouse tracking and hover effects
- **Glassmorphism UI**: Modern glass-effect cards and components
- **3D Animations**: Framer Motion powered smooth animations
- **Responsive Design**: Perfect experience across all devices

### 🤖 **AI Integration**
- **AI Chatbot**: Groq-powered assistant with portfolio knowledge
- **Smart Responses**: Context-aware answers about skills and experience
- **Real-time Chat**: Instant responses with typing indicators
- **Fallback System**: Multiple AI models for reliability

### 💻 **Interactive Elements**
- **Code Editor**: Live code examples with syntax highlighting
- **3D Tech Stack**: Interactive carousel showcasing technologies
- **Smooth Scrolling**: Locomotive Scroll for premium feel
- **Loading Animation**: Futuristic startup sequence
- **Floating Icons**: Animated tech icons throughout the site

### 📱 **Modern Features**
- **Dark Theme**: Cyberpunk-inspired color scheme
- **Admin Dashboard**: Full CMS for content management
- **Contact Form**: Resend integration for email handling
- **Database Integration**: MongoDB for dynamic content
- **Authentication**: NextAuth for secure admin access

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.1.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Shadcn/UI** - Modern component library
- **Locomotive Scroll** - Smooth scrolling experience

### **Backend**
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database
- **NextAuth** - Authentication system
- **Resend** - Email service integration

### **AI & APIs**
- **Groq API** - AI chatbot functionality
- **AI SDK** - Unified AI interface
- **Multiple Models** - Fallback system for reliability

### **Deployment**
- **Vercel** - Hosting and deployment
- **Environment Variables** - Secure configuration
- **Edge Functions** - Optimized performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Groq API key
- Resend API key (optional)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/nrbnayon/portfolio-website.git
cd portfolio-website
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your environment variables:
\`\`\`env
# Database
MONGO_URL=your_mongodb_connection_string

# Authentication
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
NEXTAUTH_SECRET=your_nextauth_secret

# AI Services
GROQ_API_KEY=your_groq_api_key

# Email (Optional)
RESEND_API_KEY=your_resend_api_key
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Project Structure

\`\`\`
portfolio-website/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── projects/          # Projects page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── admin/            # Admin-specific components
│   └── ...               # Feature components
├── lib/                  # Utility functions
│   ├── mongodb.ts        # Database connection
│   ├── actions.ts        # Server actions
│   └── env-config.ts     # Environment configuration
├── public/               # Static assets
└── scripts/              # Database scripts
\`\`\`

## 🎯 Key Components

### **Hero Section**
- Animated coding avatar with real-time code snippets
- Typewriter effect with multiple roles
- Gradient text animations
- Social media integration

### **Interactive Code Editor**
- Live TypeScript/JavaScript examples
- Syntax highlighting
- Mock execution with realistic output
- Copy-to-clipboard functionality

### **3D Tech Stack Carousel**
- Interactive technology showcase
- Smooth 3D transitions
- Progress indicators
- Drag-to-navigate functionality

### **AI Chat Assistant**
- Context-aware responses
- Portfolio knowledge base
- Typing indicators
- Error handling with fallbacks

## 🔧 Configuration

### **Database Setup**
1. Create a MongoDB database
2. Add connection string to `MONGO_URL`
3. Run the seeding script via admin panel

### **AI Configuration**
1. Get Groq API key from [console.groq.com](https://console.groq.com)
2. Add to `GROQ_API_KEY` environment variable
3. Configure fallback models in `ai-chat.tsx`

### **Email Setup (Optional)**
1. Get Resend API key from [resend.com](https://resend.com)
2. Add to `RESEND_API_KEY` environment variable
3. Configure sender email in actions

## 📱 Admin Dashboard

Access the admin dashboard at `/admin/login` with your configured credentials.

### **Features**
- **Projects Management**: Add, edit, delete projects
- **Experience Management**: Manage work and education history
- **Messages**: View and respond to contact form submissions
- **Profile Management**: Update personal information
- **Database Tools**: Seed and manage database content

### **Setup Dashboard**
Visit `/admin/setup` to:
- Check system health
- Validate environment variables
- Seed initial data
- Monitor database connection

## 🎨 Customization

### **Colors & Themes**
Edit `globals.css` and `tailwind.config.ts` for custom color schemes:

\`\`\`css
/* Custom gradient */
.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-your-color via-your-color to-your-color;
}
\`\`\`

### **Animations**
Modify Framer Motion animations in component files:

\`\`\`tsx
// Custom animation variants
const customVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
\`\`\`

### **Content**
Update personal information in:
- `lib/seed-data.ts` - Initial data
- Admin dashboard - Dynamic content
- Component files - Static content

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect to Vercel**
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

2. **Add Environment Variables**
- Go to Vercel dashboard
- Add all environment variables
- Redeploy if needed

3. **Custom Domain (Optional)**
- Add your domain in Vercel settings
- Configure DNS records
- Enable SSL certificate

### **Other Platforms**
The app can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📈 Performance

### **Optimization Features**
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components load on demand
- **Caching**: API responses and static assets
- **Compression**: Gzip compression enabled

### **Lighthouse Scores**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔒 Security

### **Security Features**
- **Environment Variables**: Sensitive data protection
- **Authentication**: Secure admin access
- **Input Validation**: Zod schema validation
- **CORS Protection**: API route protection
- **Rate Limiting**: Prevent abuse (recommended)

### **Best Practices**
- Regular dependency updates
- Security headers configuration
- Database connection encryption
- API key rotation

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
\`\`\`bash
git checkout -b feature/amazing-feature
\`\`\`
3. **Commit your changes**
\`\`\`bash
git commit -m 'Add amazing feature'
\`\`\`
4. **Push to the branch**
\`\`\`bash
git push origin feature/amazing-feature
\`\`\`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/UI** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Vercel** - Hosting and deployment
- **Groq** - AI API services
- **MongoDB** - Database services
- **Resend** - Email services

## 📞 Contact

**Nayon Kanti Halder**
- 🌐 Website: [nayonkanti.dev](https://nayonkanti.dev)
- 📧 Email: nrbnayon@gmail.com
- 💼 LinkedIn: [linkedin.com/in/itsnayon](https://linkedin.com/in/itsnayon)
- 🐙 GitHub: [github.com/nrbnayon](https://github.com/nrbnayon)
- 📱 Phone: +880 1934025581

---

<div align="center">

**Built with ❤️ and cutting-edge technology**

[⭐ Star this repo](https://github.com/nrbnayon/portfolio-website) • [🐛 Report Bug](https://github.com/nrbnayon/portfolio-website/issues) • [✨ Request Feature](https://github.com/nrbnayon/portfolio-website/issues)

</div>
