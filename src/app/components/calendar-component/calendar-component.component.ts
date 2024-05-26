/*import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { DatePipe } from '@angular/common';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DateAdapter,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { RendezVousService } from './rendez-vous.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  selectedDay: Date = startOfDay(new Date());
   
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  activeDayIsOpen: boolean = true;
  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
   ];

  viewDate: Date = new Date();
  refresh: any;
showEventEditor=true;
newEventDetails: any;
  title: any;

 
  setView(view: CalendarView) {
    this.view = view;
  }
  d: Date= new Date();
  onDayClicked($event: any): void {
    // Mettez votre logique de traitement ici
    this.d=$event.day.date;
    const newEvent: CalendarEvent = {
      
     
      start: $event.day.date,
      title: 'Nouvel événement'
    };

    this.events.push(newEvent);
    this.viewDate= $event.day.date;
    console.log('Jour cliquéh :', $event.day.date);
    console.log('Jour dbh :', new Date());
    this.events.forEach(event => {
      console.log('Date de début de l\'événement :', event.start);
      this.setView(CalendarView.Day);
  });


}
    
  rendezVous: any[] = [];
  constructor(private rdv:RendezVousService){}
  ngOnInit(): void {
    this.rdv.getRDV().subscribe((data : any[] )=> {
      this.events = data.map(rdv => ({
        title: rdv.patient ? `Patient: ${rdv.patient.nom} ${rdv.patient.prenom}` : 'Patient inconnu',
        start: new Date(rdv.date), 
      })); 
    });
  }


}

 */
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { AuthService } from '../../services/auth.service'; 
import { ModalContentCalendarComponent } from './modal-content-calendar/modal-content-calendar.component';
import { ActivatedRoute } from '@angular/router';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css']
})
export class CalendarComponentComponent implements OnInit{
  
  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;
  rendezVous: any[] = [];
 
    cin_med : any;
     nom_conn:any;
     prenom_conn:any;


  constructor(private activatedRoute:ActivatedRoute,public rdv:AuthService,private modal: NgbModal){
    this.cin_med=activatedRoute.snapshot.params['cin_med'];
  }
  openModal(clickedDate:Date) {
    // Ouverture de la fenêtre modale
    const modalRef = this.modal.open(ModalContentCalendarComponent);
    modalRef.componentInstance.date=clickedDate; 
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.cin_med=this.cin_med;
  }
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData?: {
    action: string;
    event: CalendarEvent;
  };

  

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  title: any;
  count:any;
 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.setView(CalendarView.Day);
      
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    
  }

 /* handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }*/

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  ngOnInit(): void {
    if(this.rdv.roles.includes('SECRETAIRE')){
    this.rdv.countDem().subscribe(data=>{
      this.count=data;
});
  }
  else{
    this.rdv.countRdvOfMedByDay().subscribe(data=>{
      this.count=data;
    });
  }
    /* this.rdv.getRDV().subscribe((data : any[] )=> {
       this.events = data.map(rdv => ({
         title: rdv.patient ? `Patient: ${rdv.patient.nom} ${rdv.patient.prenom}` : 'Patient inconnu',
         
         start: new Date(rdv.date), 
       })); 
     });*/
      this.rdv.getInfos().subscribe(data=>{
       this.nom_conn=data.nom;
       this.prenom_conn=data.prenom;
       console.log(this.nom_conn);
       console.log(this.prenom_conn);
    
    });
     this.rdv.getPatientRdvOfMed(this.cin_med).subscribe((patients: any[]) => {
      this.events = [];
      patients.forEach((patient: any) => {
        //const timeParts = patient.time.split(':');
       
        //const rendezVousDate = new Date(patient.date); // Crée un objet Date pour la date spécifique
        //rendezVousDate.setHours(parseInt(timeParts[0])); // Définit l'heure à partir de patient.time
        //rendezVousDate.setMinutes(parseInt(timeParts[1]));
        this.events.push({
          title: `Patient: ${patient.nom} ${patient.prenom}`,
          start: new Date(patient.date),
          color: colors['blue']
          
        });
        //console.log(patient.date);
      });
      
    });
    
   }
   logout() {
    this.rdv.Logout();
  }

}

