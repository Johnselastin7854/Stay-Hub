import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "@prisma/client";

type RoomDataType = {
  room: Room;
  totalPrice: number;
  breakFastIncluded: boolean;
  startDate: Date;
  endDate: Date;
};

interface BookRoomState {
  bookingRoomData: RoomDataType | null;
  paymentIntent: string | null;
  clientSecret: string | undefined;
}

const initialState: BookRoomState = {
  bookingRoomData: null,
  paymentIntent: null,
  clientSecret: undefined,
};

const bookRoomSlice = createSlice({
  name: "bookRoom",
  initialState,
  reducers: {
    setRoomData(state, action: PayloadAction<RoomDataType>) {
      state.bookingRoomData = action.payload;
    },
    setPaymentIntent(state, action: PayloadAction<string>) {
      state.paymentIntent = action.payload;
    },
    setClientSecret(state, action: PayloadAction<string>) {
      state.clientSecret = action.payload;
    },
    resetBookRoom(state) {
      state.bookingRoomData = null;
      state.paymentIntent = null;
      state.clientSecret = undefined;
    },
  },
});

export const { setRoomData, setPaymentIntent, setClientSecret, resetBookRoom } =
  bookRoomSlice.actions;
export default bookRoomSlice.reducer;
