import { Observable } from 'rxjs';

export class FileValidators {

    static typeValidator(formats: Array<string>): (file: File) => string | null {
        return (file: File) => {
            const fileFormats = formats;
            const fileExt = file.name.substring(file.name.lastIndexOf('.'));
            if (fileFormats.find((fmt => fmt === fileExt))) return null;
            else return 'This file type is not supported.';
        }
    }
}


export class AsyncFileValidators {
    static imageSizeValidator(minWidth: number, minHeight: number, maxWidth: number, maxHeight): (file: File) => Observable<boolean> {
        return (file: File) =>
            new Observable(observer => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e: any) => {
                    var img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        if (img.width > 500 || img.height > 500) { observer.next(true); observer.complete(); }
                        else observer.error({ size: 'Does not meet size criteria' });
                    }
                }
            });
    }
}

