import { IsOptional, IsString } from 'class-validator';
import { BaseQueryApiFeaturesDTO } from 'src/common/utils/apiFeatures';

export class PostQuertyDTO extends BaseQueryApiFeaturesDTO {
  @IsOptional()
  category: any;
}
