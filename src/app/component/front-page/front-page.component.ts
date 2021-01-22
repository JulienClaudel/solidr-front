import { Component, OnInit } from '@angular/core';


/* Parallax controll for Front-Page:  */

function SolidR() {
const parallax = document.getElementById('parallax');

window.addEventListener('scroll', function() {
  const offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.2 + 'px'; } );
}

/* END of Parallax controll*/

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
