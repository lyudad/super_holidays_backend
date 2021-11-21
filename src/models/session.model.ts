import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SessionCreate {
  uid: string;
}

@Table({ tableName: 'session' })
export class Session extends Model<SessionCreate> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uid: string;
}
