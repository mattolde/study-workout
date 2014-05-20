var workouts = [
  {
    _id : 1,
    name: 'Regex',
    category: 'general',
    description: 'Regular expressions',
    rating: 2,
    estimatedTime: 10,
    exercises: [
      {
        question: 'Only get capital letters',
        answer: '/[A-Z]/g'
      },
      {
        question: 'Only get numbers',
        answer: '/[A-Z]/g'
      }
    ]
  },
  {
    _id : 2,
    name: 'Javascript',
    category: 'programming',
    description: 'scripting programming language',
    rating: 1,
    estimatedTime: 30,
    exercises: [
      {
        question: 'Create a function ',
        answer: 'var test = function(){};'
      }
    ]
  }
];

var day = {
  date: 'Today',
  workouts: workouts
};