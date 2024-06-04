import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PrivateRoute from './components/Private';

function App() {
  return (
    <div>
        <Routes>
          {/* /home is the private route, it will accessed after user signup */}
          <Route path="/home" element={<PrivateRoute>
            <Home />
          </PrivateRoute>} />
          {/* / is the main route where user will be signup first */}
          <Route path="/" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
