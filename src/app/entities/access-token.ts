export class AccessToken {
  public access_token: string
  public expires_in: number // expiration time in seconds
  public jti: string
  public refresh_token: string
  public scope: string
  public token_type: string
}
