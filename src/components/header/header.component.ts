import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentLanguage: string = 'ar';

  constructor(private translateService: TranslateService) {
    // تعيين اللغة الافتراضية للعربية
    this.translateService.setDefaultLang('ar');
    this.translateService.use('ar');
    
    // تعيين اتجاه الصفحة الافتراضي
    document.documentElement.dir = 'rtl';
  }

  changeLanguage(lang: string, event: Event) {
    // منع السلوك الافتراضي للرابط
    event.preventDefault();
    
    // تغيير اللغة
    this.currentLanguage = lang;
    this.translateService.use(lang);

    // تغيير اتجاه الصفحة
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }

    // إعادة تحميل أنماط CSS حسب اللغة
    this.updateStylesheets(lang);
  }

  // دالة لتحديث أنماط CSS
  private updateStylesheets(lang: string) {
    const stylesheetLink = document.getElementById('direction-stylesheet') as HTMLLinkElement;
    
    if (stylesheetLink) {
      if (lang === 'ar') {
        stylesheetLink.href = 'assets/css/bootstrap-rtl.min.css';
      } else {
        stylesheetLink.href = 'assets/css/bootstrap.min.css';
      }
    }
  }
}