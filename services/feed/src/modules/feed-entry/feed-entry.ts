import {
  Entity,
  Column,
  CreateDateColumn, IndexColumn
} from "@iaminfinity/express-cassandra";
import { types } from 'cassandra-driver';

@Entity({
  table_name: 'feed_entry',
  key: ['id'],
})
export class FeedEntry {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: types.Uuid;

  @Column({
    type: 'text',
  })
  @IndexColumn()
  userId: string;

  @Column({
    type: 'uuid',
  })
  postId: types.Uuid;

  @Column({
    type: 'text',
  })
  imageUrl: string;

  @Column({
    type: 'text',
  })
  creatorId: string;

  @Column({
    type: 'timestamp',
  })
  seenAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;
}