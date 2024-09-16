import { Constant } from "../Constants";
import { GameStatus } from '../App';
import { FC } from "react";
import { length } from '../App';

type LooseScreenProps = {
  status : GameStatus,
  onPlayAgain : () => void,
  constant : Constant
}

export const LooseScreen : FC<LooseScreenProps> = ({status, onPlayAgain, constant}) =>
{
  const a = status == GameStatus.won ? 'You are absolutely' : 'Not even';
  const b = status == GameStatus.won ? 'CORRECT' : 'CLOSE';

  return (
    <div className="loose-screen-wrapper">
      <div className="loose-screen">
        <div className="loose-screen__header">
          <p>{a}</p> 
          <p className="loose-screen__header__big">{b}</p>
        </div>
        <p>The correct answer was {constant.value.slice(0, length)}</p>
        {constant.description.map((d, i) => <p key={i} className="loose-screen__description">{d}</p>)}
        <button className="play-again-button" onClick={onPlayAgain}>Play again</button>
      </div>
    </div>
  )
}