import { Component } from '@angular/core';
import { NgxCountAnimationModule } from 'ngx-count-animation';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [NgxCountAnimationModule, TranslateModule], // ✅ أضف TranslateModule هنا
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  constructor(public translate: TranslateService) {}
}
