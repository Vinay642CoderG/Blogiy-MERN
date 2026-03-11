import axios from "./axios";

export const authApi = {
  login: (data) => axios.post("/auth/login", data),
  logout: () => axios.post("/auth/logout"),
  refreshToken: () => axios.post("/auth/refresh-token"),
};

export const userApi = {
  getProfile: () => axios.get("/users/profile/me"),
  updateProfile: (data) =>
    axios.put("/users/profile/me", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const postApi = {
  getPosts: (params) => axios.get("/posts", { params }),
  getAdminPosts: (params) => axios.get("/posts/admin/all", { params }),
  getPostById: (id) => axios.get(`/posts/${id}`),
  createPost: (data) =>
    axios.post("/posts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updatePost: (id, data) =>
    axios.put(`/posts/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deletePost: (id) => axios.delete(`/posts/${id}`),
  generateContent: (data) => axios.post("/posts/generate-content", data),
};

export const categoryApi = {
  getCategories: (params = {}) => axios.get("/categories", { params }),
  createCategory: (data) => axios.post("/categories", data),
  updateCategory: (id, data) => axios.put(`/categories/${id}`, data),
  deleteCategory: (id) => axios.delete(`/categories/${id}`),
};

export const commentApi = {
  getAllComments: (params) => axios.get("/comments/admin/all", { params }),
  getPostComments: (postId, params) =>
    axios.get(`/comments/post/${postId}`, { params }),
  createComment: (data) => axios.post("/comments", data),
  updateComment: (id, data) => axios.put(`/comments/${id}`, data),
  deleteComment: (id) => axios.delete(`/comments/${id}`),
};

export const dashboardApi = {
  getStats: () => axios.get("/dashboard/stats"),
};
