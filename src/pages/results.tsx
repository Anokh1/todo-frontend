import React, { useState } from "react"; // Correct import statement
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Card } from "primereact/card";

interface ResultItem {
  id: number;
  title: string;
  name: string;
  createdDate: Date;
  description: string;
}

function Results() {
  const location = useLocation();
  const { results } = location.state || {};
  // console.log(typeof results);

  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("query");

  const navigate = useNavigate();
  const handleCardClick = (id: number): void => {
    // Redirect to another page when the card is clicked
    navigate(`/todo/${id}`); 
  };

  if (Object.keys(results).length !== 0) {
    return (
      <div className="App">
        <Navbar />
        <div className="todo">
          {results &&
            results.map((result: ResultItem, index: number) => (
              <div
                key={result.id}
                className="card flex justify-content-center todoCard"
                onClick={() => handleCardClick(result.id)} 
              >
                <Card
                  title={result.title}
                  subTitle={
                    "Created by " +
                    result.name +
                    " on " +
                    new Date(result.createdDate).toDateString()
                  }
                  className="md:w-25rem"
                >
                  <p className="m-0">{result.description}</p>
                </Card>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Navbar />
        <h1>No results</h1>
      </div>
    );
  }
}

export default Results;
