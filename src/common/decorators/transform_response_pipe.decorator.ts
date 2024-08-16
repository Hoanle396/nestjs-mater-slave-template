import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

/**
 * @description This Pipe transforms the response object keys from snake_case to camelCase.
 * @example
 * // Usage in a controller
 * @Get()
 * @UsePipes(new TransformResponsePipe())
 * async findOne(): UserEntity {
 *   return await this.userService.findOne();
 * }
 */
@Injectable()
export class TransformResponsePipe implements PipeTransform {
  async transform(value: any) {
    if (value instanceof Array) {
      return value.map(item => this.transformObject(item));
    }
    return this.transformObject(value);
  }

  transformObject(obj: any) {
    const transformedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const [prefix, property] = key.split('_');
        if (!transformedObj[prefix]) {
          transformedObj[prefix] = {};
        }
        const newKey = this.snakeToCamel(property);
        transformedObj[prefix][newKey] = obj[key];
      }
    }
    return transformedObj;
  }

  snakeToCamel(s: string) {
    return s.replace(/(_\w)/g, m => m[1].toUpperCase());
  }
}
