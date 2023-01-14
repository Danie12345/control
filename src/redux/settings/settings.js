const initialState = {
  showGrid: true,
  doSnap: true,
  globalSize: 16,
  zoom: 1,
};

const TOGGLE_GRID = 'settings/settings/TOGGLE_GRID';
const TOGGLE_SNAP = 'settings/settings/TOGGLE_SNAP';

function toggleGrid(data) {
  return {
    type: TOGGLE_GRID,
    payload: data,
  };
}

function toggleSnap(data) {
  return {
    type: TOGGLE_SNAP,
    payload: data,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_GRID:
      return { ...state, showGrid: action.payload };
    case TOGGLE_SNAP:
      return { ...state, doSnap: action.payload };
    default:
      return state;
  }
}

export { toggleGrid, toggleSnap };
