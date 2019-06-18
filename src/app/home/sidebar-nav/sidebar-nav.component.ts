import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from '../services/query.service'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';

export interface Projections {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})

export class SidebarNavComponent implements OnInit {

  private date = new FormControl(new Date());

  constructor(private queryService: QueryService ) { }

  @Input() includeRT = true;
  @Input() onlyBGC = false;
  @Input() onlyDeep = false;
  @Input() display3Day = true;
  @Input() proj = 'WM';

  ngOnInit() {
    this.queryService.sendRealtimeMsg(this.includeRT)
    this.proj = this.queryService.getProj()
    const date = this.queryService.getGlobalDisplayDate()
    const yd = new Date(date)
    this.date = new FormControl(yd)

    this.queryService.urlBuild
    .subscribe(msg => {
      //toggle if states have changed    
      this.includeRT = this.queryService.getRealtimeToggle()
      this.onlyBGC = this.queryService.getBGCToggle()
      this.onlyDeep = this.queryService.getDeepToggle()

      this.display3Day = this.queryService.getThreeDayToggle()
      this.proj = this.queryService.getProj()

      var displayDate = new Date(this.queryService.getGlobalDisplayDate())
      displayDate.setDate(displayDate.getDate())
      displayDate.setMinutes( displayDate.getMinutes() + displayDate.getTimezoneOffset() );
      this.date = new FormControl(displayDate)
    })
  }

  realtimeChange(event: any): void {
    this.includeRT = event.checked
    this.queryService.sendRealtimeMsg(this.includeRT);
  }

  displayGlobalChange(event: any): void {
    this.display3Day = event.checked
    this.queryService.sendThreeDayMsg(this.display3Day);
  }

  bgcChange(event: any): void {
    this.onlyBGC = event.checked
    this.queryService.sendBGCToggleMsg(this.onlyBGC);
  }

  deepChange(event: any): void {
    this.onlyDeep = event.checked
    this.queryService.sendDeepToggleMsg(this.onlyDeep);
  }

  clearProfiles(): void {
    console.log('clearProfiles Clicked')
    this.queryService.triggerClearLayers();
  }

  resetToStart(): void {
    console.log('resetToStart Clicked')
    this.queryService.triggerResetToStart();
  }

  mapProjChange(proj: string): void {
    this.queryService.sendProj(proj)
  }

  displayPlatformInputChanged(platformInput: string) {
    if (platformInput.length >= 5){ this.queryService.triggerShowPlatform(platformInput) }
  }

  displayGlobalDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    const date = event.value
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateStr = year + '-' + month + '-' + day
    this.queryService.sendGlobalDateMessage(dateStr)
  }

  projections: Projections[] = [
    {value: 'WM', viewValue: 'Web mercator'},
    {value: 'SSP', viewValue: 'Southern stereo projection'},
    {value: 'NSP', viewValue: 'Northern stereo projection'}
  ];
}
