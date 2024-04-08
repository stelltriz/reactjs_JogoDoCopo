import React, { useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { copo, bolinha } from "../assets/index";
import "./Game.css";

export function Game() {
  const [resultado, setResultado] = useState("");
  const [mostrarConfetti, setMostrarConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const embaralharCopos = async () => {
    try {
      const response = await axios.post("http://localhost:8000/embaralhar");
      setResultado(response.data.message);
      
      document.querySelectorAll(".cup1, .cup2, .cup3").forEach((cup, index) => {
        cup.classList.add(`embaralhar-copo${index + 1}`);
        setTimeout(() => {
          cup.classList.remove(`embaralhar-copo${index + 1}`);
        }, 1800 + 8000 + 1800);
      });
      
    } catch (error) {
      console.error("Erro ao embaralhar os copos:", error);
    }
  };

  const chutar = async (copoEscolhido) => {
    try {
      const response = await axios.post("http://localhost:8000/chute", {
        copo: copoEscolhido,
      });
      setResultado(response.data.message);
      setMostrarConfetti(response.data.confetti);
    } catch (error) {
      console.error("Erro ao chutar:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="cup1" onClick={() => chutar(0)}>
          <img className="copo1" src={copo} alt="Copo" />
        </div>
        <div className="cup2" onClick={() => chutar(1)}>
          <img className="copo2" src={copo} alt="Copo" />
        </div>
        <div className="cup3" onClick={() => chutar(2)}>
          <img className="copo3" src={copo} alt="Copo" />
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

      <div className="resultado">
        {resultado}
        {mostrarConfetti && (
          <Confetti width={width} height={height} recycle={false} />
        )}
      </div>
    </>
  );
}