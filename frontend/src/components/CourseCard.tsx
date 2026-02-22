import { Course } from "../types/Course";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  // Generate a placeholder image based on subject
  const getPlaceholderImage = (subject: string) => {
    const imageMap: { [key: string]: string } = {
      Math: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=250&fit=crop",
      Science:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop",
      English:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
      Development:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      Design:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    };
    return (
      imageMap[subject] ||
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop"
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getPlaceholderImage(course.subject)}
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {course.subject}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {course.language}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-indigo-600 font-semibold text-sm">
              {course.teacherId.name.charAt(0)}
            </span>
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{course.teacherId.name}</span>
          </p>
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
