// lib\seed-data.ts
// Initial data for seeding the database
export const initialProjects = [
  {
    title: "LMS - Learning Management System",
    description:
      "An online platform for seamless learning management and class interactions using the MERN stack. Features include payment integration with Stripe, real-time updates, and user favorites and reviews system.",
    images: "/placeholder.svg?height=300&width=600",
    technologies: ["ReactJS", "Stripe", "Express JS", "NodeJS", "MongoDB", "Tailwind CSS", "Firebase", "Component UI"],
    liveLink: "#",
    clientRepo: "https://github.com/nrbnayon/LMS-client",
    serverRepo: "https://github.com/nrbnayon/LMS-server",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "RMS - Restaurant Management System",
    description:
      "An online restaurant management system and food selling website. Users can buy food, sell their food, and manage food with real-time updates and store their favorite food images with reviews.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: [
      "ReactJS",
      "Express JS",
      "Email.js",
      "NodeJS",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
      "Component UI",
    ],
    liveLink: "#",
    clientRepo: "https://github.com/nrbnayon/RMS-client",
    serverRepo: "https://github.com/nrbnayon/RMS-server",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const initialExperiences = [
  {
    title: "Full Stack Developer",
    company: "Join Venture AI Artificial Intelligence (JVAI)",
    period: "January 2025 – Present",
    type: "work",
    current: true,
    responsibilities: [
      "Collaborate closely with the real-world development team to design, develop, and deploy web applications using the MERN stack, focusing on scalable and maintainable architecture.",
      "Participate in code reviews, debugging, and troubleshooting to ensure high-quality code and resolve performance bottlenecks.",
      "Assist in API development and database management with Express.js and MongoDB Aggregation Framework, adhering to best practices in API security and data integrity.",
      "Explore innovative solutions to improve application efficiency, accessibility, and scalability, while staying updated with emerging technologies.",
      "Implement responsive designs using React.js and Next.js, ensuring cross-browser user friendly compatibility.",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Software Engineer Intern",
    company: "Innovate International Ltd",
    period: "October 2024 – December 2025",
    type: "work",
    current: false,
    responsibilities: [
      "Gained hands-on experience in developing and optimizing full-stack applications using Node.js, Express, React, and Next.js.",
      "Designed RESTful APIs and managed databases with MongoDB.",
      "Improved performance and debugged issues in existing applications.",
      "Contributed to the full software development life cycle and participated in code reviews.",
      "Projects: Talently, Employer, Jobs365",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "BSc in Computer Science and Engineering",
    company: "United International University, Dhaka, Bangladesh",
    period: "2019 - 2023",
    type: "education",
    current: false,
    responsibilities: [
      "Major: Software Engineering",
      "Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development, Software Engineering",
      "Participated in various coding competitions and hackathons",
      "Completed final year project on web application development",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const initialProfile = {
  name: "Nayon Kanti Halder",
  email: "nrbnayon@gmail.com",
  phone: "+880 1934025581",
  location: "Vatara, Dhaka, Bangladesh",
  bio: "An enthusiastic and detail-oriented Full Stack Developer with a solid foundation in HTML5, CSS3, TypeScript, and JavaScript, along with experience in frameworks and libraries such as React.js, Next.js, Express.js, and Node.js, including AI agentic features.",
  objective:
    "An enthusiastic and detail-oriented Full Stack Developer with a solid foundation in HTML5, CSS3, TypeScript, and JavaScript, along with experience in frameworks and libraries such as React.js, Next.js, Express.js, and Node.js, including AI agentic features. Eager to leverage my technical expertise to contribute to a dynamic team and drive impactful projects. Committed to overcoming challenges, enhancing user experiences, and continuously improving my coding and debugging skills.",
  resumeUrl: "",
  profileImage: "/placeholder.svg?height=400&width=400",
  socialLinks: {
    github: "https://github.com/nrbnayon",
    linkedin: "https://www.linkedin.com/in/itsnayon",
    twitter: "",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}
