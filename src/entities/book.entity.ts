import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum VacationType {
  SICK_LEAVE = 'sick_leave',
  VACATION = 'vacation',
}

enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_day: string;

  @Column()
  end_day: string;

  @Column({
    type: 'enum',
    enum: VacationType,
    default: VacationType.VACATION,
  })
  type: VacationType;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;
}
