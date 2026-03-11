import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "@/api/api";

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalDocs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {
    search: "",
    status: "",
    author: "",
    tags: "",
    sortBy: "createdAt",
    order: "desc",
    page: 1,
  },
  aiGeneration: {
    loading: false,
    error: null,
  },
};

/* Thunks */

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params, { rejectWithValue }) => {
    try {
      const res = await postApi.getAdminPosts(params);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch posts",
      );
    }
  },
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await postApi.getPostById(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch post",
      );
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(postData).forEach((key) => {
        if (postData[key] !== undefined && postData[key] !== null) {
          formData.append(key, postData[key]);
        }
      });

      const res = await postApi.createPost(formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create post",
      );
    }
  },
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(postData).forEach((key) => {
        if (postData[key] !== undefined && postData[key] !== null) {
          formData.append(key, postData[key]);
        }
      });

      const res = await postApi.updatePost(id, formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update post",
      );
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await postApi.deletePost(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete post",
      );
    }
  },
);

export const generatePostContent = createAsyncThunk(
  "posts/generateContent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await postApi.generateContent(data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to generate content",
      );
    }
  },
);

/* Slice */

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.aiGeneration.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Update pagination page if provided in filters
      if (action.payload.page !== undefined) {
        state.pagination.page = action.payload.page;
      }
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH POSTS */
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.docs;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
          totalDocs: action.payload.totalDocs,
          hasNextPage: action.payload.hasNextPage,
          hasPrevPage: action.payload.hasPrevPage,
        };
      })

      /* FETCH POST BY ID */
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })

      /* CREATE POST */
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      /* UPDATE POST */
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?._id === action.payload._id) {
          state.currentPost = action.payload;
        }
      })

      /* DELETE POST */
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        if (state.currentPost?._id === action.payload) {
          state.currentPost = null;
        }
      })

      /* GENERATE CONTENT */
      .addCase(generatePostContent.pending, (state) => {
        state.aiGeneration.loading = true;
        state.aiGeneration.error = null;
      })
      .addCase(generatePostContent.fulfilled, (state) => {
        state.aiGeneration.loading = false;
      })
      .addCase(generatePostContent.rejected, (state, action) => {
        state.aiGeneration.loading = false;
        state.aiGeneration.error = action.payload;
      })

      /* COMMON STATES */
      .addMatcher(
        (action) =>
          action.type.startsWith("posts/") &&
          action.type.endsWith("/pending") &&
          !action.type.includes("generateContent"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("posts/") &&
          action.type.endsWith("/fulfilled") &&
          !action.type.includes("generateContent"),
        (state) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("posts/") &&
          action.type.endsWith("/rejected") &&
          !action.type.includes("generateContent"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearError, setFilters, clearCurrentPost, resetPosts } =
  postSlice.actions;

export default postSlice.reducer;
