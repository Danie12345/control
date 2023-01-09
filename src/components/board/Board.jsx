import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import snap from '@reload-kurt/grid-snap/src/snap';
import ItemTypes from '../../utils/itemtypes';
import Chip from '../chip/Chip';
import { addChip, moveChip } from '../../redux/chips/chips';
import './Board.css';

const Board = ({ hideSourceOnDrag }) => {
  const dispatch = useDispatch();

  const chips = useSelector((state) => state.chips);
  const globalSize = 16;

  const newChip = () => {
    const currHeight = Object.values(chips).reduce((total, chip) => total + chip.size, 0);
    const id = uuidv4();
    const breadboard = document.getElementById('breadboard');
    const size = 2;
    const [cHeight, cWidth] = [2 * globalSize, 3 * globalSize]; // chip height and length
    const chip = {
      top: snap((breadboard.offsetHeight / 2) - (currHeight * (2 * globalSize)) - (cHeight * size) / 2, globalSize) - globalSize,
      left: snap((breadboard.offsetWidth / 2) - (cWidth * size) / 2, globalSize) - globalSize,
      name: '555',
      size,
      dimensions: [cWidth, cHeight],
    };
    dispatch(addChip([id, chip]));
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CHIP,
      drop(item, monitor) {
        const { x, y } = monitor.getDifferenceFromInitialOffset();
        const gridboxsize = globalSize;
        let left = item.left + x;
        let top = item.top + y;
        [left, top] = snap([left, top], [gridboxsize, gridboxsize]);
        dispatch(moveChip({ id: item.id, left, top }));
        return undefined;
      },
    }),
    [],
  );

  const componentLimit = 10;

  return (
    <div style={{ width: '100%' }}>
      <div ref={drop} className="board" id="breadboard">
        {Object.keys(chips).map((id) => {
          const {
            left, top, name, size, dimensions,
          } = chips[id];
          return (
            <Chip
              key={id}
              id={id}
              left={left}
              top={top}
              name={name}
              hideSourceOnDrag={hideSourceOnDrag}
              size={size}
              dimensions={dimensions}
            />
          );
        })}
      </div>
      <button type="button" onClick={newChip} disabled={Object.keys(chips).length >= componentLimit}>
        <div style={{ fontSize: 16 }}>+ </div>
        {Object.keys(chips).length}
        <span> / </span>
        {componentLimit}
      </button>
    </div>
  );
};

export default Board;
