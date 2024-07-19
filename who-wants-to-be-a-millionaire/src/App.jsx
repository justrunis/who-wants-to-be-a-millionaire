import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Start from "./pages/Start";
import Header from "./components/UI/Header";
import Game from "./pages/Game";
import About from "./pages/About";

function App() {
  const [name, setName] = useState("");

  function handleNameChange(name) {
    setName(name);
  }

  return (
    <>
      <BrowserRouter>
        <main className="flex flex-col max-h-screen">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Start onNameChange={handleNameChange} />}
            />
            <Route path="/game" element={<Game playerName={name} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
