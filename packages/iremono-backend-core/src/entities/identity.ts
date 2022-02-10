import { Entity, EntityProps } from '../shared/entities';

interface Props extends EntityProps {
  email: string;
  password: string;
}

export class Identity extends Entity<Props> {
  private _isPasswordHashed: boolean;

  public constructor(props: Props, id?: string) {
    super(props, id);

    const isNew = id === undefined;
    this._isPasswordHashed = isNew ? false : true;

    if (isNew) {
      this._validateEmail(props.email);
      this._validatePassword(props.password);
    }
  }

  public updateEmail(newEmail: string) {
    this._validateEmail(newEmail);
    this._props.email = newEmail;
    this._props.updatedAt = new Date();
  }

  public async hashPassword(hashFunc: (plainPassword: string) => Promise<string>) {
    this._props.password = await hashFunc(this._props.password);
    this._isPasswordHashed = true;
  }

  get email() {
    return this._props.email;
  }

  get hashedPassword() {
    if (!this._isPasswordHashed) throw new Error('password is not hashed.');
    return this._props.password;
  }

  private _validateEmail(email: string) {
    // RFC 3696: https://www.rfc-editor.org/rfc/rfc3696.txt
    const emailMaxLength = 320;
    if (email.length > emailMaxLength)
      throw new Error(`Invalid email length: email length must be less than ${emailMaxLength}`);

    const emailFormatRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!emailFormatRegex.test(email)) throw new Error('Invalid email format');
  }

  private _validatePassword(password: string) {
    const passwordMinLength = 8;
    if (password.length < passwordMinLength)
      throw new Error(`Invalid password length: password length must be longer than ${passwordMinLength}`);
  }
}
