import { Component, computed, signal } from '@angular/core';

import { Observable, audit, auditTime, count, debounce, debounceTime, fromEvent, interval, of, pipe, take, throwError, toArray } from 'rxjs';
import { Message, RxjsService } from './rxjs.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {
  metaDescription: string = ''; // Initialize the metaDescription property
  metaKeywords: string = ''; // Initialize the metaKeywords property
  messages: Message[] = [];
  value: string;

  count = signal(0)
  btn: any
  form: any
  math: any
  newval: string[] = []
  val2: any = []
  number
  number1: any
  spreaarry: any = []
  min = 3;
  sec = 59
  game
  gametype: boolean = false
  start() {
    this.game = setInterval(() => {
      this.sec--
      if (this.min == 0 && this.sec == 0) {
        alert("time mudunju")
        this.gametype = true
        this.game = clearInterval(this.game)
        window.location.reload

      }
      else if (this.sec == 0) {
        this.min--
        this.sec = 59

      }
    }, 500)

  }
  stop() {

    this.game = clearInterval(this.game)
  }
  add() {

    this.newval.push(this.value)
    console.log(this.newval)
  }
  // firstname = signal("padma")
  // lastname = signal("sri")
  // fullname = computed(() => this.firstname() + this.lastname())
  // value: any
  // click() {
  //   alert(
  //     this.fullname())
  // }

  multiple: number; // Set the number for multiplication
  multipli: number[] = Array.from({ length: 10 });
  results: number[] = [];


  // table() {

  //   console.log(this.number)
  // 

  showTable: boolean = false;


  table() {
    this.multipli = Array.from({ length: 10 }, (_, i) => i + 1);
    console.log(this.multipli)
    this.showTable = true;
  }
  keywordsMeta
  descriptionMeta

  ngOnInit() {
    // Update the page title and meta tags dynamically
    this.chatService.setPageTitle('Dynamic Rxjs Tittle');
    this.chatService.setMetaTags('Dynamic Page Description', 'Angular, Meta Tags, Dynamic');

    // Update the page title and description dynamically
    // this.chatService.setPageTitle('Dynamic Page Title');
    // this.metaDescription = 'This is the page description';
    // this.metaKeywords = 'Angular, Meta Tags, Dynamic';
    //this.chatService.setMetaTags(metaTags);
    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
    this.rxjsfun()
    // this.audit()
    this.add()
    this.table()

    // for (let i = 1; i <= 10; i++) {
    //   this.result.push(this.multiple * i)

    // }
    // console.log(this.result)

    console.log(this.count() * 2)

    /* ...................interval............... */

    let inter = interval(500)
    let val = inter.pipe(take(10))
    val.subscribe(x => {
      this.val2 = x;
      console.log(x)
    })
    /* ...................debounce............... */

    let debounce = interval(500)
    let debounceval = debounce.pipe(debounceTime(10))
    debounceval.subscribe(x => {
      this.val2 = x;
      console.log(x, "debounce")
    })

    /* ...................of & spread arry............... */


    this.spreaarry = ["bala", "arru"]
    this.val2 = [...this.spreaarry, "padma", "sri", "malli", "meenu"]
    let ofval = of(this.val2);
    ofval.subscribe(res => {
      this.val2 = res;
      console.log(this.val2)
    })



    /* ...................throw error............... */
    let error: any = throwError(new Error("error in window"))
    error.subscribe(e => {
      error = e
      console.log(error)
    })

    this.math = (Math.random() + 1) % 2 === 2 ? "even" : "odd";
    console.log(this.math)

    inter = interval(1000)

    this.number = inter.pipe(count());
    this.number1.subscribe(res => {
      this.number1 = res
      console.log(res)
    })


  }
  /*.....toArray.......*/
  observableData$: Observable<string> = new Observable(subscriber => {
    subscriber.next('value1');
    subscriber.next('value2');
    subscriber.next('value3');
    subscriber.complete();
  });

  observableArray: string[] = [];

  constructor(public chatService: RxjsService, private titleService: Title, private metaTagService: Meta) {
    this.observableData$
      .pipe(toArray())
      .subscribe(dataArray => (this.observableArray = dataArray));
  }
  /*.....................*/
  audit() {
    this.auditval = of(1, 2, 3, 4, 5)
    this.test = this.auditval.pipe(debounceTime(1000))
    this.test.subscribe(x => {
      this.test = x
      console.log(x, "test")
    })
  }
  auditval
  test: any
  rxjsval: any
  val
  /*.....................*/
  rxjsfun() {
    this.rxjsval = of(1, 2, 3, 4)
    //this.val = of(this.rxjsval)
    console.log(this.rxjsval, "rxjs")
  }








  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

}
