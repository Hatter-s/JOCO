export interface Reaction {
    like: number;
    dislike: number;
    total: number;
}

export interface SelfReaction {
    id: number,
    userId: number,
    reactionId: number,
    entityReactionId: number,
    isPost: boolean,
    isLike: boolean | null,
}
export interface ChangedSelfReaction {
    userId: number;
    // entityId can be postId or commentId
    entityId:number;
    reactionId: number;
    isLike: boolean | null;
    isPost: boolean,
}