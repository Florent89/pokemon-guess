import { useState } from "react";

function renderScore(props: { score: number; total: number }) {
  return (
    <div>
      <p>
        Votre score actuel est de {props.score} / {props.total}
      </p>
    </div>
  );
}

export default renderScore;
