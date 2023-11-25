// import { Injectable } from '@angular/core';
// import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
// import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
// import { ChatMessage } from '../models/message.model';

// import { TokenService } from './token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {
//   private socket$: WebSocketSubject<ChatMessage>;
//   private messagesSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
//   constructor(private tokenService: TokenService) {
//     const jwtToken = this.tokenService.getToken(); // Récupérer le token JWT

//     const headers = {
//       Authorization: `Bearer ${jwtToken}` // Ajouter le token JWT dans l'en-tête
//     };

//     const url = 'ws://localhost:8080/websocket-path';
//     const config: WebSocketSubjectConfig<ChatMessage> = {
//       url,
//       deserializer: (e) => JSON.parse(e.data),
//       serializer: (value) => JSON.stringify(value),
//       openObserver: {
//         next: () => {
//           console.log('WebSocket connection established');
//         }
//       },
//       closeObserver: {
//         next: () => {
//           console.log('WebSocket connection closed');
//         }
//       }
//     };

//     // Créez le WebSocket avec les en-têtes spécifiés
//     this.socket$ = webSocket(config);

//     this.socket$.pipe(
//       tap((message) => {
//           console.log('Received raw message:', message);
//           try {
//               const parsedMessage = JSON.parse(message.content);
//               console.log('Parsed message:', parsedMessage);
//           } catch (error) {
//               console.error('Error parsing message:', error);
//           }
//       }),


//       catchError((error: Event) => {
//         console.error('WebSocket connection error:', error);
//         throw error; // Re-throw the error
//       })
//     ).subscribe();
//   }




//   sendMessage(senderId: string, recipientId: string, content: string, senderPhoto: string): void {
//     const message: ChatMessage = {
//       senderId,
//       recipientId,
//       content,
//       sentAt: new Date(),
//       senderPhoto
//     };
//       console.log('Sending message:', message);
//       this.socket$.next(message);
//   }

//   receiveMessages(): WebSocketSubject<ChatMessage> {
//     return this.socket$;
//   }

//   getReceivedMessages(): Observable<ChatMessage[]> {
//     return this.messagesSubject.asObservable();

//   }

// }
// function gzip(message: ChatMessage, arg1: { to: string; }) {
//   throw new Error('Function not implemented.');
// }

