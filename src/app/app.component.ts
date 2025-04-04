import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component'; 
 import { HeaderComponent } from './../components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],

templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KUWAITI GULF';

  openWhatsAppChat() {
    const phoneNumber = '+96566160102'; 
    const message = ' مرحبا بك في الشركة الايطالية الكويتية لتجارةالجملة والتجزئة !'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
