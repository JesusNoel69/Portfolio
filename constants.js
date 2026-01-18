export const MODEL_INFO = {
  // projects
  ladonlang_project: {
    title: "LadonLang — Tag-Based Programming Language",
    image: "assets/example/fibonnacci-serie-example.png",
    description:
      "LadonLang is a custom programming language built from scratch with an HTML-inspired tag syntax. The current version includes a lexer, parser, AST generation, and semantic analysis. Programs are transpiled to C++ to produce native executables, making the project a full compiler pipeline from source code to compiled output.",
    links: [
      { label: "GitHub", url: "https://github.com/JesusNoel69/LadonLang" },
      /*{ label: "Demo / Docs", url: "pending" },*/
    ],
  },

  company_project: {
    title: "A company  —  Digital Enterprise Management (In Progress)",
    description:
      "Building an enterprise management platform to centralize workflows across multiple departments. The goal is to simplify internal operations by organizing records, processes, and team activities in a single system, with a focus on scalability and maintainability as the project grows.",
    links: [
      {
        label: "GiHub",
        url: "https://github.com/JesusNoel69/a-dgital-company",
      },
      // { label: "Demo", url: "" }
    ],
  },

  neural_network_base: {
    title: "Neural Networks From Scratch (C#)",
    image: "assets/example/neural-network-last.png",
    description:
      "Built a neural network from scratch in C# to deeply understand how training works under the hood. Implements core concepts such as perceptrons, activation functions, and backpropagation-based learning. The project is a foundation for experimenting with optimization ideas and resource-efficient training approaches.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/JesusNoel69/Neural-Network",
      },
    ],
  },

  // ======= certifications / trophies =======
  mnaging_big_data_with_mysql: {
    title: "Managing Big Data with MySQL",
    description:
      "Completed training in advanced MySQL for big datasets, including indexing and execution-plan analysis, JOIN strategies, and performance-focused query optimization.",
    qr: "assets/qr/managing_big_data_with_MySQL_qr.png",
    links: [
      {
        label: "Coursera",
        url: "https://coursera.org/share/192ff065618dda0cf06405622e9a365e",
      },
    ],
  },
  ibm_ui_ux_trophie: {
    title: "Designing User Interfaces and Experiences (UI/UX)",
    description:
      "Completed UI/UX training focused on interface design fundamentals, Figma-based prototyping workflows, and responsive design principles to create usable, consistent user experiences.",
    qr: "assets/qr/designing_user_interfaces_qr.png",
    links: [
      {
        label: "Show",
        url: "https://coursera.org/share/1bcdfdb61725a0357f231e6d4eaeed8c",
      },
    ],
  },

  fullstack_trophie: {
    title: "Microsoft Full-Stack Developer",
    description:
      "Completed Microsoft full-stack training focused on building scalable .NET solutions with C#, applying OOP for modular design, performance optimization (including caching), and CI/CD workflows for automated deployment.",
    qr: "assets/qr/Microsoft_Full-Stack_Developer_qr.png",
    links: [
      {
        label: "Show",
        url: "https://coursera.org/share/5547df380ae22a41853d824284b5f518",
      },
    ],
  },

  evaluating_user_interface: {
    title: "Evaluating User Interfaces",
    description:
      "Completed training in UI evaluation using usability testing, user research, and test planning grounded in HCI and user-centered design.",
    qr: "assets/qr/evaluating_user_interface_qr.png",
    links: [
      {
        label: "Show",
        url: "https://coursera.org/share/89c5340b69e487044d46786209e417fc",
      },
    ],
  },
  clean_architecture_trophie: {
    title: "ASP.NET Core - SOLID and Clean Architecture (.NET 5 and Up)",
    description:
      "Completed hands-on training in Clean Architecture and SOLID by building a .NET Core Web API with a Blazor UI, implementing JWT authentication, Swagger documentation, and SendGrid email integration.",
    qr: "assets/qr/asp_net_core-solid_and_clean_architecture_qr.png",
    links: [
      {
        label: "Show",
        url: "https://coursera.org/share/4d30f9b4aaedc2a4ed8639ef994cd4a3",
      },
    ],
  },

  // Plano (uacj_trophie )
  Plano: {
    title: "Computer Systems Engineering — UACJ",
    description:
      "Bachelor's degree in Computer Systems Engineering at Universidad Autónoma de Ciudad Juárez (UACJ), with training in software development, databases, systems analysis, and computing fundamentals.",
    qr: "assets/qr/uacj_degree_qr.png",
    links: [
      {
        label: "Show",
        url: "https://qr.uacj.mx/Info/QReT?mat=197113&idT=41752",
      },
    ],
  },

  card: {
    title: "About me",
    description:
      "Hi 👋, I'm Jesús, a Computer Systems Engineering graduate who has been into technology since I was 15. I explored hardware, networking, and software, but I chose programming because it's the best way to turn ideas into real solutions—where effort and skill define the limits. I enjoy tackling challenging problems and continuously improving by revisiting what once felt difficult, tracking my progress, and sharpening my skills as I build and learn.",
  },

  // ======= Get in touch =======
  cellphone: {
    title: "Get in touch",
    description: "Choose a platform to view my work or contact me.",
    socials: [
      { label: "GitHub", url: "https://github.com/JesusNoel69" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jesus-noel-zamora-gomez-1b244b1b2",
      },
      { label: "Email", url: "mailto:jnoel883@gmail.com" },
    ],
  },

  // buttons
  //maybe the click should be redirect and not open the dialog box
  github_button: {
    title: "GitHub",
    description: "Explore my repositories, projects, and source code.",
    links: [{ label: "Open GitHub", url: "https://github.com/JesusNoel69" }],
  },
  linkedin_button: {
    title: "LinkedIn",
    description:
      "View my experience, certifications, and professional profile.",
    links: [
      {
        label: "Open LinkedIn",
        url: "https://www.linkedin.com/in/jesus-noel-zamora-gomez-1b244b1b2",
      },
    ],
  },
  gmail_button: {
    title: "Email",
    description: "Contact me directly via email.",
    links: [{ label: "Enviar correo", url: "mailto:jnoel883@gmail.com" }],
  },

  // ======= SKILLS =======
  skill_list: {
    title: "Skills",
    description: "Main technologies.",
    skills: [
      {
        name: ".NET",
        note: "Web APIs, backend development, tooling ecosystem",
      },
      { name: "C#", note: "OOP, LINQ, async/await, clean code practices" },
      {
        name: "Angular",
        note: "Angular Material, components, RxJS, SPA patterns",
      },
      {
        name: "JavaScript",
        note: "DOM, ES6+, async patterns, web fundamentals",
      },
      {
        name: "TypeScript",
        note: "Types, interfaces, generics, scalable front-end code",
      },
      {
        name: "Vue.js 2",
        note: "Components, reactivity, Vuetify UI development",
      },
      {
        name: "HTML5",
        note: "Semantic structure, accessibility-friendly markup",
      },
      {
        name: "CSS3",
        note: "Layouts (Flex/Grid), responsive UI, styling systems",
      },
      {
        name: "Bootstrap",
        note: "Responsive layout, UI utilities, rapid prototyping",
      },
      { name: "MySQL", note: "Schema design, queries, joins, indexing basics" },
      {
        name: "Docker",
        note: "Containers, local environments, basic deployments",
      },
      {
        name: "Git",
        note: "Version control, branching, pull requests, workflows",
      },
      {
        name: "PHP",
        note: "Backend fundamentals, scripting, web integration basics",
      },
    ],
  },
};

