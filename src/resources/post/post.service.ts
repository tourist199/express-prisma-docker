import { Prisma } from '@prisma/client';
import { prisma } from '../../prisma';

class PostService {
  /**
   * Create a new post
   */
  public async create(postInput: Prisma.PostCreateInput): Promise<Prisma.PostCreateInput> {
    try {
      const post = await prisma.post.create({
        data: postInput,
      });

      return post;
    } catch (error) {
      throw new Error('Unable to create post');
    }
  }

  /**
   * Get posts
   * @returns posts
   */
  public async getPosts() {
    try {
      const posts = await prisma.post.findMany();

      return posts;
    } catch (error) {
      throw new Error('Unable to create post');
    }
  }
}

export default PostService;
