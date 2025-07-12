// // questions.js

// function assignRandomCorrectAnswer(questions) {
//   return questions.map(q => {
//     const randomIndex = Math.floor(Math.random() * q.options.length);
//     return {
//       ...q,
//       correctAnswer: q.options[randomIndex]
//     };
//   });
// }

// export const beginnerQuestions = assignRandomCorrectAnswer([
//  {
//     question: "What's the opposite of 'big'?",
//     options: ['Small', 'Large', 'Huge', 'Tall'],
//     correctAnswer: 'Small'
//   },
//   {
//     question: "Choose the correct article: ___ book",
//     options: ['A', 'An', 'The', 'No article'],
//     correctAnswer: 'A'
//   },
//   {
//     question: "What color is the sky on a clear day?",
//     options: ['Red', 'Blue', 'Green', 'Yellow'],
//     correctAnswer: 'Blue'
//   },
//   {
//     question: "How many days are in a week?",
//     options: ['Five', 'Six', 'Seven', 'Eight'],
//     correctAnswer: 'Seven'
//   },
//   {
//     question: "What is 2 + 3?",
//     options: ['4', '5', '6', '7'],
//     correctAnswer: '5'
//   },
//   {
//     question: "Which animal is known as man's best friend?",
//     options: ['Cat', 'Dog', 'Bird', 'Fish'],
//     correctAnswer: 'Dog'
//   },
//   {
//     question: "What is the plural of 'cat'?",
//     options: ['Cats', 'Cat', 'Cates', 'Catses'],
//     correctAnswer: 'Cats'
//   },
//   {
//     question: "Choose the correct verb: I ___ happy.",
//     options: ['Am', 'Is', 'Are', 'Be'],
//     correctAnswer: 'Am'
//   },
//   {
//     question: "What is the opposite of 'up'?",
//     options: ['Down', 'Left', 'Right', 'Top'],
//     correctAnswer: 'Down'
//   },
//   {
//     question: "What do you use to write on a blackboard?",
//     options: ['Pen', 'Pencil', 'Chalk', 'Marker'],
//     correctAnswer: 'Chalk'
//   },
//   {
//     question: "What is the first letter of the alphabet?",
//     options: ['A', 'B', 'C', 'D'],
//     correctAnswer: 'A'
//   },
//   {
//     question: "Which fruit is yellow and shaped like a crescent?",
//     options: ['Apple', 'Banana', 'Orange', 'Grape'],
//     correctAnswer: 'Banana'
//   },
//   {
//     question: "What is the opposite of 'night'?",
//     options: ['Morning', 'Day', 'Evening', 'Afternoon'],
//     correctAnswer: 'Day'
//   },
//   {
//     question: "How many legs does a spider have?",
//     options: ['Six', 'Eight', 'Four', 'Ten'],
//     correctAnswer: 'Eight'
//   },
//   {
//     question: "What is the capital city of France?",
//     options: ['Paris', 'London', 'Berlin', 'Rome'],
//     correctAnswer: 'Paris'
//   },
//   {
//     question: "What do you wear on your head?",
//     options: ['Shoes', 'Hat', 'Gloves', 'Socks'],
//     correctAnswer: 'Hat'
//   },
//   {
//     question: "Which season comes after summer?",
//     options: ['Winter', 'Spring', 'Summer', 'Fall'],
//     correctAnswer: 'Fall'
//   },
//   {
//     question: "What is 10 - 4?",
//     options: ['5', '6', '7', '8'],
//     correctAnswer: '6'
//   },
//   {
//     question: "What is the opposite of 'fast'?",
//     options: ['Slow', 'Quick', 'Rapid', 'Hurry'],
//     correctAnswer: 'Slow'
//   },
//   {
//     question: "What is the plural of 'child'?",
//     options: ['Childs', 'Children', 'Childes', 'Child'],
//     correctAnswer: 'Children'
//   },
//   {
//     question: "Which planet do we live on?",
//     options: ['Mars', 'Jupiter', 'Earth', 'Venus'],
//     correctAnswer: 'Earth'
//   },
//   {
//     question: "What do bees make?",
//     options: ['Milk', 'Honey', 'Sugar', 'Salt'],
//     correctAnswer: 'Honey'
//   },
//   {
//     question: "What is the opposite of 'open'?",
//     options: ['Close', 'Start', 'Begin', 'Enter'],
//     correctAnswer: 'Close'
//   },
//   {
//     question: "What is the shape of a circle?",
//     options: ['Square', 'Round', 'Triangle', 'Rectangle'],
//     correctAnswer: 'Round'
//   },
//   {
//     question: "What do you drink water from?",
//     options: ['Plate', 'Bowl', 'Glass', 'Spoon'],
//     correctAnswer: 'Glass'
//   },
//   {
//     question: "What is the opposite of 'happy'?",
//     options: ['Sad', 'Joyful', 'Excited', 'Proud'],
//     correctAnswer: 'Sad'
//   },
//   {
//     question: "How many months are in a year?",
//     options: ['10', '11', '12', '13'],
//     correctAnswer: '12'
//   },
//   {
//     question: "What is the opposite of 'wet'?",
//     options: ['Dry', 'Cold', 'Hot', 'Soft'],
//     correctAnswer: 'Dry'
//   },
//   {
//     question: "Which animal has a long neck?",
//     options: ['Elephant', 'Giraffe', 'Lion', 'Tiger'],
//     correctAnswer: 'Giraffe'
//   },
//   {
//     question: "What is 3 x 2?",
//     options: ['5', '6', '7', '8'],
//     correctAnswer: '6'
//   },
//   {
//     question: "What do you use to cut paper?",
//     options: ['Knife', 'Scissors', 'Spoon', 'Fork'],
//     correctAnswer: 'Scissors'
//   },
//   {
//     question: "What is the opposite of 'light'?",
//     options: ['Dark', 'Bright', 'Shiny', 'Clear'],
//     correctAnswer: 'Dark'
//   },
//   {
//     question: "What is the plural of 'foot'?",
//     options: ['Foots', 'Feet', 'Footes', 'Foot'],
//     correctAnswer: 'Feet'
//   },
//   {
//     question: "Which bird can fly?",
//     options: ['Penguin', 'Ostrich', 'Eagle', 'Emu'],
//     correctAnswer: 'Eagle'
//   },
//   {
//     question: "What is the opposite of 'in'?",
//     options: ['Out', 'Up', 'Down', 'Over'],
//     correctAnswer: 'Out'
//   },
//   {
//     question: "What do you sleep on?",
//     options: ['Table', 'Chair', 'Bed', 'Desk'],
//     correctAnswer: 'Bed'
//   },
//   {
//     question: "What is 5 + 5?",
//     options: ['9', '10', '11', '12'],
//     correctAnswer: '10'
//   },
//   {
//     question: "What is the opposite of 'old'?",
//     options: ['Young', 'Ancient', 'Elderly', 'Mature'],
//     correctAnswer: 'Young'
//   },
//   {
//     question: "Which fruit is red and round?",
//     options: ['Banana', 'Apple', 'Grape', 'Lemon'],
//     correctAnswer: 'Apple'
//   },
//   {
//     question: "What is the opposite of 'high'?",
//     options: ['Low', 'Tall', 'Long', 'Short'],
//     correctAnswer: 'Low'
//   },
//   {
//     question: "What do you use to eat soup?",
//     options: ['Fork', 'Spoon', 'Knife', 'Chopsticks'],
//     correctAnswer: 'Spoon'
//   },
//   {
//     question: "What is the plural of 'mouse'?",
//     options: ['Mouses', 'Mice', 'Mouse', 'Mices'],
//     correctAnswer: 'Mice'
//   },
//   {
//     question: "What is the opposite of 'on'?",
//     options: ['Off', 'Up', 'Down', 'Over'],
//     correctAnswer: 'Off'
//   },
//   {
//     question: "Which animal lives in water?",
//     options: ['Dog', 'Cat', 'Fish', 'Bird'],
//     correctAnswer: 'Fish'
//   },
//   {
//     question: "What is 8 - 3?",
//     options: ['4', '5', '6', '7'],
//     correctAnswer: '5'
//   },
//   {
//     question: "What is the opposite of 'long'?",
//     options: ['Short', 'Tall', 'Wide', 'Deep'],
//     correctAnswer: 'Short'
//   },
//   {
//     question: "What do you wear on your feet?",
//     options: ['Hat', 'Gloves', 'Shoes', 'Scarf'],
//     correctAnswer: 'Shoes'
//   },
//   {
//     question: "What is the opposite of 'hot'?",
//     options: ['Cold', 'Warm', 'Cool', 'Icy'],
//     correctAnswer: 'Cold'
//   },
//   {
//     question: "What is the shape of a square?",
//     options: ['Round', 'Four-sided', 'Three-sided', 'Oval'],
//     correctAnswer: 'Four-sided'
//   },
//   {
//     question: "What is 4 x 3?",
//     options: ['10', '11', '12', '13'],
//     correctAnswer: '12'
//   },
//   {
//     question: "What is the opposite of 'hard'?",
//     options: ['Soft', 'Tough', 'Strong', 'Firm'],
//     correctAnswer: 'Soft'
//   },
//   {
//     question: "Which vegetable is orange?",
//     options: ['Carrot', 'Broccoli', 'Cabbage', 'Spinach'],
//     correctAnswer: 'Carrot'
//   },
//   {
//     question: "What is the plural of 'sheep'?",
//     options: ['Sheeps', 'Sheep', 'Sheepes', 'Shoop'],
//     correctAnswer: 'Sheep'
//   },
//   {
//     question: "What is the opposite of 'near'?",
//     options: ['Far', 'Close', 'Next', 'Beside'],
//     correctAnswer: 'Far'
//   },
//   {
//     question: "What do you use to tell time?",
//     options: ['Ruler', 'Clock', 'Compass', 'Map'],
//     correctAnswer: 'Clock'
//   },
//   {
//     question: "What is 6 + 4?",
//     options: ['9', '10', '11', '12'],
//     correctAnswer: '10'
//   },
//   {
//     question: "What is the opposite of 'full'?",
//     options: ['Empty', 'Heavy', 'Light', 'Big'],
//     correctAnswer: 'Empty'
//   },
//   {
//     question: "Which animal is known for stripes?",
//     options: ['Lion', 'Tiger', 'Elephant', 'Bear'],
//     correctAnswer: 'Tiger'
//   },
//   {
//     question: "What is the plural of 'man'?",
//     options: ['Mans', 'Men', 'Manes', 'Man'],
//     correctAnswer: 'Men'
//   },
//   {
//     question: "What is the opposite of 'front'?",
//     options: ['Back', 'Side', 'Top', 'Bottom'],
//     correctAnswer: 'Back'
//   },
//   {
//     question: "What do you use to draw a straight line?",
//     options: ['Pencil', 'Ruler', 'Eraser', 'Brush'],
//     correctAnswer: 'Ruler'
//   },
//   {
//     question: "What is 7 - 2?",
//     options: ['4', '5', '6', '7'],
//     correctAnswer: '5'
//   },
//   {
//     question: "What is the opposite of 'loud'?",
//     options: ['Quiet', 'Noisy', 'Sound', 'Scream'],
//     correctAnswer: 'Quiet'
//   },
//   {
//     question: "Which fruit grows on a vine?",
//     options: ['Apple', 'Orange', 'Grape', 'Pear'],
//     correctAnswer: 'Grape'
//   },
//   {
//     question: "What is the plural of 'tooth'?",
//     options: ['Tooths', 'Teeth', 'Toothes', 'Tooth'],
//     correctAnswer: 'Teeth'
//   },
//   {
//     question: "What is the opposite of 'over'?",
//     options: ['Under', 'Above', 'On', 'Beside'],
//     correctAnswer: 'Under'
//   },
//   {
//     question: "What is 5 x 2?",
//     options: ['8', '9', '10', '11'],
//     correctAnswer: '10'
//   },
//   {
//     question: "What do you use to sweep the floor?",
//     options: ['Mop', 'Broom', 'Vacuum', 'Duster'],
//     correctAnswer: 'Broom'
//   },
//   {
//     question: "What is the opposite of 'early'?",
//     options: ['Late', 'Soon', 'Now', 'Quick'],
//     correctAnswer: 'Late'
//   },
//   {
//     question: "Which animal is known for its trunk?",
//     options: ['Elephant', 'Rhino', 'Hippo', 'Giraffe'],
//     correctAnswer: 'Elephant'
//   },
//   {
//     question: "What is the plural of 'fish'?",
//     options: ['Fishes', 'Fish', 'Fishe', 'Fishs'],
//     correctAnswer: 'Fish'
//   },
//   {
//     question: "What is the opposite of 'push'?",
//     options: ['Pull', 'Lift', 'Drop', 'Throw'],
//     correctAnswer: 'Pull'
//   },
//   {
//     question: "What is 9 - 5?",
//     options: ['3', '4', '5', '6'],
//     correctAnswer: '4'
//   },
//   {
//     question: "What do you use to carry books?",
//     options: ['Bag', 'Box', 'Basket', 'Bottle'],
//     correctAnswer: 'Bag'
//   },
//   {
//     question: "What is the opposite of 'strong'?",
//     options: ['Weak', 'Tough', 'Hard', 'Firm'],
//     correctAnswer: 'Weak'
//   },
//   {
//     question: "Which vegetable grows underground?",
//     options: ['Tomato', 'Potato', 'Cucumber', 'Pepper'],
//     correctAnswer: 'Potato'
//   },
//   {
//     question: "What is the plural of 'woman'?",
//     options: ['Womans', 'Women', 'Womens', 'Woman'],
//     correctAnswer: 'Women'
//   },
//   {
//     question: "What is the opposite of 'inside'?",
//     options: ['Outside', 'Within', 'Below', 'Above'],
//     correctAnswer: 'Outside'
//   },
//   {
//     question: "What is 3 + 7?",
//     options: ['9', '10', '11', '12'],
//     correctAnswer: '10'
//   },
//   {
//     question: "What do you use to eat cereal?",
//     options: ['Fork', 'Spoon', 'Knife', 'Plate'],
//     correctAnswer: 'Spoon'
//   },
//   {
//     question: "What is the opposite of 'clean'?",
//     options: ['Dirty', 'Neat', 'Tidy', 'Clear'],
//     correctAnswer: 'Dirty'
//   },
//   {
//     question: "Which animal is known for its mane?",
//     options: ['Tiger', 'Lion', 'Bear', 'Wolf'],
//     correctAnswer: 'Lion'
//   },
//   {
//     question: "What is the plural of 'deer'?",
//     options: ['Deers', 'Deer', 'Deeres', 'Deerses'],
//     correctAnswer: 'Deer'
//   },
//   {
//     question: "What is the opposite of 'left'?",
//     options: ['Right', 'Up', 'Down', 'Back'],
//     correctAnswer: 'Right'
//   },
//   {
//     question: "What is 4 + 6?",
//     options: ['9', '10', '11', '12'],
//     correctAnswer: '10'
//   },
//   {
//     question: "What do you use to write on paper?",
//     options: ['Pen', 'Brush', 'Chalk', 'Crayon'],
//     correctAnswer: 'Pen'
//   },
//   {
//     question: "What is the opposite of 'heavy'?",
//     options: ['Light', 'Big', 'Small', 'Large'],
//     correctAnswer: 'Light'
//   },
//   {
//     question: "Which fruit is green and sour?",
//     options: ['Lemon', 'Lime', 'Orange', 'Mango'],
//     correctAnswer: 'Lime'
//   },
//   {
//     question: "What is the plural of 'goose'?",
//     options: ['Gooses', 'Geese', 'Goose', 'Geeses'],
//     correctAnswer: 'Geese'
//   },
//   {
//     question: "What is the opposite of 'stop'?",
//     options: ['Go', 'Wait', 'Stay', 'Pause'],
//     correctAnswer: 'Go'
//   },
//   {
//     question: "What is 10 - 6?",
//     options: ['3', '4', '5', '6'],
//     correctAnswer: '4'
//   },
//   {
//     question: "What do you use to dry your hands?",
//     options: ['Towel', 'Paper', 'Cloth', 'Napkin'],
//     correctAnswer: 'Towel'
//   },
//   {
//     question: "What is the opposite of 'good'?",
//     options: ['Bad', 'Great', 'Nice', 'Fine'],
//     correctAnswer: 'Bad'
//   },
//   {
//     question: "Which animal is known for its shell?",
//     options: ['Turtle', 'Snake', 'Lizard', 'Frog'],
//     correctAnswer: 'Turtle'
//   },
//   {
//     question: "What is the plural of 'ox'?",
//     options: ['Oxes', 'Oxen', 'Oxs', 'Ox'],
//     correctAnswer: 'Oxen'
//   },
//   {
//     question: "What is 2 x 5?",
//     options: ['8', '9', '10', '11'],
//     correctAnswer: '10'
//   },
//   {
//     question: "What do you use to see far away?",
//     options: ['Glasses', 'Telescope', 'Microscope', 'Mirror'],
//     correctAnswer: 'Telescope'
//   }
// ]);

