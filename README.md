# Simple Authentication for SPAs using Http-Only cookies

### Pros:

- Tokens stored in secured fashion
- Scalability from stateless auth - no session store
- No token management on Frontend
- Prevention from CSF attacks
- Optionally prevention from CSF attacks

### How does it work?

On user login short and long session JWT tokens are created and insert
to the corresponding cookies. Server defines to which upcoming requests
attach the cookies. Short-live cookie should be attached to all
protected routs, and long-live cookie to only 'refresh' route.
Http-Only cookies are managed and accessible only by server. This
eliminates exposing cookies content to the client and risk of XSS
attacks. Cookies can't be modified by client so there is no need for
creating session store in database.

# Example with Next and Redux (RTK Query):

On server side sessions are managed in routs and verify in middleware. Client catches auth errors in custom fetchBaseQuery from RTK query. This can be done in the same manner with Axios' interceptors.

### Handling short session on the server side.

Middleware verification checks if short session cookie exists and if contains valid JWT token. When verification fails new header is attached to request. This flag is caught in the endpoint and server sends back 401 response.

### Handling 401 unauthenticated request on the client side.

When 401 responses is caught in custom fetchBaseQuery client is making secondary call to 'refresh' endpoint. When response is successful initial request is made again. Otherwise user is redirected to not restricted page.

### Handling long session (refresh) on the server side.

'Refresh' endpoint verifies long session JWT token extracted from long-live cookie. If verification is successful server creates new JWT tokens for both sessions, inserts them to new created corresponding cookies, and sends 200 response. Otherwise 401 respond is send.

# Installation:

The app requires creating .env.local file with a mongoDB URL to your database of users and a secret key for encrypting/decrypting JWT tokens.

```
.env.local
MONGODB_URL=
USER_SESSION_KEY=
```

```bash
npm install
```

```bash
npm run dev
```
