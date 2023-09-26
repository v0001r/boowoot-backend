import { Request } from 'express';
import { AuthDocument } from '../entities/auth.entity';
 
interface RequestWithUser extends Request {
  user: AuthDocument;
}
 
export default RequestWithUser;