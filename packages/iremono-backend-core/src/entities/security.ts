import { Entity, EntityProps } from '../shared/entities';

interface Props extends EntityProps {
  encryptionKeyInitializationVector: string;
  identityId: string;
}

export class Security extends Entity<Props> {
  public constructor(props: Props, id?: string) {
    super(props, id);

    const isNew = id === undefined;

    if (isNew) {
    }
  }

  get encryptionKeyInitializationVector() {
    return this._props.encryptionKeyInitializationVector;
  }

  get identityId() {
    return this._props.identityId;
  }
}
