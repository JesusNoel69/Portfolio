import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FadeInDirective } from '../directives/fade-in.directive';
import { animate, style, transition, trigger } from '@angular/animations';
import { PillComponent } from '../pill/pill.component';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgClass, 
    FormsModule,
    FadeInDirective,
    PillComponent
  ],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('700ms', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  slides1 = [
    { src: 'https://raw.githubusercontent.com/JesusNoel69/Images-for-projects/master/portfolio-data/fibonnacci-serie-example.png', alt: 'Serie Fibonacci hecha en LadonLang' },
    { src: 'https://raw.githubusercontent.com/JesusNoel69/Images-for-projects/master/portfolio-data/Factorial-number-example.png', alt: 'Factorial de un número hecho en LadonLang' }
  ];

  slides2 = [
    { src: 'https://raw.githubusercontent.com/JesusNoel69/Images-for-projects/master/portfolio-data/neural-network-first.png', alt: 'Primeras epocas de la red neuronal al entrenarla para predecir un and' },
    { src: 'https://raw.githubusercontent.com/JesusNoel69/Images-for-projects/master/portfolio-data/neural-network-last.png', alt: 'Ultima epoca de la red neuronal al entrenarla para predecir un and' }
  ];

  currentSlide1 = 0;
  currentSlide2 = 0;

  prevSlide(slideIndex: number): void {
    if (slideIndex === 1) {
      this.currentSlide1 = (this.currentSlide1 - 1 + this.slides1.length) % this.slides1.length;
    } else if (slideIndex === 2) {
      this.currentSlide2 = (this.currentSlide2 - 1 + this.slides2.length) % this.slides2.length;
    }
  }

  nextSlide(slideIndex: number): void {
    if (slideIndex === 1) {
      this.currentSlide1 = (this.currentSlide1 + 1) % this.slides1.length;
    } else if (slideIndex === 2) {
      this.currentSlide2 = (this.currentSlide2 + 1) % this.slides2.length;
    }
  }
}
