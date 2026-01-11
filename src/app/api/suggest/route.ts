import { NextResponse } from 'next/server';

  interface MoodData {
    songs: Array<{ title: string; artist: string }>;
    restaurants: Array<{ name: string; cuisine: string; vibe: string }>;
  }

  const moodSuggestions: Record<string, MoodData> = {
    happy: {
      songs: [
        { title: 'Take Five', artist: 'Dave Brubeck' },
        { title: 'Sing, Sing, Sing', artist: 'Benny Goodman' },
        { title: 'C Jam Blues', artist: 'Duke Ellington' },
        { title: 'Salt Peanuts', artist: 'Dizzy Gillespie' },
      ],
      restaurants: [
        { name: 'Port Said', cuisine: 'Mediterranean fusion', vibe: 'Lively bar with eclectic vibes and great cocktails' },
        { name: 'Taqueria', cuisine: 'Mexican', vibe: 'Energetic atmosphere with vibrant flavors' },
        { name: 'Pastel', cuisine: 'Brasserie', vibe: 'Buzzing brasserie with colorful dishes' },
        { name: 'Romano', cuisine: 'Italian', vibe: 'Upbeat Italian spot in Neve Tzedek' },
      ],
    },
    relaxed: {
      songs: [
        { title: 'Blue in Green', artist: 'Miles Davis' },
        { title: 'Flamenco Sketches', artist: 'Miles Davis' },
        { title: 'Naima', artist: 'John Coltrane' },
        { title: 'In a Sentimental Mood', artist: 'Duke Ellington & John Coltrane' },
      ],
      restaurants: [
        { name: 'Cafe Europa', cuisine: 'European', vibe: 'Quiet garden setting perfect for unwinding' },
        { name: 'Ouzeria', cuisine: 'Greek', vibe: 'Tranquil Greek taverna with Mediterranean charm' },
        { name: 'Dalida', cuisine: 'Mediterranean', vibe: 'Serene atmosphere overlooking the old port' },
        { name: 'Claro', cuisine: 'Mediterranean', vibe: 'Peaceful courtyard dining in Jaffa' },
      ],
    },
    romantic: {
      songs: [
        { title: 'Misty', artist: 'Erroll Garner' },
        { title: 'My Funny Valentine', artist: 'Chet Baker' },
        { title: 'The Nearness of You', artist: 'Norah Jones' },
        { title: 'La Vie en Rose', artist: 'Louis Armstrong' },
      ],
      restaurants: [
        { name: 'Mashya', cuisine: 'Contemporary', vibe: 'Intimate fine dining with innovative cuisine' },
        { name: 'Raphael', cuisine: 'French-Mediterranean', vibe: 'Romantic setting in a restored historic building' },
        { name: 'Taizu', cuisine: 'Asian fusion', vibe: 'Elegant atmosphere with stunning decor' },
        { name: 'Messa', cuisine: 'Mediterranean', vibe: 'Candlelit tables in a charming Jaffa setting' },
      ],
    },
    melancholy: {
      songs: [
        { title: 'Round Midnight', artist: 'Thelonious Monk' },
        { title: 'Goodbye Pork Pie Hat', artist: 'Charles Mingus' },
        { title: 'Detour Ahead', artist: 'Billie Holiday' },
        { title: 'I Fall in Love Too Easily', artist: 'Chet Baker' },
      ],
      restaurants: [
        { name: 'Shila', cuisine: 'Israeli', vibe: 'Contemplative space with soulful, honest food' },
        { name: 'HaBasta', cuisine: 'Market cuisine', vibe: 'Intimate counter seating with thoughtful dishes' },
        { name: 'Popina', cuisine: 'Modern Israeli', vibe: 'Quiet neighborhood spot with heartfelt cooking' },
        { name: 'Aria', cuisine: 'Contemporary', vibe: 'Reflective atmosphere in a boutique setting' },
      ],
    },
    adventurous: {
      songs: [
        { title: 'A Love Supreme', artist: 'John Coltrane' },
        { title: 'Birdland', artist: 'Weather Report' },
        { title: 'Spain', artist: 'Chick Corea' },
        { title: 'Chameleon', artist: 'Herbie Hancock' },
      ],
      restaurants: [
        { name: 'OCD', cuisine: 'Experimental', vibe: 'Bold, avant-garde tasting menu experience' },
        { name: 'Tasting Room', cuisine: 'Contemporary', vibe: 'Adventurous seasonal menu with creative twists' },
        { name: 'Bindella', cuisine: 'Italian fusion', vibe: 'Innovative takes on Italian classics' },
        { name: 'Yaffo Tel Aviv', cuisine: 'Modern Israeli', vibe: 'Daring flavors in a historic space' },
      ],
    },
    nostalgic: {
      songs: [
        { title: 'Autumn Leaves', artist: 'Bill Evans' },
        { title: 'What a Wonderful World', artist: 'Louis Armstrong' },
        { title: 'Georgia on My Mind', artist: 'Ray Charles' },
        { title: 'The Way You Look Tonight', artist: 'Frank Sinatra' },
      ],
      restaurants: [
        { name: 'Benedict', cuisine: 'Breakfast all day', vibe: 'Nostalgic comfort food in a cozy setting' },
        { name: 'Cafe Noir', cuisine: 'French bistro', vibe: 'Classic Parisian atmosphere in Tel Aviv' },
        { name: 'Mizlala', cuisine: 'Traditional Israeli', vibe: 'Homestyle cooking that brings back memories' },
        { name: 'Dallal', cuisine: 'Mediterranean', vibe: 'Charming garden cafe with timeless appeal' },
      ],
    },
    ilovesushi: {
      songs: [
        { title: 'Sukiyaki', artist: 'Toshiko Akiyoshi' },
        { title: 'Tokyo Blues', artist: 'Horace Silver' },
        { title: 'Giant Steps', artist: 'John Coltrane' },
        { title: 'Sakura Sakura', artist: 'Keiko Matsui' },
      ],
      restaurants: [
        { name: 'Yoko Kitchin', cuisine: 'Japanese', vibe: 'Authentic sushi bar with fresh fish and intimate seating' },
        { name: 'Meshek Barzilay', cuisine: 'Japanese fusion', vibe: 'Creative Japanese cuisine with local ingredients' },
        { name: 'Suzanna', cuisine: 'Japanese', vibe: 'Traditional sushi experience in the heart of Tel Aviv' },
        { name: 'Ouzeria', cuisine: 'Asian fusion', vibe: 'Contemporary Asian dining with excellent sashimi' },
      ],
    },
    partytime: {
      songs: [
        { title: 'In the Mood', artist: 'Glenn Miller' },
        { title: 'Jumpin\' at the Woodside', artist: 'Count Basie' },
        { title: 'Sing, Sing, Sing', artist: 'Benny Goodman' },
        { title: 'Cantaloupe Island', artist: 'Herbie Hancock' },
      ],
      restaurants: [
        { name: 'Teder', cuisine: 'Bar food', vibe: 'Wild nightlife spot with great drinks and party atmosphere' },
        { name: 'Kuli Alma', cuisine: 'Street food', vibe: 'Underground bar with live music and creative cocktails' },
        { name: 'Imperial Craft Cocktail Bar', cuisine: 'Cocktail bar', vibe: 'Upscale party venue with craft cocktails and DJ sets' },
        { name: 'The Block', cuisine: 'American', vibe: 'Lively bar scene with whiskey selection and late-night energy' },
      ],
    },
  };

  export async function POST(request: Request) {
    try {
      const { mood } = await request.json();

      if (!mood || !moodSuggestions[mood]) {
        return NextResponse.json(
          { error: 'Invalid mood provided' },
          { status: 400 }
        );
      }

      const moodData = moodSuggestions[mood];

      const randomSong = moodData.songs[Math.floor(Math.random() * moodData.songs.length)];
      const randomRestaurant = moodData.restaurants[Math.floor(Math.random() * moodData.restaurants.length)];

      return NextResponse.json({
        song: randomSong,
        restaurant: randomRestaurant,
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to process request' },
        { status: 500 }
      );
    }
  }
