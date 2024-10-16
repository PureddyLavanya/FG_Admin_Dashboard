const menuItems = {
  items: [
    {
      id: 'navigation',
      //title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'collapse',
          icon: 'feather icon-home',
          
          children: [
            {
              id: 'dashboard',
              title: 'Dashboard',
              type: 'item',
              url: '/app/dashboard/analytics',
            },
            {
              id: 'dashboard',
              title: 'Communication Status',
              type: 'item',
              url: '/dashboard/communicationstatus'
            },
            {
              id:'dashboard',
              title:'Sample Dashboard',
              type:'item',
              url:'/dashboard/sampledashboard'
            },
            {
              id: 'dataavailability',
              title: 'Data Availability',
              type: 'item',
              //url: '/basic/breadcrumb-pagination'
            }
          ]
        }
      ]
    },
    {
      id: 'utilities',
      title: 'Utilities',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Configuration',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'configuration1',
              title: 'Configuration1',
              type: 'item',
              //url: '/basic/button'
            },
            {
              id: 'configuration2',
              title: 'Configuration2',
              type: 'item',
              //url: '/basic/badges'
            },
            {
              id: 'configuration3',
              title: 'Configuration3',
              type: 'item',
              //url: '/basic/breadcrumb-pagination'
            }
          ]
        }
      ]
    },
    {
      id: 'details',
      title: 'Details',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'Meter Details',
          title: 'Meter Details',
          type: 'collapse',
          icon: 'feather icon-home',
          //url: '/app/dashboard/analytics',
          children: [
            {
              id: 'button',
              title: 'Button',
              type: 'item',
              //url: '/basic/button'
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              //url: '/basic/badges'
            }
          ]
        }
      ]
    },
    {
      id: 'auth',
      title: 'Authentication',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'sign in',
          title: 'Login',
          type: 'item',
          icon: 'feather icon-lock',
          url: '/auth/signin-1',
          target: true,
          breadcrumbs: false
        },
        {
          id: 'reset-pass',
          title: 'Reset Password',
          type: 'item',
          icon: 'feather icon-unlock',
          url: '/auth/reset-password-1',
          target: true,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      type: 'group',
      icon: 'icon-support',
      children: [
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          //url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          icon: 'feather icon-help-circle',
          classes: 'nav-item',
          //url: 'https://codedthemes.gitbook.io/gradient-able-react/',
          target: true,
          external: true
        }
      ]
    }
  ]
};

export default menuItems;
