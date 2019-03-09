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
    socialMedia: string; // should be a JSON string
    publications: string;  // should be a JSON string
    projects: Project[];
    cvresume: string;
    awards: string[];
}
