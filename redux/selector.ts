import { RootState } from "./store";

export const selectPaymentIntent = (state: RootState) =>
  state.bookRoom.paymentIntent;
