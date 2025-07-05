import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export function validateSchema(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
    //   // Check if request body exists
    //   if (!req.body || Object.keys(req.body).length === 0) {
    //     res.status(400).json({ 
    //       error: 'Invalid data', 
    //       details: [{ body: 'Request body is required' }] 
    //     });
    //   }
      
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => {
          const path = issue.path.join('.') || 'body';
          return {
            [path]: issue.message,
          };
        });
        res.status(400).json({ success: false, data: {}, error: errorMessages });
      } else {
        res.status(500).json({ success: false, data: {}, error: "Unknown error." });
      }
    }
  };
}