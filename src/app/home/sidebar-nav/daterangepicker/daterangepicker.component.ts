import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { QueryService } from '../../services/query.service'

@Component({
  selector: 'app-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.css']
})
export class DaterangepickerComponent {
  constructor(private queryService: QueryService) {}
  private daterange: any = {};
  private start = moment().subtract(14, 'days');
  private end = moment();
  private options: any;

  ngOnInit() {
    this.daterange = this.queryService.getSelectionDates()
    this.start = moment(this.daterange.start)
    this.end = moment(this.daterange.end)
    this.options = {
                    locale: { format: 'MM/DD/YYYY' },
                    startDate: this.start,
                    endDate: this.end,
                    alwaysShowCalendars: true,
                    minDate: "01/01/1997",
                    ranges: {
                      'Today': [moment(), moment()],
                      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                      'This Month': [moment().startOf('month'), moment().endOf('month')],
                      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                      },
                    };
  }

  private sendDateRange(): void {
    this.queryService.sendSelectedDateMessage(this.daterange);
  }

  public selectedDate(daterangeSel: any) {
      this.daterange.start = daterangeSel.start.format('YYYY-MM-DD');
      this.daterange.end = daterangeSel.end.format('YYYY-MM-DD');
      this.daterange.label = daterangeSel.label;
      this.sendDateRange();
  }
}