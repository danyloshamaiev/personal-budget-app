import {Injectable} from '@angular/core';
import {Message, MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  public success(message: Message): void {
    message.severity = 'success';
    message.summary = 'Success';
    this.messageService.add(message);
  }

  public info(message: Message): void {
    message.severity = 'info';
    message.summary = 'Info';
    this.messageService.add(message);
  }

  public warn(message: Message): void {
    message.severity = 'warn';
    message.summary = 'Warning';
    this.messageService.add(message);
  }

  public error(message: Message): void {
    message.severity = 'error';
    message.summary = 'Error';
    this.messageService.add(message);
  }
}
