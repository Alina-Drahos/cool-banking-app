/**
 * Express router paths go here.
 */

export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Banking:{
    Base: '/banking',
    Get:'/create_link_token',
    Put:'/send_public_token'
  }
} as const
