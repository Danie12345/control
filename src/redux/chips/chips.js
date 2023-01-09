// import update from 'immutability-helper';

// const { v4: uuidv4 } = require('uuid');

const initialState = {
  // [uuidv4()]: {
  //   top: 48, left: 96, name: '555', size: 2, dimensions: [2, 3],
  // },
  // [uuidv4()]: {
  //   top: 128, left: 256, name: 'UCC1837', size: 1, dimensions: [2, 3],
  // },
  // [uuidv4()]: {
  //   top: 0, left: 0, name: 'UCC1838', size: 1,
  // },
  // [uuidv4()]: {
  //   top: 0, left: 0, name: 'UCC1836', size: 1,
  // },
  // [uuidv4()]: {
  //   top: 0, left: 0, name: 'UCC1835', size: 1,
  // },
};

const ADD_CHIP = 'chips/chips/ADD_CHIP';
const MOVE_CHIP = 'chips/chips/MOVE_CHIP';
const REMOVE_CHIP = 'chips/chips/REMOVE_CHIP';

function addChip(data) {
  return {
    type: ADD_CHIP,
    payload: data,
  };
}

function moveChip(data) {
  return {
    type: MOVE_CHIP,
    payload: data,
  };
}

function delChip(data) {
  return {
    type: ADD_CHIP,
    payload: data,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHIP:
      return { ...state, [action.payload[0]]: { ...action.payload[1] } };
    case MOVE_CHIP: {
      const chip = Object.keys(state).find((id) => id === action.payload.id);
      state[chip].left = action.payload.left;
      state[chip].top = action.payload.top;
      return { ...state };
    }
    case REMOVE_CHIP:
      return { ...Object.keys(state).filter((id) => id !== action.payload) };
    default:
      return state;
  }
}

export { addChip, moveChip, delChip };
