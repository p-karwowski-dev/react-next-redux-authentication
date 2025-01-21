export default function IndexPage() {
  return (
    <section>
      <h1>
        Secured stateless authentication with HttpOnly cookie for applications
        build with Next, React and Redux.
      </h1>

      <p>
        Short session is used to give user access to restricted content while
        long session extends user login time and refreshes short session.
        Logging out user closes both short and long session, and user have to
        login again.
      </p>

      <p>
        <b>How does it work?</b>
      </p>
      <p>
        HttpOnly cookies are accessible only by server which eliminates risk of
        exposing cookies to XSS attacks on the client side. Server defines to
        which requests cookie will be attached by setting path. When user logs
        in to the app short and long session jwt tokens are created and inserted
        to the corresponding cookies. Then short-live cookie is attached to all
        requests sent to protected routs, and long-live cookie to '/refresh'
        route only to increase security.
      </p>

      <p>
        <b>Handing short session on the server side.</b>
      </p>
      <p>
        Middleware verification checks if short session cookie exists and if
        contains valid jwt token. When verification fails a flag (new header) is
        attached to request. This flag is caught in the endpoint and server
        sends back 401 response.
      </p>

      <p>
        <b>Handing 401 unauthenticated request on the client side.</b>
      </p>
      <p>
        When 401 responses is caught in custom fetchBaseQuery client is making
        secondary call to '/refresh' endpoint. When response is successful
        initial request is made again. Otherwise user is redirected to not
        restricted page.
      </p>

      <p>
        <b>Handing long session (refresh) on the server side.</b>
      </p>
      <p>
        'Refresh' endpoint verifies long session jwt token extracted from
        long-live cookie. If verification is successful server creates new jwt
        tokens for both sessions, inserts them to new created corresponding
        cookies, and sends 200 response. Otherwise 401 respond is send.
      </p>

      <p>
        <b>Steps to test authentication.</b>
      </p>
      <ol>
        <li>Login to the account (login: Joe, password: pass)</li>
        <li>Open 'Restricted' page</li>
        <li>Click a button to expire authentication token</li>
        <li>
          Refresh page watching network in dev tool to see '/refresh' request
        </li>
      </ol>
    </section>
  )
}
