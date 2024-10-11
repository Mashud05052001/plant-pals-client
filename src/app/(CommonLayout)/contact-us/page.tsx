import ErrorBoundary from "@/src/components/error/ErrorBoundary";
import ContactForm from "@/src/components/modules/contact/ContactForm";
import MyMapComponent from "@/src/components/modules/contact/ContactMap";
import { contactUsArray } from "@/src/constant/contact.constant";

export default function Page() {
  return (
    <div>
      <div className="py-5 px-4 lg:py-8 flex items-center mb-20">
        <div className="flex flex-col justify-center w-full">
          {/* Contact Us Infos */}
          <div className="h-full w-full lg:w-7/12 mx-auto mb-10">
            <div className="mx-auto relative mb-3 lg:mb-0">
              <div className="mb-6 text-3xl font-semibold">
                <h1 className="text-center text-common-600">Contact Us</h1>
              </div>
              <div className="lg:space-x-2 grid gap-3 sm:grid-cols-2 md:grid-cols-3  font-semibold">
                {contactUsArray &&
                  contactUsArray?.map((item) => (
                    <div
                      key={item.id}
                      className="space-y-2 hover:scale-105 duration-150 border-[0.1px] border-b-2 border-r-2  p-5 rounded-lg border-gray-200 shadow "
                    >
                      <div className="flex items-center space-x-3 justify-center">
                        <item.icon />
                        <h2>{item.title}</h2>
                      </div>
                      <p className="text-sm text-center">{item.value}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Contact Us Email */}

          <div className="flex justify-center w-full lg:w-7/12 mx-auto">
            <div className="w-full  mt-5 lg:mt-0">
              <div className="text-center space-y-1 mb-2">
                <h2 className="text-xl font-semibold text-common-600">
                  Facing any issue?
                </h2>
                <p className="pb-2 text-sm">Feel free to contact us</p>
              </div>
              <div className="select-none border-[0.1px] border-b-2 border-r-2  p-5 rounded-lg border-gray-200 shadow-md relative">
                <ContactForm />
                {/* <Lottie
                    className="absolute inset-0 z-[-30]"
                    animationData={send}
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ErrorBoundary fallback={<p>Maps error</p>}>
        <div className="w-full  mx-auto mb-20 mt-8 p-4">
          <div className="mb-6 text-3xl font-semibold">
            <h1 className="text-center text-common-600">Location In Maps</h1>
          </div>
          <MyMapComponent />
        </div>
      </ErrorBoundary>
    </div>
  );
}
