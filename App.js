import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import PlacesNavigation from "./navigation/PlacesNavigation";

// Store
import placesReducer from "./store/places-reducer";
import { init } from "./helpers/db";

// Init db
init()
  .then(() => {
    console.log("Initialized db");
  })
  .catch((error) => {
    console.log("Initialized db failed");
    console.log(error);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
}
