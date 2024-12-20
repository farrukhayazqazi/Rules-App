import {configureStore} from "@reduxjs/toolkit";
import rulesSetReducer from '../store/slice.ts';


export const store = configureStore({
  reducer: {
    rules: rulesSetReducer,
  }
});

// Export Root State to use TypeScript in selectors
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
