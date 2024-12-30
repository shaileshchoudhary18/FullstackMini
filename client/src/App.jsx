import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
    return (
        <div className='App'>
            <Router>
            
                <div className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/createPost">Create A Post</Link>
                <Link to="/login">Login</Link>
                <Link to="/registration">registration</Link>
                </div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/createPost' element={<CreatePost />} />
                    <Route path='/post/:id' element={<Post />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/registration' element={<Registration />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
