import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pachet 50 Credite Generare Muzică',
              description: 'Generează 50 de melodii AI pe site',
            },
            unit_amount: 1000, // Preț: $10.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}?canceled=true`,
      metadata: {
        userId: userId,
        creditsToAdd: '50',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Conectare la Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt-ul este obligatoriu' }, { status: 400 });
    }

    // Exemplu URL melodie generată (aici se va conecta API-ul tău audio)
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    // SALVARE ÎN BAZA DE DATE SUPABASE 🚀
    const { data, error } = await supabase
      .from('songs')
      .insert([{ prompt: prompt, audio_url: audioUrl }])
      .select();

    if (error) {
      console.error('Eroare Supabase:', error);
    }

    return NextResponse.json({ 
      success: true, 
      audioUrl: audioUrl,
      songData: data 
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Eroare la generarea manelei' }, { status: 500 });
  }
}