//Plano is uacj_trophie error in the name of blender
export const MODEL_ALIASES = {
  uacj_trophie: "Plano",
  // "Plane": "Plano",
};

export const initialPosition = {
  cubeObj: { x: 0, y: 5, z: 2 },
  targetObj: { x: -2, y: 2, z: 5 },
  //  cameraObj: { x: 8.978, y: 5.341, z: -1.586 },
  cameraObj: { x: 8.007, y: 7.436, z: -2.803 },

  offsetValue: 18,
};

export const trophiesPosition = {
  cubeObj: { x: 4, y: 5, z: 5 },
  targetObj: { x: 4, y: 5, z: 5 },
  cameraObj: { x: 3.597, y: 5.493, z: -2.42 },
  offsetValue: 10,
};

export const skillsPosition = {
  cubeObj: { x: -2.5, y: 8.5, z: -1.75 },
  targetObj: { x: -2.5, y: 8.5, z: -1.75 },
  cameraObj: { x: 8.54, y: 7.386, z: -1.447 },
  offsetValue: 6,
};

export const projectsPosition = {
  cubeObj: { x: 0, y: 4.75, z: 0 },
  targetObj: { x: 0, y: 4.75, z: 0 },
  cameraObj: { x: 10.316, y: 4.706, z: 0.209 },
  offsetValue: 10,
};

export const contactsPosition = {
  cubeObj: { x: 1.6, y: 4.5, z: -2.5 },
  targetObj: { x: 1.2, y: 4.75, z: -2.5 },
  cameraObj: { x: 3.16, y: 4.59, z: -1.11 },
  offsetValue: 4.5,
};
export const aboutPosition = {
  cubeObj: { x: -1.2, y: 4.5, z: -2.25 },
  targetObj: { x: -1.2, y: 4, z: -2.25 },
  cameraObj: { x: -1.2, y: 5, z: -2.21 },
  offsetValue: 3,
};
export const presets = {
  initial: initialPosition,
  trophies: trophiesPosition,
  skills: skillsPosition,
  projects: projectsPosition,
  contact: contactsPosition,
  about: aboutPosition,
};
