import Footer from './footer'

const AuthenticationLayout = ({ children }) => (
  <div className="h-full w-full">
    <header>
      <div className="relative justify-between top-0 w-full h-16 flex flex-row bg-neutral-800">
        <div className="flex w-full flex-row-reverse sm:flex-row items-center justify-between sm:justify-start relative ">
          <img src="/images/Dotts-Logo-White.png" className="ml-2 h-16" />
        </div>
      </div>
    </header>
    <div className="mx-2">{children}</div>
    <Footer />
  </div>
)

export default AuthenticationLayout
