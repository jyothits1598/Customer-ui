import { Observable } from 'rxjs';

export class FileValidators {

    static extentionValidator(formats: Array<string>): (file: File) => string | null {
        return (file: File) => {
            const fileFormats = formats;
            const fileExt = file.name.substring(file.name.lastIndexOf('.'));
            if (fileFormats.find((fmt => fmt === fileExt))) return null;
            else return 'valid file type - [ ' + fileFormats.toString() + ' ]';
        }
    }
}

export function ImageSizeValidator(file: File): Observable<boolean> {
    return new Observable(observer => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
            var img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                if (img.width > 500 || img.height > 500) observer.next(true);
                else observer.error('Image too large');
            }
        }
    });
}
