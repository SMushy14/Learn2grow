export interface Teacher {
  _id: string;
  name: string;
  email: string;
}

export interface Course {
  _id: number;
  title: string;
  description: string;
  teacherId: Teacher;
  status: string;
  subject: string;
  language: string;
  contentUrls: string[];
}
