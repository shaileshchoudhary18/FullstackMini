import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false
    });

    useEffect(() => {
        axios.get('http://localhost:3000/auth/auth', {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
            }
        })
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
    }

    return (
        <div className='App'>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <nav className='navbar'>
                        <div className='navbar-container'>
                            <Link to="/" className='navbar-logo'>BlogApp</Link>
                            <div className='navbar-links'>
                                <Link to="/" className='nav-link'>Home</Link>
                                <Link to="/createPost" className='nav-link'>Create A Post</Link>
                            </div>
                            <div className='navbar-auth'>
                                {!authState.status ? (
                                    <>
                                        <Link to="/registration" className='auth-link register'>Register</Link>
                                        <Link to="/login" className='auth-link login'>Login</Link>
                                    </>
                                ) : (
                                    <>
                                        <span className='username'>Welcome, {authState.username}!</span>
                                        <button onClick={logout} className='auth-link logout'>Logout</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                    <main className='content fade-in'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/createPost' element={<CreatePost />} />
                            <Route path='/post/:id' element={<Post />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/registration' element={<Registration />} />
                        </Routes>
                    </main>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
