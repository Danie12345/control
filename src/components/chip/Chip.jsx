import React from 'react';
// import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import ItemTypes from '../../utils/itemtypes';
import './Chip.css';

const role = 'BoxPreview';

const Chip = ({
  id, left, top, name, hideSourceOnDrag, size,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CHIP,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left || 0, top || 0],
  );
  if (isDragging && !hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  const [width, height, borderRad] = [48, 32, 2];
  const mask = `
    radial-gradient(
      circle at 106% 50%,
      transparent ${Math.trunc(6 * size)}px,
      #000 0
    )
  `;

  const sizeStyles = {
    minWidth: width * size,
    maxWidth: width * size,
    minHeight: height * size,
    maxHeight: height * size,
    borderRadius: size * borderRad,
    WebkitMaskImage: mask,
    maskImage: mask,
    fontSize: Math.min(size * 6, 16),
  };

  return (
    <div
      className="chip"
      ref={drag}
      style={{
        ...sizeStyles,
        left,
        top,
      }}
      role={role}
    >
      <div className="chip-name">{name}</div>
    </div>
  );
};

export default Chip;
