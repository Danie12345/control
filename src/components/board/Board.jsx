// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRockets } from '../../redux/rockets/rockets';
import './Board.css';

const Board = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getRockets);
  // }, []);

  // const rockets = useSelector((state) => state.rockets);

  const rockets = '';

  return (
    <div className="board">
      Board here
      {rockets}
    </div>
  );
};

export default Board;
