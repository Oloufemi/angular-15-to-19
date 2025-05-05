import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../core/services/league/league.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'test-major-migration';
  constructor(private leagueService:LeagueService) {
  }

  ngOnInit() {
    this.leagueService.findPlayerLeagues('Bukayo_Saka','Arsenal').subscribe((result:any) => {
      console.log(result);
    });
  }
}
