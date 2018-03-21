import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../entities/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  get categories(): any {
    return this.categoryService.fetchCategories();
  }
}
