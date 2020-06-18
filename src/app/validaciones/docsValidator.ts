import { FileItem } from '../models/registrotienda';

export class docsValidator{
    private acceptType = ['docs/pdf', 'image/png'];

    //metodo para validar de que suba solo pdf
    validateType(fileType:string):boolean{
        return fileType === ' ' || fileType === undefined
        ? false
        : this.acceptType.includes(fileType);
    }

    //verificar si arrastro un fichero y no vuelva añadir el mismo
    checkDropped(fileName:string,files:FileItem[]):boolean{
        for (const file of files){
            if(file.name==fileName){
                return true;
            }
        }
                return false;

    }

}