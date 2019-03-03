export class Project {
    title: string;
    mainInfo: string;
}

export class Person {
    email: string;
    description: string;
    endingYear: string;
    name: string;
    project: string;
    startYear: number;
    studying: string;
    pronouns: string;
    portraitLink: string;
    publications: string;  //should be a JSONstring
    projects: Project[];
    cvresume: string;
    awards: string[];
}
