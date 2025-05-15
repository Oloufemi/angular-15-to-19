import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../core/services/league/league.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {League} from "../core/models/league";
import {Character} from "../core/models/character";
import {CharacterService} from "../core/services/character/character.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'test-major-migration';
  searchLeagueForm:FormGroup = this.fb.group({
    playerName:['', [Validators.required, Validators.minLength(5)]],
    playerTeamName:['', [Validators.required,Validators.minLength(4)]]
  });
  leaguesToDisplay:League[] = [];
  displayTable = false;
  displayedColumns: string[] = ['name', 'division', 'sport','logo'];
  errorMessage: string = '';
  searchCharacterForm:FormGroup = this.fb.group({
    characterName:['', Validators.required]
  });
  constructor(private leagueService:LeagueService,
              private fb:FormBuilder,
              private characterService:CharacterService)
  {}

  ngOnInit() {
  }
  searchLeagues():void {
    const player:string = this.searchLeagueForm.controls['playerName'].value;
    const team:string = this.searchLeagueForm.controls['playerTeamName'].value;
    this.leaguesToDisplay = [];
    this.leagueService.findPlayerLeagues(player,team).subscribe(
      (result:any) => {
        if(!result.code){
          this.errorMessage = '';
          this.leaguesToDisplay = [...result];
          this.isTableDisplayable();
        } else {
          this.displayTable = false;
          this.errorMessage = result.messageToDisplay;
        }
      }
    );
  }

  isTableDisplayable():void {
    this.displayTable = (this.searchLeagueForm.valid && this.searchLeagueForm.dirty && this.searchLeagueForm.touched) && (this.leaguesToDisplay.length > 0);
  }

  searchCharacter(){
    this.characterService.getCharacterInformation(this.searchCharacterForm.controls['characterName'].value).subscribe((result:Character) => {
      console.log(result);
    });
  }
}
