var workouts = [
  {
    _id : 1,
    name: 'Regex',
    category: 'general',
    descriptions: ['Use http://www.regexr.com/ to help with building your your solution.'],
    rating: 2,
    estimatedTime: 900,
    exercises: [
      {
        question: 'Only get capital letters from "This is the Best 1!"',
        answer: '/[A-Z]/g',
        tips: ['Focus on getting characters'],
        viewTips: []
      },
      {
        question: 'Only get numbers',
        answer: '/[A-Z]/g',
        tips: ['Focus on getting numbers'],
        viewTips: []
      }
    ]
  },
  {
    _id : 2,
    name: 'Javascript',
    category: 'programming',
    descriptions: ['scripting programming language'],
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