// export const intermediateQuestions = assignRandomCorrectAnswer([
//  {
//     question: "Which sentence is correct?",
//     options: [
//       'She don’t like coffee.',
//       'She doesn’t likes coffee.',
//       'She doesn’t like coffee.',
//       'She not like coffee.'
//     ],
//     correctAnswer: 'She doesn’t like coffee.'
//   },
//   {
//     question: "Choose the correct form: They ___ to school every day.",
//     options: ['Go', 'Goes', 'Going', 'Gone'],
//     correctAnswer: 'Go'
//   },
//   {
//     question: "What is the past tense of 'run'?",
//     options: ['Ran', 'Run', 'Running', 'Runned'],
//     correctAnswer: 'Ran'
//   },
//   {
//     question: "Choose the correct preposition: I’m good ___ math.",
//     options: ['At', 'In', 'On', 'With'],
//     correctAnswer: 'At'
//   },
//   {
//     question: "What does 'quickly' describe?",
//     options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
//     correctAnswer: 'Adverb'
//   },
//   {
//     question: "Which sentence uses the correct tense?",
//     options: [
//       'I will go to the park yesterday.',
//       'I went to the park yesterday.',
//       'I go to the park yesterday.',
//       'I going to the park yesterday.'
//     ],
//     correctAnswer: 'I went to the park yesterday.'
//   },
//   {
//     question: "What is the plural form of 'knife'?",
//     options: ['Knifes', 'Knives', 'Knife', 'Knifs'],
//     correctAnswer: 'Knives'
//   },
//   {
//     question: "Choose the correct word: ___ you like to join us?",
//     options: ['Would', 'Will', 'Can', 'Shall'],
//     correctAnswer: 'Would'
//   },
//   {
//     question: "What is the opposite of 'generous'?",
//     options: ['Selfish', 'Kind', 'Friendly', 'Helpful'],
//     correctAnswer: 'Selfish'
//   },
//   {
//     question: "Which word is a synonym for 'happy'?",
//     options: ['Sad', 'Joyful', 'Angry', 'Tired'],
//     correctAnswer: 'Joyful'
//   },
//   {
//     question: "Choose the correct form: He ___ finished his homework.",
//     options: ['Has', 'Have', 'Had', 'Having'],
//     correctAnswer: 'Has'
//   },
//   {
//     question: "What is the past tense of 'buy'?",
//     options: ['Bought', 'Buyed', 'Buying', 'Buys'],
//     correctAnswer: 'Bought'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'We was playing football.',
//       'We were playing football.',
//       'We is playing football.',
//       'We are play football.'
//     ],
//     correctAnswer: 'We were playing football.'
//   },
//   {
//     question: "What is the comparative form of 'big'?",
//     options: ['Bigger', 'Biggest', 'More big', 'Most big'],
//     correctAnswer: 'Bigger'
//   },
//   {
//     question: "Choose the correct preposition: She lives ___ London.",
//     options: ['At', 'In', 'On', 'By'],
//     correctAnswer: 'In'
//   },
//   {
//     question: "What is the superlative form of 'good'?",
//     options: ['Better', 'Best', 'Gooder', 'Goodest'],
//     correctAnswer: 'Best'
//   },
//   {
//     question: "Which word is an antonym for 'difficult'?",
//     options: ['Hard', 'Easy', 'Tough', 'Complex'],
//     correctAnswer: 'Easy'
//   },
//   {
//     question: "Choose the correct form: I ___ to the store yesterday.",
//     options: ['Go', 'Went', 'Gone', 'Going'],
//     correctAnswer: 'Went'
//   },
//   {
//     question: "What is the plural of 'city'?",
//     options: ['Citys', 'Cities', 'Cityes', 'City'],
//     correctAnswer: 'Cities'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'He have two cats.',
//       'He has two cats.',
//       'He having two cats.',
//       'He is have two cats.'
//     ],
//     correctAnswer: 'He has two cats.'
//   },
//   {
//     question: "What is the past tense of 'see'?",
//     options: ['Saw', 'Seen', 'Seeing', 'Sees'],
//     correctAnswer: 'Saw'
//   },
//   {
//     question: "Choose the correct word: This is ___ house.",
//     options: ['My', 'Mine', 'Me', 'I'],
//     correctAnswer: 'My'
//   },
//   {
//     question: "What is the opposite of 'brave'?",
//     options: ['Cowardly', 'Strong', 'Bold', 'Fearless'],
//     correctAnswer: 'Cowardly'
//   },
//   {
//     question: "Which word is a synonym for 'begin'?",
//     options: ['End', 'Start', 'Finish', 'Stop'],
//     correctAnswer: 'Start'
//   },
//   {
//     question: "Choose the correct form: They ___ watching TV.",
//     options: ['Is', 'Are', 'Was', 'Be'],
//     correctAnswer: 'Are'
//   },
//   {
//     question: "What is the past tense of 'write'?",
//     options: ['Wrote', 'Written', 'Writing', 'Writed'],
//     correctAnswer: 'Wrote'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'I doesn’t know the answer.',
//       'I don’t know the answer.',
//       'I not know the answer.',
//       'I isn’t know the answer.'
//     ],
//     correctAnswer: 'I don’t know the answer.'
//   },
//   {
//     question: "What is the comparative form of 'small'?",
//     options: ['Smaller', 'Smallest', 'More small', 'Most small'],
//     correctAnswer: 'Smaller'
//   },
//   {
//     question: "Choose the correct preposition: We’ll meet ___ 5 PM.",
//     options: ['At', 'In', 'On', 'By'],
//     correctAnswer: 'At'
//   },
//   {
//     question: "What is the superlative form of 'bad'?",
//     options: ['Worse', 'Worst', 'Badder', 'Baddest'],
//     correctAnswer: 'Worst'
//   },
//   {
//     question: "Which word is an antonym for 'fast'?",
//     options: ['Quick', 'Slow', 'Rapid', 'Swift'],
//     correctAnswer: 'Slow'
//   },
//   {
//     question: "Choose the correct form: She ___ a doctor.",
//     options: ['Is', 'Are', 'Be', 'Am'],
//     correctAnswer: 'Is'
//   },
//   {
//     question: "What is the past tense of 'take'?",
//     options: ['Took', 'Taken', 'Taking', 'Taked'],
//     correctAnswer: 'Took'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'They was at the park.',
//       'They were at the park.',
//       'They is at the park.',
//       'They are at park.'
//     ],
//     correctAnswer: 'They were at the park.'
//   },
//   {
//     question: "What is the plural of 'baby'?",
//     options: ['Babys', 'Babies', 'Babyes', 'Baby'],
//     correctAnswer: 'Babies'
//   },
//   {
//     question: "Choose the correct word: ___ is your favorite color?",
//     options: ['What', 'Which', 'Who', 'Where'],
//     correctAnswer: 'What'
//   },
//   {
//     question: "What is the opposite of 'polite'?",
//     options: ['Rude', 'Kind', 'Friendly', 'Nice'],
//     correctAnswer: 'Rude'
//   },
//   {
//     question: "Which word is a synonym for 'large'?",
//     options: ['Small', 'Big', 'Tiny', 'Little'],
//     correctAnswer: 'Big'
//   },
//   {
//     question: "Choose the correct form: We ___ to the beach last weekend.",
//     options: ['Go', 'Went', 'Gone', 'Going'],
//     correctAnswer: 'Went'
//   },
//   {
//     question: "What is the past tense of 'eat'?",
//     options: ['Ate', 'Eaten', 'Eating', 'Eated'],
//     correctAnswer: 'Ate'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'She have a new car.',
//       'She has a new car.',
//       'She having a new car.',
//       'She is have a new car.'
//     ],
//     correctAnswer: 'She has a new car.'
//   },
//   {
//     question: "What is the comparative form of 'tall'?",
//     options: ['Taller', 'Tallest', 'More tall', 'Most tall'],
//     correctAnswer: 'Taller'
//   },
//   {
//     question: "Choose the correct preposition: He’s interested ___ science.",
//     options: ['At', 'In', 'On', 'By'],
//     correctAnswer: 'In'
//   },
//   {
//     question: "What is the superlative form of 'pretty'?",
//     options: ['Prettier', 'Prettiest', 'More pretty', 'Most pretty'],
//     correctAnswer: 'Prettiest'
//   },
//   {
//     question: "Which word is an antonym for 'hot'?",
//     options: ['Warm', 'Cold', 'Boiling', 'Scorching'],
//     correctAnswer: 'Cold'
//   },
//   {
//     question: "Choose the correct form: I ___ reading a book.",
//     options: ['Is', 'Are', 'Am', 'Be'],
//     correctAnswer: 'Am'
//   },
//   {
//     question: "What is the past tense of 'drink'?",
//     options: ['Drank', 'Drunk', 'Drinking', 'Drinked'],
//     correctAnswer: 'Drank'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'We doesn’t like to swim.',
//       'We don’t like to swim.',
//       'We not like to swim.',
//       'We isn’t like to swim.'
//     ],
//     correctAnswer: 'We don’t like to swim.'
//   },
//   {
//     question: "What is the plural of 'leaf'?",
//     options: ['Leafs', 'Leaves', 'Leafe', 'Leaf'],
//     correctAnswer: 'Leaves'
//   },
//   {
//     question: "Choose the correct word: ___ are you going?",
//     options: ['Where', 'When', 'Why', 'How'],
//     correctAnswer: 'Where'
//   },
//   {
//     question: "What is the opposite of 'honest'?",
//     options: ['Dishonest', 'Truthful', 'Sincere', 'Trustworthy'],
//     correctAnswer: 'Dishonest'
//   },
//   {
//     question: "Which word is a synonym for 'smart'?",
//     options: ['Dull', 'Intelligent', 'Slow', 'Lazy'],
//     correctAnswer: 'Intelligent'
//   },
//   {
//     question: "Choose the correct form: He ___ to music every evening.",
//     options: ['Listen', 'Listens', 'Listening', 'Listened'],
//     correctAnswer: 'Listens'
//   },
//   {
//     question: "What is the past tense of 'swim'?",
//     options: ['Swam', 'Swum', 'Swimming', 'Swimed'],
//     correctAnswer: 'Swam'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'I were at the store.',
//       'I was at the store.',
//       'I is at the store.',
//       'I am at store.'
//     ],
//     correctAnswer: 'I was at the store.'
//   },
//   {
//     question: "What is the comparative form of 'fast'?",
//     options: ['Faster', 'Fastest', 'More fast', 'Most fast'],
//     correctAnswer: 'Faster'
//   },
//   {
//     question: "Choose the correct preposition: The book is ___ the table.",
//     options: ['At', 'In', 'On', 'By'],
//     correctAnswer: 'On'
//   },
//   {
//     question: "What is the superlative form of 'far'?",
//     options: ['Farther', 'Farthest', 'More far', 'Most far'],
//     correctAnswer: 'Farthest'
//   },
//   {
//     question: "Which word is an antonym for 'happy'?",
//     options: ['Sad', 'Cheerful', 'Excited', 'Pleased'],
//     correctAnswer: 'Sad'
//   },
//   {
//     question: "Choose the correct form: They ___ a new house.",
//     options: ['Has', 'Have', 'Had', 'Having'],
//     correctAnswer: 'Have'
//   },
//   {
//     question: "What is the past tense of 'give'?",
//     options: ['Gave', 'Given', 'Giving', 'Gived'],
//     correctAnswer: 'Gave'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'She don’t have a dog.',
//       'She doesn’t have a dog.',
//       'She not have a dog.',
//       'She isn’t have a dog.'
//     ],
//     correctAnswer: 'She doesn’t have a dog.'
//   },
//   {
//     question: "What is the plural of 'wolf'?",
//     options: ['Wolfs', 'Wolves', 'Wolfes', 'Wolf'],
//     correctAnswer: 'Wolves'
//   },
//   {
//     question: "Choose the correct word: ___ is calling you?",
//     options: ['Who', 'What', 'Where', 'When'],
//     correctAnswer: 'Who'
//   },
//   {
//     question: "What is the opposite of 'careful'?",
//     options: ['Careless', 'Cautious', 'Attentive', 'Prudent'],
//     correctAnswer: 'Careless'
//   },
//   {
//     question: "Which word is a synonym for 'end'?",
//     options: ['Begin', 'Finish', 'Start', 'Open'],
//     correctAnswer: 'Finish'
//   },
//   {
//     question: "Choose the correct form: I ___ to the gym every morning.",
//     options: ['Go', 'Goes', 'Going', 'Gone'],
//     correctAnswer: 'Go'
//   },
//   {
//     question: "What is the past tense of 'read'?",
//     options: ['Read', 'Red', 'Reading', 'Readed'],
//     correctAnswer: 'Read'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'They has a big house.',
//       'They have a big house.',
//       'They having a big house.',
//       'They is have a big house.'
//     ],
//     correctAnswer: 'They have a big house.'
//   },
//   {
//     question: "What is the comparative form of 'good'?",
//     options: ['Better', 'Best', 'More good', 'Most good'],
//     correctAnswer: 'Better'
//   },
//   {
//     question: "Choose the correct preposition: I’ll call you ___ Monday.",
//     options: ['At', 'In', 'On', 'By'],
//     correctAnswer: 'On'
//   },
//   {
//     question: "What is the superlative form of 'little'?",
//     options: ['Less', 'Least', 'Littler', 'Littlest'],
//     correctAnswer: 'Least'
//   },
//   {
//     question: "Which word is an antonym for 'strong'?",
//     options: ['Weak', 'Powerful', 'Tough', 'Sturdy'],
//     correctAnswer: 'Weak'
//   },
//   {
//     question: "Choose the correct form: She ___ a song now.",
//     options: ['Sing', 'Sings', 'Singing', 'Sang'],
//     correctAnswer: 'Is singing'
//   },
//   {
//     question: "What is the past tense of 'fly'?",
//     options: ['Flew', 'Flown', 'Flying', 'Flyed'],
//     correctAnswer: 'Flew'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'He were reading a book.',
//       'He was reading a book.',
//       'He is reading a book.',
//       'He am reading a book.'
//     ],
//     correctAnswer: 'He was reading a book.'
//   },
//   {
//     question: "What is the plural of 'mouse' (computer device)?",
//     options: ['Mouses', 'Mice', 'Mouse', 'Mices'],
//     correctAnswer: 'Mice'
//   },
//   {
//     question: "Choose the correct word: ___ time is it?",
//     options: ['What', 'Which', 'Who', 'Where'],
//     correctAnswer: 'What'
//   },
//   {
//     question: "What is the opposite of 'simple'?",
//     options: ['Complex', 'Easy', 'Plain', 'Clear'],
//     correctAnswer: 'Complex'
//   },
//   {
//     question: "Which word is a synonym for 'quick'?",
//     options: ['Slow', 'Fast', 'Late', 'Tardy'],
//     correctAnswer: 'Fast'
//   },
//   {
//     question: "Choose the correct form: We ___ dinner now.",
//     options: ['Eat', 'Eats', 'Eating', 'Ate'],
//     correctAnswer: 'Are eating'
//   },
//   {
//     question: "What is the past tense of 'think'?",
//     options: ['Thought', 'Thinked', 'Thinking', 'Thinked'],
//     correctAnswer: 'Thought'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'I doesn’t see the problem.',
//       'I don’t see the problem.',
//       'I not see the problem.',
//       'I isn’t see the problem.'
//     ],
//     correctAnswer: 'I don’t see the problem.'
//   },
//   {
//     question: "What is the comparative form of 'happy'?",
//     options: ['Happier', 'Happiest', 'More happy', 'Most happy'],
//     correctAnswer: 'Happier'
//   },
//   {
//     question: "Choose the correct preposition: She’s afraid ___ spiders.",
//     options: ['At', 'In', 'On', 'Of'],
//     correctAnswer: 'Of'
//   },
//   {
//     question: "What is the superlative form of 'big'?",
//     options: ['Bigger', 'Biggest', 'More big', 'Most big'],
//     correctAnswer: 'Biggest'
//   },
//   {
//     question: "Which word is an antonym for 'light'?",
//     options: ['Bright', 'Heavy', 'Dim', 'Glow'],
//     correctAnswer: 'Heavy'
//   },
//   {
//     question: "Choose the correct form: He ___ his bike every weekend.",
//     options: ['Ride', 'Rides', 'Riding', 'Rode'],
//     correctAnswer: 'Rides'
//   }
// ]);

