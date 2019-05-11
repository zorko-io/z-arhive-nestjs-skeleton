import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): string {
    this.cats.push(cat);
    return String(this.cats.length - 1);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
