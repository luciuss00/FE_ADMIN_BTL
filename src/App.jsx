import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Signin';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
