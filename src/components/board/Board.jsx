import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import snap from '@reload-kurt/grid-snap/src/snap';
import Switch from 'react-switch';

import ItemTypes from '../../utils/itemtypes';
import Chip from '../chip/Chip';
import { addChip, delChip, moveChip } from '../../redux/chips/chips';
import './Board.css';
import { toggleGrid, toggleSnap } from '../../redux/settings/settings';

const Board = ({ hideSourceOnDrag }) => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);
  const chips = useSelector((state) => state.chips);
  const { globalSize } = settings;

  const newChip = () => {
    const id = uuidv4();
    const breadboard = document.getElementById('breadboard');
    const size = 2;
    const [cHeight, cWidth] = [2 * globalSize, 3 * globalSize]; // chip height and length
    const chip = {
      top: snap((breadboard.offsetHeight / 2) - (cHeight * size) / 2, globalSize) - globalSize,
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
        if (item.snaps) {
          [left, top] = snap([left, top], [gridboxsize, gridboxsize]);
        }
        dispatch(moveChip({ id: item.id, left, top }));
        return undefined;
      },
    }),
    [],
  );

  const [, remove] = useDrop(
    () => ({
      accept: ItemTypes.CHIP,
      drop(item) {
        dispatch(delChip(item.id));
        return undefined;
      },
    }),
    [],
  );

  const checkGrid = (data) => {
    dispatch(toggleGrid(data));
  };

  const checkSnap = (data) => {
    dispatch(toggleSnap(data));
  };

  const componentLimit = 10;

  return (
    <div style={{ width: '100%' }}>
      <div ref={drop} style={{ position: 'relative' }} className="board" id="breadboard">
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
      <div style={{ display: 'flex', gap: 20 }}>
        <button type="button" onClick={newChip} disabled={Object.keys(chips).length >= componentLimit}>
          <div style={{ fontSize: 16 }}>+ </div>
          {Object.keys(chips).length}
          <span> / </span>
          {componentLimit}
        </button>
        <div ref={remove} style={{ width: 50, height: 50, border: '1px solid black' }}>
          TRASH
        </div>
        <div>
          Grid
          <Switch onChange={checkGrid} checked={settings.showGrid} />
        </div>
        <div>
          Snap
          <Switch onChange={checkSnap} checked={settings.doSnap} />
        </div>
      </div>
    </div>
  );
};

export default Board;