// export const advancedQuestions = assignRandomCorrectAnswer([
//     {
//     question: "Choose the correct sentence:",
//     options: [
//       'Seldom I have encountered such wisdom.',
//       'Seldom have I encountered such wisdom.',
//       'Seldom encountered such I have wisdom.',
//       'Seldom I wisdom encountered.'
//     ],
//     correctAnswer: 'Seldom have I encountered such wisdom.'
//   },
//   {
//     question: "What does 'as well as...' express?",
//     options: ['Addition', 'Contrast', 'Reason', 'Result'],
//     correctAnswer: 'Addition'
//   },
//   {
//     question: "Which sentence is grammatically correct?",
//     options: [
//       'Had I known, I would have called.',
//       'Had known I, I would have called.',
//       'I had known, I would have called.',
//       'Had I know, I would called.'
//     ],
//     correctAnswer: 'Had I known I would have called.'
//   },
//   {
//     question: "Choose the correct word: The decision was made ___ consensus.",
//     options: ['By', 'With', 'In', 'On'],
//     correctAnswer: 'By'
//   },
//   {
//     question: "What is the meaning of 'albeit'?",
//     options: ['Although', 'Because', 'Therefore', 'However'],
//     correctAnswer: 'Although'
//   },
//   {
//     question: "Which sentence uses the correct conditional form?",
//     options: [
//       'If I were you, I’d apologize.',
//       'If I was you, I’d apologized.',
//       'If I were you, I’d apologized.',
//       'If I was you, I’d apologize.'
//     ],
//     correctAnswer: 'If I were you, I’d apologize.'
//   },
//   {
//     question: "What is the correct passive voice of 'They are building a house'?",
//     options: [
//       'A house is being built by them.',
//       'A house is built by them.',
//       'A house was built by them.',
//       'A house being built by them.'
//     ],
//     correctAnswer: 'A house is being built by them.'
//   },
//   {
//     question: "Choose the correct word: Her speech was ___ eloquent.",
//     options: ['High', 'Highly', 'Height', 'Heightened'],
//     correctAnswer: 'Highly'
//   },
//   {
//     question: "What does the phrase 'by and large' mean?",
//     options: [
//       'Generally speaking', 'In detail', 'Without exception', 'On purpose'
//     ],
//     correctAnswer: 'Generally speaking'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'No sooner had he arrived than the meeting began.',
//       'No sooner he arrived than the meeting began.',
//       'No sooner had he arrived when the meeting began.',
//       'No sooner he had arrived than the meeting began.'
//     ],
//     correctAnswer: 'No sooner had he arrived than the meeting began.'
//   },
//   {
//     question: "What is the synonym of 'ubiquitous'?",
//     options: ['Rare', 'Common', 'Unique', 'Obscure'],
//     correctAnswer: 'Common'
//   },
//   {
//     question: "Choose the correct form: The report ___ by the committee last week.",
//     options: [
//       'Was reviewed', 'Is reviewed', 'Has reviewed', 'Reviewed'
//     ],
//     correctAnswer: 'Was reviewed'
//   },
//   {
//     question: "What is the antonym of 'ephemeral'?",
//     options: ['Temporary', 'Fleeting', 'Lasting', 'Brief'],
//     correctAnswer: 'Lasting'
//   },
//   {
//     question: "Which sentence uses inversion correctly?",
//     options: [
//       'Never have I seen such beauty.',
//       'Never I have seen such beauty.',
//       'Never seen I have.',
//       'I never seen such beauty.'
//     ],
//     correctAnswer: 'Never have I seen such beauty.'
//   },
//   {
//     question: "What does 'in lieu of' mean?",
//     options: ['In place of', 'In addition to', 'In spite of', 'In case of'],
//     correctAnswer: 'In place of'
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       'Not until the rain stopped did we go outside.',
//       'Not until the rain stopped did we go.',
//       'Not until the rain we stopped did go outside.',
//       'Not we until the rain stopped.'
//     ],
//     correctAnswer: 'Not until the rain stopped did we go outside.'
//   },
//   {
//     question: "What is the correct subjunctive form: It’s crucial that he ___ on time.",
//     options: ['Be', 'Is', 'Was', 'Being'],
//     correctAnswer: 'Be'
//   },
//   {
//     question: "Which word is a synonym for 'ameliorate'?",
//     options: ['Worsen', 'Improve', 'Decline', 'Reduce'],
//     correctAnswer: 'Improve'
//   },
//   {
//     question: "What is the passive form of 'Someone stole my car'?",
//     options: [
//       'My car was stolen by someone.',
//       'My car is stolen by someone.',
//       'My car was stole by someone.',
//       'My stolen car was car.'
//     ],
//     correctAnswer: 'My car was stolen by someone.'
//   },
//   {
//     question: "Choose the correct preposition: She’s proficient ___ coding.",
//     options: ['At', 'In', 'On', 'With'],
//     correctAnswer: 'In'
//   },
//   {
//     question: "What does 'de facto' mean?",
//     options: [
//       'In reality', 'By law', 'On paper', 'In theory'
//     ],
//     correctAnswer: 'In reality'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'Were it not for her help, we would have failed.',
//       'Was it not for her help, we would have failed.',
//       'Were not it for her help, we would have failed.',
//       'It were not for her help, we would have failed.'
//     ],
//     correctAnswer: 'Were it not for her help, we would have failed.'
//   },
//   {
//     question: "What is the antonym of 'benevolent'?",
//     options: ['Kind', 'Malicious', 'Generous', 'Charitable'],
//     correctAnswer: 'Malicious'
//   },
//   {
//     question: "Choose the correct form: The issue ___ yesterday.",
//     options: [
//       'Was discussed', 'Is discussed', 'Has discussed',
//       'Discussed'
//     ],
//     correctAnswer: 'Was discussed'
//   },
//   {
//     question: "What is the meaning of 'caveat'?",
//     options: ['Warning', 'Solution', 'Benefit', 'Reward'],
//     correctAnswer: 'Warning'
//   },
//   {
//     question: "Which sentence uses the subjunctive correctly?",
//     options: [
//       'I suggest that he study harder.',
//       'I suggest that he studies harder.',
//       'I suggesting that he study harder.',
//       'I suggest he studying harder.'
//     ],
//     correctAnswer: 'I suggest that he study harder.'
//   },
//   {
//     question: "What is the synonym of 'obstreperous'?",
//     options: ['Quiet', 'Noisy', 'Calm', 'Peaceful'],
//     correctAnswer: 'Noisy'
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       'Under no circumstances will we accept delays.',
//       'Under no circumstances we will accept delays.',
//       'No under circumstances will we accept delays.',
//       'Under circumstances no will we accept delays.'
//     ],
//     correctAnswer: 'Under no circumstances will we accept delays.'
//   },
//   {
//     question: "What is the antonym of 'pragmatic'?",
//     options: ['Practical', 'Impractical', 'Realistic', 'Logical'],
//     correctAnswer: 'Impractical'
//   },
//   {
//     question: "What is the passive form of 'They will announce the results tomorrow'?",
//     options: [
//       'The results will be announced tomorrow.',
//       'The results are announced tomorrow.',
//       'The results were announced tomorrow.',
//       'The announced tomorrow results will be.'
//     ],
//     correctAnswer: 'The results will be announced tomorrow.'
//   },
//   {
//     question: "Choose the correct word: His argument was ___ flawed.",
//     options: ['High', 'Highly', 'Height', 'Heightened'],
//     correctAnswer: 'Highly'
//   },
//   {
//     question: "What does 'vis-à-vis' mean?",
//     options: ['In contrast to', 'In addition to', 'In place of', 'In relation to'],
//     correctAnswer: 'In relation to'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'Only after the exam had finished could we leave.',
//       'Only after the exam finished we could leave.',
//     'Only the exam after had finished could we leave.',
//     'Only we could leave after exam the finished.'
//     ],
//     correctAnswer: 'Only after the exam had finished could we leave.'
//   },
//   {
//     question: "What is the synonym of 'tenuous'?",
//     options: ['Strong', 'Weak', 'Stable', 'Secure'],
//     correctAnswer: 'Weak'
//   },
//   {
//     question: "Choose the correct form: The proposal ___ by the board.",
//     options: [
//       'Was rejected', 'Is rejected', 'Has rejected', 'Rejected'
//     ],
//     correctAnswer: 'Was rejected'
//   },
//   {
//     question: "What is the antonym of 'exacerbate'?",
//     options: ['Worsen', 'Improve', 'Aggravate', 'Intensify'],
//     correctAnswer: 'Improve'
//   },
//   {
//     question: "Which sentence uses inversion correctly?",
//     options: [
//       'So beautiful is she that everyone admires.',
//       'So beautiful she is that everyone admires.',
//       'Beautiful so is she that everyone admires.',
//       'She so beautiful is that everyone admires.'
//     ],
//     correctAnswer: 'So beautiful is she that everyone admires.'
//   },
//   {
//     question: "What does 'ad hoc' mean?",
//     options: [
//       'For a specific purpose', 'By law', 'In advance', 'Without preparation'],
//     correctAnswer: 'For a specific purpose'
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       'Not only is he talented, but he is also hardworking.',
//       'Not only he is talented, but he is also hardworking.',
//       'Is not only he talented, but also hardworking.',
//     'Not he is only talented, but also hardworking.'
//     ],
//     correctAnswer: 'Not only is he talented, but he is also hardworking.'
//   },
//   {
//     question: "What is the synonym of 'amelioration'?",
//     options: ['Decline', 'Improvement', 'Worsening', 'Reduction'],
//     correctAnswer: 'Improvement'
//   },
//   {
//     question: "What is the passive form of 'They have painted the house'?",
//     options: [
//       'The house has been painted by them.',
//       'The house is painted by them.',
//       'The house was painted by them.',
//       'The painted house has been by them.'
//     ],
//     correctAnswer: 'The house has been painted by them.'
//   },
//   {
//     question: "Choose the correct preposition: He’s adept ___ solving problems.",
//     options: ['At', 'In', 'On', 'With'],
//     correctAnswer: 'At'
//   },
//   {
//     question: "What does 'ergo' mean?",
//     options: ['Therefore', 'However', 'Because', 'Despite'],
//     correctAnswer: 'Therefore'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'Should you need help, call me.',
//       'Should you needs help, call me.',
//       'You should need help, call me.',
//       'Should help you need, call me.'
//     ],
//     correctAnswer: 'Should you need help, call me.'
//   },
//   {
//     question: "What is the antonym of 'altruistic'?",
//     options: ['Selfless', 'Selfish', 'Generous', 'Kind'],
//     correctAnswer: 'Selfish'
//   },
//   {
//     question: "Choose the correct form: The matter ___ thoroughly.",
//     options: [
//       'Was investigated', 'Is investigated', 'Has investigated', 'Investigated'
//     ],
//     correctAnswer: 'Was investigated'
//   },
//   {
//     question: "What is the meaning of 'pro bono'?",
//     options: [
//       'For free', 'For profit', 'For hire', 'For sale'
//     ],
//     correctAnswer: 'For free'
//   },
//   {
//     question: "Which sentence uses the subjunctive correctly?",
//     options: [
//       'It’s vital that he attend the meeting.',
//       'It’s vital that he attends the meeting.',
//       'It’s vital he attending the meeting.',
//       'It’s vital that he is attending.'
//     ],
//     correctAnswer: 'It’s vital that he attend the meeting.'
//   },
//   {
//     question: "What is the synonym of 'vociferous'?",
//     options: ['Quiet', 'Loud', 'Calm', 'Silent'],
//     correctAnswer: 'Loud'
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       'Never before had I seen such a sight.',
//       'Never before I had seen such a sight.',
//       'Before never had I seen such a sight.',
//       'Never I had seen before such a sight.'
//     ],
//     correctAnswer: 'Never before had I seen such a sight.'
//   },
//   {
//     question: "What is the antonym of 'tenuous'?",
//     options: ['Weak', 'Strong', 'Fragile', 'Delicate'],
//     correctAnswer: 'Strong'
//   },
//   {
//     question: "What is the passive form of 'They are reviewing the documents'?",
//     options: [
//       'The documents are being reviewed by them.',
//       'The documents is reviewed by them.',
//       'The documents were reviewed by them.',
//       'The reviewed documents are by them.'
//     ],
//     correctAnswer: 'The documents are being reviewed by them.'
//   },
//   {
//     question: "Choose the correct word: The lecture was ___ informative.",
//     options: ['High', 'Highly', 'Height', 'Heightened'],
//     correctAnswer: 'Highly'
//   },
//   {
//     question: "What does 'per se' mean?",
//     options: [
//       'In itself', 'By law', 'On purpose', 'In advance'
//     ],
//     correctAnswer: 'In itself'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'Had we left earlier, we would have caught the train.',
//       'Had we leave earlier, we would have caught the train.',
//       'We had left earlier, we would have caught the train.',
//       'Had earlier we left, we would have caught the train.'
//     ],
//     correctAnswer: 'Had we left earlier, we would have caught the train.'
//   },
//   {
//     question: "What is the synonym of 'ephemeral'?",
//     options: ['Lasting', 'Brief', 'Permanent', 'Enduring'],
//     correctAnswer: 'Brief'
//   },
//   {
//     question: "Choose the correct form: The project ___ by the team.",
//     options: [
//       'Was completed', 'Is completed', 'Has completed', 'Completed'
//     ],
//     correctAnswer: 'Was completed'
//   },
//   {
//     question: "What is the antonym of 'obstreperous'?",
//     options: ['Noisy', 'Quiet', 'Loud', 'Chaotic'],
//     correctAnswer: 'Quiet'
//   },
//   {
//     question: "Which sentence uses inversion correctly?",
//     options: [
//       'So fast did he run that he won the race.',
//       'So fast he ran that he won the race.',
//       'Fast so did he run that he won the race.',
//       'So he ran fast that he won the race.'
//     ],
//     correctAnswer: 'So fast did he run that he won the race.'
//   },
//   {
//     question: "What does 'quid pro quo' mean?",
//     options: [
//       'Something for something', 'For free', 'By chance', 'In advance'
//     ],
//     correctAnswer: 'Something for something'
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       'Not only did she sing, but she also danced.',
//       'Not only she sang, but she also danced.',
//       'She not only sang, but also danced.',
//       'Not she only sang, but also danced.'
//     ],
//     correctAnswer: 'Not only did she sing, but she also danced.'
//   },
//   {
//     question: "What is the synonym of 'benevolent'?",
//     options: ['Malicious', 'Kind', 'Selfish', 'Cruel'],
//     correctAnswer: 'Kind'
//   },
//   {
//     question: "What is the passive form of 'They will launch the product'?",
//     options: [
//       'The product will be launched by them.',
//       'The product is launched by them.',
//       'The product was launched by them.',
//       'The launched product will be by them.'
//     ],
//     correctAnswer: 'The product will be launched by them.'
//   },
//   {
//     question: "Choose the correct preposition: She’s skilled ___ negotiation.",
//     options: ['At', 'In', 'On', 'With'],
//     correctAnswer: 'In'
//   },
//   {
//     question: "What does 'sine qua non' mean?",
//     options: [
//       'Essential condition', 'Optional feature', 'Minor detail', 'Temporary measure'
//     ],
//     correctAnswer: 'Essential condition'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'Were I to decide, I’d choose option A.',
//       'Was I to decide, I’d choose option A.',
//       'I were to decide, I’d choose option A.',
//       'Were to I decide, I’d choose option A.'
//     ],
//     correctAnswer: 'Were I to decide, I’d choose option A.'
//   },
//   {
//     question: "What is the antonym of 'vociferous'?",
//     options: ['Loud', 'Silent', 'Noisy', 'Boisterous'],
//     correctAnswer: 'Silent'
//   },
//   {
//     question: "Choose the correct form: The decision ___ unanimously.",
//     options: [
//       'Was made', 'Is made', 'Has made', 'Made'
//     ],
//     correctAnswer: 'Was made'
//   },
//   {
//     question: "What is the meaning of 'non sequitur'?",
//     options: [
//       'Logical conclusion', 'Illogical statement', 'Clear argument', 'Valid reasoning'
//     ],
//     correctAnswer: 'Illogical statement'
//   },
//   {
//     question: "Which sentence uses the subjunctive correctly?",
//     options: [
//       'I recommend that she take the course.',
//       'I recommend that she takes the course.',
//       'I recommend she taking the course.',
//       'I recommend that she is taking.'
//     ],
//     correctAnswer: 'I recommend that she take the course.'
//   },
//   {
//     question: "What is the synonym of 'altruistic'?",
//     options: ['Selfish', 'Generous', 'Greedy', 'Egoistic'],
//     correctAnswer: 'Generous'
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       'Hardly had we started when it rained.',
//       'Hardly we had started when it rained.',
//       'We hardly started when it had rained.',
//       'Hardly had started we when it rained.'
//     ],
//     correctAnswer: 'Hardly had we started when it rained.'
//   },
//   {
//     question: "What is the antonym of 'ameliorate'?",
//     options: ['Improve', 'Worsen', 'Enhance', 'Boost'],
//     correctAnswer: 'Worsen'
//   },
//   {
//     question: "What is the passive form of 'They are organizing the event'?",
//     options: [
//       'The event is being organized by them.',
//       'The event is organized by them.',
//       'The event was organized by them.',
//       'The organized event is by them.'
//     ],
//     correctAnswer: 'The event is being organized by them.'
//   },
//   {
//     question: "Choose the correct word: The book was ___ engaging.",
//     options: ['High', 'Highly', 'Height', 'Heightened'],
//     correctAnswer: 'Highly'
//   },
//   {
//     question: "What does 'ad infinitum' mean?",
//     options: [
//       'Endlessly', 'Briefly', 'Occasionally', 'Temporarily'
//     ],
//     correctAnswer: 'Endlessly'
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       'Should it rain, we’ll stay inside.',
//       'Should it rains, we’ll stay inside.',
//       'It should rain, we’ll stay inside.',
//       'Should rain it, we’ll stay inside.'
//     ],
//     correctAnswer: 'Should it rain, we’ll stay inside.'
//   },
//   {
//     question: "What is the synonym of 'exacerbate'?",
//     options: ['Improve', 'Worsen', 'Solve', 'Ease'],
//     correctAnswer: 'Worsen'
//   },
//   {
//     question: "Choose the correct form: The issue ___ last month.",
//     options: [
//       'Was resolved', 'Is resolved', 'Has resolved', 'Resolved'
//     ],
//     correctAnswer: 'Was resolved'
//   },
//   {
//     question: "What is the antonym of 'ephemeral'?",
//     options: ['Brief', 'Permanent', 'Short', 'Temporary'],
//     correctAnswer: 'Permanent'
//   }
// ]);

















