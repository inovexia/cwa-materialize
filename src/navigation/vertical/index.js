const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Question Bank',
      path: '/qb',
      icon: 'ri:question-line',
      children: [
        {
          title: 'All Questions',
          path: '/qb'
        },
        {
          title: 'Create Question',
          path: '/qb/create_question'
        }
      ]
    },
    {
      title: 'Tests',
      path: '/tests',
      icon: 'material-symbols:quiz-outline',
      children: [
        {
          title: 'All Tests',
          path: '/tests'
        },
        {
          title: 'Create Test',
          path: '/qb/create_test'
        }
      ]
    },
    {
      title: 'Courses',
      path: '/courses',
      icon: 'lucide:book'
    },
    {
      title: 'Meetings',
      path: '/meetings',
      icon: 'healthicons:i-training-class'
    },
    {
      title: 'Users',
      path: '/users',
      icon: 'mdi:users-outline'
    }
  ]
}

export default navigation
