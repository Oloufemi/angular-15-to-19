import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../core/services/league/league.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {League} from "../core/models/league";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'test-major-migration';
  searchForm:FormGroup = this.fb.group({
    playerName:['', [Validators.required, Validators.minLength(5)]],
    playerTeamName:['', [Validators.required,Validators.minLength(4)]]
  });
  leaguesToDisplay:League[] = [];
  displayTable = false;
  displayedColumns: string[] = ['name', 'division', 'sport','logo'];
  constructor(private leagueService:LeagueService, private fb:FormBuilder) {
  }

  searchLeagues():void {
    const player:string = this.searchForm.controls['playerName'].value;
    const team:string = this.searchForm.controls['playerTeamName'].value;
    this.leaguesToDisplay = [];
    this.leagueService.findPlayerLeagues(player,team).subscribe((result:any) => {
      //console.log(result);
      this.leaguesToDisplay = [...result];
      this.isTableDisplayable();
    });
  }

  isTableDisplayable():void {
    this.displayTable = (this.searchForm.valid && this.searchForm.dirty && this.searchForm.touched) && (this.leaguesToDisplay.length > 0);
  }
}