// export const beginnerQuestions = [
//   {
//     question: "What is the capital of England?",
//     options: ["London", "Paris", "Berlin", "Madrid"],
//     correctAnswer: "London"
//   },
//   {
//     question: "What is the opposite of 'big'?",
//     options: ["Small", "Large", "Huge", "Tall"],
//     correctAnswer: "Small"
//   },
//   {
//     question: "What is the color of the sky on a clear day?",
//     options: ["Blue", "Red", "Green", "Yellow"],
//     correctAnswer: "Blue"
//   },
//   {
//     question: "How many days are in a week?",
//     options: ["Five", "Six", "Seven", "Eight"],
//     correctAnswer: "Seven"
//   },
//   {
//     question: "What is the plural of 'cat'?",
//     options: ["Cats", "Cat", "Cates", "Catses"],
//     correctAnswer: "Cats"
//   },
//   {
//     question: "Which animal is known as man's best friend?",
//     options: ["Dog", "Cat", "Bird", "Fish"],
//     correctAnswer: "Dog"
//   },
//   {
//     question: "What is 2 + 3?",
//     options: ["Four", "Five", "Six", "Seven"],
//     correctAnswer: "Five"
//   },
//   {
//     question: "What do you call a baby cat?",
//     options: ["Kitten", "Puppy", "Cub", "Foal"],
//     correctAnswer: "Kitten"
//   },
//   {
//     question: "Which word is a verb?",
//     options: ["Run", "Table", "Blue", "Happy"],
//     correctAnswer: "Run"
//   },
//   {
//     question: "What is the first day of the week?",
//     options: ["Monday", "Sunday", "Friday", "Wednesday"],
//     correctAnswer: "Monday"
//   },
//   {
//     question: "What is the opposite of 'hot'?",
//     options: ["Cold", "Warm", "Cool", "Burning"],
//     correctAnswer: "Cold"
//   },
//   {
//     question: "How many legs does a spider have?",
//     options: ["Six", "Eight", "Four", "Ten"],
//     correctAnswer: "Eight"
//   },
//   {
//     question: "What is the plural of 'book'?",
//     options: ["Books", "Bookes", "Book", "Booksies"],
//     correctAnswer: "Books"
//   },
//   {
//     question: "Which is a fruit?",
//     options: ["Apple", "Carrot", "Potato", "Broccoli"],
//     correctAnswer: "Apple"
//   },
//   {
//     question: "What is the color of grass?",
//     options: ["Green", "Blue", "Red", "Purple"],
//     correctAnswer: "Green"
//   },
//   {
//     question: "What is 5 - 2?",
//     options: ["Two", "Three", "Four", "Five"],
//     correctAnswer: "Three"
//   },
//   {
//     question: "What do you use to write on a blackboard?",
//     options: ["Chalk", "Pen", "Pencil", "Marker"],
//     correctAnswer: "Chalk"
//   },
//   {
//     question: "Which word is a noun?",
//     options: ["House", "Run", "Quickly", "Happy"],
//     correctAnswer: "House"
//   },
//   {
//     question: "What is the opposite of 'up'?",
//     options: ["Down", "Left", "Right", "Over"],
//     correctAnswer: "Down"
//   },
//   {
//     question: "What is the plural of 'child'?",
//     options: ["Children", "Childs", "Childes", "Childrens"],
//     correctAnswer: "Children"
//   },
//   {
//     question: "Which is a day of the week?",
//     options: ["Tuesday", "January", "Summer", "Morning"],
//     correctAnswer: "Tuesday"
//   },
//   {
//     question: "What is the smell of rain like?",
//     options: [ "Dry", "Hot", "Wet","Cold"],
//     correctAnswer: "Wet"
//   },
//   {
//     question: "How many months are in a year?",
//     options: ["Ten", "Eleven", "Twelve", "Thirteen"],
//     correctAnswer: "Twelve"
//   },
//   {
//     question: "What is the opposite of 'fast'?",
//     options: [ "Quick", "Rapid", "Speedy", "Slow"],
//     correctAnswer: "Slow"
//   },
//   {
//     question: "Which is a type of bird?",
//     options: [ "Lion", "Snake", "Bear", "Eagle"],
//     correctAnswer: "Eagle"
//   },
//   {
//     question: "What is 4 + 4?",
//     options: ["Six", "Seven", "Eight", "Nine"],
//     correctAnswer: "Eight"
//   },
//   {
//     question: "What do you call a baby dog?",
//     options: [ "Kitten", "Cub", "Puppy", "Calf"],
//     correctAnswer: "Puppy"
//   },
//   {
//     question: "Which word is an adjective?",
//     options: [ "Run", "Table", "Slowly", "Big"],
//     correctAnswer: "Big"
//   },
//   {
//     question: "What is the opposite of 'day'?",
//     options: ["Night", "Morning", "Evening", "Afternoon"],
//     correctAnswer: "Night"
//   },
//   {
//     question: "What is the plural of 'man'?",
//     options: ["Men", "Mans", "Manes", "Mens"],
//     correctAnswer: "Men"
//   },
//   {
//     question: "Which is a type of fish?",
//     options: [ "Tiger", "Wolf", "Salmon", "Fox"],
//     correctAnswer: "Salmon"
//   },
//   {
//     question: "What is 10 - 5?",
//     options: ["Four", "Five", "Six", "Seven"],
//     correctAnswer: "Five"
//   },
//   {
//     question: "What do you use to cut paper?",
//     options: [ "Spoon", "Fork", "Knife", "Scissors"],
//     correctAnswer: "Scissors"
//   },
//   {
//     question: "Which word is a pronoun?",
//     options: ["He", "Run", "Table", "Big"],
//     correctAnswer: "He"
//   },
//   {
//     question: "What is the opposite of 'in'?",
//     options: ["Out", "Up", "Down", "Over"],
//     correctAnswer: "Out"
//   },
//   {
//     question: "What is the plural of 'foot'?",
//     options: ["Feet", "Foots", "Footes", "Feets"],
//     correctAnswer: "Feet"
//   },
//   {
//     question: "Which is a type of tree?",
//     options: ["Oak", "Rose", "Lily", "Tulip"],
//     correctAnswer: "Oak"
//   },
//   {
//     question: "What is 3 × 2?",
//     options: ["Five", "Six", "Seven", "Eight"],
//     correctAnswer: "Six"
//   },
//   {
//     question: "What do you call a young horse?",
//     options: ["Foal", "Puppy", "Kitten", "Cub"],
//     correctAnswer: "Foal"
//   },
//   {
//     question: "Which word is an adverb?",
//     options: ["Quickly", "Table", "Big", "House"],
//     correctAnswer: "Quickly"
//   },
//   {
//     question: "What is the opposite of 'happy'?",
//     options: ["Sad", "Joyful", "Excited", "Cheerful"],
//     correctAnswer: "Sad"
//   },
//   {
//     question: "What is the plural of 'woman'?",
//     options: ["Women", "Womans", "Womanes", "Womens"],
//     correctAnswer: "Women"
//   },
//   {
//     question: "Which is a type of insect?",
//     options: ["Bee", "Dog", "Cat", "Horse"],
//     correctAnswer: "Bee"
//   },
//   {
//     question: "What is 6 ÷ 2?",
//     options: ["Two", "Three", "Four", "Five"],
//     correctAnswer: "Three"
//   },
//   {
//     question: "What do you use to eat soup?",
//     options: ["Spoon", "Fork", "Knife", "Chopsticks"],
//     correctAnswer: "Spoon"
//   },
//   {
//     question: "Which word is a preposition?",
//     options: ["On", "Run", "Table", "Big"],
//     correctAnswer: "On"
//   },
//   {
//     question: "What is the opposite of 'open'?",
//     options: [ "Shut", "Locked", "All of the above", "Close"],
//     correctAnswer: "Close"
//   },
//   {
//     question: "What is the plural of 'mouse'?",
//     options: ["Mice", "Mouses", "Mousees", "Mices"],
//     correctAnswer: "Mice"
//   },
//   {
//     question: "Which is a type of flower?",
//     options: ["Rose", "Oak", "Pine", "Maple"],
//     correctAnswer: "Rose"
//   },
//   {
//     question: "What is 7 + 3?",
//     options: ["Nine", "Ten", "Eleven", "Twelve"],
//     correctAnswer: "Ten"
//   },
//   {
//     question: "What do you call a young cow?",
//     options: ["Calf", "Puppy", "Kitten", "Foal"],
//     correctAnswer: "Calf"
//   },
//   {
//     question: "Which word is a conjunction?",
//     options: ["And", "Run", "Table", "Big"],
//     correctAnswer: "And"
//   },
//   {
//     question: "What is the opposite of 'long'?",
//     options: ["Short", "Tall", "Wide", "Deep"],
//     correctAnswer: "Short"
//   },
//   {
//     question: "What is the plural of 'sheep'?",
//     options: ["Sheep", "Sheeps", "Sheepes", "Sheepies"],
//     correctAnswer: "Sheep"
//   },
//   {
//     question: "Which is a type of reptile?",
//     options: ["Snake", "Dog", "Cat", "Horse"],
//     correctAnswer: "Snake"
//   },
//   {
//     question: "What is 8 - 4?",
//     options: ["Three", "Four", "Five", "Six"],
//     correctAnswer: "Four"
//   },
//   {
//     question: "What do you use to drink water?",
//     options: ["Glass", "Plate", "Bowl", "Spoon"],
//     correctAnswer: "Glass"
//   },
//   {
//     question: "Which word is an interjection?",
//     options: ["Wow", "Run", "Table", "Big"],
//     correctAnswer: "Wow"
//   },
//   {
//     question: "What is the opposite of 'high'?",
//     options: ["Low", "Tall", "Big", "Wide"],
//     correctAnswer: "Low"
//   },
//   {
//     question: "What is the plural of 'deer'?",
//     options: ["Deer", "Deers", "Deeres", "Deeries"],
//     correctAnswer: "Deer"
//   },
//   {
//     question: "Which is a type of mammal?",
//     options: ["Dolphin", "Crocodile", "Python", "Lizard"],
//     correctAnswer: "Dolphin"
//   },
//   // questions.js (continued)

