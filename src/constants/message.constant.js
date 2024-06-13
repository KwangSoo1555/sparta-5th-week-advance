export const MESSAGES = {
  AUTH: {
    COMMON: {
      NAME: {
        BASE: 'This name must be only type of string.',
        MIN: 'This name must have at least 2 characters.',
        REQUIRED: 'Be sure to enter your name.',
      },
      EMAIL: {
        BASE: 'This email must be only type of string.',
        EMAIL: 'This email is not vaild.',
        REQUIRED: 'Be sure to enter your email.',
      },
      PASSWORD: {
        BASE: '비밀번호는 문자열입니다.',
        REQUIRED: '비밀번호를 입력해 주세요.',
        MIN: '비밀번호는 6자리 이상입니다.',
        INCONSISTENT: '비밀번호가 일치하지 않습니다.',
      },
      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
      FORBIDDEN: '접근 권한이 없습니다.',
      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
        ETC: '비정상적인 요청입니다.',
        DISCARDED_TOKEN: '폐기 된 인증 정보입니다.',
      },
    },
  },

  RESUME: {},
};
