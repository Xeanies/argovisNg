import { TcQueryService } from './../tc-query.service';
import { SidebarNavComponent } from './../../home/sidebar-nav/sidebar-nav.component';
import { Component, OnInit, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tc-sidebar-nav',
  templateUrl: './tc-sidebar-nav.component.html',
  styleUrls: ['./tc-sidebar-nav.component.css']
})
export class TsSidebarNavComponent extends SidebarNavComponent implements OnInit {
  public tcQueryService: TcQueryService
  
  constructor( public injector: Injector) { super(injector)
    this.tcQueryService = this.injector.get(TcQueryService) }

    ngOnInit() {

      this.setSubscriptions()
    }
  
    setSubscriptions() {
      this.queryService.urlBuild
      .subscribe(msg => {
        //toggle if states have changed    
        this.includeRT = this.tcQueryService.get_realtime_toggle()
        this.onlyBGC = this.tcQueryService.get_bgc_toggle()
        this.onlyDeep = this.tcQueryService.get_deep_toggle()
        this.threeDayToggle = this.tcQueryService.getThreeDayToggle()
        this.proj = this.tcQueryService.getProj()
  
        let displayDate = new Date(this.tcQueryService.getGlobalDisplayDate())
        displayDate.setDate(displayDate.getDate())
        displayDate.setMinutes( displayDate.getMinutes() + displayDate.getTimezoneOffset() );
        this.date = new FormControl(displayDate)
      })
    }

  realtimeChange(checked: boolean): void {
    this.includeRT = checked
    this.tcQueryService.sendRealtimeMsg(this.includeRT);
  }

  displayGlobalChange(checked: boolean): void {
    this.threeDayToggle = checked
    this.tcQueryService.sendThreeDayMsg(this.threeDayToggle);
  }

  bgcChange(checked: boolean): void {
    this.onlyBGC = checked
    this.tcQueryService.sendBGCToggleMsg(this.onlyBGC);
  }

  deepChange(checked: boolean): void {
    this.onlyDeep = checked
    this.tcQueryService.sendDeepToggleMsg(this.onlyDeep);
  }

  clearProfiles(): void {
    this.tcQueryService.trigger_clear_layers();
  }

  resetToStart(): void {
    this.tcQueryService.trigger_reset_to_start();
  }

}
