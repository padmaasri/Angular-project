import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { Socket } from 'ngx-socket-io';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],


})
export class ChatBoxComponent {

  private stream: MediaStream;
  private recorder: RecordRTC;
  newMessage = '';
  messageList: string[] = [];
  @ViewChild('fileInput') el: ElementRef;
  audioList: { message: any, userName: any, mine: boolean }[] = [];

  userName: any;
  imageList: any;
  imageB: boolean;
  image: any;
  imgagedata: boolean;
  format: string;
  videolist: { url: any, format: string }[] = [];
  video: any;
  url: string | ArrayBuffer | null;

  constructor(private chat: ServiceService, private socket: Socket, private sanitizer: DomSanitizer) {
    this.socket.connect();
  }


  ngOnInit() {

    this.socket.fromEvent<string>('image').subscribe((imageData) => {
      console.log(this.images, "img")
      this.images.push(imageData);
      this.imgagedata = false
    });

    // this.socket.fromEvent<string>('image').subscribe((imageData) => {
    //   console.log(this.videolist, "img")
    //   this.videolist.push(imageData, this.format);
    //   this.imgagedata = false
    // });

    this.socket.on('video', (data: { message: any, userName: string }) => {
      if (data) {
        this.videolist.push({ url: data.message, format: data.userName });
        console.log(this.videolist, " this.audioList")
        // this.imageB = true;
      }
    });

    this.chat.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(this.messageList)

    });
    this.socket.on('audio', (data: { message: string, userName: string }) => {
      if (data) {
        this.audioList.push({ message: data.message, userName: data.userName, mine: false });
        console.log(this.audioList, " this.audioList")
        this.imageB = true;
      }
    });



  }
  isRecording = false;
  recording: boolean = false;
  audioBlobUrl: SafeUrl;
  sendMessage() {
    // this.chat.sendMessage(this.newMessage);
    // this.newMessage = '';

    if (this.newMessage) {
      this.socket.emit('message', this.newMessage);
      // this.messageList.push({ message: this.message, userName: this.userName, mine: true });
      console.log(this.messageList)
      this.newMessage = '';
    }
    else if (this.image) {
      this.socket.emit('image', this.image);
      this.images.push(this.image);
      console.log(this.images)
      this.image = '';
      this.imgagedata = true
    }
    // else if (this.video) {
    //   this.socket.emit('video', this.video);
    //   this.videolist.push(this.image,);
    //   console.log(this.videolist)
    //   this.video = '';
    //   this.imgagedata = true
    // }
    else {

      this.socket.emit('audio', this.audioBlobUrl);
      this.audioList.push({ message: this.audioBlobUrl, userName: this.userName, mine: true })
      console.log(this.audioList)

      this.audioBlobUrl = '';
      this.imageB = true;
    }
  }
  startRecording() {
    this.recording = true;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.stream = stream;
        this.recorder = new RecordRTC(stream, {
          type: 'audio'
        });
        this.recorder.startRecording();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  }

  stopRecording() {
    this.recording = false;
    this.recorder.stopRecording(() => {
      this.stream.getTracks().forEach((track) => track.stop());
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.recorder.getBlob())
      );
    });
  }
  change() {
    console.log("hitt,,val")
  }
  images: String[] = [];

  // onSelectFile(event: any) {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       if (file.type.indexOf('video') > -1) {
  //         const reader = new FileReader();
  //         reader.onload = (e: any) => {
  //           this.socket.emit('image', reader.result);
  //           this.videolist.push({ url: e.target.result, format: 'video' });
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     }
  //   }
  // }

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event: any) => {
        this.socket.emit('image', reader.result);
        this.videolist.push({ url: event.target.result, format: 'video' });
        this.url = (<FileReader>event.target).result;
      };
    }
  }
}