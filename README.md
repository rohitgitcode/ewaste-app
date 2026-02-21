# E-Waste Recycling Platform

A full-stack web application for e-waste recycling that rewards users with eco-credits and carbon credits for recycling electronic devices. Built with React.js, Node.js, Express, and MongoDB with blockchain transparency.

## 🌱 Features

- **Device Registration**: Register electronic devices (Laptops, Phones, Tablets, Desktops) for recycling
- **Credit System**: Earn eco-credits and carbon credits based on environmental impact
- **Blockchain Ledger**: Transparent transaction tracking with mock blockchain hashes
- **Marketplace**: Redeem credits for eco-friendly products and donations
- **Gamification**: Badges, levels, and leaderboards to encourage participation
- **Dashboard**: Track personal environmental impact and credit balance
- **Multi-language Support**: English and Hindi language options
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Mobile-friendly interface

## 🏗️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Plain CSS** - Styling (no frameworks)
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File uploads
- **Crypto** - Blockchain hash generation

## 📁 Project Structure

```
ewaste/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # Theme and language contexts
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   └── server.js          # Backend entry point
├── config/                # Database configuration
├── uploads/               # File upload directory
├── .env                   # Environment variables
└── package.json           # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ewaste
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Update the MONGODB_URI in .env if needed

5. **Run the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev
   
   # Or run separately:
   npm run server  # Backend on port 5000
   npm run client  # Frontend on port 3000
   ```

## 📱 Pages & Features

### 1. Home Page
- Hero section with call-to-action
- Live statistics dashboard
- Feature highlights
- Environmental impact overview

### 2. Deposit Page
- Device registration form
- Image upload functionality
- Automatic CO₂ footprint calculation
- Instant credit valuation
- Blockchain transaction ID generation

### 3. Dashboard
- Credit balance overview
- Transaction history
- Badge collection
- Gamification elements
- Leaderboard preview

### 4. Marketplace
- Partner offers redemption
- Donation options
- Credit exchange system
- Eco-friendly product catalog

### 5. Impact Page
- Community statistics
- Environmental impact charts
- Device type breakdown
- Global leaderboard
- CO₂ equivalent calculations

### 6. About Page
- Mission statement
- Blockchain transparency explanation
- Carbon credits education
- Contact information

### 7. Profile Page
- User profile management
- Recycling history
- Settings (theme, language)
- Account preferences

## 💡 Credit System

### Eco Credits
- Earned based on device recycling
- 10 eco-credits per 100 kg CO₂ avoided
- Used for marketplace purchases
- Gamification rewards

### Carbon Credits
- Represent actual CO₂ emissions avoided
- 1 carbon credit = 1 ton CO₂ equivalent
- Used for environmental donations
- Corporate sustainability programs

## 🔧 API Endpoints

### Device Management
- `POST /api/deposit` - Register device for recycling
- `GET /api/credits/user/:userId` - Get user credits and history
- `GET /api/credits/leaderboard` - Get top recyclers

### Marketplace
- `GET /api/marketplace` - Get available offers and donations
- `POST /api/marketplace/redeem` - Redeem offers or donations

### Impact & Analytics
- `GET /api/impact/stats` - Get community statistics
- `GET /api/impact/leaderboard` - Get community leaderboard

## 🌍 Environmental Impact

The platform calculates environmental impact based on:
- Device type and condition
- Manufacturing emissions avoided
- Proper recycling benefits
- Resource conservation

### CO₂ Footprint Estimates
- **Laptop**: ~300 kg CO₂
- **Smartphone**: ~50 kg CO₂
- **Tablet**: ~100 kg CO₂
- **Desktop**: ~500 kg CO₂

## 🎨 Design Principles

- **Eco-friendly color palette**: Greens, whites, grays
- **Modern, clean interface**: Card-based layouts
- **Responsive design**: Mobile-first approach
- **Accessibility**: Semantic HTML, ARIA labels
- **Performance**: Optimized images, lazy loading

## 🔐 Security Features

- Input validation and sanitization
- File upload restrictions
- Secure hash generation
- Environment variable protection
- CORS configuration

## 🌐 Internationalization

- English and Hindi language support
- Context-based translation system
- RTL language compatibility
- Localized number formatting

## 📊 Blockchain Integration

- Mock blockchain ledger for transparency
- SHA-256 hash generation for transactions
- Immutable transaction records
- Public verification system

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client
npm run build

# Start server in production mode
cd ..
npm start
```

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/ewaste-recycling
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Environmental organizations for impact data
- Recycling industry partners
- Open source community
- Sustainability advocates

## 📞 Support

For support, please contact:
- Email: support@ewasterecycling.com
- GitHub Issues: [Repository Issues]
- Documentation: [Project Wiki]

---

**Join us in creating a sustainable future through responsible e-waste recycling!** 🌍♻️
