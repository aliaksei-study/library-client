import {PhotoDto} from "./photo-dto";

export class CoverDto {
  private id:number;
  private photoDto:PhotoDto = new PhotoDto();
  private dateOfUpload: Date;
  private note:string;
}
