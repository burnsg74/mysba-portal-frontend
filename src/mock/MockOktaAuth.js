// MockOktaAuth.js
export class MockOktaAuth {
  constructor(config) {
    this.config = config;
    this.user = sessionStorage.getItem('user');
    this.authState = {
      isAuthenticated: true,
      idToken: {
        claims: {
          email: this.user,
          name: 'Test User',
        },
      },
    };

    this.options = {
      restoreOriginalUri: async (_, originalUri) => {
        window.location.replace(originalUri || '/');
      },
    };

    this._oktaUserAgent = {
      addEnvironment: () => {},
      getHttpHeader: () => {
        return {
          'X-Okta-User-Agent-Extended': 'okta-auth-localhost:6343',
        };
      },
      getVersion: () => '7.6.0',
    };
  }

  async signIn() {
    this.authState.isAuthenticated = true;
    return {
      status: 'SUCCESS',
      sessionToken: 'mock-session-token',
    };
  }

  async signOut() {
    this.authState.isAuthenticated = false;
    return null;
  }

  async getUser() {
    return {
      sub: '00u1nwb8gl7y1t4Dy5d6',
      email: this.user,
      name: 'Test User',
    };
  }

  async isAuthenticated() {
    return true;
  }

  authStateManager = {
    getAuthState: () => this.authState,
    subscribe: callback => {
      // Mock subscription logic if needed
    },
    unsubscribe: callback => {
      // Mock unsubscription logic if needed
    },
  };

  handleAuthentication() {
    // Mock handling of authentication
  }

  removeRestoreOriginalUri() {
    // Mock method to match the real OktaAuth API
  }

  start() {
    // Mock start method
  }
}
