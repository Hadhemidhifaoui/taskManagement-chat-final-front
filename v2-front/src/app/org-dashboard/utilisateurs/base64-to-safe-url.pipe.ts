import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToSafeUrl'
})
export class Base64ToSafeUrlPipe implements PipeTransform {
  transform(base64Image: string | null): string | null {
    if (base64Image) {
      return 'data:image/jpeg;base64,' + base64Image;
    }
    return null;
  }
}
