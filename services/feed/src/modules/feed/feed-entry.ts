import { Entity, Column } from '@iaminfinity/express-cassandra';
import { types } from 'cassandra-driver';

@Entity({
  table_name: 'feed_entry',
  key: ['userId', 'createdAt'],
  clustering_order: {
    createdAt: 'desc',
  },
})
export class FeedEntry {
  @Column({
    type: 'text',
  })
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
    type: 'timeuuid',
  })
  createdAt: types.TimeUuid;
}
