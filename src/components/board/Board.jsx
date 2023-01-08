import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import snap from '@reload-kurt/grid-snap/src/snap';
import ItemTypes from '../../utils/itemtypes';
import Chip from '../chip/Chip';
import './Board.css';

const Board = ({ hideSourceOnDrag }) => {
  const [chips, setChips] = useState({
    a: {
      top: 0, left: 0, title: '555', size: 2,
    },
    b: {
      top: 0, left: 0, title: 'UCC1837', size: 1,
    },
    c: {
      top: 0, left: 0, title: 'UCC1838', size: 1,
    },
    d: {
      top: 0, left: 0, title: 'UCC1836', size: 1,
    },
    e: {
      top: 0, left: 0, title: 'UCC1835', size: 1,
    },
  });
  const moveChip = useCallback(
    (id, left, top) => {
      setChips(
        update(chips, {
          [id]: {
            $merge: { left, top },
          },
        }),
      );
    },
    [chips, setChips],
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CHIP,
      drop(item, monitor) {
        const { x, y } = monitor.getDifferenceFromInitialOffset();
        const gridboxsize = 16;
        let left = item.left + x;
        let top = item.top + y;
        [left, top] = snap([left, top], [gridboxsize, gridboxsize]);
        moveChip(item.id, left, top);
        return undefined;
      },
    }),
    [moveChip],
  );

  return (
    <div ref={drop} className="board">
      {Object.keys(chips).map((key) => {
        const {
          left, top, title, size,
        } = chips[key];
        return (
          <Chip
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
            name={title}
            size={size}
          />
        );
      })}
    </div>
  );
};

// Board.propTypes = {
//   isDragging: PropTypes .isRequired,
// };

export default Board;
