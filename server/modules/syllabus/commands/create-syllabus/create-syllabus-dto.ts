import {IsArray, IsDate, IsEmail, IsString, MaxLength, IsNotEmpty, IsOptional, validateOrReject} from 'class-validator'

export interface Section { 
    title: string, 
    chapters: number[] 
}

export interface CreateSyllabus {
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
    owners: string[],
}

export class CreateSyllabusDto implements CreateSyllabus {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    readonly name!: string;
    
    @MaxLength(64)
    @IsString()
    @IsNotEmpty()
    readonly instructor!: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    readonly location!: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    readonly institution?: string;

    @IsString()
    @IsNotEmpty()
    readonly officeHours!: string;

    @IsString()
    @IsNotEmpty()
    readonly classHours!: string;

    @MaxLength(64)
    @IsEmail()
    @IsNotEmpty()
    readonly email!: string;

    @IsString()
    @IsNotEmpty()
    readonly descriptionHtml!: string;

    @IsArray()
    @IsNotEmpty()
    readonly sections!: Section[];

    @IsString()
    @IsOptional()
    readonly additionalHtml?: string;

    @IsArray()
    @IsNotEmpty()
    readonly owners!: string[];

    constructor({
        name, 
        instructor, 
        location, 
        institution, 
        officeHours, 
        classHours, 
        email, 
        descriptionHtml, 
        sections, 
        additionalHtml, 
        owners}: CreateSyllabus) {
        this.name = name;
        this.instructor = instructor;
        this.location = location;
        this.institution = institution;
        this.officeHours = officeHours;
        this.classHours = classHours;
        this.email = email;
        this.descriptionHtml = descriptionHtml;
        this.sections = sections;
        this.additionalHtml = additionalHtml;
        this.owners = owners;
    }
}

export class CreateSyllabusHttpRequest extends CreateSyllabusDto implements CreateSyllabus {
    validate() {
        return validateOrReject(this)
    }
}
