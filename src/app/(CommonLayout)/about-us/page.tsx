import Image from "next/image";
import banner from "@/src/assets/about/plant_about.jpg";
import { aboutTeamMembers } from "@/src/constant/about.constant";
import AboutTimeLine from "@/src/components/modules/about/AboutTimeLine";
import AboutCarousel from "@/src/components/modules/about/AboutCarousel";

export default function Page() {
  return (
    <div className="w-[100%] mx-auto">
      {/* Banner Section */}
      <div className="mb-20 min-h-64 sm:min-h-80 md:min-h-[24rem] xl:min-h-[28rem] w-full relative">
        <Image src={banner} alt="banner" fill />
        <div className="absolute bg-black inset-0 bg-opacity-50" />
        <div className="absolute top-1/2 transform left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black py-6 px-8 rounded-lg bg-opacity-40 max-w-[20rem] sm:max-w-[30rem]  md:max-w-[40rem] lg:max-w-[50rem] w-full">
          <h1 className="text-lg text-center sm:text-2xl md:text-3xl lg:text-4xl tracking-wide font-bold mb-2 sm:mb-4">
            About <span className="text-common-500">PlantPals</span>
          </h1>
          <p className="max-w-[40rem] mx-auto text-xs sm:text-base md:text-xl">
            Your go-to platform for gardening tips, advice, and community
            engagement! Whether your a seasoned gardener or just beginning your
            journey with plants, we aim to provide you with expert insights,
            practical techniques, and a space to share your passion for
            greenery.
          </p>
        </div>
      </div>
      {/* Project & Development Roadmap */}
      <AboutTimeLine />

      {/* Meet Our Team */}
      <div className="my-20 px-4">
        <h2 className="text-3xl font-bold text-center text-common-600 mb-16">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {aboutTeamMembers.map((member) => (
            <div key={member.id} className="relative group">
              <Image
                src={member.image}
                alt={member.name}
                height={200}
                width={200}
                className="w-full rounded-full object-cover shadow-lg transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 rounded-full">
                <div className="text-center text-white">
                  <h3 className="lg:text-xl font-semibold">{member.name}</h3>
                  <p className="text-xs md:text-sm">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Carousel Our Mission & Vision*/}
      <AboutCarousel />
      {/* Our Community */}
      <div className="my-20 text-center p-2">
        <h3 className="text-common-600 dark:text-common-500 text-3xl font-bold mb-2">
          Our Community
        </h3>
        <p className="text-black dark:text-gray-300 text-opacity-70 font-semibold">
          Discuss the importance of the{" "}
          <span className="text-common-500">PlantPals</span> community and how
          users contribute to its growth. At the heart of our
          community—gardeners of all levels who contribute their knowledge,
          share experiences, and support each other. Whether you’re seeking
          advice or offering tips, every interaction helps us grow together.
        </p>
      </div>
      {/* Our Future Goal */}
      <div className="my-20 text-center p-2">
        <h3 className="text-common-600 dark:text-common-500 text-3xl font-bold mb-2">
          Our Future Goal
        </h3>
        <p className="text-black dark:text-gray-300 text-opacity-70 font-semibold">
          Talk about where <span className="text-common-500">PlantPals</span> is
          headed. Mention upcoming features, events, or collaborations that will
          excite users about the platform’s future. We’re working on adding
          advanced gardening tools, personalized plant care schedules, and
          integrating with local plant nurseries to bring you a complete
          gardening ecosystem.
        </p>
      </div>
      <div className="my-10 text-center">
        <small className="text-common-600 dark:text-common-500 font-bold">
          Thanks for visiting us
        </small>
      </div>
    </div>
  );
}
