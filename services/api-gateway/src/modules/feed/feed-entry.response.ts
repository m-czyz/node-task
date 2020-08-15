import { IFeedEntry } from './feed-entry.interface';
import { ApiProperty } from '@nestjs/swagger';

export class FeedEntryResponse implements IFeedEntry {
  @ApiProperty({ description: 'Post id' })
  postId: string;

  @ApiProperty({ description: 'Post image link' })
  imageUrl: string;
}