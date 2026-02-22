import { Course } from "../types/Course";

const BASE_URL = "http://localhost:5000/api";

export const courseApi = {
  // Get all approved courses
  getAllCourses: async (filters?: {
    subject?: string;
    language?: string;
  }): Promise<Course[]> => {
    try {
      let url = `${BASE_URL}/courses`;
      const params = new URLSearchParams();

      if (filters?.subject) {
        params.append("subject", filters.subject);
      }
      if (filters?.language) {
        params.append("language", filters.language);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },
};
