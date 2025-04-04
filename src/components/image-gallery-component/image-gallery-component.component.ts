import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-gallery-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery-component.component.html',
  styleUrl: './image-gallery-component.component.css'
})
export class ImageGalleryComponentComponent {
  selectedImage!: string;
  selectedImageIndex! : number;

  images = [
    { url: '../../assets/decorate/IMG-20240612-WA0004.jpg' },
    { url: '../../assets/decorate/IMG-20240612-WA0005.jpg' },
    { url: '../../assets/decorate/IMG-20240612-WA0006.jpg' },
    { url: '../../assets/decorate/IMG-20240612-WA0007.jpg' },
    { url: '../../assets/decorate/IMG-20240612-WA0008.jpg' },


  ];

  selectImage(imageUrl: string, index: number) {
    this.selectedImage = imageUrl;
    this.selectedImageIndex = index;
  }

}
