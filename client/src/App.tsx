import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {Header} from "./components/Header/Header.tsx";
import {Footer} from "./components/Footer/Footer.tsx";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
            {/*<Route path="/" element={<Layout />}/>*/}
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
