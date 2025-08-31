import { Response } from 'express';

function DefaultResponse(res: Response, status: number, msg: any, metadata?: any): void {
  let response: object = {};
  if (status === 200) {
    response = { success: true, code: status, result: msg, metadata: metadata };
  } else {
    response = { success: false, code: status, error: msg, metadata: metadata };
  }
  res.status(status).send(response);
}

export default DefaultResponse;
