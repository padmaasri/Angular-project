import { Component } from '@angular/core';
import axios from 'axios';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: '931350082821-qm07uo5rbgv4g6vtiishn58nqevadkqk.apps.googleusercontent.com',
  redirectUri: window.location.origin,
  responseType: 'code',
  scope: 'openid profile email',
};

@Component({
  selector: 'app-generative-ai',
  templateUrl: './generative-ai.component.html',
  styleUrls: ['./generative-ai.component.scss']
})
export class GenerativeAiComponent {
  messages: any[] = [];
  file: File
  userInput: string = '';
  generatedImages: string[] = [];
  prompt = '';
  generatedImage: string[] = [];
  audioUrl: any;
  generateaudios: any;
  constructor(private service: ServiceService, private http: HttpClient) { }
  async sendMessage() {
    this.messages.push({ role: 'user', content: this.userInput });
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: this.messages,
        temperature: 0.8

      },

        {
          headers: {
            Authorization: 'Bearer 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'
          }
        });

      const rply = response.data.choices[0].message.content;
      this.messages.push({ role: 'system', content: rply });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  // In generative-ai.component.ts
  async sendMessageAndGenerateImage() {
    await this.sendMessage();
    await this.generateImage();
    //    await this.onFileSelect(this.type)

  }
  selectedFile: File; // To store the selected file

  onFileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0]; // Store the selected file
    }
  }

  ngOninit() {
    // this.onFilesDropped()
  }
  generateImage() {
    this.service.generateImage(this.userInput).subscribe((response: any) => {
      this.generatedImages = response.data.map((imageData: any) => imageData.url);
      console.log(this.generatedImages, "images");
    });
  }

  audio
  generatedText

  // generateText() {
  //   this.service.generateText(this.userInput).subscribe(
  //     (response: any) => {
  //       this.generatedText = response.choices[0].text;
  //     },
  //     (error) => {
  //       console.error('Error generating text:', error);
  //     }
  //   );
  // }
  generateAudio(userInput) {
    this.service.generateAudio(userInput).subscribe(
      (response: any) => {
        if (response && response.text) {
          const dataUrl = response.text;
          this.audioUrl = dataUrl;

          this.audio = new Audio(dataUrl);
          this.audio.load()
          this.audio.play();
        } else {
          console.error('Audio generation response does not contain audio data');
        }
      },
      (error) => {
        console.error('Error generating audio:', error);
      }
    );
  }





}

