import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';

interface SlideInterface {
  image: string;
  text: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    NgxTypedWriterModule,
    TranslateModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, AfterViewChecked, OnDestroy {
  slides: SlideInterface[] = [];
  typeSpeed: number = 50;
  backSpeed: number = 50;
  loop: boolean = true;

  constructor(private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(() => {
      this.updateSlides();
    });
  }

  ngOnInit() {
    AOS.init({ duration: 1200 });
    this.updateSlides();
  }

  ngAfterViewChecked(): void {
    AOS.refresh();
  }

  ngOnDestroy(): void {}

  goToNextSlide() {
    const carousel = document.getElementById('header-carousel');
    if (carousel) {
      const nextButton = carousel.querySelector('.carousel-control-next') as HTMLButtonElement;
      if (nextButton) {
        setTimeout(() => {
          nextButton.click();
        }, 1000); // تأخير بسيط قبل الانتقال
      }
    }
  }

  private updateSlides() {
    this.translateService.get(['SLIDER.STRINGS', 'SLIDER.IMAGES']).subscribe({
      next: (translations: any) => {
        const texts = Array.isArray(translations['SLIDER.STRINGS']) 
          ? translations['SLIDER.STRINGS'] 
          : [translations['SLIDER.STRINGS']];
        
        const images = Array.isArray(translations['SLIDER.IMAGES']) 
          ? translations['SLIDER.IMAGES'] 
          : ['../../assets/tower.jpg'];

        this.slides = texts.map((text: string, index: number) => ({
          text: text,
          image: images[index] || images[0] || '../../assets/tower.jpg'
        }));

        if (this.slides.length === 0) {
          this.slides = [{
            text: 'Default Slide Text',
            image: '../../assets/tower.jpg'
          }];
        }

        console.log('Slides:', this.slides);
      },
      error: (err) => {
        console.error('Translation Error:', err);
        this.slides = [{
          text: 'Default Slide Text',
          image: '../../assets/tower.jpg'
        }];
      }
    });
  }
}
