import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import AuthModal from './components/AuthModal'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import BrowseGigs from './pages/BrowseGigs'
import PostGig from './pages/PostGig'
import GigDetails from './pages/GigDetails'
import MyGigs from './pages/MyGigs'
import MyBids from './pages/MyBids'
import EditGig from './pages/EditGig'

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/browse-gigs" element={<BrowseGigs />} />
            <Route path="/post-gig" element={<PostGig />} />
            <Route path="/gig/:id" element={<GigDetails />} />
            <Route path="/gig/:id/edit" element={<EditGig />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/my-bids" element={<MyBids />} />
          </Routes>
          <AuthModal />
        </Router>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App
