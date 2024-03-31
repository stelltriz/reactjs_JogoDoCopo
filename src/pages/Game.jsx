import { useState } from "react";
import { copo, bolinha } from "../assets/index";
import "./Game.css";
import axios from "axios";

export function Game() {
  const [resultado, setResultado] = useState("");

  const embaralharCopos = async () => {
    try {
      const response = await axios.post("http://localhost:8000/embaralhar");
      setResultado(response.data.message);
  
      const cups = document.querySelectorAll(".cup");
      cups.forEach(cup => {
        cup.classList.add("embaralhar");
        cup.addEventListener("animationend", () => {
          cup.classList.remove("embaralhar");
        }, { once: true });
      });
    } catch (error) {
      console.error("Erro ao embaralhar os copos:", error);
    }
  };

  const chutar = async (copoEscolhido) => {
    try {
      const response = await axios.post("http://localhost:8000/chute", {
        copo: copoEscolhido
      });
      setResultado(response.data.message);
    } catch (error) {
      console.error("Erro ao chutar:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="cup" onClick={() => chutar(0)}>
          <img className="copo" src={copo} alt="Copo" />
        </div>
        <div className="cup" onClick={() => chutar(1)}>
          <img className="copo" src={copo} alt="Copo" />
        </div>
        <div className="cup" onClick={() => chutar(2)}>
          <img className="copo" src={copo} alt="Copo" />
        </div>
        <div className="ball">
          <img className="bolinha" src={bolinha} alt="Bolinha" />
        </div>
      </div>

      <div className="botao">  
        <button className="btn-play" onClick={embaralharCopos}>
            Embaralhar
        </button>
      </div>

      <div className="resultado">{resultado}</div>
    </>
  );
}
