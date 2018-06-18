import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  hints = [
    { name: 'Fisioterapia', url: 'fisioterapia' },
    { name: 'Exame de sangue', url: 'exame-de-sangue' },
    { name: 'Mamografia', url: 'mamografia' }
  ];

  ngOnInit() {

  }
}
