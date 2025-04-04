import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, TranslateModule], // إضافة TranslateModule هنا
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  services: any[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadServices();
    });

    this.loadServices();
  }

  loadServices(): void {
    this.translate.get('SERVICES_LIST').subscribe((data: any) => {
      if (data) {
        this.services = data;
      }
    });
  }
}
