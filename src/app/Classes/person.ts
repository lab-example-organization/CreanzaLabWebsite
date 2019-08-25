export class Person {
    email: string = '';
    description: string = '';
    endingYear: string = '';
    name: string = '';
    projectShort: string = '';
    startYear: string = '';
    studying: string = '';
    pronouns: string = '';
    portraitLink: string = '';
    socialMedia: string = ''; // should be a JSON string of Social Media
    publications: string = '';  // should be a JSON string of Publication[]
    projects: string = '';// should be a JSON string of Project[]
    cvresume: string = '';// Link to cv
    awards: string = '';//should be a JSON string of Award
    pubName: string = '';
    publicEmail: string = '';
}

export class Project {
    title: string;
    mainInfo: string;
}

export class Award {
    title: string;
    yearReceived: number;
}