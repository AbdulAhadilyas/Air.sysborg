export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME": {
      return { ...state, Theme: action.payload };
    }
    default: {
      return state;
    }
  }
};
