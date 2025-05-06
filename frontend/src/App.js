import React from "react";
import { Routes, Route } from "react-router-dom";
import AddLearningPlan from "./Pages/LearningPlan/AddLearningPlan";
import AllLearningPlan from "./Pages/LearningPlan/AllLearningPlan";
import UpdateLearningPlan from "./Pages/LearningPlan/UpdateLearningPlan";
import MyLearningPlan from "./Pages/LearningPlan/MyLearningPlan";

function App() {
  return (
    <Routes>
    //paths
      <Route path="/addLearningPlan" element={<AddLearningPlan />} />
      <Route path="/allLearningPlan" element={<AllLearningPlan />} />
      <Route path="/myLearningPlan" element={<MyLearningPlan />} />
      <Route path="/updateLearningPlan/:id" element={<UpdateLearningPlan />} />
    </Routes>
  );
}

export default App;
