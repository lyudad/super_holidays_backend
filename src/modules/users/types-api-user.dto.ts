import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'models/users.model';
import { Status, VacationType } from 'models/booking.model';

export class CreateUserDtoResponse {
  @ApiProperty({ example: 'Ivan', description: 'First name' })
  first_name: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last name' })
  last_name: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'email' })
  email: string;

  @ApiProperty({ example: 'super', description: 'user role' })
  roles: Role;

  @ApiProperty({ example: 5, description: 'Total sick lives' })
  total_sick_leaves: number;

  @ApiProperty({ example: 15, description: 'Total vacations' })
  total_vacations: number;

  @ApiProperty({ example: false, description: 'is blocked' })
  isBlocked: boolean;

  @ApiProperty({ example: 1, description: 'id' })
  id: number;
}

class GetAllUserResponseDates {
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;
  @ApiProperty({ example: 'Fri Dec 03 2021', description: 'Start day' })
  start_day: string;
  @ApiProperty({ example: 'Sun Dec 05 2021', description: 'End day' })
  end_day: string;
  @ApiProperty({ example: 'vacation', description: 'Type action' })
  type: VacationType;
  @ApiProperty({ example: 'rejected', description: 'Status action' })
  status: Status;
  @ApiProperty({ example: 1, description: 'User id' })
  userId: number;
}

export class GetAllUserResponse {
  @ApiProperty({ example: 'Ivan', description: 'First name' })
  first_name: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last name' })
  last_name: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'email' })
  email: string;

  @ApiProperty({ example: 'super', description: 'user role' })
  roles: Role;

  @ApiProperty({ example: 5, description: 'Total sick lives' })
  total_sick_leaves: number;

  @ApiProperty({ example: 15, description: 'Total vacations' })
  total_vacations: number;

  @ApiProperty({ example: false, description: 'is blocked' })
  isBlocked: boolean;

  @ApiProperty({ example: 1, description: 'id' })
  id: number;

  @ApiProperty()
  dates: GetAllUserResponseDates;
}
