import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../footer/footer.component';
import { CounterComponent } from '../counter/counter.component';
import { CategoriesComponent } from '../categories/categories.component';
import {DepartmentsComponent} from '../departments/departments.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    AboutComponent,
    FooterComponent,
    CounterComponent,
    CategoriesComponent,
    DepartmentsComponent,
    TranslateModule ,
    CommonModule // ✅ إضافة TranslateModule هنا
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit() {
    import('aos')
      .then((AOS: any) => {
        AOS.init();
      })
      .catch((error: any) => {
        console.error('Error loading AOS:', error);
      });
  }
}
