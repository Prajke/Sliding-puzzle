import "./Styling/Tile.css"



function Tile(props) {
  const position = props.position
  const onClick= (e) =>
    {
      props.onMoveTile(position);
    }
  if (position.number !== 0)
    return (
      <div className="tile" onClick={onClick}>
      <h1>{position.number}</h1>
      </div>  );
}


export default Tile;
