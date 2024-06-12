import { PostsRepository } from "../repositories/resumes.repository.js";

export class PostsService {
    postsRepository = new PostsRepository();

    createPost = async (title, content) => {
        const createdPost = await this.postsRepository.createPost(
            nickname, password, title, content
        )

        return {
            postId: createdPost.postId, 
            nickname: createdPost.nickname, 
            title: createdPost.title, 
            content: createdPost.content, 
            createdAt: createdPost.createdAt, 
            updatedAt: createdPost.updatedAt, 
        }
    }
    
    findAllPosts = async () => {
        const posts = await this.postsRepository.findAllPosts();

        posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return posts.map((posts) => {
            return {
                postId: posts.postId, 
                nickname: posts.nickname, 
                title: posts.title, 
                createdAt: posts.createdAt, 
                updatedAt: posts.updatedAt,
            }
        })
    }
}