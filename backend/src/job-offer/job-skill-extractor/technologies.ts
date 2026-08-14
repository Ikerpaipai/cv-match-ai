export type Technology = {
  name: string;
  aliases: string[];
};

export const TECHNOLOGIES: Technology[] = [
  // =========================
  // JavaScript / TypeScript
  // =========================
  {
    name: 'JavaScript',
    aliases: ['javascript', 'js', 'ecmascript', 'es6', 'es2015'],
  },
  {
    name: 'TypeScript',
    aliases: ['typescript', 'ts'],
  },
  {
    name: 'Node.js',
    aliases: ['node', 'nodejs', 'node.js'],
  },
  {
    name: 'React',
    aliases: ['react', 'reactjs', 'react.js'],
  },
  {
    name: 'Next.js',
    aliases: ['next', 'nextjs', 'next.js'],
  },
  {
    name: 'NestJS',
    aliases: ['nestjs', 'nest.js', 'nest js'],
  },
  {
    name: 'Express.js',
    aliases: ['express', 'expressjs', 'express.js'],
  },
  {
    name: 'Vue.js',
    aliases: ['vue', 'vuejs', 'vue.js'],
  },
  {
    name: 'Nuxt.js',
    aliases: ['nuxt', 'nuxtjs', 'nuxt.js'],
  },
  {
    name: 'Angular',
    aliases: ['angular', 'angularjs'],
  },
  {
    name: 'Svelte',
    aliases: ['svelte', 'sveltejs'],
  },
  {
    name: 'Redux',
    aliases: ['redux', 'redux toolkit', 'rtk'],
  },
  {
    name: 'React Native',
    aliases: ['react native', 'reactnative'],
  },

  // =========================
  // Frontend
  // =========================
  {
    name: 'HTML',
    aliases: ['html', 'html5'],
  },
  {
    name: 'CSS',
    aliases: ['css', 'css3'],
  },
  {
    name: 'Tailwind CSS',
    aliases: ['tailwind', 'tailwindcss', 'tailwind css'],
  },
  {
    name: 'Bootstrap',
    aliases: ['bootstrap'],
  },
  {
    name: 'Sass',
    aliases: ['sass', 'scss'],
  },
  {
    name: 'Material UI',
    aliases: ['material ui', 'mui'],
  },
  {
    name: 'WebSockets',
    aliases: ['websocket', 'websockets', 'ws'],
  },

  // =========================
  // Backend
  // =========================
  {
    name: 'Python',
    aliases: ['python', 'python3'],
  },
  {
    name: 'Django',
    aliases: ['django'],
  },
  {
    name: 'Flask',
    aliases: ['flask'],
  },
  {
    name: 'FastAPI',
    aliases: ['fastapi', 'fast api'],
  },
  {
    name: 'Java',
    aliases: ['java'],
  },
  {
    name: 'Spring',
    aliases: ['spring', 'spring framework'],
  },
  {
    name: 'Spring Boot',
    aliases: ['spring boot', 'springboot'],
  },
  {
    name: 'C#',
    aliases: ['c#', 'csharp', 'c sharp'],
  },
  {
    name: '.NET',
    aliases: ['.net', 'dotnet', 'asp.net', 'asp net'],
  },
  {
    name: 'ASP.NET Core',
    aliases: ['asp.net core', 'aspnet core'],
  },
  {
    name: 'PHP',
    aliases: ['php'],
  },
  {
    name: 'Laravel',
    aliases: ['laravel'],
  },
  {
    name: 'Ruby',
    aliases: ['ruby'],
  },
  {
    name: 'Ruby on Rails',
    aliases: ['ruby on rails', 'rails', 'ror'],
  },
  {
    name: 'Go',
    aliases: ['golang', 'go'],
  },
  {
    name: 'Rust',
    aliases: ['rust'],
  },
  {
    name: 'C',
    aliases: ['c language'],
  },
  {
    name: 'C++',
    aliases: ['c++', 'cpp'],
  },

  // =========================
  // Databases
  // =========================
  {
    name: 'PostgreSQL',
    aliases: ['postgres', 'postgresql', 'psql'],
  },
  {
    name: 'MySQL',
    aliases: ['mysql'],
  },
  {
    name: 'MariaDB',
    aliases: ['mariadb'],
  },
  {
    name: 'MongoDB',
    aliases: ['mongodb', 'mongo'],
  },
  {
    name: 'Redis',
    aliases: ['redis'],
  },
  {
    name: 'SQLite',
    aliases: ['sqlite'],
  },
  {
    name: 'Oracle',
    aliases: ['oracle database', 'oracle db'],
  },
  {
    name: 'Microsoft SQL Server',
    aliases: ['sql server', 'mssql', 'ms sql'],
  },
  {
    name: 'Cassandra',
    aliases: ['cassandra'],
  },
  {
    name: 'DynamoDB',
    aliases: ['dynamodb', 'dynamo db'],
  },
  {
    name: 'Elasticsearch',
    aliases: ['elasticsearch', 'elastic search'],
  },
  {
    name: 'Neo4j',
    aliases: ['neo4j'],
  },

  // =========================
  // Cloud
  // =========================
  {
    name: 'AWS',
    aliases: ['aws', 'amazon web services'],
  },
  {
    name: 'Azure',
    aliases: ['azure', 'microsoft azure'],
  },
  {
    name: 'Google Cloud',
    aliases: ['gcp', 'google cloud', 'google cloud platform'],
  },
  {
    name: 'AWS Lambda',
    aliases: ['aws lambda', 'lambda'],
  },
  {
    name: 'Amazon S3',
    aliases: ['s3', 'amazon s3', 'aws s3'],
  },
  {
    name: 'Amazon EC2',
    aliases: ['ec2', 'amazon ec2', 'aws ec2'],
  },
  {
    name: 'Amazon RDS',
    aliases: ['rds', 'amazon rds', 'aws rds'],
  },

  // =========================
  // DevOps / Infrastructure
  // =========================
  {
    name: 'Docker',
    aliases: ['docker'],
  },
  {
    name: 'Kubernetes',
    aliases: ['kubernetes', 'k8s'],
  },
  {
    name: 'Terraform',
    aliases: ['terraform'],
  },
  {
    name: 'Ansible',
    aliases: ['ansible'],
  },
  {
    name: 'Jenkins',
    aliases: ['jenkins'],
  },
  {
    name: 'GitHub Actions',
    aliases: ['github actions', 'github action'],
  },
  {
    name: 'GitLab CI',
    aliases: ['gitlab ci', 'gitlab-ci'],
  },
  {
    name: 'CI/CD',
    aliases: [
      'ci/cd',
      'cicd',
      'continuous integration',
      'continuous deployment',
    ],
  },
  {
    name: 'Linux',
    aliases: ['linux'],
  },
  {
    name: 'Nginx',
    aliases: ['nginx'],
  },
  {
    name: 'Apache',
    aliases: ['apache', 'apache http server'],
  },

  // =========================
  // APIs / Architecture
  // =========================
  {
    name: 'REST API',
    aliases: ['rest', 'rest api', 'restful', 'restful api'],
  },
  {
    name: 'GraphQL',
    aliases: ['graphql'],
  },
  {
    name: 'gRPC',
    aliases: ['grpc'],
  },
  {
    name: 'OpenAPI',
    aliases: ['openapi', 'open api', 'swagger'],
  },
  {
    name: 'Microservices',
    aliases: ['microservices', 'microservice architecture'],
  },
  {
    name: 'OAuth',
    aliases: ['oauth', 'oauth2', 'oauth 2.0'],
  },
  {
    name: 'JWT',
    aliases: ['jwt', 'json web token', 'json web tokens'],
  },

  // =========================
  // Testing
  // =========================
  {
    name: 'Jest',
    aliases: ['jest'],
  },
  {
    name: 'Vitest',
    aliases: ['vitest'],
  },
  {
    name: 'Cypress',
    aliases: ['cypress'],
  },
  {
    name: 'Playwright',
    aliases: ['playwright'],
  },
  {
    name: 'Mocha',
    aliases: ['mocha'],
  },
  {
    name: 'Chai',
    aliases: ['chai'],
  },
  {
    name: 'Testing Library',
    aliases: ['testing library', 'react testing library', 'rtl'],
  },

  // =========================
  // AI / Machine Learning
  // =========================
  {
    name: 'Machine Learning',
    aliases: ['machine learning', 'machine-learning', 'ml'],
  },
  {
    name: 'Artificial Intelligence',
    aliases: ['artificial intelligence', 'ai'],
  },
  {
    name: 'Deep Learning',
    aliases: ['deep learning', 'deep-learning'],
  },
  {
    name: 'Natural Language Processing',
    aliases: ['natural language processing', 'nlp'],
  },
  {
    name: 'Large Language Models',
    aliases: ['large language model', 'large language models', 'llm', 'llms'],
  },
  {
    name: 'RAG',
    aliases: [
      'rag',
      'retrieval augmented generation',
      'retrieval-augmented generation',
    ],
  },
  {
    name: 'OpenAI',
    aliases: ['openai'],
  },
  {
    name: 'Gemini',
    aliases: ['gemini', 'google gemini'],
  },
  {
    name: 'Claude',
    aliases: ['claude', 'anthropic claude'],
  },
  {
    name: 'LangChain',
    aliases: ['langchain'],
  },
  {
    name: 'LlamaIndex',
    aliases: ['llamaindex', 'llama index'],
  },
  {
    name: 'Hugging Face',
    aliases: ['hugging face', 'huggingface'],
  },
  {
    name: 'TensorFlow',
    aliases: ['tensorflow'],
  },
  {
    name: 'PyTorch',
    aliases: ['pytorch', 'torch'],
  },
  {
    name: 'scikit-learn',
    aliases: ['scikit-learn', 'sklearn', 'scikit learn'],
  },

  // =========================
  // Data / Messaging
  // =========================
  {
    name: 'Apache Kafka',
    aliases: ['kafka', 'apache kafka'],
  },
  {
    name: 'RabbitMQ',
    aliases: ['rabbitmq', 'rabbit mq'],
  },
  {
    name: 'Apache Spark',
    aliases: ['spark', 'apache spark'],
  },
  {
    name: 'Pandas',
    aliases: ['pandas'],
  },
  {
    name: 'NumPy',
    aliases: ['numpy'],
  },

  // =========================
  // Tools
  // =========================
  {
    name: 'Git',
    aliases: ['git'],
  },
  {
    name: 'GitHub',
    aliases: ['github'],
  },
  {
    name: 'GitLab',
    aliases: ['gitlab'],
  },
  {
    name: 'Bitbucket',
    aliases: ['bitbucket'],
  },
  {
    name: 'Postman',
    aliases: ['postman'],
  },
  {
    name: 'Figma',
    aliases: ['figma'],
  },
];
