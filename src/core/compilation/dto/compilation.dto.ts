import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CompilationProductEntity } from 'src/core/compilation-product/compilation-product.entity';
import { MasterClassEntity } from 'src/core/master-class/master-class.entity';
import { PatternProductEntity } from 'src/core/pattern-product/pattern-product.entity';
import { PostEntity } from 'src/core/post/post.entity';
import { SewingProductEntity } from 'src/core/sewing-product/sewing-product.entity';

export class CompilationDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  compilationProducts: CompilationProductsDto[];
}

export class CompilationProductsDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsUUID('all')
  masterClassId: MasterClassEntity;

  @IsOptional()
  @IsUUID('all')
  patternProductId: PatternProductEntity;

  @IsOptional()
  @IsUUID('all')
  sewingProductId: SewingProductEntity;

  @IsOptional()
  @IsUUID('all')
  postId: PostEntity;
}
