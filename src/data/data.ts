import type { Post, Comment, User, FakeUser } from "@/types/types";
import Ava from "../assets/image/users/Ava.jpeg";
import OldMan from "../assets/image/users/old-man.jpeg";

export const currentUser: User = {
    user_id: 1, 
    ava_img: Ava ,
    tag_name: ''
}

export const data: Post[] = [
    {
        post_id: 1,
        poster: {
            user_id: 1,
            ava_img: Ava,
            tag_name: '@Golanginya',
        },
        create_time: '5 phút trước',
        title: 'How to patch KDE on FreeBSD?',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
        reaction: {
            like: 14,
            dislike: 5,
            total: 9,
        },
        tags: 'healthy,food, education',
        views: 125,
        comments: 15,
    },
    {
        post_id: 2,
        poster: {
            user_id: 2,
            ava_img: OldMan,
            tag_name: '@morgenshtern',
        },
        create_time: '5 phút trước',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.",
        reaction: {
            like: 24,
            dislike: 10,
            total: 14,
        },
        tags: 'healthy,food, education',
        views: 100,
        comments: 25,
    },
    {
        post_id: 3,
        poster: {
            user_id: 1,
            ava_img: Ava,
            tag_name: '@Golanginya',
        },
        create_time: '5 phút trước',
        title: 'How to patch KDE on FreeBSD?',
        content: 'Mi ac id faucibus laoreet. Nulla quis in interdum imperdiet. Lacus mollis massa netus.',
        reaction: {
            like: 20,
            dislike: 4,
            total: 16,
        },
        tags: 'healthy,food, education',
        views: 25,
        comments: 1,
    },
    {
        post_id: 4,
        poster: {
            user_id: 3,
            ava_img: OldMan,
            tag_name: '@Gaolanginy',
        },
        create_time: '5 phút trước',
        title: 'Mi magna sed nec nisl mattis. Magna cursus tincidunt rhoncus imperdiet fermentum pretium, pharetra nisl. Euismod.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
        reaction: {
            like: 14,
            dislike: 5,
            total: 9,
        },
        tags: 'healthy,food, education',
        views: 125,
        comments: 15,
    },

]

export const comments: Comment[] = [
    {
        comment_id: 1,
        post_id: 1,
        commenter: {
            user_id: 1,
            ava_img: Ava,
            tag_name: '@Golanginya',
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.',
        reaction: {
            like: 12,
            dislike: 3,
            total: 9,
        },
        sub_comments: [
            {
                commenter: {
                    user_id: 3,
                    ava_img: '',
                    tag_name: '@lazyReplyer',
                },
                content: '@unkind, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.',
                parent_id: 1,
                create_time: '2023-12-12',
            },
            {
                commenter: {
                    user_id: 3,
                    ava_img: '',
                    tag_name: '@lazyReplyer',
                },
                content: '@unkind, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.',
                parent_id: 1,
                create_time: '2023-12-13',
            },
        ],
        parent_id: null,
        create_time: '2023-12-11',
    },
    {
        comment_id: 2,
        post_id: 1,
        commenter: {
            user_id: 2,
            ava_img: OldMan,
            tag_name: '@morgenshtern',
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.',
        reaction: {
            like: 26,
            dislike: 10,
            total: 16,
        },
        sub_comments: [
            {
                commenter: {
                    user_id: 1,
                    ava_img: '',
                    tag_name: '@Golanginya',
                },
                content: '@unkind, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.',
                parent_id: 2,
                create_time: '2023-12-16',
            },
        ],
        parent_id: null,
        create_time: '2023-12-13',
    },
]

export const fakeUsers: FakeUser[] = [
    {
        user_id: 1, 
        ava_img: Ava ,
        tag_name: '@Golanginya',
        // password: 'ava123456',
        username: 'Golanginya',
        // email: 'Golanginya@gmail.com'
    },
    {
        user_id: 2, 
        ava_img: OldMan ,
        tag_name: '@morgenshtern',
        // password: 'oldman123456',
        username: 'morgenshtern',
        // email: 'morgenshtern@hotmail.com'
    },
    {
        user_id: 3, 
        ava_img: OldMan ,
        tag_name: '@lazyReplyer',
        // password: 'lazy123456',
        username: 'lazyReplyer',
        // email: 'lazyReplyer@yahoo.com'
    },
]