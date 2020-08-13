import { FeedEntry } from '../feed-entry/feed-entry';

export class UserFeedEntryResponse {
  postId: string;
  imageUrl: string;

  static fromModel({ postId, imageUrl }: FeedEntry): UserFeedEntryResponse {
    return {
      postId: postId.toString(),
      imageUrl,
    };
  }

  static fromMany(feedEntries: FeedEntry[]): UserFeedEntryResponse[] {
    return feedEntries.map(entry => UserFeedEntryResponse.fromModel(entry));
  }
}