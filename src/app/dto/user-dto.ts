import {Role} from "../model/role.enum";

export class UserDto {
  email:string;
  password:string;
  role:Role;
}
