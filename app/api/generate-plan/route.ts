import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age, gender, height, weight, goal, level } = body;

    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate personalized plan based on goal and level
    const workoutPlans: any = {
      'weight loss': {
        beginner: [
          { exercise: "Brisk Walking", duration: "30 minutes", sets: "-", reps: "-" },
          { exercise: "Bodyweight Squats", duration: "10 minutes", sets: "3", reps: "12" },
          { exercise: "Push-ups (Modified)", duration: "5 minutes", sets: "3", reps: "8" },
          { exercise: "Plank Hold", duration: "3 minutes", sets: "3", reps: "30 sec" },
          { exercise: "Jumping Jacks", duration: "10 minutes", sets: "3", reps: "20" }
        ],
        intermediate: [
          { exercise: "Running", duration: "30 minutes", sets: "-", reps: "-" },
          { exercise: "Burpees", duration: "15 minutes", sets: "4", reps: "15" },
          { exercise: "Mountain Climbers", duration: "10 minutes", sets: "4", reps: "20" },
          { exercise: "Jump Squats", duration: "10 minutes", sets: "4", reps: "15" },
          { exercise: "High Knees", duration: "10 minutes", sets: "4", reps: "30 sec" }
        ],
        advanced: [
          { exercise: "HIIT Sprints", duration: "25 minutes", sets: "6", reps: "30 sec" },
          { exercise: "Box Jumps", duration: "15 minutes", sets: "5", reps: "15" },
          { exercise: "Burpee Pull-ups", duration: "15 minutes", sets: "5", reps: "12" },
          { exercise: "Kettlebell Swings", duration: "15 minutes", sets: "5", reps: "20" },
          { exercise: "Battle Ropes", duration: "10 minutes", sets: "5", reps: "45 sec" }
        ]
      },
      'muscle gain': {
        beginner: [
          { exercise: "Dumbbell Bench Press", duration: "15 minutes", sets: "3", reps: "10" },
          { exercise: "Dumbbell Rows", duration: "15 minutes", sets: "3", reps: "10" },
          { exercise: "Goblet Squats", duration: "15 minutes", sets: "3", reps: "12" },
          { exercise: "Shoulder Press", duration: "12 minutes", sets: "3", reps: "10" },
          { exercise: "Bicep Curls", duration: "10 minutes", sets: "3", reps: "12" }
        ],
        intermediate: [
          { exercise: "Barbell Bench Press", duration: "20 minutes", sets: "4", reps: "8" },
          { exercise: "Deadlifts", duration: "20 minutes", sets: "4", reps: "8" },
          { exercise: "Barbell Squats", duration: "20 minutes", sets: "4", reps: "8" },
          { exercise: "Pull-ups", duration: "15 minutes", sets: "4", reps: "10" },
          { exercise: "Dips", duration: "12 minutes", sets: "4", reps: "10" }
        ],
        advanced: [
          { exercise: "Heavy Bench Press", duration: "25 minutes", sets: "5", reps: "5" },
          { exercise: "Heavy Deadlifts", duration: "25 minutes", sets: "5", reps: "5" },
          { exercise: "Heavy Squats", duration: "25 minutes", sets: "5", reps: "5" },
          { exercise: "Weighted Pull-ups", duration: "20 minutes", sets: "5", reps: "8" },
          { exercise: "Weighted Dips", duration: "15 minutes", sets: "5", reps: "8" }
        ]
      },
      'general fitness': {
        beginner: [
          { exercise: "Walking", duration: "30 minutes", sets: "-", reps: "-" },
          { exercise: "Bodyweight Squats", duration: "10 minutes", sets: "3", reps: "15" },
          { exercise: "Push-ups", duration: "8 minutes", sets: "3", reps: "10" },
          { exercise: "Lunges", duration: "10 minutes", sets: "3", reps: "10 each" },
          { exercise: "Plank", duration: "5 minutes", sets: "3", reps: "30 sec" }
        ],
        intermediate: [
          { exercise: "Jogging", duration: "30 minutes", sets: "-", reps: "-" },
          { exercise: "Jump Squats", duration: "12 minutes", sets: "4", reps: "15" },
          { exercise: "Diamond Push-ups", duration: "10 minutes", sets: "4", reps: "12" },
          { exercise: "Walking Lunges", duration: "12 minutes", sets: "4", reps: "15 each" },
          { exercise: "Side Plank", duration: "8 minutes", sets: "4", reps: "45 sec each" }
        ],
        advanced: [
          { exercise: "Running", duration: "40 minutes", sets: "-", reps: "-" },
          { exercise: "Pistol Squats", duration: "15 minutes", sets: "5", reps: "10 each" },
          { exercise: "One-Arm Push-ups", duration: "12 minutes", sets: "5", reps: "8 each" },
          { exercise: "Bulgarian Split Squats", duration: "15 minutes", sets: "5", reps: "12 each" },
          { exercise: "Plank to Push-up", duration: "10 minutes", sets: "5", reps: "15" }
        ]
      },
      'endurance': {
        beginner: [
          { exercise: "Light Jogging", duration: "20 minutes", sets: "-", reps: "-" },
          { exercise: "Cycling", duration: "25 minutes", sets: "-", reps: "-" },
          { exercise: "Jump Rope", duration: "10 minutes", sets: "3", reps: "1 min" },
          { exercise: "Step-ups", duration: "12 minutes", sets: "3", reps: "15 each" },
          { exercise: "Arm Circles", duration: "5 minutes", sets: "3", reps: "30 sec" }
        ],
        intermediate: [
          { exercise: "Steady Running", duration: "35 minutes", sets: "-", reps: "-" },
          { exercise: "Rowing Machine", duration: "20 minutes", sets: "-", reps: "-" },
          { exercise: "Box Step-ups", duration: "15 minutes", sets: "4", reps: "20 each" },
          { exercise: "Burpees", duration: "12 minutes", sets: "4", reps: "15" },
          { exercise: "Mountain Climbers", duration: "10 minutes", sets: "4", reps: "30 sec" }
        ],
        advanced: [
          { exercise: "Long Distance Running", duration: "50 minutes", sets: "-", reps: "-" },
          { exercise: "Swimming", duration: "30 minutes", sets: "-", reps: "-" },
          { exercise: "HIIT Intervals", duration: "20 minutes", sets: "8", reps: "1 min" },
          { exercise: "Stair Climbing", duration: "25 minutes", sets: "-", reps: "-" },
          { exercise: "Jump Rope Advanced", duration: "15 minutes", sets: "5", reps: "2 min" }
        ]
      },
      'flexibility': {
        beginner: [
          { exercise: "Basic Stretching", duration: "20 minutes", sets: "2", reps: "30 sec each" },
          { exercise: "Yoga Sun Salutations", duration: "15 minutes", sets: "3", reps: "5" },
          { exercise: "Hip Flexor Stretch", duration: "10 minutes", sets: "3", reps: "45 sec each" },
          { exercise: "Hamstring Stretch", duration: "10 minutes", sets: "3", reps: "45 sec each" },
          { exercise: "Shoulder Rolls", duration: "5 minutes", sets: "3", reps: "20" }
        ],
        intermediate: [
          { exercise: "Dynamic Stretching", duration: "25 minutes", sets: "3", reps: "45 sec each" },
          { exercise: "Yoga Flow", duration: "30 minutes", sets: "-", reps: "-" },
          { exercise: "Pigeon Pose", duration: "12 minutes", sets: "3", reps: "1 min each" },
          { exercise: "Splits Practice", duration: "15 minutes", sets: "3", reps: "1 min" },
          { exercise: "Back Bends", duration: "10 minutes", sets: "3", reps: "30 sec" }
        ],
        advanced: [
          { exercise: "Advanced Yoga", duration: "45 minutes", sets: "-", reps: "-" },
          { exercise: "Full Splits", duration: "20 minutes", sets: "4", reps: "2 min each" },
          { exercise: "Contortion Training", duration: "25 minutes", sets: "4", reps: "1 min each" },
          { exercise: "Deep Back Bends", duration: "15 minutes", sets: "4", reps: "1 min" },
          { exercise: "Advanced Hip Openers", duration: "20 minutes", sets: "4", reps: "90 sec each" }
        ]
      },
      'strength': {
        beginner: [
          { exercise: "Bodyweight Squats", duration: "12 minutes", sets: "3", reps: "15" },
          { exercise: "Wall Push-ups", duration: "10 minutes", sets: "3", reps: "12" },
          { exercise: "Assisted Pull-ups", duration: "10 minutes", sets: "3", reps: "8" },
          { exercise: "Dumbbell Rows", duration: "12 minutes", sets: "3", reps: "10" },
          { exercise: "Plank Hold", duration: "6 minutes", sets: "3", reps: "30 sec" }
        ],
        intermediate: [
          { exercise: "Barbell Squats", duration: "20 minutes", sets: "4", reps: "10" },
          { exercise: "Bench Press", duration: "20 minutes", sets: "4", reps: "10" },
          { exercise: "Pull-ups", duration: "15 minutes", sets: "4", reps: "8" },
          { exercise: "Overhead Press", duration: "15 minutes", sets: "4", reps: "10" },
          { exercise: "Deadlifts", duration: "20 minutes", sets: "4", reps: "8" }
        ],
        advanced: [
          { exercise: "Heavy Squats", duration: "30 minutes", sets: "5", reps: "5" },
          { exercise: "Heavy Bench Press", duration: "30 minutes", sets: "5", reps: "5" },
          { exercise: "Weighted Pull-ups", duration: "20 minutes", sets: "5", reps: "6" },
          { exercise: "Heavy Deadlifts", duration: "30 minutes", sets: "5", reps: "5" },
          { exercise: "Power Cleans", duration: "25 minutes", sets: "5", reps: "5" }
        ]
      }
    };

    const nutritionPlans: any = {
      'weight loss': [
        { meal: "Breakfast", food: "Oatmeal with berries and almonds", calories: "350 kcal", protein: "12g" },
        { meal: "Mid-Morning Snack", food: "Greek yogurt with honey", calories: "150 kcal", protein: "15g" },
        { meal: "Lunch", food: "Grilled chicken salad with olive oil", calories: "450 kcal", protein: "35g" },
        { meal: "Afternoon Snack", food: "Apple with peanut butter", calories: "200 kcal", protein: "8g" },
        { meal: "Dinner", food: "Baked salmon with steamed vegetables", calories: "500 kcal", protein: "40g" }
      ],
      'muscle gain': [
        { meal: "Breakfast", food: "Scrambled eggs with whole wheat toast and avocado", calories: "550 kcal", protein: "30g" },
        { meal: "Mid-Morning Snack", food: "Protein shake with banana", calories: "350 kcal", protein: "35g" },
        { meal: "Lunch", food: "Grilled chicken breast with brown rice and broccoli", calories: "650 kcal", protein: "50g" },
        { meal: "Afternoon Snack", food: "Cottage cheese with almonds", calories: "300 kcal", protein: "25g" },
        { meal: "Dinner", food: "Lean beef steak with sweet potato and green beans", calories: "700 kcal", protein: "55g" }
      ],
      'general fitness': [
        { meal: "Breakfast", food: "Whole grain cereal with milk and banana", calories: "400 kcal", protein: "15g" },
        { meal: "Mid-Morning Snack", food: "Mixed nuts and dried fruit", calories: "200 kcal", protein: "8g" },
        { meal: "Lunch", food: "Turkey sandwich with vegetables", calories: "500 kcal", protein: "30g" },
        { meal: "Afternoon Snack", food: "Hummus with carrot sticks", calories: "180 kcal", protein: "6g" },
        { meal: "Dinner", food: "Grilled fish with quinoa and roasted vegetables", calories: "550 kcal", protein: "38g" }
      ],
      'endurance': [
        { meal: "Breakfast", food: "Banana pancakes with maple syrup", calories: "450 kcal", protein: "18g" },
        { meal: "Mid-Morning Snack", food: "Energy bar with dates", calories: "220 kcal", protein: "10g" },
        { meal: "Lunch", food: "Pasta with lean turkey meatballs", calories: "600 kcal", protein: "35g" },
        { meal: "Afternoon Snack", food: "Trail mix with dark chocolate", calories: "250 kcal", protein: "8g" },
        { meal: "Dinner", food: "Chicken stir-fry with brown rice", calories: "580 kcal", protein: "42g" }
      ],
      'flexibility': [
        { meal: "Breakfast", food: "Smoothie bowl with chia seeds and fruits", calories: "380 kcal", protein: "14g" },
        { meal: "Mid-Morning Snack", food: "Almond butter on rice cakes", calories: "190 kcal", protein: "7g" },
        { meal: "Lunch", food: "Buddha bowl with tofu and vegetables", calories: "480 kcal", protein: "22g" },
        { meal: "Afternoon Snack", food: "Fresh fruit salad", calories: "150 kcal", protein: "3g" },
        { meal: "Dinner", food: "Grilled salmon with asparagus and quinoa", calories: "520 kcal", protein: "40g" }
      ],
      'strength': [
        { meal: "Breakfast", food: "Steak and eggs with whole grain toast", calories: "600 kcal", protein: "45g" },
        { meal: "Mid-Morning Snack", food: "Protein shake with peanut butter", calories: "380 kcal", protein: "40g" },
        { meal: "Lunch", food: "Double chicken breast with rice and vegetables", calories: "750 kcal", protein: "65g" },
        { meal: "Afternoon Snack", food: "Greek yogurt with granola and honey", calories: "320 kcal", protein: "28g" },
        { meal: "Dinner", food: "Grilled ribeye with loaded sweet potato", calories: "800 kcal", protein: "60g" }
      ]
    };

    // Get appropriate plan based on goal and level
    const goalKey = goal.toLowerCase();
    const levelKey = level.toLowerCase();
    
    let workout = workoutPlans[goalKey]?.[levelKey] || workoutPlans['general fitness']['beginner'];
    let nutrition = nutritionPlans[goalKey] || nutritionPlans['general fitness'];

    const motivations: any = {
      'weight loss': `${name}, every step counts! You're on a journey to a healthier, lighter you. Stay consistent! 🔥`,
      'muscle gain': `${name}, gains are made in the kitchen and the gym! Keep lifting heavy and eating right! 💪`,
      'general fitness': `${name}, fitness is a lifestyle, not a destination. You're doing amazing! 🌟`,
      'endurance': `${name}, push your limits! Every mile makes you stronger! 🏃`,
      'flexibility': `${name}, flexibility is the key to longevity. Keep stretching! 🧘`,
      'strength': `${name}, strength doesn't come from what you can do, it comes from overcoming what you thought you couldn't! 💯`
    };

    const plan = {
      workout,
      nutrition,
      motivation: motivations[goalKey] || `${name}, you've got this! Stay committed to your fitness journey! 🎯`
    };

    return NextResponse.json(plan);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate plan' },
      { status: 500 }
    );
  }
}