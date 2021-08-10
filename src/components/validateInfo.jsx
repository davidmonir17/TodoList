export  default function ValidateInfo(values){
    let errors={}
    if(!values.title.trim()){
        errors.title="Title Is Required"
    }

    if(!values.description.trim()){
        errors.description="Description Is Required"
    }else if(values.description.length>1000){
        errors.description="maximum character is 1000 in description"
    }
    return errors;

}