//   {
//     question: "What is 9 + 1?",
//     options: ["Eight", "Nine", "Ten", "Eleven"],
//     correctAnswer: "Ten"
//   },
//   {
//     question: "What do you call a young bear?",
//     options: ["Cub", "Puppy", "Kitten", "Foal"],
//     correctAnswer: "Cub"
//   },
//   {
//     question: "Which word is a verb?",
//     options: ["Sing", "Chair", "Red", "Fast"],
//     correctAnswer: "Sing"
//   },
//   {
//     question: "What is the opposite of 'wet'?",
//     options: ["Dry", "Cold", "Hot", "Soft"],
//     correctAnswer: "Dry"
//   },
//   {
//     question: "What is the plural of 'fish'?",
//     options: ["Fish", "Fishes", "Fishies", "Fishees"],
//     correctAnswer: "Fish"
//   },
//   {
//     question: "Which is a type of vegetable?",
//     options: ["Carrot", "Apple", "Banana", "Orange"],
//     correctAnswer: "Carrot"
//   },
//   {
//     question: "What is 6 + 3?",
//     options: ["Eight", "Nine", "Ten", "Eleven"],
//     correctAnswer: "Nine"
//   },
//   {
//     question: "What do you use to sweep the floor?",
//     options: ["Broom", "Mop", "Rake", "Shovel"],
//     correctAnswer: "Broom"
//   },
//   {
//     question: "Which word is a noun?",
//     options: ["Car", "Drive", "Fast", "Slowly"],
//     correctAnswer: "Car"
//   },
//   {
//     question: "What is the opposite of 'dark'?",
//     options: ["Light", "Black", "Dim", "Shadow"],
//     correctAnswer: "Light"
//   },
//   {
//     question: "What is the plural of 'tooth'?",
//     options: ["Teeth", "Tooths", "Toothes", "Teeths"],
//     correctAnswer: "Teeth"
//   },
//   {
//     question: "Which is a type of bird?",
//     options: ["Parrot", "Tiger", "Bear", "Fox"],
//     correctAnswer: "Parrot"
//   },
//   {
//     question: "What is 12 - 3?",
//     options: ["Eight", "Nine", "Ten", "Eleven"],
//     correctAnswer: "Nine"
//   },
//   {
//     question: "What do you use to write a letter?",
//     options: ["Pen", "Spoon", "Fork", "Knife"],
//     correctAnswer: "Pen"
//   },
//   {
//     question: "Which word is an adjective?",
//     options: ["Tall", "Run", "Table", "Quickly"],
//     correctAnswer: "Tall"
//   },
//   {
//     question: "What is the opposite of 'old'?",
//     options: ["Young", "New", "Fresh", "All of the above"],
//     correctAnswer: "All of the above"
//   },
//   {
//     question: "What is the plural of 'goose'?",
//     options: ["Geese", "Gooses", "Goosees", "Geeses"],
//     correctAnswer: "Geese"
//   },
//   {
//     question: "Which is a type of fruit?",
//     options: ["Banana", "Potato", "Onion", "Cabbage"],
//     correctAnswer: "Banana"
//   },
//   {
//     question: "What is 4 × 3?",
//     options: ["Ten", "Eleven", "Twelve", "Thirteen"],
//     correctAnswer: "Twelve"
//   },
//   {
//     question: "What do you call a young lion?",
//     options: ["Cub", "Puppy", "Kitten", "Foal"],
//     correctAnswer: "Cub"
//   },
//   {
//     question: "Which word is a pronoun?",
//     options: ["She", "Run", "Table", "Big"],
//     correctAnswer: "She"
//   },
//   {
//     question: "What is the opposite of 'near'?",
//     options: ["Far", "Close", "Next", "Beside"],
//     correctAnswer: "Far"
//   },
//   {
//     question: "What is the plural of 'ox'?",
//     options: ["Oxen", "Oxes", "Oxies", "Oxs"],
//     correctAnswer: "Oxen"
//   },
//   {
//     question: "Which is a type of tree?",
//     options: ["Pine", "Rose", "Lily", "Tulip"],
//     correctAnswer: "Pine"
//   },
//   {
//     question: "What is 15 - 6?",
//     options: ["Eight", "Nine", "Ten", "Eleven"],
//     correctAnswer: "Nine"
//   },
//   {
//     question: "What do you use to clean dishes?",
//     options: ["Sponge", "Broom", "Rake", "Shovel"],
//     correctAnswer: "Sponge"
//   },
//   {
//     question: "Which word is an adverb?",
//     options: ["Slowly", "Table", "Big", "House"],
//     correctAnswer: "Slowly"
//   },
//   {
//     question: "What is the opposite of 'strong'?",
//     options: ["Weak", "Powerful", "Tough", "Hard"],
//     correctAnswer: "Weak"
//   },
//   {
//     question: "What is the plural of 'person'?",
//     options: ["People", "Persons", "Peoples", "Persones"],
//     correctAnswer: "People"
//   },
//   {
//     question: "Which is a type of insect?",
//     options: ["Ant", "Dog", "Cat", "Horse"],
//     correctAnswer: "Ant"
//   },
//   {
//     question: "What is 10 ÷ 2?",
//     options: ["Four", "Five", "Six", "Seven"],
//     correctAnswer: "Five"
//   },
//   {
//     question: "What do you use to eat cereal?",
//     options: ["Spoon", "Fork", "Knife", "Chopsticks"],
//     correctAnswer: "Spoon"
//   },
//   {
//     question: "Which word is a preposition?",
//     options: ["Under", "Run", "Table", "Big"],
//     correctAnswer: "Under"
//   },
//   {
//     question: "What is the opposite of 'big'?",
//     options: ["Small", "Large", "Huge", "Tall"],
//     correctAnswer: "Small"
//   },
//   {
//     question: "What is the plural of 'leaf'?",
//     options: ["Leaves", "Leafs", "Leafes", "Leavs"],
//     correctAnswer: "Leaves"
//   }
// ];

