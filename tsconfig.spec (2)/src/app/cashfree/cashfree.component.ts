import { Component, ElementRef, ViewChild } from '@angular/core';



import { cashfreeProd } from "cashfree-pg-sdk-javascript";

@Component({
  selector: 'app-cashfree',
  templateUrl: './cashfree.component.html',
  styleUrls: ['./cashfree.component.css']
})

export class CashfreeComponent {
  @ViewChild('payCard') paymentBtn: ElementRef;
  @ViewChild('paymentMessage') paymentMessage: ElementRef;
  // Add other ViewChild declarations for your other elements here
  cardExpiry: any;

  cardHolder
  cardComponent
  cvvComponent
  private cashfree: any; // Use 'any' type as a workaround

  constructor() {

    // this.cashfree = new Cashfree({
    //   APP_ID: 'TEST10036192282e4331ff536fe6c46c29163001',
    //   SECRET_KEY: 'TEST6a7abfb7c876ff05c20c07c69801bd9c20c192db',
    // });
    // console.log(this.cashfree, "import * as Cashfree from 'cashfree-js';")
  }

  ngOnInit() {
    console.log("hittttttttt")
    this.cashfree = new cashfreeProd.Cashfree({
      APP_ID: 'TEST10036192282e4331ff536fe6c46c29163001',
      SECRET_KEY: 'TEST6a7abfb7c876ff05c20c07c69801bd9c20c192db',
    });
    console.log(this.cashfree, "import * as Cashfree from 'cashfree-js';")

    // Initialize your Cashfree components (card, cvv, cardHolder, etc.) here
  }

  toggleBtn() {
    const cardExpiryComplete = this.cardExpiry.isComplete();
    const cardHolderComplete = this.cardHolder.isComplete();
    const cardComponentComplete = this.cardComponent.isComplete();
    const cvvComponentComplete = this.cvvComponent.isComplete();

    // Check if all required components are complete
    if (cardExpiryComplete && cardHolderComplete && cardComponentComplete && cvvComponentComplete) {
      // All components are complete, so enable the payment button
      this.paymentBtn.nativeElement.disabled = false;
    } else {
      // At least one component is incomplete, so disable the payment button
      this.paymentBtn.nativeElement.disabled = true;
    }
  }
  onSubmit() {
    console.log("hit")
    const paymentData = {
      orderId: 'CFPay_student-fees_9gpsl3c5n', // Replace with the actual order ID
      orderAmount: '1000.00', // Replace with the actual order amount
      returnUrl: 'https://example.com/payment-success', // Replace with the actual success URL
      notifyUrl: 'https://example.com/payment-notify', // Replace with the actual notification URL
      customerNam: 'John Doe', // Replace with the customer's name
      customerEmail: 'john.doe@example.com', // Replace with the customer's email
      customerPhone: '1234567890', // Replace with the customer's phone number
      // Add more payment parameters as needed
    };
    console.log(paymentData, "pay")

    if (this.cashfree) {
      console.log(this.cashfree, "cash")
      this.cashfree.pay({
        paymentMethod: 'card', // Specify the payment method
        paymentSessionId: 'session_m8qzWkEpyL9Xe5zSIMmMeRLreg6r4rr6OZpbL9w3atIMajolyTLRmConNyKuEYu0MGDh-43HlVcDYbYDTg7tqK6oujqTpGcDZndCue3Y-7Sc', // Session ID if required
        // Add other parameters as needed
        ...paymentData,
      })

        .then((response) => {
          // Handle the response from Cashfree (success or failure)
          if (response && response.error) {
            // Payment failed
            console.error('Payment failed:', response.error.message);
            // Handle the error and display an error message to the user
          } else {
            // Payment was successful
            console.log('Payment successful');
            // Redirect the user to a success page or provide a success message
          }
        });
      console.log(this.cashfree, "cash")
    } else {
      console.error('Cashfree object is not properly initialized.');
    }
  }


}
