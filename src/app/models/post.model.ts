export interface PostModel {
    id: number;
    title: string;
    body: string;
    userId: number;
    reactions: {
        likes: number;
        dislikes: number;
    };
}
