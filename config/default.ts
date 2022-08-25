module.exports = {
  app: {
    port: 3000,
    ws_port: 80,
    name: 'Task Manager',
  },
  secret: 'secret',
  swagger: {
    base_path: '/api/',
  },
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'fusion_tech',
    password: '',
    database: 'tasks_management',
    synchronize: false,
    logging: true,
    subscribers: [],
  },
  //   redis: {
  //     host: 'redis',
  //     port: 6379,
  //   },
  //   body_parser_limit: '1mb',
  //   jwt: {
  //     jwt_secret: 'secret',
  //     jwt_session: {
  //       session: false,
  //     },
  //     jwt_admin_secret: 'admin_secret',
  //   },
  //   multer: {
  //     root_uploads_path: './uploads',
  //     avatars_path: './uploads',
  //     max_avatar_size: 16777216, // 16 mb,
  //     max_any_file_size: 104857600, // 100 mb
  //   },
  //   twilio: {
  //     sid: 'asdczczxvz',
  //     token: 'adsavzxdas',
  //     isHardcoded: false,
  //     code: '123456',
  //     phone: '14214214122',
  //     codeLength: 6,
  //   },
  //   scheduler: {
  //     isInit: true,
  //   },
  //   firebase: {
  //     projectId: 'test',
  //     private: 'test',
  //     clientEmail: 'test',
  //     isInit: false,
  //   },
  //   mailer: {
  //     user: '',
  //     password: '',
  //     port: 465,
  //     host: '',
  //     secure: true,
  //     isHardcoded: false,
  //     code: '123456',
  //     codeLength: 6,
  //   },
  //   superAdminEmail: 'superAdmin@mail.ru',
  //   adminsPasswordLength: 8,
  //   frontendHost: 'https://test-krypt-front-admin/',
  //   adminInviteUrl: 'accept-admin-invite/',
  //   forgotPasswordUrl: 'forgot-password/',
  //   changePasswordUrl: 'change-password/',
};
