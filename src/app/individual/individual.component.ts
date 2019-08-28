import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person, Project, Award } from '../Classes/person';
import { PeopleService } from '../people/people.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SocialMedia } from '../Classes/socialMedia';
import { Publication } from '../Classes/publication';


@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  person$: Observable<Person>;
  socialMedia = new SocialMedia;
  sMTypes = Object.keys(this.socialMedia);
  publications: Publication[];
  projects: Project[];
  awards: Award[];
  ShowSocial = false;
  mainAuthor: RegExp;
  mail: string;
  constructor(private peopleserv: PeopleService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {person: Person}) => {
      this.person$ = of(data.person);
      this.socialMedia = JSON.parse(data.person.socialMedia);
      this.projects = JSON.parse(data.person.projects);
      this.awards = JSON.parse(data.person.awards);
      this.publications = JSON.parse(data.person.publications);
      if(data.person.publicEmail !== ''){
        this.mail = `mailto:${data.person.publicEmail}`;
      }
      data.person.pubName === '' ?
            this.mainAuthor = RegExp('NONE12'):
            this.mainAuthor = RegExp(`${data.person.pubName}*`);
      for(let SM of this.sMTypes){
        if (this.socialMedia[SM] !== '') {
          this.ShowSocial = true;
        }
      }
    });
  }

}
