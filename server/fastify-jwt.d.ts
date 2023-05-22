import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    // `payload` type is used for signing and verifying
    payload: {
      name: string;
      avatarUrl: string;
    };
    // `user` type is return type of `request.user` object
    user: {
      /**
       * User ID (subject)
       */
      sub: string;
      name: string;
      avatarUrl: string;
    };
  }
}
