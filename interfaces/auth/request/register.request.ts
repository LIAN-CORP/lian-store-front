export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string | Date;
  password: string;
}
