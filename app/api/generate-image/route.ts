import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    // Map goals to beautiful fitness images
    const fitnessImages: { [key: string]: string } = {
      'weight loss': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'muscle gain': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      'general fitness': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'endurance': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
      'flexibility': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      'strength': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      'default': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    };

    // Default image
    let selectedImage = fitnessImages['default'];
    
    // Check if prompt exists and match goal
    if (prompt && typeof prompt === 'string') {
      const lowerPrompt = prompt.toLowerCase();
      
      for (const [goal, imageUrl] of Object.entries(fitnessImages)) {
        if (lowerPrompt.includes(goal)) {
          selectedImage = imageUrl;
          break;
        }
      }
    }

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      image: selectedImage
    });
    
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
    });
  }
}