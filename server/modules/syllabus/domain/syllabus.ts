export interface Section { 
    title: string, 
    chapters: number[] 
}

export interface Syllabus {
    id?: string,
    name: string,
    instructor: string,
    location: string,
    institution?: string,
    officeHours: string,
    classHours: string,
    email: string,
    descriptionHtml: string,
    sections: Section[]
    additionalHtml?: string,
    code?: string,
    owners: string[],
}
