export function LooseScreen(correct : boolean, playing : boolean, onPlayAgain : () => void)
{
  const a = correct ? 'You are absolutely' : 'Not even';
  const b = correct ? 'CORRECT' : 'CLOSE';

  const inner = (
    <>
      <div className="loose-screen__header">
        <p>{a}</p> 
        <p className="loose-screen__header__big">{b}</p>
      </div>
      <p>The correct answer was PI</p>
      <p className="loose-screen__description">Pi (π) is a mathematical constant that represents the ratio of a circle's circumference to its diameter. It is an irrational number, meaning its decimal expansion goes on infinitely without repeating. </p>
      <p className="loose-screen__description">The value of pi is approximately 3.14159, though it can be calculated to millions of decimal places. Pi plays a crucial role in geometry, trigonometry, and various fields of science and engineering, making it one of the most important constants in mathematics.</p>
      <button onClick={onPlayAgain}>Play again</button>
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