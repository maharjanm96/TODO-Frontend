import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoLayout from "./components/Pages/TodoLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TodoLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
