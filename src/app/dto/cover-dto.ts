import {PhotoDto} from "./photo-dto";

export class CoverDto {
  id:number;
  photoDto:PhotoDto = new PhotoDto();
  dateOfUpload: Date;
  note:string;
}
