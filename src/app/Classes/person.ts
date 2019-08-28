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
    cvresume: string = '';// Link to cv/resue file
    cvresumeTitle: string = '';//name of teh file
    awards: string = '';//should be a JSON string of Award
    pubName: string = '';
    publicEmail: string = '';
    about: string = '';
    website: string = '';
    department: string = '';
    github: string = '';
    showIndividual: boolean = false;
    key?: string = '';
}

export class Project {
    title: string = '';
    mainInfo: string = '';
    githubLink: string = '';
}

export class Award {
    title: string = '';
    yearReceived: string = '';
}