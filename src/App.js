import "./App.css";
import LandingPage from "./components/LandingPage";
import Quotes from "./components/Quotes";
import AppSessions from "./AppSessions";

function App() {
    return (
        <div className="App">
            <AppSessions />
            <LandingPage />
            <Quotes />
        </div>
    );
}

export default App;
