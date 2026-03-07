import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";
import { Course } from "../types/Course";

describe("CourseCard", () => {
  const mockCourse: Course = {
    _id: "1",
    title: "Introduction to React",
    description:
      "Learn the basics of React including components, props, and state",
    teacherId: {
      _id: "teacher1",
      name: "John Doe",
      email: "john@example.com",
    },
    status: "approved",
    subject: "Development",
    language: "English",
    contentUrls: ["https://example.com/course1"],
  };

  test("renders course title", () => {
    render(<CourseCard course={mockCourse} />);
    const titleElement = screen.getByText("Introduction to React");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders course description", () => {
    render(<CourseCard course={mockCourse} />);
    const descriptionElement = screen.getByText(/Learn the basics of React/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders teacher name", () => {
    render(<CourseCard course={mockCourse} />);
    const teacherName = screen.getByText("John Doe");
    expect(teacherName).toBeInTheDocument();
  });

  test("renders subject badge", () => {
    render(<CourseCard course={mockCourse} />);
    const subjectBadge = screen.getByText("Development");
    expect(subjectBadge).toBeInTheDocument();
  });

  test("renders language badge", () => {
    render(<CourseCard course={mockCourse} />);
    const languageBadge = screen.getByText("English");
    expect(languageBadge).toBeInTheDocument();
  });

  test("renders enroll button", () => {
    render(<CourseCard course={mockCourse} />);
    const enrollButton = screen.getByRole("button", { name: /enroll now/i });
    expect(enrollButton).toBeInTheDocument();
  });

  test("displays teacher initial in avatar", () => {
    render(<CourseCard course={mockCourse} />);
    const initial = screen.getByText("J");
    expect(initial).toBeInTheDocument();
  });
});
