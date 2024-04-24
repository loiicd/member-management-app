const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="text-center pt-6 sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-gray-500">
            <span className="block sm:inline">All rights reserved.</span>
            <a
              className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
              href="#"
            >
              Terms & Conditions
            </a>

            <span>&middot;</span>

            <a
              className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
              href="#"
            >
              Privacy Policy
            </a>
          </p>

          <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">&copy; 2022 Company Name</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer