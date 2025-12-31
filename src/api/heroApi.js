import api from "./api";

export const fetchHeroSlides = async () => {
  const res = await api.get("/hero");
  return res.data;
};

export const createHeroSlide = async (formData) => {
  return api.post("/hero", formData);
};

export const deleteHeroSlide = async (id) => {
  return api.delete(`/hero/${id}`);
};

export const fetchTestimonials = async () => {
  const res = await api.get("/testimonials");
  return res.data;
};

export const createTestimonial = (data) =>
  api.post("/testimonials", data);

export const deleteTestimonial = (id) =>
  api.delete(`/testimonials/${id}`);

export const fetchTeam = async () => {
  const res = await api.get("/team");
  return res.data;
};

export const createTeamMember = (data) =>
  api.post("/team", data);

export const deleteTeamMember = (id) =>
  api.delete(`/team/${id}`);

export const fetchInquiries = async () => {
  const res = await api.get("/inquiries");
  return res.data;
};

export const updateInquiryStatus = (id, status) =>
  api.put(`/inquiries/${id}`, { status });


export const getBlogs = async () => {
  const response = await api.get("/blogs");
  return response.data; 
};

export const createBlog = async (formData) => {
  return api.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteBlog = async (id) => {
  return api.delete(`/blogs/${id}`);
};

export const getSocialLinks = async () => {
  const res = await api.get("/settings/social-links");
  return res.data;
};

// UPDATE SOCIAL LINKS
export const updateSocialLinks = async (data) => {
  const res = await api.put("/settings/social-links", data);
  return res.data;
};