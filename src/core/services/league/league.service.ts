import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, map, mergeMap, Observable, toArray} from "rxjs";
import {League} from "../../models/league";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  baseUrl = 'https://www.thesportsdb.com//api/v1/json/3/';
  constructor(private http: HttpClient) {
  }

  getAllLeagues():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}all_leagues.php`);
  }

  findPlayerLeagues(playerName:string, playerTeamName:string):Observable<League[]> {
    return this.http.get<any>(`${this.baseUrl}searchplayers.php?p=${playerName}`).pipe(
      mergeMap((result) => {
        const foundPlayer = result.player.filter((player:any) => {
          return player.strTeam === playerTeamName;
        });
        return this.http.get<any>(`${this.baseUrl}searchteams.php?t=${foundPlayer[0].strTeam}`);
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
        return this.http.get<any>(`${this.baseUrl}lookupleague.php?id=${leagueID}`);
        }
      ),
      toArray(),
      map((result:any[]) => {
        return result.map((league) => this.fromAnyToLeague(league.leagues[0]));
      })
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