// export const intermediateQuestions = [
//   {
//     question: "Choose the correct form: 'He ____ to the gym every day.'",
//     options: ["go", "goes", "gone", "going"],
//     correctAnswer: "goes"
//   },
//   {
//     question: "What is the past tense of 'run'?",
//     options: ["Ran", "Run", "Runned", "Running"],
//     correctAnswer: "Ran"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "She don't like coffee.",
//       "She doesn't like coffee.",
//       "She not like coffee.",
//       "She isn't like coffee."
//     ],
//     correctAnswer: "She doesn't like coffee."
//   },
//   {
//     question: "What is the synonym of 'happy'?",
//     options: ["Sad", "Joyful", "Angry", "Tired"],
//     correctAnswer: "Joyful"
//   },
//   {
//     question: "Choose the correct article: '____ apple a day keeps the doctor away.'",
//     options: ["A", "An", "The", "No article"],
//     correctAnswer: "An"
//   },
//   {
//     question: "What is the plural form of 'knife'?",
//     options: ["Knives", "Knifes", "Knife", "Knifves"],
//     correctAnswer: "Knives"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "I have two cats.",
//       "I has two cats.",
//       "I have two cat.",
//       "I has two cat."
//     ],
//     correctAnswer: "I have two cats."
//   },
//   {
//     question: "What is the past tense of 'go'?",
//     options: ["Went", "Gone", "Goed", "Going"],
//     correctAnswer: "Went"
//   },
//   {
//     question: "Choose the correct pronoun: 'This book belongs to ____.'",
//     options: ["me", "I", "mine", "my"],
//     correctAnswer: "me"
//   },
//   {
//     question: "What is the antonym of 'difficult'?",
//     options: ["Easy", "Hard", "Tough", "Complex"],
//     correctAnswer: "Easy"
//   },
//   {
//     question: "Which is a correct sentence?",
//     options: [
//       "They is playing football.",
//       "They are playing football.",
//       "They plays football.",
//       "They playing football."
//     ],
//     correctAnswer: "They are playing football."
//   },
//   {
//     question: "What is the past tense of 'eat'?",
//     options: ["Ate", "Eaten", "Eat", "Eating"],
//     correctAnswer: "Ate"
//   },
//   {
//     question: "Choose the correct form: 'She ____ a book now.'",
//     options: ["reads", "is reading", "read", "reading"],
//     correctAnswer: "is reading"
//   },
//   {
//     question: "What is the synonym of 'big'?",
//     options: ["Small", "Large", "Tiny", "Short"],
//     correctAnswer: "Large"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "He don't have a car.",
//       "He doesn't have a car.",
//       "He not have a car.",
//       "He hasn't a car."
//     ],
//     correctAnswer: "He doesn't have a car."
//   },
//   {
//     question: "What is the plural of 'city'?",
//     options: ["Cities", "Citys", "Cityes", "Citis"],
//     correctAnswer: "Cities"
//   },
//   {
//     question: "Choose the correct form: 'They ____ to the park yesterday.'",
//     options: ["go", "went", "gone", "going"],
//     correctAnswer: "went"
//   },
//   {
//     question: "What is the antonym of 'fast'?",
//     options: ["Slow", "Quick", "Rapid", "Speedy"],
//     correctAnswer: "Slow"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "I am go to school.",
//       "I am going to school.",
//       "I go to school am.",
//       "I going to school."
//     ],
//     correctAnswer: "I am going to school."
//   },
//   {
//     question: "What is the past tense of 'drink'?",
//     options: ["Drank", "Drunk", "Drinked", "Drinking"],
//     correctAnswer: "Drank"
//   },
//   {
//     question: "Choose the correct article: '____ sun rises in the east.'",
//     options: ["A", "An", "The", "No article"],
//     correctAnswer: "The"
//   },
//   {
//     question: "What is the synonym of 'beautiful'?",
//     options: ["Ugly", "Pretty", "Plain", "Dull"],
//     correctAnswer: "Pretty"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "She sing very well.",
//       "She sings very well.",
//       "She singing very well.",
//       "She is sing very well."
//     ],
//     correctAnswer: "She sings very well."
//   },
//   {
//     question: "What is the plural of 'baby'?",
//     options: ["Babies", "Babys", "Babyes", "Babis"],
//     correctAnswer: "Babies"
//   },
//   {
//     question: "Choose the correct form: 'We ____ TV right now.'",
//     options: ["watch", "are watching", "watched", "watching"],
//     correctAnswer: "are watching"
//   },
//   {
//     question: "What is the antonym of 'hot'?",
//     options: ["Cold", "Warm", "Cool", "All of the above"],
//     correctAnswer: "All of the above"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "He have a dog.",
//       "He has a dog.",
//       "He having a dog.",
//       "He is have a dog."
//     ],
//     correctAnswer: "He has a dog."
//   },
//   {
//     question: "What is the past tense of 'write'?",
//     options: ["Wrote", "Written", "Writed", "Writing"],
//     correctAnswer: "Wrote"
//   },
//   {
//     question: "Choose the correct pronoun: 'The book is ____.'",
//     options: ["mine", "me", "I", "my"],
//     correctAnswer: "mine"
//   },
//   {
//     question: "What is the synonym of 'small'?",
//     options: ["Big", "Tiny", "Large", "Huge"],
//     correctAnswer: "Tiny"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "They doesn't like to dance.",
//       "They don't like to dance.",
//       "They not like to dance.",
//       "They isn't like to dance."
//     ],
//     correctAnswer: "They don't like to dance."
//   },
//   {
//     question: "What is the plural of 'life'?",
//     options: ["Lives", "Lifes", "Lifees", "Livs"],
//     correctAnswer: "Lives"
//   },
//   {
//     question: "Choose the correct form: 'I ____ to the store yesterday.'",
//     options: ["go", "went", "gone", "going"],
//     correctAnswer: "went"
//   },
//   {
//     question: "What is the antonym of 'happy'?",
//     options: ["Sad", "Joyful", "Excited", "Cheerful"],
//     correctAnswer: "Sad"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "She is read a book.",
//       "She is reading a book.",
//       "She reads a book is.",
//       "She reading a book."
//     ],
//     correctAnswer: "She is reading a book."
//   },
//   {
//     question: "What is the past tense of 'see'?",
//     options: ["Saw", "Seen", "Seed", "Seeing"],
//     correctAnswer: "Saw"
//   },
//   {
//     question: "Choose the correct article: '____ elephant is a large animal.'",
//     options: ["A", "An", "The", "No article"],
//     correctAnswer: "An"
//   },
//   {
//     question: "What is the synonym of 'fast'?",
//     options: ["Slow", "Quick", "Lazy", "Idle"],
//     correctAnswer: "Quick"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "He don't play soccer.",
//       "He doesn't play soccer.",
//       "He not play soccer.",
//       "He isn't play soccer."
//     ],
//     correctAnswer: "He doesn't play soccer."
//   },
//   {
//     question: "What is the plural of 'mouse'?",
//     options: ["Mice", "Mouses", "Mousees", "Mices"],
//     correctAnswer: "Mice"
//   },
//   {
//     question: "Choose the correct form: 'They ____ football every weekend.'",
//     options: ["play", "plays", "playing", "are play"],
//     correctAnswer: "play"
//   },
//   {
//     question: "What is the antonym of 'big'?",
//     options: ["Small", "Large", "Huge", "Tall"],
//     correctAnswer: "Small"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "I am go to the park.",
//       "I am going to the park.",
//       "I go to the park am.",
//       "I going to the park."
//     ],
//     correctAnswer: "I am going to the park."
//   },
//   {
//     question: "What is the past tense of 'buy'?",
//     options: ["Bought", "Buyed", "Boughten", "Buying"],
//     correctAnswer: "Bought"
//   },
//   {
//     question: "Choose the correct pronoun: 'This is ____ car.'",
//     options: ["my", "me", "I", "mine"],
//     correctAnswer: "my"
//   },
//   {
//     question: "What is the synonym of 'sad'?",
//     options: ["Happy", "Unhappy", "Joyful", "Excited"],
//     correctAnswer: "Unhappy"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "She don't have a pen.",
//       "She doesn't have a pen.",
//       "She not have a pen.",
//       "She hasn't a pen."
//     ],
//     correctAnswer: "She doesn't have a pen."
//   },
//   {
//     question: "What is the plural of 'foot'?",
//     options: ["Feet", "Foots", "Footes", "Feets"],
//     correctAnswer: "Feet"
//   },
//   {
//     question: "Choose the correct form: 'He ____ to music every evening.'",
//     options: ["listen", "listens", "listening", "is listen"],
//     correctAnswer: "listens"
//   },
//   {
//     question: "What is the antonym of 'old'?",
//     options: ["Young", "New", "Fresh", "All of the above"],
//     correctAnswer: "All of the above"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "They is running fast.",
//       "They are running fast.",
//       "They runs fast.",
//       "They running fast."
//     ],
//     correctAnswer: "They are running fast."
//   },
//   {
//     question: "What is the past tense of 'take'?",
//     options: ["Took", "Taken", "Taked", "Taking"],
//     correctAnswer: "Took"
//   },
//   {
//     question: "Choose the correct article: '____ moon is bright tonight.'",
//     options: ["A", "An", "The", "No article"],
//     correctAnswer: "The"
//   },
//   {
//     question: "What is the synonym of 'difficult'?",
//     options: ["Easy", "Hard", "Simple", "Clear"],
//     correctAnswer: "Hard"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "He write a letter.",
//       "He writes a letter.",
//       "He writing a letter.",
//       "He is write a letter."
//     ],
//     correctAnswer: "He writes a letter."
//   },
//   {
//     question: "What is the plural of 'child'?",
//     options: ["Children", "Childs", "Childes", "Childrens"],
//     correctAnswer: "Children"
//   },
//   {
//     question: "Choose the correct form: 'We ____ a movie last night.'",
//     options: ["watch", "watched", "watching", "are watch"],
//     correctAnswer: "watched"
//   },
//   {
//     question: "What is the antonym of 'beautiful'?",
//     options: ["Ugly", "Pretty", "Lovely", "Charming"],
//     correctAnswer: "Ugly"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "I don't likes coffee.",
//       "I don't like coffee.",
//       "I not like coffee.",
//       "I doesn't like coffee."
//     ],
//     correctAnswer: "I don't like coffee."
//   },
//   {
//     question: "What is the past tense of 'give'?",
//     options: ["Gave", "Given", "Gived", "Giving"],
//     correctAnswer: "Gave"
//   },
//   {
//     question: "Choose the correct pronoun: 'The keys are ____.'",
//     options: ["mine", "me", "I", "my"],
//     correctAnswer: "mine"
//   },
//   {
//     question: "What is the synonym of 'happy'?",
//     options: ["Sad", "Cheerful", "Angry", "Tired"],
//     correctAnswer: "Cheerful"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "She go to school.",
//       "She goes to school.",
//       "She going to school.",
//       "She is go to school."
//     ],
//     correctAnswer: "She goes to school."
//   },
//   {
//     question: "What is the plural of 'man'?",
//     options: ["Men", "Mans", "Manes", "Mens"],
//     correctAnswer: "Men"
//   },
//   {
//     question: "Choose the correct form: 'They ____ dinner now.'",
//     options: ["eat", "eats", "eating", "are eating"],
//     correctAnswer: "are eating"
//   },
//   {
//     question: "What is the antonym of 'fast'?",
//     options: ["Slow", "Quick", "Rapid", "Speedy"],
//     correctAnswer: "Slow"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "He is play soccer.",
//       "He is playing soccer.",
//       "He plays soccer is.",
//       "He playing soccer."
//     ],
//     correctAnswer: "He is playing soccer."
//   },
//   {
//     question: "What is the past tense of 'come'?",
//     options: ["Came", "Come", "Comed", "Coming"],
//     correctAnswer: "Came"
//   },
//   {
//     question: "Choose the correct article: '____ cat is on the mat.'",
//     options: ["A", "An", "The", "No article"],
//     correctAnswer: "The"
//   },
//   {
//     question: "What is the synonym of 'big'?",
//     options: ["Small", "Huge", "Tiny", "Short"],
//     correctAnswer: "Huge"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "They doesn't read books.",
//       "They don't read books.",
//       "They not read books.",
//       "They isn't read books."
//     ],
//     correctAnswer: "They don't read books."
//   },
//   {
//     question: "What is the plural of 'woman'?",
//     options: ["Women", "Womans", "Womanes", "Womens"],
//     correctAnswer: "Women"
//   },
//   {
//     question: "Choose the correct form: 'I ____ to the gym every day.'",
//     options: ["go", "goes", "gone", "going"],
//     correctAnswer: "go"
//   },
//   {
//     question: "What is the antonym of 'happy'?",
//     options: ["Sad", "Joyful", "Excited", "Cheerful"],
//     correctAnswer: "Sad"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "She is write a letter.",
//       "She is writing a letter.",
//       "She writes a letter is.",
//       "She writing a letter."
//     ],
//     correctAnswer: "She is writing a letter."
//   },
//   {
//     question: "What is the past tense of 'make'?",
//     options: ["Made", "Maked", "Maken", "Making"],
//     correctAnswer: "Made"
//   },
//   {
//     question: "Choose the correct pronoun: 'This is ____ book.'",
//     options: ["my", "me", "I", "mine"],
//     correctAnswer: "my"
//   },
//   {
//     question: "What is the synonym of 'small'?",
//     options: ["Big", "Little", "Large", "Huge"],
//     correctAnswer: "Little"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "He don't like tea.",
//       "He doesn't like tea.",
//       "He not like tea.",
//       "He isn't like tea."
//     ],
//     correctAnswer: "He doesn't like tea."
//   },
//   {
//     question: "What is the plural of 'deer'?",
//     options: ["Deer", "Deers", "Deeres", "Deeries"],
//     correctAnswer: "Deer"
//   },
//   {
//     question: "Choose the correct form: 'We ____ to the park every Sunday.'",
//     options: ["go", "goes", "gone", "going"],
//     correctAnswer: "go"
//   },
//   {
//     question: "What is the antonym of 'difficult'?",
//     options: ["Easy", "Hard", "Tough", "Complex"],
//     correctAnswer: "Easy"
//   },
//   {
//     question: "Which is the correct sentence?",
//     options: [
//       "They is watching TV.",
//       "They are watching TV.",
//       "They watches TV.",
//       "They watching TV."
//     ],
//     correctAnswer: "They are watching TV."
//   },
//   {
//     question: "What is the past tense of 'find'?",
//     options: ["Found", "Finded", "Funden", "Finding"],
//     correctAnswer: "Found"
//   },
//   {
//     question: "Choose the correct article: '____ dog is barking.'",
//     options: ["A", "An", "The", "No article"],
//     correctAnswer: "The"
//   },
//   {
//     question: "What is the synonym of 'beautiful'?",
//     options: ["Ugly", "Lovely", "Plain", "Dull"],
//     correctAnswer: "Lovely"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "She sing a song.",
//       "She sings a song.",
//       "She singing a song.",
//       "She is sing a song."
//     ],
//     correctAnswer: "She sings a song."
//   }
// ];

