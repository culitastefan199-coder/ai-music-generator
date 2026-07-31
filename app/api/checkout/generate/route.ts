import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt-ul este obligatoriu' }, { status: 400 });
    }

    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

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
