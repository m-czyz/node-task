import { Entity, Column } from '@iaminfinity/express-cassandra';

@Entity({
  table_name: 'user_latest_feed_fetch',
  key: ['userId'],
})
export class UserLatestFeedFetch {
  @Column({
    type: 'text',
  })
  userId: string;

  @Column({
    type: 'timestamp',
  })
  fetchAt: Date;
}