// export const advancedQuestions = [
//   {
//     question: "Identify the sentence with correct punctuation:",
//     options: [
//       "She said, 'I'll be there soon.'",
//       "She said 'I'll be there soon'.",
//       "She said, 'I'll be there soon'.",
//       "She said 'I'll be there soon.'"
//     ],
//     correctAnswer: "She said, 'I'll be there soon.'"
//   },
//   {
//     question: "Choose the correct form: 'If I ____ him, I would tell him the truth.'",
//     options: ["saw", "seen", "see", "seeing"],
//     correctAnswer: "saw"
//   },
//   {
//     question: "What is the correct passive voice: 'The book ____ by the author last year.'",
//     options: ["was written", "is written", "wrote", "writing"],
//     correctAnswer: "was written"
//   },
//   {
//     question: "Which word is a synonym of 'ephemeral'?",
//     options: ["Permanent", "Transient", "Eternal", "Lasting"],
//     correctAnswer: "Transient"
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       "Neither of the boys are here.",
//       "Neither of the boys is here.",
//       "None of the boys is here.",
//       "None of the boys are here."
//     ],
//     correctAnswer: "Neither of the boys is here."
//   },
//   {
//     question: "What is the past participle of 'choose'?",
//     options: ["Chose", "Chosen", "Choosed", "Choosing"],
//     correctAnswer: "Chosen"
//   },
//   {
//     question: "Identify the sentence with correct grammar:",
//     options: [
//       "She has went to the store.",
//       "She has gone to the store.",
//       "She have gone to the store.",
//       "She gone to the store."
//     ],
//     correctAnswer: "She has gone to the store."
//   },
//   {
//     question: "What is the antonym of 'benevolent'?",
//     options: ["Kind", "Cruel", "Generous", "Friendly"],
//     correctAnswer: "Cruel"
//   },
//   {
//     question: "Choose the correct form: 'By the time we arrive, they ____ dinner.'",
//     options: ["will have finished", "will finish", "finish", "finished"],
//     correctAnswer: "will have finished"
//   },
//   {
//     question: "Which sentence uses the subjunctive mood correctly?",
//     options: [
//       "I wish I was rich.",
//       "I wish I were rich.",
//       "I wish I am rich.",
//       "I wish I be rich."
//     ],
//     correctAnswer: "I wish I were rich."
//   },
//   {
//     question: "What is the synonym of 'ubiquitous'?",
//     options: ["Rare", "Common", "Unique", "Scarce"],
//     correctAnswer: "Common"
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       "The data is reliable.",
//       "The data are reliable.",
//       "The data be reliable.",
//       "The data was reliable."
//     ],
//     correctAnswer: "The data are reliable."
//   },
//   {
//     question: "What is the past participle of 'lie' (to recline)?",
//     options: ["Lain", "Lied", "Lay", "Lying"],
//     correctAnswer: "Lain"
//   },
//   {
//     question: "Identify the sentence with correct punctuation:",
//     options: [
//       "However I can help.",
//       "However, I can help.",
//       "However; I can help.",
//       "However I can help,"
//     ],
//     correctAnswer: "However, I can help."
//   },
//   {
//     question: "What is the antonym of 'obscure'?",
//     options: ["Hidden", "Clear", "Vague", "Unknown"],
//     correctAnswer: "Clear"
//   },
//   {
//     question: "Choose the correct form: 'She ____ to the meeting if she had known.'",
//     options: ["would have gone", "would go", "will go", "went"],
//     correctAnswer: "would have gone"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "Everyone have their own opinion.",
//       "Everyone has their own opinion.",
//       "Everyone have his own opinion.",
//       "Everyone has his own opinion."
//     ],
//     correctAnswer: "Everyone has their own opinion."
//   },
//   {
//     question: "What is the synonym of 'meticulous'?",
//     options: ["Careless", "Precise", "Hasty", "Negligent"],
//     correctAnswer: "Precise"
//   },
//   {
//     question: "Choose the correct passive voice: 'The house ____ by the workers.'",
//     options: ["is being painted", "is painted", "painted", "painting"],
//     correctAnswer: "is being painted"
//   },
//   {
//     question: "What is the past participle of 'swim'?",
//     options: ["Swam", "Swum", "Swimmed", "Swimming"],
//     correctAnswer: "Swum"
//   },
//   {
//     question: "Identify the sentence with correct grammar:",
//     options: [
//       "She don't know the answer.",
//       "She doesn't know the answer.",
//       "She not know the answer.",
//       "She isn't know the answer."
//     ],
//     correctAnswer: "She doesn't know the answer."
//   },
//   {
//     question: "What is the antonym of 'prolific'?",
//     options: ["Productive", "Barren", "Abundant", "Fruitful"],
//     correctAnswer: "Barren"
//   },
//   {
//     question: "Choose the correct form: 'If he ____ harder, he would have passed.'",
//     options: ["had studied", "studied", "studies", "study"],
//     correctAnswer: "had studied"
//   },
//   {
//     question: "Which sentence uses the correct article?",
//     options: [
//       "A sun is shining brightly.",
//       "An sun is shining brightly.",
//       "The sun is shining brightly.",
//       "Sun is shining brightly."
//     ],
//     correctAnswer: "The sun is shining brightly."
//   },
//   {
//     question: "What is the synonym of 'ambiguous'?",
//     options: ["Clear", "Vague", "Certain", "Definite"],
//     correctAnswer: "Vague"
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       "Less people attended the event.",
//       "Fewer people attended the event.",
//       "Lesser people attended the event.",
//       "Few people attended the event."
//     ],
//     correctAnswer: "Fewer people attended the event."
//   },
//   {
//     question: "What is the past participle of 'drink'?",
//     options: ["Drank", "Drunk", "Drinked", "Drinking"],
//     correctAnswer: "Drunk"
//   },
//   {
//     question: "Identify the sentence with correct punctuation:",
//     options: [
//       "I have two cats: Fluffy and Whiskers.",
//       "I have two cats, Fluffy and Whiskers.",
//       "I have two cats; Fluffy and Whiskers.",
//       "I have two cats Fluffy and Whiskers."
//     ],
//     correctAnswer: "I have two cats: Fluffy and Whiskers."
//   },
//   {
//     question: "What is the antonym of 'vivid'?",
//     options: ["Bright", "Dull", "Colorful", "Lively"],
//     correctAnswer: "Dull"
//   },
//   {
//     question: "Choose the correct form: 'The project ____ by next month.'",
//     options: ["will be completed", "will complete", "completes", "completed"],
//     correctAnswer: "will be completed"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "Who did you give the book to?",
//       "Whom did you give the book to?",
//       "Who you gave the book to?",
//       "Whom you gave the book to?"
//     ],
//     correctAnswer: "Whom did you give the book to?"
//   },
//   {
//     question: "What is the synonym of 'tenacious'?",
//     options: ["Weak", "Persistent", "Fragile", "Delicate"],
//     correctAnswer: "Persistent"
//   },
//   {
//     question: "Choose the correct form: 'I wish I ____ to the party last night.'",
//     options: ["had gone", "went", "go", "going"],
//     correctAnswer: "had gone"
//   },
//   {
//     question: "What is the past participle of 'write'?",
//     options: ["Wrote", "Written", "Writed", "Writing"],
//     correctAnswer: "Written"
//   },
//   {
//     question: "Identify the sentence with correct grammar:",
//     options: [
//       "The team are playing well.",
//       "The team is playing well.",
//       "The team be playing well.",
//       "The team playing well."
//     ],
//     correctAnswer: "The team is playing well."
//   },
//   {
//     question: "What is the antonym of 'eloquent'?",
//     options: ["Articulate", "Inarticulate", "Fluent", "Expressive"],
//     correctAnswer: "Inarticulate"
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       "Its a beautiful day.",
//       "It's a beautiful day.",
//       "Its' a beautiful day.",
//       "It is a beautiful day."
//     ],
//     correctAnswer: "It's a beautiful day."
//   },
//   {
//     question: "What is the synonym of 'prudent'?",
//     options: ["Reckless", "Careful", "Careless", "Hasty"],
//     correctAnswer: "Careful"
//   },
//   {
//     question: "Choose the correct form: 'The book ____ before the movie was released.'",
//     options: ["had been published", "was published", "published", "publishing"],
//     correctAnswer: "had been published"
//   },
//   {
//     question: "Which sentence uses the correct pronoun?",
//     options: [
//       "Me and him went to the store.",
//       "He and I went to the store.",
//       "Him and I went to the store.",
//       "I and he went to the store."
//     ],
//     correctAnswer: "He and I went to the store."
//   },
//   {
//     question: "What is the past participle of 'see'?",
//     options: ["Saw", "Seen", "Seed", "Seeing"],
//     correctAnswer: "Seen"
//   },
//   {
//     question: "Identify the sentence with correct punctuation:",
//     options: [
//       "Lets go to the park.",
//       "Let's go to the park.",
//       "Let us go to the park.",
//       "Lets' go to the park."
//     ],
//     correctAnswer: "Let's go to the park."
//   },
//   {
//     question: "What is the antonym of 'transparent'?",
//     options: ["Clear", "Opaque", "Visible", "Bright"],
//     correctAnswer: "Opaque"
//   },
//   {
//     question: "Choose the correct form: 'If she ____ earlier, she would have caught the train.'",
//     options: ["had left", "left", "leaves", "leaving"],
//     correctAnswer: "had left"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "The number of students are increasing.",
//       "The number of students is increasing.",
//       "The number of students be increasing.",
//       "The number of students increasing."
//     ],
//     correctAnswer: "The number of students is increasing."
//   },
//   {
//     question: "What is the synonym of 'candid'?",
//     options: ["Dishonest", "Honest", "Secretive", "Deceptive"],
//     correctAnswer: "Honest"
//   },
//   {
//     question: "Choose the correct passive voice: 'The letter ____ by her yesterday.'",
//     options: ["was written", "is written", "wrote", "writing"],
//     correctAnswer: "was written"
//   },
//   {
//     question: "What is the past participle of 'go'?",
//     options: ["Went", "Gone", "Goed", "Going"],
//     correctAnswer: "Gone"
//   },
//   {
//     question: "Identify the sentence with correct grammar:",
//     options: [
//       "She has ran a marathon.",
//       "She has run a marathon.",
//       "She have run a marathon.",
//       "She run a marathon."
//     ],
//     correctAnswer: "She has run a marathon."
//   },
//   {
//     question: "What is the antonym of 'frugal'?",
//     options: ["Thrifty", "Wasteful", "Economical", "Careful"],
//     correctAnswer: "Wasteful"
//   },
//   {
//     question: "Choose the correct form: 'They ____ the project by next week.'",
//     options: ["will have completed", "will complete", "complete", "completed"],
//     correctAnswer: "will have completed"
//   },
//   {
//     question: "Which sentence uses the subjunctive mood correctly?",
//     options: [
//       "If I was you, I would study.",
//       "If I were you, I would study.",
//       "If I am you, I would study.",
//       "If I be you, I would study."
//     ],
//     correctAnswer: "If I were you, I would study."
//   },
//   {
//     question: "What is the synonym of 'resilient'?",
//     options: ["Fragile", "Buoyant", "Weak", "Delicate"],
//     correctAnswer: "Buoyant"
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       "A lot of information were shared.",
//       "A lot of information was shared.",
//       "A lot of informations were shared.",
//       "A lot of informations was shared."
//     ],
//     correctAnswer: "A lot of information was shared."
//   },
//   {
//     question: "What is the past participle of 'take'?",
//     options: ["Took", "Taken", "Taked", "Taking"],
//     correctAnswer: "Taken"
//   },
//   {
//     question: "Identify the sentence with correct punctuation:",
//     options: [
//       "I love to read, write, and singing.",
//       "I love to read, write, and sing.",
//       "I love to read, write and sing.",
//       "I love to read write and sing."
//     ],
//     correctAnswer: "I love to read, write, and sing."
//   },
//   {
//     question: "What is the antonym of 'authentic'?",
//     options: ["Genuine", "Fake", "Real", "True"],
//     correctAnswer: "Fake"
//   },
//   {
//     question: "Choose the correct form: 'The meeting ____ by the time we arrived.'",
//     options: ["had started", "started", "starts", "starting"],
//     correctAnswer: "had started"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "Each of the students have a book.",
//       "Each of the students has a book.",
//       "Each of the students have books.",
//       "Each of the students has books."
//     ],
//     correctAnswer: "Each of the students has a book."
//   },
//   {
//     question: "What is the synonym of 'obstinate'?",
//     options: ["Flexible", "Stubborn", "Adaptable", "Compliant"],
//     correctAnswer: "Stubborn"
//   },
//   {
//     question: "Choose the correct passive voice: 'The cake ____ by the chef.'",
//     options: ["was baked", "is baked", "baked", "baking"],
//     correctAnswer: "was baked"
//   },
//   {
//     question: "What is the past participle of 'run'?",
//     options: ["Ran", "Run", "Runned", "Running"],
//     correctAnswer: "Run"
//   },
//   {
//     question: "Identify the sentence with correct grammar:",
//     options: [
//       "The committee have decided.",
//       "The committee has decided.",
//       "The committee be decided.",
//       "The committee deciding."
//     ],
//     correctAnswer: "The committee has decided."
//   },
//   {
//     question: "What is the antonym of 'superficial'?",
//     options: ["Shallow", "Deep", "Surface", "Light"],
//     correctAnswer: "Deep"
//   },
//   {
//     question: "Choose the correct form: 'If you ____ earlier, you wouldn’t have missed it.'",
//     options: ["had arrived", "arrived", "arrive", "arriving"],
//     correctAnswer: "had arrived"
//   },
//   {
//     question: "Which sentence uses the correct article?",
//     options: [
//       "A apple is on the table.",
//       "An apple is on the table.",
//       "The apple is on the table.",
//       "Apple is on the table."
//     ],
//     correctAnswer: "An apple is on the table."
//   },
//   {
//     question: "What is the synonym of 'diligent'?",
//     options: ["Lazy", "Hardworking", "Careless", "Idle"],
//     correctAnswer: "Hardworking"
//   },
//   {
//     question: "Choose the correct sentence:",
//     options: [
//       "There is too many people here.",
//       "There are too many people here.",
//       "There be too many people here.",
//       "There is too much people here."
//     ],
//     correctAnswer: "There are too many people here."
//   },
//   {
//     question: "What is the past participle of 'give'?",
//     options: ["Gave", "Given", "Gived", "Giving"],
//     correctAnswer: "Given"
//   },
//   {
//     question: "Identify the sentence with correct punctuation:",
//     options: [
//       "The dog barked; the cat ran.",
//       "The dog barked, the cat ran.",
//       "The dog barked the cat ran.",
//       "The dog barked: the cat ran."
//     ],
//     correctAnswer: "The dog barked; the cat ran."
//   },
//   {
//     question: "What is the antonym of 'optimistic'?",
//     options: ["Hopeful", "Pessimistic", "Confident", "Positive"],
//     correctAnswer: "Pessimistic"
//   },
//   {
//     question: "Choose the correct form: 'The work ____ by the team last week.'",
//     options: ["was completed", "is completed", "completed", "completing"],
//     correctAnswer: "was completed"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "Who did you see at the party?",
//       "Whom did you see at the party?",
//       "Who you saw at the party?",
//       "Whom you saw at the party?"
//     ],
//     correctAnswer: "Whom did you see at the party?"
//   },
//   {
//     question: "What is the synonym of 'exquisite'?",
//     options: ["Ordinary", "Beautiful", "Plain", "Simple"],
//     correctAnswer: "Beautiful"
//   },
//   {
//     question: "Choose the correct form: 'I wish he ____ here now.'",
//     options: ["were", "was", "is", "be"],
//     correctAnswer: "were"
//   },
//   {
//     question: "What is the past participle of 'buy'?",
//     options: ["Bought", "Buyed", "Boughten", "Buying"],
//     correctAnswer: "Bought"
//   },
//   {
//     question: "Identify the sentence with correct grammar:",
//     options: [
//       "The news are surprising.",
//       "The news is surprising.",
//       "The news be surprising.",
//       "The news surprising."
//     ],
//     correctAnswer: "The news is surprising."
//   },
//   {
//     question: "What is the antonym of 'generous'?",
//     options: ["Kind", "Selfish", "Giving", "Charitable"],
//     correctAnswer: "Selfish"
//   },
//   {
//     question: "Choose the correct form: 'The movie ____ by the time we got there.'",
//     options: ["had started", "started", "starts", "starting"],
//     correctAnswer: "had started"
//   },
//   {
//     question: "Which sentence is correct?",
//     options: [
//       "All the children has toys.",
//       "All the children have toys.",
//       "All the children has toy.",
//       "All the children have toy."
//     ],
//     correctAnswer: "All the children have toys."
//   },
//   {
//     question: "What is the synonym of 'vivacious'?",
//     options: ["Dull", "Lively", "Quiet", "Calm"],
//     correctAnswer: "Lively"
//   },
//   {
//     question: "Choose the correct passive voice: 'The song ____ by the choir.'",
//     options: ["was sung", "is sung", "sang", "singing"],
//     correctAnswer: "was sung"
//   },
//   {
//     question: "What is the past participle of 'eat'?",
//     options: ["Ate", "Eaten", "Eat", "Eating"],
//     correctAnswer: "Eaten"
//   },
//   {
//     question: "Identify the sentence with correct punctuation:",
//     options: [
//       "I have three hobbies, reading, writing, and painting.",
//       "I have three hobbies: reading, writing, and painting.",
//       "I have three hobbies; reading, writing, and painting.",
//       "I have three hobbies reading, writing, and painting."
//     ],
//     correctAnswer: "I have three hobbies: reading, writing, and painting."
//   }
// ];



