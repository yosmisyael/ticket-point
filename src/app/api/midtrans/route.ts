// app/api/midtrans/route.ts
import { NextRequest, NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, grossAmount, firstName, lastName, email, phone } = body;

    // Pastikan semua parameter yang diperlukan ada
    if (!orderId || !grossAmount || !firstName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validasi grossAmount adalah angka positif
    if (isNaN(grossAmount) || grossAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid gross amount' },
        { status: 400 }
      );
    }

    // Pastikan MIDTRANS_SERVER_KEY tersedia
    if (!process.env.MIDTRANS_SERVER_KEY) {
      console.error('MIDTRANS_SERVER_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Payment configuration error' },
        { status: 500 }
      );
    }

    // Buat instance Snap Midtrans
    const snap = new midtransClient.Snap({
      isProduction: false, // Mode Sandbox
      serverKey: process.env.MIDTRANS_SERVER_KEY, 
      clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
    });

    // Parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: orderId, // Harus unik
        gross_amount: Math.round(grossAmount) // Pastikan integer dalam IDR
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName || '', // Menangani kemungkinan null/undefined
        email: email,
        phone: phone
      },
      // Mengaktifkan metode pembayaran yang diinginkan
      enabled_payments: ["qris", "credit_card", "gopay", "bank_transfer"],
      // Properti payment_type: "qris" bersifat opsional, sesuaikan jika memang diperlukan
      payment_type: "qris"
    };

    const transaction = await snap.createTransaction(parameter);

    // Kembalikan token dan redirect_url ke klien
    return NextResponse.json({ 
      token: transaction.token,
      redirect_url: transaction.redirect_url 
    }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown payment processing error';
    const errorCode = (error as any).httpStatusCode || 500;
    console.error('Midtrans Error:', error);
    
    return NextResponse.json({ 
      error: errorMessage,
      details: error.ApiResponse || {} 
    }, { status: errorCode });
  }
}
