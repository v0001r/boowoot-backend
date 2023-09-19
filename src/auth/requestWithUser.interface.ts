import { Request } from 'express';
import { AuthDocument } from './auth.entity';
 
interface RequestWithUser extends Request {
  user: AuthDocument;
}
 
export default RequestWithUser;