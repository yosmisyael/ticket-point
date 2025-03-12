
// File: app/api/midtrans/route.ts
import { NextRequest, NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Tentukan path ke file data.txt di folder public
const dataFilePath = path.join(process.cwd(), 'public', 'data.txt');

export async function POST(request: NextRequest) {
  try {
    // Ambil seluruh data dari body request
    const body = await request.json();
    // Destructure data minimal untuk Midtrans dan simpan sisanya sebagai data tambahan
    const { orderId, grossAmount, firstName, lastName, email, phone, ...additionalData } = body;

    // Validasi parameter yang wajib ada
    if (!orderId || !grossAmount || !firstName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    // Validasi grossAmount harus angka positif
    if (isNaN(grossAmount) || grossAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid gross amount' },
        { status: 400 }
      );
    }
    // Pastikan environment variable untuk Midtrans tersedia
    if (!process.env.MIDTRANS_SERVER_KEY) {
      console.error('MIDTRANS_SERVER_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Payment configuration error' },
        { status: 500 }
      );
    }

    // Buat instance Snap Midtrans (Sandbox mode)
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
    });

    // Parameter transaksi minimal untuk Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId, // Harus unik
        gross_amount: Math.round(grossAmount) // Pastikan nilai integer dalam IDR
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName || '', // Tangani kemungkinan null/undefined
        email: email,
        phone: phone
      }
    };

    // Buat transaksi ke Midtrans
    const transaction = await snap.createTransaction(parameter);

    // Format data tambahan jika ada (misalnya position, institutionName, selectedTier, dll.)
    const extra =
      Object.keys(additionalData).length > 0
        ? `, Additional Data: ${JSON.stringify(additionalData)}`
        : '';
    // Format string data yang akan disimpan ke file data.txt
    const dataToSave = `Order ID: ${orderId}, Gross Amount: ${grossAmount}, Name: ${firstName} ${lastName || ''}, Email: ${email}, Phone: ${phone}${extra}, Token: ${transaction.token}\n`;
      axios.post('http://localhost:3000/api/tickets/booking', {
        orderId: orderId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        organization: additionalData.institutionName,
        position: additionalData.position,
        tierId: additionalData.selectedTier,
      });
    try {
      // Simpan data dengan menambahkan ke file data.txt (append mode)
      fs.appendFileSync(dataFilePath, dataToSave, 'utf8');
    } catch (fileError) {
      console.error('Error writing to file:', fileError);
      // Jika terjadi error saat penyimpanan file, kita tetap mengembalikan respon dari Midtrans
    }

    // Kembalikan respon ke client dengan token dan redirect_url dari Midtrans
    return NextResponse.json(
      { token: transaction.token, redirect_url: transaction.redirect_url },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown payment processing error';
    const errorCode = (error as any).httpStatusCode || 500;
    console.error('Midtrans Error:', error);
    return NextResponse.json(
      { error: errorMessage, details: (error as any).ApiResponse || {} },
      { status: errorCode }
    );
  }
}
