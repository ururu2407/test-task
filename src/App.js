import React from "react";
import { Routes, Route } from "react-router-dom";

import { Table } from "./components/table";
import { CardTask } from "./components/CardTask";
import "./App.scss";
export const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/test-task/" element={<Table />} />
          <Route path="/test-task/card/:id" element={<CardTask />} />
        </Routes>
      </div>
    </div>
  );
};
