import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEmail()
  correo!: string;

  @IsString()
  @IsNotEmpty()
  cargo!: string;

  @IsInt()
  departamentoId!: number;
}