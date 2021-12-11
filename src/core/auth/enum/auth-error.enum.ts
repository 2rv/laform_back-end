export enum AUTH_ERROR {
  UNCORRECT_CURRENT_PASSWORD = 'AUTH_UNCORRECT_CURRENT_PASSWORD',
  USER_ALREADY_CONFIRMED = 'AUTH_USER_ALREADY_CONFIRMED',
  BAD_CONFIRM_CODE = 'AUTH_RESET_BAD_CONFIRM_CODE',
  USERNAME_ALREADY_EXISTS = 'SIGN_UP_USERNAME_ALREADY_EXISTS',
  COULDNT_FOUND_USER = 'LOGIN_COULDNT_FOUND_USER',
  UNCORRECT_PASSWORD_OR_LOGIN = 'LOGIN_UNCORRECT_PASSWORD_OR_LOGIN',
  UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  COULDNT_FOUND_USER_DATA = 'COULDNT_FOUND_USER_DATA',
  USER_ALREADY_EXISTS = 'INVITE_USER_ALREADY_EXISTS',
  USER_WITH_THIS_ID_NOT_FOUND = 'USER_WITH_THIS_ID_NOT_FOUND',
  USER_NOT_CONFIRMED = 'USER_NOT_CONFIRMED',
  AUTH_CODE_IS_INCORRECT = 'OTHER.INCORRECT_CODE',

  UPDATE_OLD_CODE_INCORRECT = 'UPDATE_OLD_CODE_INCORRECT',
  UPDATE_NEW_CODE_INCORRECT = 'UPDATE_NEW_CODE_INCORRECT',
  CODES_IS_INCORRECT = 'CODES_IS_INCORRECT',
}
