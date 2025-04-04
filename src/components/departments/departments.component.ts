import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgFor } from '@angular/common';

interface Department {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }
  loadDepartments(): void {
    this.translate.get([
      'DEPARTMENTS.ELECTRICAL_TOOLS.TITLE',
      'DEPARTMENTS.ELECTRICAL_TOOLS.DESCRIPTION',
      'DEPARTMENTS.SANITARY_TOOLS.TITLE',
      'DEPARTMENTS.SANITARY_TOOLS.DESCRIPTION',
      'DEPARTMENTS.CARPENTRY_LOCK_TOOLS.TITLE',
      'DEPARTMENTS.CARPENTRY_LOCK_TOOLS.DESCRIPTION',
      'DEPARTMENTS.PERFUMES_COSMETICS.TITLE',
      'DEPARTMENTS.PERFUMES_COSMETICS.DESCRIPTION'
    ]).subscribe(translations => {
      this.departments = [
        {
          id: 1,
          name: translations['DEPARTMENTS.ELECTRICAL_TOOLS.TITLE'],
          description: translations['DEPARTMENTS.ELECTRICAL_TOOLS.DESCRIPTION'],
          imageUrl: '../../assets/6012579058052876251.jpg'
        },
        {
          id: 2,
          name: translations['DEPARTMENTS.SANITARY_TOOLS.TITLE'],
          description: translations['DEPARTMENTS.SANITARY_TOOLS.DESCRIPTION'],
          imageUrl: '../../assets/6012579058052876252.jpg'
        },
        {
          id: 3,
          name: translations['DEPARTMENTS.CARPENTRY_LOCK_TOOLS.TITLE'],
          description: translations['DEPARTMENTS.CARPENTRY_LOCK_TOOLS.DESCRIPTION'],
          imageUrl: '../../assets/6012579058052876250.jpg'
        },
        {
          id: 4,
          name: translations['DEPARTMENTS.PERFUMES_COSMETICS.TITLE'],
          description: translations['DEPARTMENTS.PERFUMES_COSMETICS.DESCRIPTION'],
          imageUrl: '../../assets/6012579058052876249.jpg'
        }
      ];
    });
  }
  
  navigateToProducts(departmentId: number): void {
    this.router.navigate(['/products'], { queryParams: { departmentId } });
  }
}