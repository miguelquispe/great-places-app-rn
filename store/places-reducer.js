import { ADD_PLACE, SET_PLACES } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.payload.places.map(
          (place) => new Place(place.id.toString(), place.title, place.imageUri)
        ),
      };
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
