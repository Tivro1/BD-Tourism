
import { motion } from "framer-motion";

const projects = [
  {
    name: "Visa Navigator",
    description:
      "A user-friendly portal for checking visa requirements, applying online, and tracking applications.",
    link: "https://github.com/Tivro1",
  },
  {
    name: "Restaurant Management Website",
    description:
      "A full-stack solution for managing restaurant operations efficiently.",
    link: "https://github.com/Tivro1",
  },
  {
    name: "Library Management Website",
    description:
      "A streamlined platform for managing library resources and members.",
    link: "https://github.com/Tivro1",
  },
];

const AboutMe = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-[84px] bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        About Me
      </h1>
      <div className="space-y-6 text-gray-700">
        {/* About Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Who Am I?
          </h2>
          <p>
            Hi, I'm <span className="font-bold text-gray-900">Sourav Das Tivro</span>, a passionate <span className="text-blue-600 font-semibold">Full Stack Web Developer</span> 
            and an aspiring Computer Science Engineer currently pursuing my <span className="font-medium">BSc in CSE</span> (5th semester).
          </p>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            My Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {project.name}
                </h3>
                <p className="text-gray-600 mt-2 h-[60px]">{project.description}</p>
               <div>
               <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  View on GitHub
                </a>
               </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Connect Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Let's Connect
          </h2>
          <p>
            Feel free to connect with me on LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/sourav-das-tivro-63883b28a"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </a>
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
           View Protfolio
          </h2>
          <p>
            Click for Visit:{" "}
            <a
              href="https://tivroprotfolio-8823.web.app/#about"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
               Profile
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
