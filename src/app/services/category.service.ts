import { Injectable } from '@angular/core';
import { Category } from '../entities/category';

@Injectable()
export class CategoryService {

  private categories=[{
    name: "cat 1"
  },
  {
    name: "Category 2"
  }
];

  constructor() { }

  fetchCategories(): Category[]{
    return this.categories;
  }
}
