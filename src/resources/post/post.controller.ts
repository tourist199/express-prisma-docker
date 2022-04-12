import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from '../../resources/post/post.validation';
import PostService from '../../resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}`, this.getPosts);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, content, published, authorId } = req.body;

            const post = await this.PostService.create({
                title,
                content,
                published,
                author: {
                    connect: { id: authorId },
                },
            });

            res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };

    private getPosts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const posts = await this.PostService.getPosts();

            res.status(200).json({ posts });
        } catch (error) {
            next(new HttpException(400, 'Cannot get posts'));
        }
    };
}

export default PostController;
