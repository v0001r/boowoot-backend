import { PartialType } from '@nestjs/mapped-types';
import { CreateBookSessionDto } from './create-book-session.dto';

export class UpdateBookSessionDto extends PartialType(CreateBookSessionDto) {}
