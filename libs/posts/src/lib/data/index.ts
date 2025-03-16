import { type CommentCreateDto, type Post, type PostComment, type PostCreateDto } from './interfaces/post.interface';
import { PostService } from './services/post.service';

export * from './store';
export { PostService, type PostCreateDto, type Post, type PostComment, type CommentCreateDto };
