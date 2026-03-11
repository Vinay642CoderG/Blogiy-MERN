import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/api/api";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialized: false,
};

/* Thunks */

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.refreshToken();
      return res.data.data.user;
    } catch (err) {
      console.error("Initialize auth error:", err.response?.data);
      return rejectWithValue("Not authenticated");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res.data.data.user;
    } catch (err) {
      console.error("Login error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.logout();
    } catch (err) {
      console.error("Logout error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  },
);

/* Slice */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder

      /* INITIALIZE */
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.initialized = true;
      })

      /* LOGIN */
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      /* COMMON STATES */
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      /* LISTEN FOR PROFILE UPDATES */
      .addMatcher(
        (action) => action.type === "users/updateProfile/fulfilled",
        (state, action) => {
          // Update the auth user when profile is updated
          if (state.user?._id === action.payload._id) {
            state.user = { ...state.user, ...action.payload };
          }
        },
      );
  },
});

export const { clearError, clearAuth, setInitialized } = authSlice.actions;

export default authSlice.reducer;
