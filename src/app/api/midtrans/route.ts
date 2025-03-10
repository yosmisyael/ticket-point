// app/api/midtrans/route.ts
import { NextRequest, NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, grossAmount, firstName, lastName, email, phone } = body;

    // Make sure all required parameters are present
    if (!orderId || !grossAmount || !firstName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required parameters' }, 
        { status: 400 }
      );
    }

    // Validate grossAmount is a positive number
    if (isNaN(grossAmount) || grossAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid gross amount' }, 
        { status: 400 }
      );
    }

    // Ensure we have the server key
    if (!process.env.MIDTRANS_SERVER_KEY) {
      console.error('MIDTRANS_SERVER_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Payment configuration error' }, 
        { status: 500 }
      );
    }

    // Create Snap Midtrans instance with proper error handling
    const snap = new midtransClient.Snap({
      isProduction: false, // Sandbox mode
      serverKey: process.env.MIDTRANS_SERVER_KEY, 
      clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
    });

    // Transaction parameters - make sure gross_amount is an integer
    const parameter = {
      transaction_details: {
        order_id: orderId, // Must be unique
        gross_amount: Math.round(grossAmount) // Round to ensure integer in IDR
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName || '', // Handle possible null/undefined last name
        email: email,
        phone: phone
      },
      // Ensure QRIS is included in enabled payment methods
      enabled_payments: ["qris", "credit_card", "gopay", "bank_transfer"]
    };

    const transaction = await snap.createTransaction(parameter);

    // Return Snap Token to client for further processing
    return NextResponse.json({ 
      token: transaction.token,
      redirect_url: transaction.redirect_url 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Midtrans Error:', error);
    
    // Provide more detailed error information
    const errorMessage = error.message || 'Unknown payment processing error';
    const errorCode = error.httpStatusCode || 500;
    
    return NextResponse.json({ 
      error: errorMessage,
      details: error.ApiResponse || {} 
    }, { status: errorCode });
  }
}