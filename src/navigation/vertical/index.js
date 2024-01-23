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
          path: '/qb/create'
        },
        {
          title: 'Upload Questions',
          path: '/qb/upload'
        },
        {
          title: 'Categories',
          path: '/qb/categories'
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
      title: 'Online Class',
      path: '/onlineclass',
      icon: 'healthicons:i-training-class'
    },
    {
      title: 'Users',
      path: '/users',
      icon: 'mdi:users-outline'
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: 'icon-park-outline:setting-web'
    }
  ]
}

export default navigation
