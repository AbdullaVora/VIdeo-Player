import {Link, useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div>
      <nav>
        <div className="logo"><h1 style={{color:'white'}}>Video Player</h1></div>
        <ul>
            <li ><Link style={{color: 'white', textDecoration:'none', padding:'10px'}} to="/dashboard">DashBoard</Link></li>
            <li ><Link style={{color: 'white', textDecoration:'none', padding:'10px'}} to="/video">Videos Area</Link></li>
            <li><Link style={{color: 'white', textDecoration:'none', padding:'10px'}} to="/about">About</Link></li>
            <li><Link style={{color: 'white', textDecoration:'none', padding:'10px'}} to="/gallery">Gallery</Link></li>
            <li><Link style={{color: 'white', textDecoration:'none', padding:'10px'}} to="/" onClick={handleLogout}>LogOut</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
