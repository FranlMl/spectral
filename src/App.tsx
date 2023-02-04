import "./App.css";

import React, { useState, useEffect } from "react";
import "./App.css";

interface Beer {
  name: string;
  price: number;
  image: string;
}

const App: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(0);
  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((res) => res.json())
      .then((data) => {
        setBeers(data);
      });
  }, []);

  // Décalage horaire
  const shanghaiTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);

  return (
    <div className="App">
      <header>
        <p>
          Paris : {date.toLocaleDateString()}{" "}
          {date.toLocaleTimeString("fr-FR")}
        </p>

        <p>
          Shanghai : {date.toLocaleDateString("zh-CN")}{" "}
          {shanghaiTime.toLocaleTimeString("zh-CN")}
        </p>
      </header>

      <main>
        <p>Compteur : {counter}</p>

        <button onClick={() => setCounter(counter + 1)}>Incrémenter</button>
        <button onClick={() => setCounter(counter - 1)}>Décrémenter</button>

        <input
          type="number"
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
      </main>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Image</th>
          </tr>
        </thead>
      
        <tbody>
          {beers.map((beer) => (
            <tr key={beer.name}>

              <td>{beer.name}</td>

              <td>{beer.price}</td>
              <td>
                <img src={beer.image} alt={beer.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
