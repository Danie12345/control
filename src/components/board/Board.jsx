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

  const newChip = () => {
    const id = uuidv4();
    const chip = {
      top: 0, left: 0, name: '555', size: 1,
    };
    dispatch(addChip([id, chip]));
  };

  const chips = useSelector((state) => state.chips);

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CHIP,
      drop(item, monitor) {
        const { x, y } = monitor.getDifferenceFromInitialOffset();
        const gridboxsize = 16;
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
      <div ref={drop} className="board">
        {Object.keys(chips).map((id) => {
          const {
            left, top, name, size,
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
