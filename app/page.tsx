export default function IndexPage() {
  return (
    <section>
      <h1>Simple Authentication for SPAs using Http-Only cookies</h1>

      <p>
        <b>Pros:</b>
      </p>

      <li> Tokens stored in secured fashion</li>
      <li> Scalability from stateless auth - no session store</li>
      <li> No token management on Frontend</li>
      <li> Prevention from CSF attacks</li>
      <li> Optionally prevention from CSF attacks</li>

      <p>
        <b>How does it work?</b>
      </p>
      <p>
        On user login short and long session JWT tokens are created and insert
        to the corresponding cookies. Server defines to which upcoming requests
        attach the cookies. Short-live cookie should be attached to all
        protected routs, and long-live cookie to only 'refresh' route. Http-Only
        cookies are managed and accessible only by server. This eliminates
        exposing cookies content to the client and risk of XSS attacks. Cookies
        can't be modified by client so there is no need for creating session
        store in database.
      </p>

      <h1>Auth with Next.js and Redux (RTK Query) library</h1>

      <p>
        On server side sessions are managed in routs and verify in middleware.
        Client catches auth errors in custom fetchBaseQuery from RTK query. This
        can be done in the similar manner for any UI with Axios' interceptors.
      </p>

      <p>
        <b>Handling short session on the server side.</b>
      </p>
      <p>
        Middleware verification checks if short session cookie exists and if
        contains valid JWT token. When verification fails new header is attached
        to request. This flag is caught in the endpoint and server sends back
        401 response.
      </p>

      <p>
        <b>Handling 401 unauthenticated request on the client side.</b>
      </p>
      <p>
        When 401 responses is caught in custom fetchBaseQuery client is making
        secondary call to 'refresh' endpoint. When response is successful
        initial request is made again. Otherwise user is redirected to not
        restricted page.
      </p>

      <p>
        <b>Handling long session (refresh) on the server side.</b>
      </p>
      <p>
        'Refresh' endpoint verifies long session JWT token extracted from
        long-live cookie. If verification is successful server creates new JWT
        tokens for both sessions, inserts them to new created corresponding
        cookies, and sends 200 response. Otherwise 401 respond is send.
      </p>

      <p>
        <b>Steps to use this Demo:</b>
      </p>
      <ol>
        <li>Login to the account (login: Joe, password: pass)</li>
        <li>Open 'Restricted' page</li>
        <li>Open network tab in developer tool</li>
        <li>Click a button to expire authentication token</li>
        <li>Observe sent and received requests</li>
        <li>Logout from the app</li>
        <li>Open 'Restricted' page again</li>
      </ol>
    </section>
  )
}
