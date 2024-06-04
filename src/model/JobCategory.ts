class JobCategory{
    id: number;
    fieldName: string;

    constructor(id: number, fieldName: string, description?: string, img?: string){
        this.id  = id;
        this.fieldName = fieldName;
    };
};

export default JobCategory;