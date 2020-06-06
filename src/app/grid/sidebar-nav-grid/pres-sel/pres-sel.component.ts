import { Component, OnInit } from '@angular/core';
import { QueryGridService } from '../../query-grid.service'
import { GridMeta } from '../../../../typeings/grids'
import { SelectGridService } from '../../select-grid.service';

export interface PressureLevels {
  value: number;
}

@Component({
  selector: 'app-pres-sel',
  templateUrl: './pres-sel.component.html',
  styleUrls: ['./pres-sel.component.css'],
})
export class PresSelComponent implements OnInit {
  public presLevels: PressureLevels[]
  public presArray: number[]
  public presLevel: number;
  
  constructor(private queryGridService: QueryGridService,
              private selectGridService: SelectGridService) { }

  ngOnInit() { 
    this.presLevel = this.queryGridService.getPresLevel()
    this.makePressureLevels()

    this.queryGridService.resetToStart.subscribe((msg) => {
      this.presLevel = this.queryGridService.getPresLevel()
    })
  }

  public makePressureLevels(): void {
    let presLevels = []
    this.selectGridService.getGridMeta(this.queryGridService.getGrid())
      .subscribe((gridMeta: GridMeta[]) => {
        this.presArray = gridMeta[0]['presLevels']
        this.presArray.sort(function(a, b){return a-b})
        for (let idx=0; idx < this.presArray.length; ++idx) {
          presLevels.push({value: this.presArray[idx]})
        }
      })
    
    this.presLevels = presLevels
  }

  public incrementLevel(increment: number): void {
    const idx = this.presArray.indexOf(this.presLevel)
    const inc = idx + increment
    if( inc >= 0 && inc < this.presLevels.length) {
      this.presLevel = this.presLevels[inc].value
      this.sendPresLevel()
    }

  }

  public sendPresLevel(): void {
    const broadcastChange = true
    if (this.presLevel !== this.queryGridService.getPresLevel()){
      this.queryGridService.sendPres(this.presLevel, broadcastChange)
    }
  } 

  public selChange(newPres: number ): void {
    this.presLevel = newPres
    console.log(this.presLevel)
    this.sendPresLevel();
  }

}
