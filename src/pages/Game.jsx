import { useState } from "react";
import { copo, bolinha } from "../assets/index";
import "./Game.css";
import axios from "axios";

export function Game() {
  const [resultado, setResultado, setChute] = useState("");
  
  const embaralharCopos = async () => {
    const response = await axios.post("http://localhost:8000/embaralhar");
    setResultado(response.data);
  };

  const chutar = async () => {
    const response = await axios.post("http://localhost:8000/chute");
    setChute(response.data);
  };

  return (
    <>
      <div id="game">
        <div className="cup">
          <img className="copo" src={copo} onClick={chutar}/>
        </div>
        <div className="cup">
          <img className="copo" src={copo} onClick={chutar}/>
        </div>
        <div className="cup">
          <img className="copo" src={copo} onClick={chutar}/>
        </div>
        <div className="ball">
          <img className="bolinha" src={bolinha} onClick={chutar}/>
        </div>
      </div>

      <button id="btn-play" onClick={embaralharCopos}>
        Embaralhar
      </button>

      <div className="resultado">{resultado}</div>
    </>
  );
}
