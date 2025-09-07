# Music Library - Micro Frontend Application

A comprehensive music library application built with React, featuring micro frontend architecture, JWT-based authentication, and role-based access control.

## 🎯 Features

### Core Features
- **Music Library UI**: Clean, responsive interface for browsing songs
- **Advanced Filtering**: Filter songs by title, artist, album, or genre
- **Sorting & Grouping**: Sort by title, artist, album, or year with group by options
- **JavaScript Methods**: Extensive use of `map`, `filter`, and `reduce` for data manipulation
- **Statistics Dashboard**: Real-time stats using `reduce` for calculations

### Micro Frontend Architecture
- **Main App**: Container application with authentication and routing
- **Music Library Micro Frontend**: Separate app loaded dynamically via Module Federation
- **Dynamic Loading**: Micro frontend loads at runtime from remote deployment

### Authentication & Authorization
- **JWT-based Authentication**: In-memory JWT tokens with localStorage persistence
- **Role-based Access Control**: 
  - **Admin**: Can add and delete songs
  - **User**: Can only view and filter songs
- **Protected Routes**: Authentication guards for secure access

### Technical Implementation
- **React 19**: Latest React with functional components and hooks
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Responsive design with utility-first CSS
- **Module Federation**: Micro frontend integration using Vite
- **React Router**: Client-side routing with protected routes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Demo Credentials
- **Admin**: `admin` / `admin123` (can add/delete songs)
- **User**: `user` / `user123` (view only)

### Local Development

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd my-react-app
   pnpm install
   ```

2. **Start Micro Frontend** (Terminal 1)
   ```bash
   cd music-library-mf
   pnpm install
   pnpm dev
   ```
   This starts the music library micro frontend on `http://localhost:3001`

3. **Start Main Application** (Terminal 2)
   ```bash
   pnpm dev
   ```
   This starts the main application on `http://localhost:3000`

4. **Access the Application**
   - Open `http://localhost:3000`
   - Login with demo credentials
   - Explore the music library with different user roles

## 🏗️ Architecture

### Project Structure
```
my-react-app/
├── src/                          # Main application
│   ├── components/
│   │   ├── AuthGuard.tsx         # Route protection
│   │   ├── Layout.tsx            # Main layout
│   │   ├── Login.tsx             # Authentication form
│   │   └── MusicLibraryWrapper.tsx # Micro frontend loader
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication state
│   └── App.tsx                   # Main app component
├── music-library-mf/             # Micro frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── MusicLibrary.tsx  # Main music library component
│   │   ├── data/
│   │   │   └── mockSongs.ts      # Sample data
│   │   └── types.ts              # TypeScript types
│   └── vite.config.ts            # Module Federation config
└── vite.config.ts                # Main app config
```

### Micro Frontend Communication
- **Module Federation**: Uses `@module-federation/vite` plugin
- **Dynamic Loading**: Micro frontend loads at runtime via `remoteEntry.js`
- **Shared Dependencies**: React and React-DOM shared between apps
- **Type Safety**: Full TypeScript support across micro frontends
- **Error Handling**: Graceful fallback when remote is unavailable

## 🔧 Technical Details

### Authentication System
- **JWT Tokens**: Signed with secret key, 24-hour expiration
- **Role-based UI**: Components show/hide based on user role
- **Persistent Sessions**: Tokens stored in localStorage
- **Mock Backend**: In-memory user database for demo purposes

### Music Library Features
- **Search**: Real-time search across all song fields
- **Sorting**: Multi-field sorting with ascending/descending order
- **Grouping**: Group by album, artist, or genre
- **Statistics**: Calculated using `reduce` for performance
- **CRUD Operations**: Add/delete songs (admin only)

### JavaScript Methods Usage
- **`map()`**: Transform song data for display
- **`filter()`**: Search and filter functionality
- **`reduce()`**: Calculate statistics and group data
- **Array methods**: Extensive use throughout the application

## 🚀 Deployment

### Deploy to Netlify

1. **Build Applications**
   ```bash
   # Build main app
   pnpm build
   
   # Build micro frontend
   cd music-library-mf
   pnpm build
   ```

2. **Deploy Main App**
   - Connect repository to Netlify
   - Set build command: `pnpm build`
   - Set publish directory: `dist`
   - Deploy

3. **Deploy Micro Frontend**
   - Create separate Netlify site
   - Set build command: `cd music-library-mf && pnpm build`
   - Set publish directory: `music-library-mf/dist`
   - Update main app's remote URL in `vite.config.ts`

### Deploy to Vercel

1. **Main App**
   ```bash
   vercel --prod
   ```

2. **Micro Frontend**
   ```bash
   cd music-library-mf
   vercel --prod
   ```

### Environment Variables
Update the micro frontend URL in `vite.config.ts`:
```typescript
remotes: {
  musicLibrary: 'https://your-microfrontend-domain.vercel.app/remoteEntry.js',
}
```

## 🧪 Testing the Application

### Test Scenarios

1. **Authentication Flow**
   - Login with admin credentials
   - Login with user credentials
   - Logout functionality
   - Session persistence

2. **Role-based Access**
   - Admin: Add/delete songs visible
   - User: Add/delete controls hidden
   - UI updates based on role

3. **Music Library Features**
   - Search functionality
   - Sort by different fields
   - Group by album/artist/genre
   - Statistics calculation

4. **Micro Frontend Integration**
   - Dynamic loading via Module Federation
   - Error handling with graceful fallbacks
   - Fallback UI when remote is unavailable

## 🔍 Code Quality

### TypeScript
- Full type safety
- Interface definitions
- Generic types for reusability

### React Best Practices
- Functional components with hooks
- Custom hooks for logic reuse
- Context API for state management
- Lazy loading for performance

### Performance Optimizations
- Lazy loading of micro frontend
- Memoized calculations
- Efficient re-renders
- Code splitting

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop**: Full-featured desktop experience
- **Tailwind CSS**: Utility-first responsive design

## 🛠️ Development Scripts

### Main App
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### Micro Frontend
```bash
cd music-library-mf
pnpm dev          # Start micro frontend server
pnpm build        # Build micro frontend
pnpm preview      # Preview micro frontend build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Micro Frontend Not Loading**
   - Ensure micro frontend is running on port 3001
   - Check CORS settings
   - Verify Module Federation configuration

2. **Authentication Issues**
   - Clear localStorage
   - Check JWT token validity
   - Verify user credentials

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

### Support

For issues and questions:
- Check the troubleshooting section
- Review the code documentation
- Open an issue on GitHub

---

**Built with ❤️ using React, TypeScript, and Module Federation**# FinacPlus-Assignment
