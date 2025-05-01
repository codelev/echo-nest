import { Controller, All, Req } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';

@Controller('rest')
export class RestController {
  @All('echo')
  async echo(@Req() request: Request): Promise<string> {
    const method = request.method;
    const uri = request.originalUrl;
    const protocol = request.protocol;
    const version = request.httpVersion;

    let rawRequest = `${method} ${uri} ${protocol}/${version}\n`;
    for (const [headerName, headerValue] of Object.entries(request.headers)) {
      rawRequest += `${headerName}: ${headerValue}\n`;
    }

    const sha1 = crypto.createHash('sha1');
    if (request.readable) {
      await new Promise<void>((resolve, reject) => {
        request.on('data', (chunk) => sha1.update(chunk));
        request.on('end', resolve);
        request.on('error', reject);
      });
    }
    const hash = sha1.digest('hex');
    rawRequest += `${hash}\n`;

    return rawRequest;
  }
}
