import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/index";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/http";

import Start from "./pages/Start";
import Header from "./components/UI/Header";
import Game from "./pages/Game";
import About from "./pages/About";
import QuestionUpload from "./pages/QuestionUpload";
import QuestionCreation from "./pages/QuestionCreation";

function App() {
  const [name, setName] = useState("");

  function handleNameChange(name) {
    setName(name);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <main className="flex flex-col min-h-screen bg-base-300">
            <Header />
            <Routes>
              <Route
                path="/"
                element={<Start onNameChange={handleNameChange} />}
              />
              <Route path="/game" element={<Game playerName={name} />} />
              <Route path="/about" element={<About />} />
              <Route path="/question-upload" element={<QuestionUpload />} />
              <Route path="/question-creation" element={<QuestionCreation />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
