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
      icon: 'mdi:email-outline'
    },
    {
      title: 'Tests',
      path: '/tests',
      icon: 'mdi:email-outline'
    },
    {
      title: 'Courses',
      path: '/courses',
      icon: 'mdi:email-outline'
    },
    {
      title: 'Meetings',
      path: '/meetings',
      icon: 'mdi:email-outline'
    },
    {
      title: 'Users',
      path: '/users',
      icon: 'mdi:email-outline'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default navigation
