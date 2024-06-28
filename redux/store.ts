import { configureStore } from "@reduxjs/toolkit";
import bookRoomReducer from "./features/bookingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { bookRoom: bookRoomReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
