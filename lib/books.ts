export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  chapters: Chapter[];
  summary: string;
}

export interface Chapter {
  number: number;
  title: string;
  content: string;
}

export const books: Book[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Tiny changes, remarkable results. Build better habits and break bad ones.',
    coverImage: 'https://via.placeholder.com/300x400/3B82F6/ffffff?text=Atomic+Habits',
    summary: 'Atomic Habits by James Clear is a comprehensive guide on building good habits and breaking bad ones. The book emphasizes that small changes can lead to remarkable results. Clear introduces the Four Laws of Behavior Change: make it obvious, make it attractive, make it easy, and make it satisfying. The book teaches that habits are the compound interest of self-improvement, and by focusing on systems rather than goals, we can achieve lasting change.',
    chapters: [
      {
        number: 1,
        title: 'The Surprising Power of Atomic Habits',
        content: 'Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them. They seem to make little difference on any given day and yet the impact they deliver over the months and years can be enormous. It is only when looking back two, five, or perhaps ten years later that the value of good habits and the cost of bad ones becomes strikingly apparent. Success is the product of daily habits—not once-in-a-lifetime transformations. Your outcomes are a lagging measure of your habits. Time magnifies the margin between success and failure. It will multiply whatever you feed it. Good habits make time your ally. Bad habits make time your enemy.'
      },
      {
        number: 2,
        title: 'How Your Habits Shape Your Identity',
        content: 'There are three layers of behavior change: a change in your outcomes, a change in your processes, or a change in your identity. The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become. Your identity emerges out of your habits. Every action is a vote for the type of person you wish to become. Becoming the best version of yourself requires you to continuously edit your beliefs, and to upgrade and expand your identity. The real reason habits matter is not because they can get you better results, but because they can change your beliefs about yourself.'
      },
      {
        number: 3,
        title: 'How to Build Better Habits in 4 Simple Steps',
        content: 'A habit is a behavior that has been repeated enough times to become automatic. The process of habit formation begins with trial and error. Whenever you encounter a new situation in life, your brain has to make a decision. The Four Laws of Behavior Change are a simple set of rules we can use to build better habits. They are: (1) make it obvious, (2) make it attractive, (3) make it easy, and (4) make it satisfying. The purpose of every habit is to solve the problems you face. Understanding the cue that triggers a habit is the first step to changing it.'
      }
    ]
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'Follow your dreams and listen to your heart on this magical journey of self-discovery.',
    coverImage: 'https://via.placeholder.com/300x400/8B5CF6/ffffff?text=The+Alchemist',
    summary: 'The Alchemist tells the story of Santiago, an Andalusian shepherd boy who yearns to travel in search of treasure. He has a recurring dream about finding treasure at the Egyptian pyramids. The story teaches us about following our Personal Legend, listening to our hearts, and recognizing omens along the way. Paulo Coelho emphasizes that when you want something, all the universe conspires in helping you achieve it. The journey itself is as important as the destination, and the treasure we seek may be closer than we think.',
    chapters: [
      {
        number: 1,
        title: 'The Dream',
        content: 'Santiago is an Andalusian shepherd who has been having a recurring dream about finding treasure at the Egyptian pyramids. He decides to consult a gypsy woman who tells him that dreams about treasure mean he will find treasure. The boy meets a mysterious old king named Melchizedek who tells him about Personal Legends—what you have always wanted to accomplish. The king explains that everyone has a Personal Legend, but as people grow older, they become blind to them. When you want something, all the universe conspires in helping you achieve it. The king gives Santiago two stones, Urim and Thummim, to help him make decisions.'
      },
      {
        number: 2,
        title: 'The Journey Begins',
        content: 'Santiago sells his sheep and travels to Tangier, Africa. He is immediately robbed of all his money but decides not to give up on his Personal Legend. He finds work at a crystal shop, where he spends nearly a year. During this time, he learns about the Soul of the World and the Language of the World—the idea that all things are connected. The crystal merchant dreams of going to Mecca but never takes action. Santiago realizes that people often give up on their Personal Legends because they fear failure or success. He saves enough money to continue his journey to the pyramids.'
      },
      {
        number: 3,
        title: 'The Alchemist',
        content: 'Santiago joins a caravan crossing the Sahara Desert. He meets an Englishman studying to become an alchemist. They eventually meet the Alchemist himself, a powerful figure who teaches Santiago to listen to his heart and recognize omens. The Alchemist explains that everyone has a treasure waiting for them, but most people give up just before finding it. Santiago falls in love with Fatima, a girl at the oasis, but the Alchemist encourages him to continue his journey. At the pyramids, Santiago is beaten by thieves who mockingly tell him about their own recurring dream—about treasure buried under a sycamore tree in Spain. Santiago realizes the treasure was back home all along, where his journey began.'
      }
    ]
  },
  {
    id: 'rich-dad-poor-dad',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    description: 'What the rich teach their kids about money that the poor and middle class do not.',
    coverImage: 'https://via.placeholder.com/300x400/10B981/ffffff?text=Rich+Dad+Poor+Dad',
    summary: 'Rich Dad Poor Dad challenges conventional wisdom about money and investing. Robert Kiyosaki had two father figures: his biological father (Poor Dad) who was highly educated but financially struggled, and his best friend\'s father (Rich Dad) who built wealth through financial education and investing. The book teaches the importance of financial literacy, understanding assets vs. liabilities, making money work for you, and building passive income streams. It emphasizes that true wealth comes from owning assets that generate income, not from working for money.',
    chapters: [
      {
        number: 1,
        title: 'The Rich Don\'t Work for Money',
        content: 'Robert Kiyosaki introduces his two dads: his biological father (Poor Dad) who believed in getting a good education and working for money, and his best friend\'s father (Rich Dad) who believed in financial education and making money work for you. Rich Dad teaches that the poor and middle class work for money, while the rich have money work for them. Fear and greed drive most people\'s financial decisions. The key is to control emotions and use them to your advantage. Working for money is a temporary solution; learning how to have money work for you is the real path to wealth. Most people accept a life of working for money because they are driven by fear and greed.'
      },
      {
        number: 2,
        title: 'Why Teach Financial Literacy',
        content: 'Financial literacy is the foundation of wealth building. Rule #1: You must know the difference between an asset and a liability, and buy assets. An asset puts money in your pocket. A liability takes money out of your pocket. The rich acquire assets. The poor and middle class acquire liabilities that they think are assets. Your house is not an asset—it\'s a liability that takes money from your pocket through mortgage payments, taxes, and maintenance. Real assets include businesses that don\'t require your presence, stocks, bonds, real estate that generates rental income, notes (IOUs), royalties from intellectual property, and anything else that generates income, appreciates in value, and has a ready market.'
      },
      {
        number: 3,
        title: 'Mind Your Own Business',
        content: 'Keep your day job, but start buying real assets. The rich focus on their asset column while everyone else focuses on their income statement. Minding your own business means building and keeping your asset column strong. Most people confuse their profession with their business. Your business revolves around your asset column, not your income column. Start acquiring assets that you love, so you will take care of them and help them grow. For adults, keep your expenses low, reduce your liabilities, and diligently build a base of solid assets. Real assets fall into several categories: businesses that do not require your presence, stocks, bonds, mutual funds, income-generating real estate, notes, royalties from intellectual property, and anything else that has value, produces income or appreciates, and has a ready market.'
      }
    ]
  },
  {
    id: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'Explore the two systems that drive the way we think and make decisions.',
    coverImage: 'https://via.placeholder.com/300x400/F59E0B/ffffff?text=Thinking+Fast+Slow',
    summary: 'Nobel Prize winner Daniel Kahneman explores the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. The book explores how these systems shape our judgments and decisions, revealing where we can trust our intuitions and when we need to be wary of cognitive biases. Kahneman shows how our minds are prone to systematic errors and how understanding these can help us make better decisions in business, health, and personal life.',
    chapters: [
      {
        number: 1,
        title: 'Two Systems',
        content: 'System 1 operates automatically and quickly, with little or no effort and no sense of voluntary control. System 2 allocates attention to the effortful mental activities that demand it, including complex computations. The operations of System 2 are often associated with the subjective experience of agency, choice, and concentration. System 1 continuously generates suggestions for System 2: impressions, intuitions, intentions, and feelings. When System 1 runs into difficulty, it calls on System 2 to support more detailed and specific processing that may solve the problem. System 2 is activated when an event violates the model of the world that System 1 maintains. The division of labor between System 1 and System 2 is highly efficient: it minimizes effort and optimizes performance.'
      },
      {
        number: 2,
        title: 'Attention and Effort',
        content: 'System 2 has limited capacity. When overloaded, it will fail to register information. Mental effort is distinctive and requires self-control. Activities that impose heavy demands on working memory require self-control, and exerting self-control is unpleasant. People who are cognitively busy are more likely to make selfish choices, use sexist language, and make superficial judgments. Self-control and cognitive effort are forms of mental work. One of the main functions of System 2 is to monitor and control thoughts and actions suggested by System 1, allowing some to be expressed directly in behavior and suppressing or modifying others. The gorilla study demonstrates inattentional blindness: when focused on counting basketball passes, many people fail to notice a gorilla walking through the scene.'
      },
      {
        number: 3,
        title: 'The Lazy Controller',
        content: 'System 2 is lazy and often endorses System 1\'s suggestions with minimal modification. People who are intellectually active are more likely to resist answering with the first idea that comes to mind and will check their intuitions more often. Intelligence is not only the ability to reason; it is also the ability to find relevant material in memory and to deploy attention when needed. The bat-and-ball problem illustrates how System 1 jumps to conclusions: if a bat and ball cost $1.10 in total, and the bat costs $1.00 more than the ball, how much does the ball cost? Many people immediately answer 10 cents, but the correct answer is 5 cents. This demonstrates how we often substitute difficult questions with easier ones without realizing it.'
      }
    ]
  },
  {
    id: 'the-power-of-now',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    description: 'A guide to spiritual enlightenment through living in the present moment.',
    coverImage: 'https://via.placeholder.com/300x400/EC4899/ffffff?text=Power+of+Now',
    summary: 'The Power of Now by Eckhart Tolle is a guide to spiritual enlightenment that emphasizes living in the present moment. Tolle argues that our greatest obstacle to happiness is our constant mental chatter about the past and future. By learning to quiet the mind and focus on the present moment—the Now—we can transcend our ego-based state of consciousness and find true peace and fulfillment. The book provides practical teachings on how to live in the present, overcome pain-body reactions, and transform consciousness.',
    chapters: [
      {
        number: 1,
        title: 'You Are Not Your Mind',
        content: 'The greatest obstacle to enlightenment is identification with your mind. Your mind is an instrument, a tool. It is there to be used for a specific task, and when the task is completed, you lay it down. The single most vital step on your journey toward enlightenment is this: learn to dis-identify from your mind. Every time you create a gap in the stream of mind, the light of your consciousness grows stronger. Thinking has become a disease. The mind is a superb instrument if used rightly. Used wrongly, however, it becomes very destructive. When you listen to a thought, you are aware not only of the thought but also of yourself as the witness of the thought. A new dimension of consciousness has arisen.'
      },
      {
        number: 2,
        title: 'Consciousness: The Way Out of Pain',
        content: 'All negativity is caused by an accumulation of psychological time and denial of the present. The pain that you create now is always some form of non-acceptance, some form of unconscious resistance to what is. On the level of thought, the resistance is some form of judgment. The intensity of the pain depends on the degree of resistance to the present moment. As long as you are unable to access the power of the Now, every emotional pain that you experience leaves behind a residue of pain that lives on in you. This accumulated pain forms an energy field that occupies your body and mind. If you look on it as an invisible entity in its own right, you are getting quite close to the truth. It is the emotional pain-body.'
      },
      {
        number: 3,
        title: 'Moving Deeply into the Now',
        content: 'Make the Now the primary focus of your life. Instead of dwelling in psychological time, have your life\'s focal point always be the present moment. Learn to use time in practical matters but immediately return to present-moment awareness when tasks are completed. This doesn\'t impair your ability to use time—past or future—when needed. The present moment is all you ever have. Nothing ever happened in the past; it happened in the Now. Nothing will ever happen in the future; it will happen in the Now. Clock time is not just making an appointment or planning a trip. It includes learning from the past and setting goals for the future. But the moment your focus shifts to the present moment, you rise above thought.'
      }
    ]
  }
];

export function getBookById(id: string): Book | undefined {
  return books.find(book => book.id === id);
}

export function getAllBooks(): Book[] {
  return books;
}
