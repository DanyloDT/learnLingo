export type Thema = 'themaA' | 'themaB' | 'themaC' | 'themaD' | 'themaF';

export interface SearchParams {
  languages?: string;
  level?: string;
  price?: string;
  page?: string;
  attention?: string;
  trial?: string;
  registration?: string;
  login?: string;
  logout?: string;
  id?: string;
}

export interface RegisterParamsApi {
  name: string;
  email: string;
  password: string;
}
export interface LoginParamsApi {
  email: string;
  password: string;
}

export interface UserData {
  name: string | null;
  email: string | null;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: {
    [key: string]: boolean;
  };
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
  favorite: boolean;
}

export interface BookFormValues {
  picked: string;
  name: string;
  email: string;
  phone: string;
}

export interface TeacherAvatarProps {
  name: string;
  surname: string;
  avatarUrl: string;
  status?: Thema;
}

export interface BookTrialProps {
  name: string;
  surname: string;
  avatarUrl: string;
  teacherId: string;
}
