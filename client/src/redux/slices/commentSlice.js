import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentApi } from "../../api/api";

// Async thunks
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (params, { rejectWithValue }) => {
    try {
      const response = await commentApi.getAllComments(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch comments",
      );
    }
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await commentApi.createComment(commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create comment",
      );
    }
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, commentData }, { rejectWithValue }) => {
    try {
      const response = await commentApi.updateComment(id, commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update comment",
      );
    }
  },
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      await commentApi.deleteComment(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment",
      );
    }
  },
);

const initialState = {
  comments: [],
  totalComments: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data.docs || [];
        state.totalComments = action.payload.data.totalDocs || 0;
        state.currentPage = action.payload.data.page || 1;
        state.totalPages = action.payload.data.totalPages || 1;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload.data);
        state.totalComments += 1;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update comment
      .addCase(updateComment.pending, (state) => {
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload.data._id,
        );
        if (index !== -1) {
          state.comments[index] = action.payload.data;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload,
        );
        state.totalComments -= 1;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, setPage } = commentSlice.actions;
export default commentSlice.reducer;
