import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { songReducer } from "./Reducers/SongReducer.jsx";
import { userReducer } from "./Reducers/UserReducer.jsx";

const initialState = {};

const reducer = combineReducers({
  mainSong: songReducer,
  account: userReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
