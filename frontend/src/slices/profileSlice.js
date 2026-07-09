// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
//     loading: false,
// };

// // Problem occured and solved
// // initially i mark user data as nulll
// // as i refresh the page user becomes null , so login / signup buttons are not visible - In case of user not logged
// // case - User logged but as i refresh , dashboard dropdown becomes invisible
// // solution - try getting value from localStorage otherwise mark it as null


// const profileSlice = createSlice({
//     name: "profile",
//     initialState: initialState,
//     reducers: {
//         setUser(state, value) {
//             state.user = value.payload;
//         },
//         setLoading(state, value) {
//             state.loading = value.payload
//         }
//     },
// });

// export const { setUser, setLoading } = profileSlice.actions;
// export default profileSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

// ✅ FIX: Safe parser — guards against corrupted localStorage
const getUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null; // corrupted — start fresh
  }
};

const initialState = {
  user: getUser(),
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;