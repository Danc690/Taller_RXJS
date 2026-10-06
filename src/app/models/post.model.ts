import { CommentModel } from './comment.model';

export interface PostModel {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags?: string[];
    reactions: {
        likes: number;
        dislikes: number;
    } | any;
    views?: number;
    comments?: CommentModel[];
}
