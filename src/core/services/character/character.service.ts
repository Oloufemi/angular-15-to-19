import { Injectable } from '@angular/core';
import {map, mergeMap, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Character} from "../../models/character";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  finalSpaceBaseUrl = 'https://finalspaceapi.com/api/v0/';
  constructor(private http: HttpClient) { }

  getCharacterInformation(characterName:string):Observable<Character> {
    let returnCharacter:Character =  {};
    return this.http.get<any>(`${this.finalSpaceBaseUrl}character/`).pipe(
      tap((allCharacters) => {
        const foundCharacter = allCharacters.filter((character:any) => {
        return character.name === characterName;
        })[0];
        if(foundCharacter){
        returnCharacter = {...returnCharacter,
          id:foundCharacter.id,
          name: characterName,
          gender:foundCharacter.gender,
          alias:foundCharacter.alias[0],
          imageUrl:foundCharacter.img_url,
          episodes:[],
          quotes:[],
          origin: foundCharacter.origin
          };
        }
      }),
      mergeMap(() => {
        return this.http.get<any>(`${this.finalSpaceBaseUrl}episode/`);
      }),
      tap((allEpisodes) => {
        allEpisodes.forEach((episode:any) => {
          episode.characters.forEach((character:any) => {
            const characterSplittedValues = character.split('/');
            const characterID = Number(characterSplittedValues[characterSplittedValues.length - 1]);
            if(characterID === returnCharacter.id){
              returnCharacter.episodes?.push(episode.name);
            }
          })
        });
        return returnCharacter;
      }),
      mergeMap(() => {
        return this.http.get<any>(`${this.finalSpaceBaseUrl}quote/`);
      }),
      map((quotes) => {
        quotes.forEach((quote:any) => {
          if(quote.by === characterName){
            returnCharacter.quotes?.push(quote.quote);
          }
        });
        return returnCharacter;
      })
    );
  }

}
