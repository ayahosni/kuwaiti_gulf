import { Component, HostListener, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgxTypedWriterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    AOS.init();
  }
}
