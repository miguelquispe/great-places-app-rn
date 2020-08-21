import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = await insertPlace(
        title,
        newPath,
        "Cotambambas",
        15.6,
        12.5
      );
      console.log("dbResult", dbResult);

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
        },
      });
    } catch (error) {
      console.log("save image error", error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log("loadPlaces::dbResult", dbResult);
      dispatch({ type: SET_PLACES, payload: { places: dbResult.rows._array } });
    } catch (error) {
      throw error;
    }
  };
};
