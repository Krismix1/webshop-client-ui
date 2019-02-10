import { TestBed, async } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { TokenStorageService } from './../auth/token-storage.service'

import { AuthService } from './auth.service'
import { AccessToken } from './../entities/access-token'
import { Account } from './../entities/account'

import { environment } from './../../environments/environment'
// http interceptors
import { httpInterceptorProviders } from './../http-interceptors'
import { Router } from '@angular/router'

// mock class that allows for arbitrary fields, so that we are using Typescript correctly
class MockAccessToken {
  public access_token?: string // tslint:disable-line
  // expiration time in seconds
  public expires_in?: number // tslint:disable-line
  public jti?: string
  public refresh_token?: string // tslint:disable-line
  public scope?: string
  public token_type?: string // tslint:disable-line
}

function createStubToken (value: MockAccessToken = {}): AccessToken {
  return {...{
    access_token: '',
    expires_in: 30,
    jti: '',
    refresh_token: '',
    scope: '',
    token_type: ''
  } as AccessToken, ...value}
}


describe('AuthService', () => {
  let authService: AuthService
  let tokenStorageServiceSpy: jasmine.SpyObj<TokenStorageService>

  let httpTestingController: HttpTestingController
  let _baseUrl: String // tslint:disable-line
  let mockRouter: jasmine.SpyObj<Router>

  beforeEach(() => {
    _baseUrl = `${environment.authService}`

    const spy = jasmine.createSpyObj('TokenStorageService', ['getToken', 'clean', 'save', 'getTimestamp'])
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        httpInterceptorProviders,
        { provide: TokenStorageService, useValue: spy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [HttpClientTestingModule]
    })

    authService = TestBed.get(AuthService)
    tokenStorageServiceSpy = TestBed.get(TokenStorageService)

    httpTestingController = TestBed.get(HttpTestingController)

    mockRouter = TestBed.get(Router)
    mockRouter.navigate.and.callFake((value: string) => {
      console.log(`Router navigate called with value: ${value}`)
    })
  })


  it('1. Should be created', () => {
    expect(authService).toBeTruthy()
  })

  it('2. Should return false when no token retrieved', () => {
    const stubValue = null
    tokenStorageServiceSpy.getToken.and.returnValue(stubValue)
    expect(authService.isLoggedIn()).toBeFalsy()
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(1, 'getToken spy method was called more than once')
  })

  it('3. Should return false when expired token is retrieved', () => {
    const stubValue = createStubToken()
    tokenStorageServiceSpy.getToken.and.returnValue(stubValue)
    // return a date that is expires_in * 10 seconds ago
    tokenStorageServiceSpy.getTimestamp.and.returnValue(new Date(new Date().valueOf() - stubValue.expires_in * 10000))
    expect(authService.isLoggedIn()).toBeFalsy()
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(1, 'getToken spy method was called more than once')
    expect(tokenStorageServiceSpy.getTimestamp.calls.count())
      .toBe(1, 'getTimestamp spy method was called more than once')
  })

  it('4. Should return true when non-expired token is retrieved', () => {
    tokenStorageServiceSpy.getToken.and.returnValue(createStubToken())
    tokenStorageServiceSpy.getTimestamp.and.returnValue(new Date())

    expect(authService.isLoggedIn()).toBeTruthy()
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(1, 'getToken spy method was called more than once')
    expect(tokenStorageServiceSpy.getTimestamp.calls.count())
      .toBe(1, 'getTimestamp spy method was called more than once')
  })

  it('5. Should return false after logout', () => {
    tokenStorageServiceSpy.getToken.and.returnValue(createStubToken())
    tokenStorageServiceSpy.clean.and.callFake(() => {
      tokenStorageServiceSpy.getToken.and.returnValue(null)
    })
    tokenStorageServiceSpy.getTimestamp.and.returnValue(new Date())

    expect(authService.isLoggedIn()).toBeTruthy()
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(1, 'getToken spy method was called once')
    expect(tokenStorageServiceSpy.getTimestamp.calls.count())
      .toBe(1, 'getTimestamp spy method was called more than once')

    authService.logout()

    expect(authService.isLoggedIn()).toBeFalsy()
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(2, 'getToken spy method was called more than twice')
    expect(tokenStorageServiceSpy.clean.calls.count())
      .toBe(1, 'clean spy method was called more than twice')
    expect(tokenStorageServiceSpy.getTimestamp.calls.count())
      .toBe(1, 'getTimestamp spy method was called more than once after logout')
  })

  it('6. Should login', async(() => {
    // TODO: More on https://angular.io/guide/http#testing-http-requests : Testing for errors
    let stubValue: AccessToken
    tokenStorageServiceSpy.save.and.callFake((value: AccessToken) => {
      stubValue = value
      tokenStorageServiceSpy.getToken.and.returnValue(stubValue)
    })
    tokenStorageServiceSpy.getTimestamp.and.returnValue(new Date())

    authService.login('test username', 'test password')
      .subscribe(data => {
        // Assert that correct data was returned.
        expect(data).toBe(true, 'Return value of login() should be true')

        expect(authService.isLoggedIn()).toBe(true, 'After login(), isLoggedIn() should be true')
        expect(tokenStorageServiceSpy.getToken.calls.count() - 1) // subtract 1 because it is called in auth interceptor
          // 2 times because isLoggedIn() is called before the POST request and now
          .toBe(2, 'getToken spy method was called more than 2 times')
        expect(tokenStorageServiceSpy.getTimestamp.calls.count())
          .toBe(1, 'getTimestamp spy method was called more than once after logout')
        // TODO: When interceptor fails with 401
        // mockRouter.navigate(['test']);
        // expect(mockRouter.navigate.calls.count())
        //   .toBe(1, 'navigate spy method was called once');
        // expect(mockRouter.navigate.calls.mostRecent().args[0])
        //   .toEqual(['error']);
      })

    expect(authService.isLoggedIn()).toBe(false, 'isLoggedIn() should return false before login request')
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const authReq = httpTestingController.expectOne(`${_baseUrl}/oauth/token`)

    // Assert that the request is a POST.
    expect(authReq.request.method)
      .toEqual('POST', 'Login request should be a POST method')
    expect(authReq.request.headers.has('Authorization'))
      .toBeTruthy('Login request should have Authorization header')
    const basicToken = btoa(`${environment.jwtClient}:${environment.jwtSecret}`)
    expect(authReq.request.headers.get('Authorization'))
      .toEqual(`Basic ${basicToken}`, 'Value of basic tokens don\'t match')

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    const testData = createStubToken({access_token: 'Test access token'})
    authReq.flush(testData)

    const userReq = httpTestingController.expectOne(`${_baseUrl}/user`)

    // Assert that the request is a GET.
    expect(userReq.request.method).toEqual('GET')
    expect(userReq.request.headers.has('Authorization')).toBe(true, 'GET request for account info should have Authorization header')
    expect(userReq.request.headers.get('Authorization')).toEqual(`Bearer ${testData.access_token}`)

    // Respond with mock data, causing Observable to resolve.
    userReq.flush({
      username: 'Test user',
      authorities: ['Test authority 1', 'Test authority 2']
    } as Account)

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify()
  }))

  it('7. Should manage to logout after a login', async(() => {
    tokenStorageServiceSpy.save.and.callFake((value: any) => {
      tokenStorageServiceSpy.getToken.and.returnValue(value)
    })
    tokenStorageServiceSpy.clean.and.callFake(() => {
      tokenStorageServiceSpy.getToken.and.returnValue(null)
    })
    tokenStorageServiceSpy.getTimestamp.and.returnValue(new Date())

    authService.login('test username', 'test password')
      .subscribe(() => {
        expect(authService.isLoggedIn()).toBe(true, 'isLoggedIn() should return true after login request')

        authService.logout()
        expect(authService.isLoggedIn()).toBe(false, 'isLoggedIn() should return false after logout')
      })

    expect(authService.isLoggedIn()).toBe(false, 'isLoggedIn() should return false before login request')
    const authReq = httpTestingController.expectOne(`${_baseUrl}/oauth/token`)

    // Respond with mock data
    authReq.flush(createStubToken({ access_token: 'test token' }))

    // next line is needed so that httpTestingController.verify() doesn't fail
    const userReq = httpTestingController.expectOne(`${_baseUrl}/user`)
    // Respond with mock data, so that the request doesn't fails.
    userReq.flush({
      username: 'Test user',
      authorities: ['Test authority 1', 'Test authority 2']
    } as Account)

    // Assert that there are no outstanding requests.
    httpTestingController.verify()
  }))

  it('8. Can handle network errors', async(() => {
    // TODO: not finished, right now it only checks network error, but not api errors
    tokenStorageServiceSpy.save.and.callFake((value: AccessToken) => {
      tokenStorageServiceSpy.getToken.and.returnValue(value)
    })

    authService.login('test username', 'test password')
      .subscribe(
        () => fail('should have failed with the network error'),
        error => {
          expect(error).toEqual('No connection with the server.', 'message')
        }
      )

    const authReq = httpTestingController.expectOne(`${_baseUrl}/oauth/token`)

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const errMsg = 'simulated network error'
    const mockError = new ErrorEvent('Network error', {
      message: errMsg,
    })

    // Respond with mock error
    authReq.error(mockError)

    // Assert that there are no outstanding requests.
    httpTestingController.verify()
  }))
})
