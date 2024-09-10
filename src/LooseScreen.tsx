import { Constant } from "./Constants";

export function LooseScreen(correct : boolean, playing : boolean, onPlayAgain : () => void, constant : Constant)
{
  const a = correct ? 'You are absolutely' : 'Not even';
  const b = correct ? 'CORRECT' : 'CLOSE';

  const inner = (
    <>
      <div className="loose-screen__header">
        <p>{a}</p> 
        <p className="loose-screen__header__big">{b}</p>
      </div>
      <p>The correct answer was {constant.name}</p>
      {constant.description.map((d, i) => <p key={i} className="loose-screen__description">{d}</p>)}
      <button className="play-again-button" onClick={onPlayAgain}>Play again</button>
    </>
    );

  return (
    <div className="loose-screen-wrapper">
      <div className="loose-screen">
        {playing ? null : inner}
      </div>
    </div>
  )
}