import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, from, map, mergeMap, Observable, of, throwError, toArray} from "rxjs";
import {League} from "../../models/league";
import {ErrorsHandler} from "../../models/errors-handler";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  sportsBaseUrl = 'https://www.thesportsdb.com//api/v1/json/3/';
  constructor(private http: HttpClient) {
  }

  findPlayerLeagues(playerName:string, playerTeamName:string):Observable<League[]|ErrorsHandler> {
    return this.http.get<any>(`${this.sportsBaseUrl}searchplayers.php?p=${playerName}`).pipe(
      mergeMap((result) => {
        const foundPlayer = result.player.filter((player:any) => {
          return player.strTeam === playerTeamName;
        });
        return this.http.get<any>(`${this.sportsBaseUrl}searchteams.php?t=${foundPlayer[0].strTeam}`);
      }),
      map((resultWithTeams) => {
        const foundTeam = resultWithTeams.teams[0];
        let allLeaguesId:string[] = [];
        for (let i = 0; i <= 7; i++) {
          if(i === 0 && foundTeam['idLeague']){
            allLeaguesId.push(foundTeam['idLeague']);
          }
          if(foundTeam[`idLeague${i}`]){
            allLeaguesId.push(foundTeam[`idLeague${i}`]);
          }
        }
        return allLeaguesId;
      }),
      mergeMap((leaguesID:string[]) => from(leaguesID)),
      mergeMap((leagueID:string) => {
        return this.http.get<any>(`${this.sportsBaseUrl}lookupleague.php?id=${leagueID}`);
        }
      ),
      toArray(),
      map((result:any[]) => {
        return result.map((league) => this.fromAnyToLeague(league.leagues[0]));
      }),
      catchError((err) => {
        const errorMessageValue:string = err.toString();
        if(errorMessageValue.includes('Cannot read properties of null (reading \'filter\')') || errorMessageValue.includes('Cannot read properties of undefined (reading \'strTeam\')')){
          const error: ErrorsHandler = {
            code:1,
            messageToDisplay:'There is no player matching that name in the team.Either player name or team name is incorrect'
          };
          return of(error);
        } else {
          return throwError(err);
        }
      }),
    );
  }

  fromAnyToLeague(league:any):League {
    return {
      id:league.idLeague,
      name:league.strLeague,
      logoUrl:league.strLogo,
      description:league.strDescriptionEN,
      division: league.intDivision,
      sport: league.strSport,
      websiteUrl: league.strWebsite
    }
  }


}

