import { ADD_PLACE } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image
      );
      return {
        places: state.places.concat(newPlace),
      };
      break;

    default:
      return state;
  }
};
