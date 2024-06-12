import { PostsService } from '../services/resumes.service.js';

export class ResumesController {
    postsService = new PostsService();

    createPost = async (req, res, next) => {
        try {
            const { title, introduce } = req.body;

            const createdPost = await this.postsService.createPost(
                title, introduce
            )

            return res.status(201).json({data: createdPost})
        } catch (error) {
            next(error);
        }
    };

    getPosts = async (req, res, next) => {
        try {
            const posts = await postsService.findAllPosts();

            return res.status(200).json({ data: posts })
        } catch (error) {
            next(error);
        }
    };
}

// create resume
// router.post('/post', resumeCreateValidator, async (req, res, next) => {
//     try {
//       const UserId = req.userId;
  
//       const { title, introduce } = req.body;
  
//       if (!UserId) {
//         return res.status(400).json({ error: 'User ID not provided' });
//       }
  
//       const resumeCreate = await prisma.resume.create({
//         data: {
//           UserId,
//           title,
//           introduce,
//         },
//       });
  
//       return res.status(201).json({
//         UserId: resumeCreate.UserId,
//         resumeId: resumeCreate.resumeId,
//         title: resumeCreate.title,
//         introduce: resumeCreate.introduce,
//         applicationStatus: resumeCreate.applicationStatus,
//         createdAt: resumeCreate.createdAt,
//         updatedAt: resumeCreate.updatedAt,
//       });
//     } catch (error) {
//       if (error.isJoi) {
//         return res.status(400).json({ error: error.details[0].message });
//       }
//       next(error);
//     }
//   });