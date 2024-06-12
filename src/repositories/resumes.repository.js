import { prisma } from '../utils/prisma.util.js';

export class PostsRepository {
    findAllPosts = async () => {
        const posts = await prisma.posts.findMany();

        return posts;
    }

    createPost = async (nickname, password, title, content) => {
        const createdPost = await prisma.posts.create({
            data: {
                nickname, password, title, content,
            }
        });
        return createdPost
    }
}