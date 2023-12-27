import type { Comment } from "@/types"

export const sortComment = (comments: Comment[]):Comment[] => {
    // JUST USE FOR 2 DIMENSION COMMENTS
    
    let parentComments = comments.filter(comment => comment.parentId === null);
    
    let childComments = comments.filter(comment => comment.parentId);

    parentComments = parentComments.sort((a,b) => {
        const d1 = new Date(a.createTime).getTime();
        const d2 = new Date(b.createTime).getTime();

        return d1 - d2;
    })

    // sort child comments by parentId
    childComments.forEach(childComment => {
        const parentIndex = parentComments.findIndex(parentComment => parentComment.id === childComment.parentId);

        // +1 cause we want parent cm display before its child cms
        parentComments = [ ...parentComments.slice(0, parentIndex + 1), childComment, ...parentComments.slice(parentIndex + 1)];
    })

    // sort child comments by date
    parentComments = parentComments.sort((a,b) => {
        if( a.parentId === b.parentId) {
            const d1 = new Date(a.createTime).getTime();
            const d2 = new Date(b.createTime).getTime();
    
            return d1 - d2;
        }

        return 0;
    })

    return parentComments;
}