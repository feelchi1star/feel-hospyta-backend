import { IsMongoId } from 'class-validator';

export class BaseParam {
  @IsMongoId({ message: 'Provide a valid :paramsId' })
  id: string;
}
