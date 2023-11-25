// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BehaviorSubject, Observable, Subscription, forkJoin, mergeMap } from 'rxjs';

// import { ChatMessage } from 'src/app/shared/models/message.model';
// import { Role } from 'src/app/shared/models/role.model';
// import { User } from 'src/app/shared/models/user.model';
// import { UserService } from 'src/app/shared/services/user.service';
// import { WebSocketService } from 'src/app/shared/services/websocket.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit , OnDestroy{
//   messages: ChatMessage[] = [];
//   sortedMessages: ChatMessage[] = [];
//   newMessage: string = '';
//   recipientId = '';
//   senderId = '';
//   users : User [] = [];
//   messagesSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
//   messages$: Observable<ChatMessage[]> | undefined;

//   constructor(private router: Router, private userService: UserService,private websocketService: WebSocketService, private http: HttpClient, private route: ActivatedRoute , private changeDetectorRef: ChangeDetectorRef) { }
//   private messagesSubscription: Subscription | undefined;
//   private httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     }),
//     responseType: 'text' as 'json'
//   };
//   maxMessagesStored = 50;
//   ngOnInit(): void {
//     //this.messages$ = this.websocketService.getReceivedMessages();
//     this.websocketService.receiveMessages().subscribe(message => {
//       this.messages.push(message);
//       console.log(message)
//       this.changeDetectorRef.detectChanges();
//   })
//     this.loadUsersByRole(Role.USER);
//     this.route.paramMap.subscribe(params => {
//       this.recipientId = params.get('recipientId')!;
//       this.senderId = localStorage.getItem('userId')!;

//       console.log('Sender ID:', this.senderId);
//       console.log('Recipient ID:', this.recipientId);
//       this.getChatHistory();

//     });
//   }
//   ngOnDestroy(): void {
//     if (this.messagesSubscription) {
//       this.messagesSubscription.unsubscribe();
//     }
//   }

//   loadUsersByRole(role: Role): void {
//     this.userService.getUsersByRole(role).subscribe(
//       users => {
//         this.users = users;
//         console.log(users)
//       },
//       error => {
//         console.error('Error loading users:', error);
//       }
//     );
//   }
//   getChatHistory(): void {
//     const chatHistory$ = this.http.get<ChatMessage[]>(
//       `http://localhost:8080/api/messages/history/${this.senderId}/${this.recipientId}`
//     );

//     chatHistory$.subscribe(
//       (chatHistory) => {
//         // Filter out messages already present in this.messages
//         const newMessages = chatHistory.filter(message => !this.messages.some(existingMessage =>
//           (existingMessage.senderId === message.senderId && existingMessage.recipientId === message.recipientId) ||
//           (existingMessage.senderId === message.recipientId && existingMessage.recipientId === message.senderId)
//         ));

//         // Update sender photos for new messages
//         newMessages.forEach(message => {
//           const sender = this.users.find(user => user.id === message.senderId);
//           if (sender) {
//             message.senderPhoto = sender.profileImage || '';
//           }
//         });

//         // Append new messages to existing messages
//         this.messages = [...this.messages, ...newMessages];

//         // Trigger change detection
//         this.changeDetectorRef.detectChanges();

//         console.log('Chat history fetched:', chatHistory);
//       },
//       error => {
//         console.error('Error fetching chat history', error);
//       }
//     );
//   }





//   sendMessage(): void {
//     if (this.newMessage.trim() !== '') {


//       const message: ChatMessage = {
//         senderId: this.senderId,
//         recipientId: this.recipientId,
//         content: this.newMessage,
//         sentAt: new Date(),
//         senderPhoto: this.getSenderPhoto(this.senderId)
//       };

//       if (message.senderPhoto !== undefined) {
//         this.websocketService.sendMessage(message.senderId, message.recipientId, message.content, message.senderPhoto);
//       } else {
//         this.websocketService.sendMessage(message.senderId, message.recipientId, message.content, ''); // Remplacez par une valeur par défaut si nécessaire
//       }

//       this.sendApiMessage(this.senderId, this.recipientId, this.newMessage, message.senderPhoto);

//       this.messages.push(message);

//       console.log('Message sent:', message);
//       this.newMessage = '';
//     }
//   }



//   sendApiMessage(senderId: string, recipientId: string, content: string, senderPhoto: string) {
//     const message = {
//       senderId: senderId,
//       recipientId: recipientId,
//       content: content,
//       senderPhoto: senderPhoto, // Ajoutez la photo du sender
//       sentAt: new Date() // Ajoutez la date actuelle
//     };

//     this.http.post('http://localhost:8080/api/messages/send', message, this.httpOptions).subscribe(
//       response => {
//         console.log('Message sent to API successfully', response);
//       },
//       error => {
//         console.error('Error sending message to API', error);
//       }
//     );
//   }



//   getSenderPhoto(senderId: string): string {
//     const user = this.users.find(u => u.id === senderId);
//     return user && user.profileImage ? user.profileImage : '';
//   }


//   getSenderName(senderId: string): string {

//     const user = this.users.find(u => u.id === this.senderId);
//     return user ? user.name : 'Unknown User';
//   }
//   getRecipientName(recipientId: string): string {
//     const user = this.users.find(u => u.id === this.recipientId);
//     return user ? user.name : 'Unknown User';
//   }




//   getRecipientPhoto(recipientId: string): string | null {
//     recipientId = localStorage.getItem('recipientId')!;
//     const user = this.users.find(u => u.id === this.recipientId);
//     return user && user.profileImage ? user.profileImage : null;
//   }
//   getSenderByMessage(message: ChatMessage): User | undefined {

//     return this.users.find(user => user.id === message.senderId);

//   }


//   getSortedMessages(): ChatMessage[] {
//     return this.sortedMessages = this.messages.slice().sort((a, b) => {
//       if (a.sentAt && b.sentAt) {
//         return a.sentAt.getTime() - b.sentAt.getTime();
//       }
//       return 0;
//     });
//   }

//   getMessageContainerClass(senderId: string): string {
//     if (senderId === this.senderId) {
//       return 'message message-sender';
//     } else {
//       return 'message message-recipient';
//     }
//   }

//   goBack() {
//     // Navigate back to the previous page
//     this.router.navigate(['/ui/chat']);
//   }
// }
