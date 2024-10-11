import designer1 from "@/src/assets/about/designer1.jpg";
import designer2 from "@/src/assets/about/designer2.jpg";
import developer1 from "@/src/assets/about/developer1.jpg";
import developer2 from "@/src/assets/about/developer2.jpg";
import developer3 from "@/src/assets/about/developer3.jpg";
import manager from "@/src/assets/about/manager.jpg";
import mission from "@/src/assets/about/our_mission.jpg";
import vision from "@/src/assets/about/our_vision.jpg";
import values from "@/src/assets/about/values.jpg";
import {
  CodeIcon,
  HandshakeIcon,
  SmartphoneIcon,
  StarIcon,
} from "lucide-react";
import {
  MdAttachMoney,
  MdEco,
  MdFeedback,
  MdLaunch,
  MdWork,
} from "react-icons/md";
import { BsPeople } from "react-icons/bs";

export const aboutTeamMembers = [
  { id: 1, name: "Alice Johnson", role: "Manager", image: manager },
  { id: 2, name: "Marrie Leo", role: "Developer", image: designer1 },
  { id: 3, name: "Charlie Davis", role: "Developer", image: designer2 },
  { id: 4, name: "Diana Evans", role: "Developer", image: developer1 },
  { id: 5, name: "Ella Fisher", role: "Designer", image: developer2 },
  { id: 6, name: "Frank Green", role: "Designer", image: developer3 },
];

export const aboutTimelineData = [
  {
    title: "Project Inception",
    subtitle: "Planning Phase",
    date: "January 2023",
    description:
      "The initial idea of PlantPals was born, focusing on creating a community-driven platform for gardening enthusiasts.",
    type: "work",
    icon: <MdWork />,
    iconBgColor: "rgb(33, 150, 243)", // Blue
  },
  {
    title: "Development Kickoff",
    subtitle: "Development Phase",
    date: "March 2023",
    description:
      "Began the development of PlantPals with a focus on building the core features and implementing the user interface.",
    type: "work",
    icon: <CodeIcon />, // Different icon for coding phase
    iconBgColor: "rgb(76, 175, 80)", // Green
  },
  {
    title: "Beta Release",
    subtitle: "Beta Launch",
    date: "August 2023",
    description:
      "Released the beta version of PlantPals for a small group of users to gather feedback and improve the platform.",
    type: "work",
    icon: <MdLaunch />, // Icon for the launch
    iconBgColor: "rgb(255, 193, 7)", // Yellow
  },
  {
    title: "User Feedback Integration",
    subtitle: "Feedback Phase",
    date: "September 2023",
    description:
      "Collected feedback from beta users and made necessary changes and improvements to the platform.",
    type: "work",
    icon: <MdFeedback />, // Icon for feedback
    iconBgColor: "rgb(255, 87, 34)", // Orange
  },
  {
    title: "Premium Feature Integration",
    subtitle: "Feature Enhancement",
    date: "October 2023",
    description:
      "Integrated premium features, such as expert advice and exclusive plant care guides, available through seamless payment integration.",
    type: "work",
    icon: <MdAttachMoney />, // Icon for payment integration
    iconBgColor: "rgb(103, 58, 183)", // Purple
  },
  {
    title: "Official Launch",
    subtitle: "Public Launch",
    date: "December 2023",
    description:
      "PlantPals officially launched to the public, offering a comprehensive platform for gardening tips, advice, and community interaction.",
    type: "work",
    icon: <StarIcon />, // Star for the big moment
    iconBgColor: "rgb(16, 204, 82)", // Green for success
  },
  {
    title: "Community Growth",
    subtitle: "Expansion",
    date: "February 2024",
    description:
      "The platform grew exponentially, reaching over 100,000 active users sharing gardening tips and experiences.",
    type: "work",
    icon: <BsPeople />, // Community-related icon
    iconBgColor: "rgb(255, 64, 129)", // Pink
  },
  {
    title: "Mobile App Launch",
    subtitle: "Mobile Phase",
    date: "April 2024",
    description:
      "Released the PlantPals mobile app on both Android and iOS platforms to allow users to access gardening tips on the go.",
    type: "work",
    icon: <SmartphoneIcon />, // Mobile-related icon
    iconBgColor: "rgb(0, 150, 136)", // Teal
  },
  {
    title: "Partnerships with Gardening Experts",
    subtitle: "Collaboration Phase",
    date: "June 2024",
    description:
      "Collaborated with leading gardening experts to provide exclusive content and advice for premium members.",
    type: "work",
    icon: <HandshakeIcon />, // Collaboration-related icon
    iconBgColor: "rgb(96, 125, 139)", // Blue Grey
  },
  {
    title: "Sustainability Initiative",
    subtitle: "Green Initiative",
    date: "August 2024",
    description:
      "Launched a sustainability initiative to encourage eco-friendly gardening practices and promote green living.",
    type: "work",
    icon: <MdEco />, // Icon for sustainability
    iconBgColor: "rgb(56, 142, 60)", // Dark Green
  },
];

export const aboutCarouselData = [
  {
    img: mission,
    title: "Our Mission",
    des: `At PlantPals, our mission
              is simple: to nurture a global community of gardeners who share
              knowledge and inspiration. We believe in empowering individuals to
              grow healthier plants and create greener spaces, whether in small
              urban homes or large rural gardens. Our platform is designed to
              connect gardeners with helpful resources, foster knowledge sharing,
              and cultivate a supportive environment for everyone who loves to get
              their hands dirty.`,
  },
  {
    img: vision,
    title: "Our Vision",
    des: `At PlantPals, we aspire to
              cultivate a world where everyone—regardless of experience or
              location—can access the knowledge and resources they need to grow
              and nurture their green spaces. We envision a global community where
              gardening is not just a hobby but a way to connect with nature,
              foster sustainability, and enhance well-being. We believe in the
              power of plants and gardens to create more
              sustainable environments.`,
  },
  {
    img: values,
    title: "Values",
    des: `At PlantPals, our core values form the foundation of our mission to create a vibrant and supportive gardening community. We believe in the power of connection, fostering an inclusive space where gardening enthusiasts can share their knowledge, experiences, and passion. Our commitment to sustainability drives us to promote eco-friendly practices that protect our planet and ensure a thriving environment for future generations.`,
  },
];
