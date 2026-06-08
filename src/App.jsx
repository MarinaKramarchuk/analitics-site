import "./App.scss";
import { useState } from "react";
import Header from "./components/Header/Header";
import PostList from "./components/PostList/PostList";

function App() {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <div className="dashboard-layout">
      <div className="decor decor-top"></div>
      <div className="decor decor-botom"></div>
      <Header dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
      <main className="container">
        <PostList dateRange={dateRange} />
      </main>
    </div>
  );
}

export default App;
