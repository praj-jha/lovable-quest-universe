
import { Calculator, ShoppingCart, Utensils, Microscope, Leaf, Book, PaintBucket, Map, Home, Globe } from 'lucide-react';

// Extend the type to match the implementation we're using
export type FamilyQuestProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  subjects: string[];
  duration: string;
  members: string;
  difficulty: string;
  xp: number;
  progress: number;
  icon: React.ReactNode;
  deadline: string;
  isNew?: boolean;
  isLocked?: boolean;
};

export const familyQuestsData: FamilyQuestProps[] = [
  {
    id: '1',
    title: 'Kitchen Math Master',
    description: 'Measure ingredients and calculate proportions with your family to make a delicious recipe together!',
    category: 'Weekly',
    subjects: ['Math', 'Home Science'],
    duration: '45 min',
    members: '2+',
    difficulty: 'Easy',
    xp: 50,
    progress: 25,
    icon: <Utensils size={20} />,
    deadline: 'Sunday',
    isNew: true,
  },
  {
    id: '2',
    title: 'Plan a ₹500 Family Outing',
    description: 'Create a budget for a family day out. Compare prices, calculate expenses, and make decisions together!',
    category: 'Weekly',
    subjects: ['Math', 'Economics'],
    duration: '60 min',
    members: 'All',
    difficulty: 'Medium',
    xp: 75,
    progress: 0,
    icon: <ShoppingCart size={20} />,
    deadline: 'Monday',
  },
  {
    id: '3',
    title: 'Plant a Family Garden',
    description: 'Learn about plant life cycles, measure growth, and document your observations as a family science project!',
    category: 'Monthly',
    subjects: ['Science', 'Environmental Studies'],
    duration: '2-4 weeks',
    members: '2+',
    difficulty: 'Medium',
    xp: 150,
    progress: 0,
    icon: <Leaf size={20} />,
    deadline: 'Next Month',
  },
  {
    id: '4',
    title: 'Home Science Lab',
    description: 'Conduct simple experiments at home with everyday materials. Learn scientific principles as a family!',
    category: 'Premium',
    subjects: ['Science', 'Chemistry'],
    duration: '90 min',
    members: '2+',
    difficulty: 'Hard',
    xp: 100,
    progress: 0,
    icon: <Microscope size={20} />,
    deadline: 'Next Week',
    isLocked: true,
  },
  {
    id: '5',
    title: 'Family Book Club',
    description: 'Read a short story together and discuss its themes, characters, and lessons as a family reading circle.',
    category: 'Weekly',
    subjects: ['Language', 'Literature'],
    duration: '30 min',
    members: 'All',
    difficulty: 'Easy',
    xp: 60,
    progress: 0,
    icon: <Book size={20} />,
    deadline: 'Saturday',
  },
  {
    id: '6',
    title: 'Art from Waste',
    description: 'Create art projects using recyclable materials from home, teaching sustainability and creativity.',
    category: 'Weekly',
    subjects: ['Art', 'Environmental Studies'],
    duration: '60 min',
    members: '2+',
    difficulty: 'Easy',
    xp: 70,
    progress: 0,
    icon: <PaintBucket size={20} />,
    deadline: 'Thursday',
    isNew: true,
  },
  {
    id: '7',
    title: 'Neighborhood Map Explorer',
    description: 'Create a detailed map of your neighborhood, marking important landmarks and measuring distances.',
    category: 'Monthly',
    subjects: ['Geography', 'Math'],
    duration: '120 min',
    members: '2+',
    difficulty: 'Medium',
    xp: 90,
    progress: 0,
    icon: <Map size={20} />,
    deadline: 'Next Month',
  },
  {
    id: '8',
    title: 'Family Heritage Project',
    description: 'Research your family history together and create a family tree with stories from different generations.',
    category: 'Premium',
    subjects: ['History', 'Language'],
    duration: '3-5 hours',
    members: 'All',
    difficulty: 'Hard',
    xp: 120,
    progress: 0,
    icon: <Home size={20} />,
    deadline: '2 Weeks',
    isLocked: true,
  },
  {
    id: '9',
    title: 'Cultural Festival Celebration',
    description: 'Learn about a different culture by cooking traditional food, creating crafts and learning basic phrases.',
    category: 'Monthly',
    subjects: ['Social Studies', 'Language'],
    duration: '1 day',
    members: 'All',
    difficulty: 'Medium',
    xp: 100,
    progress: 0,
    icon: <Globe size={20} />,
    deadline: 'This month',
  }
];
