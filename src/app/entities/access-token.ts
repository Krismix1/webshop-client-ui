export class AccessToken {
  public access_token: string // tslint:disable-line
  // expiration time in seconds
  public expires_in: number // tslint:disable-line
  public jti: string
  public refresh_token: string // tslint:disable-line
  public scope: string
  public token_type: string // tslint:disable-line
}
