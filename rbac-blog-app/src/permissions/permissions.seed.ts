export const PERMISSIONS = [
  'create_user',
  'update_user',
  'delete_user',
  'create_blog',
  'read_blog',
  'update_own_blog',
  'delete_own_blog',
  'delete_any_blog',
];
export const ROLE_PERMISSIONS = {
  'super-admin': [
    'create_user',
    'update_user',
    'delete_user',
    'delete_any_blog',
  ],
  'admin': [
    'create_user',
    'update_user',
    'delete_user',
  ],
  'user': [
    'create_blog',
    'read_blog',
    'update_own_blog',
    'delete_own_blog',
  ],
};
