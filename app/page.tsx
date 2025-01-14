export default function IndexPage() {
  return (
    <div>
      <h1>User authentication for Next.js and Redux.js based app</h1>
      <p>
        Page with restricted content will be available after successful user
        authentication.
      </p>
      <p>Below steps explain how to use the app.</p>
      <ol>
        <li>Register user</li>
        <li>Login to the account</li>
        <li>Open restricted page</li>
      </ol>
      <span>
        * you can expire authentication token manually and test how refresh
        token works by observing requests history in developer tool network.
      </span>
    </div>
  )
}
