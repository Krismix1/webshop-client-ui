import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './../auth/token-storage.service';

import { AuthService } from './auth.service';
import { AccessToken } from './../entities/access-token';
import { Principal } from './../entities/principal';

import { environment } from './../../environments/environment';
// http interceptors
import { httpInterceptorProviders } from './../http-interceptors';
import { Router } from '@angular/router';


describe('AuthService', () => {
  let authService: AuthService;
  let tokenStorageServiceSpy: jasmine.SpyObj<TokenStorageService>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let _baseUrl: String;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    _baseUrl = `${environment.authService}`;

    const spy = jasmine.createSpyObj('TokenStorageService', ['getToken', 'discardToken', 'saveToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthService, httpInterceptorProviders, { provide: TokenStorageService, useValue: spy }, { provide: Router, useValue: routerSpy }],
      imports: [HttpClientTestingModule]
    });

    authService = TestBed.get(AuthService);
    tokenStorageServiceSpy = TestBed.get(TokenStorageService);

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    mockRouter = TestBed.get(Router);
    mockRouter.navigate.and.callFake((value) => {
      console.log(`Router navigate called with value: ${value}`)
    });
  });


  it('1. Should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('2. Should return false when not logged in', () => {
    const stubValue = '';
    tokenStorageServiceSpy.getToken.and.returnValue(stubValue);
    expect(authService.isLoggedIn()).toBeFalsy();
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(1, 'getToken spy method was called once');
    expect(tokenStorageServiceSpy.getToken.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });

  it('3. Should return true when some token is provided', () => {
    const stubValue = 'test token';
    tokenStorageServiceSpy.getToken.and.returnValue(stubValue);

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(1, 'getToken spy method was called once');
    expect(tokenStorageServiceSpy.getToken.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });

  it('4. Should return false after logout', () => {
    let stubValue = 'test token';
    tokenStorageServiceSpy.getToken.and.returnValue(stubValue);
    tokenStorageServiceSpy.discardToken.and.callFake(() => {
      stubValue = undefined;
    });

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(1, 'getToken spy method was called once');
    expect(tokenStorageServiceSpy.getToken.calls.mostRecent().returnValue)
      .toBe(stubValue);
    // logout
    authService.logout();

    tokenStorageServiceSpy.getToken.and.returnValue(stubValue);
    expect(authService.isLoggedIn()).toBeFalsy();
    expect(tokenStorageServiceSpy.getToken.calls.count())
      .toBe(2, 'getToken spy method was called twice');
    expect(tokenStorageServiceSpy.discardToken.calls.count())
      .toBe(1, 'discardToken spy method was called twice');
    expect(tokenStorageServiceSpy.getToken.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });

  it('5. Should login', async(() => {
    // TODO: More on https://angular.io/guide/http#testing-http-requests : Testing for errors
    const testData: AccessToken = {
      access_token: 'Test Token',
      expires_in: 30,
      jti: 'Test jti',
      refresh_token: 'Test refresh token',
      scope: 'Test scope',
      token_type: 'Test token type'
    };

    let stubValue;
    tokenStorageServiceSpy.saveToken.and.callFake((value) => {
      stubValue = value;
      tokenStorageServiceSpy.getToken.and.returnValue(stubValue);
    });

    authService.login('test username', 'test password')
      .subscribe(data => {
        // Assert that correct data was returned.
        expect(data).toBe(true, 'Login is true');

        expect(authService.isLoggedIn()).toBe(true, 'True login after POST');
        expect(tokenStorageServiceSpy.getToken.calls.count() - 1) // subtract 1 because it is called in auth interceptor
          .toBe(2, 'getToken spy method was called once');
        expect(tokenStorageServiceSpy.getToken.calls.mostRecent().returnValue)
          .toBe(stubValue);
        // TODO: When interceptor fails with 401
        // mockRouter.navigate(['test']);
        // expect(mockRouter.navigate.calls.count())
        //   .toBe(1, 'navigate spy method was called once');
        // expect(mockRouter.navigate.calls.mostRecent().args[0])
        //   .toEqual(['error']);
      });

    expect(authService.isLoggedIn()).toBe(false, 'False login before POST');
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const authReq = httpTestingController.expectOne(`${_baseUrl}/oauth/token`);

    // Assert that the request is a POST.
    expect(authReq.request.method).toEqual('POST');
    expect(authReq.request.headers.has('Authorization')).toBeTruthy('Post request has Authorization header');
    expect(authReq.request.headers.get('authorization')).toEqual(`Basic ${btoa('webshopclient:mysecret')}`);

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    authReq.flush(testData);

    const userReq = httpTestingController.expectOne(`${_baseUrl}/user`);

    // Assert that the request is a GET.
    expect(userReq.request.method).toEqual('GET');
    expect(userReq.request.headers.has('Authorization')).toBeTruthy('Get request has Authorization header');
    expect(userReq.request.headers.get('authorization')).toEqual(`Bearer ${testData.access_token}`);

    // Respond with mock data, causing Observable to resolve.
    userReq.flush({ user: 'Test user', authorities: ['Test authority 1', 'Test authority 2'] } as Principal);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  }));

  it('6. Should logout after login', async(() => {
    const testData: AccessToken = {
      access_token: 'Test Token',
      expires_in: 30,
      jti: 'Test jti',
      refresh_token: 'Test refresh token',
      scope: 'Test scope',
      token_type: 'Test token type'
    };

    let stubValue;
    tokenStorageServiceSpy.saveToken.and.callFake((value) => {
      stubValue = value;
      tokenStorageServiceSpy.getToken.and.returnValue(stubValue);
    });

    tokenStorageServiceSpy.discardToken.and.callFake(() => {
      stubValue = undefined;
    });
    authService.login('test username', 'test password')
      .subscribe(() => {
        // check that is logged in
        expect(authService.isLoggedIn()).toBe(true, 'True login after POST');
        // logout
        authService.logout();
        tokenStorageServiceSpy.getToken.and.returnValue(stubValue);
        expect(authService.isLoggedIn()).toBe(false, 'isLoggedIn is false');
      });

    expect(authService.isLoggedIn()).toBe(false, 'False login before POST');
    const authReq = httpTestingController.expectOne(`${_baseUrl}/oauth/token`);

    authReq.flush(testData);

    // next line is needed so that httpTestingController.verify() doesn't fail
    const userReq = httpTestingController.expectOne(`${_baseUrl}/user`);
    // Respond with mock data, so that the request doesn't fails.
    // userReq.flush({ user: 'Test user', authorities: ['Test authority 1', 'Test authority 2'] } as Principal);

    // Assert that there are no outstanding requests.
    httpTestingController.verify();
  }));

  it('7. Can handle network errors', async(() => {
    // TODO: not finished, right now it only checks network error, but not api errors
    let stubValue;
    tokenStorageServiceSpy.saveToken.and.callFake((value) => {
      stubValue = value;
      tokenStorageServiceSpy.getToken.and.returnValue(stubValue);
    });

    const emsg = 'simulated network error';
    authService.login('test username', 'test password')
      .subscribe(
        data => fail('should have failed with the network error'),
        error => {
          expect(error).toEqual('No connection with the server.', 'message');
        }
      );

    const authReq = httpTestingController.expectOne(`${_baseUrl}/oauth/token`);

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    // Respond with mock error
    authReq.error(mockError);

    // Assert that there are no outstanding requests.
    httpTestingController.verify();
  }));
});
