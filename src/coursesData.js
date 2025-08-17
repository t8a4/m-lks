const courses = [
  {
    "id": "digital-intro-101",
    "title": "Digital Intro - 101 Basics",
    "subtitle": "Основи на дигиталните технологии и програмиране за начинаещи.",
    "category": "Programming Explorer",
    "days": [
      {
        "day": 0,
        "subtitle": "Въведение в дигиталния свят и настройка на работната среда.",
        "lessons": [
          {
            "title": "Preparation Day",
            "sections": [
              {
                "title": "Computer Setup",
                "time": "30 minutes",
                "content": "Set up development environment. Install necessary software and tools."
              },
              {
                "title": "Introduction to Digital World",
                "time": "30 minutes",
                "content": "Overview of digital technologies and their applications in daily life."
              }
            ]
          }
        ]
      },
      {
        "day": 1,
        "subtitle": "Основи на компютърните системи и операционни системи.",
        "lessons": [
          {
            "title": "Урок 1: Компютърни основи",
            "sections": [
              {
                "title": "Hardware Components",
                "time": "45 minutes",
                "content": "Learn about CPU, RAM, storage, and input/output devices."
              },
              {
                "title": "Operating Systems",
                "time": "45 minutes",
                "content": "Introduction to Windows, macOS, and Linux operating systems."
              }
            ]
          }
        ]
      },
      {
        "day": 2,
        "subtitle": "Файлова система и организация на данни.",
        "lessons": [
          {
            "title": "Урок 2: Файлове и папки",
            "sections": [
              {
                "title": "File Management",
                "time": "45 minutes",
                "content": "Creating, organizing, and managing files and folders effectively."
              },
              {
                "title": "File Types",
                "time": "45 minutes",
                "content": "Understanding different file formats and their uses."
              }
            ]
          }
        ]
      },
      {
        "day": 3,
        "subtitle": "Интернет и уеб технологии - основи.",
        "lessons": [
          {
            "title": "Урок 3: Интернет основи",
            "sections": [
              {
                "title": "How Internet Works",
                "time": "45 minutes",
                "content": "Understanding networks, servers, and client-server architecture."
              },
              {
                "title": "Web Browsers",
                "time": "45 minutes",
                "content": "Using web browsers effectively and understanding web addresses."
              }
            ]
          }
        ]
      },
      {
        "day": 4,
        "subtitle": "Въведение в HTML - структура на уеб страници.",
        "lessons": [
          {
            "title": "Урок 4: HTML основи",
            "sections": [
              {
                "title": "HTML Structure",
                "time": "60 minutes",
                "content": "Learning HTML tags, elements, and document structure."
              },
              {
                "title": "First Web Page",
                "time": "30 minutes",
                "content": "Creating your first HTML page with basic content."
              }
            ]
          }
        ]
      },
      {
        "day": 5,
        "subtitle": "HTML елементи - заглавия, параграфи и списъци.",
        "lessons": [
          {
            "title": "Урок 5: HTML елементи",
            "sections": [
              {
                "title": "Text Elements",
                "time": "45 minutes",
                "content": "Working with headings, paragraphs, and text formatting."
              },
              {
                "title": "Lists and Links",
                "time": "45 minutes",
                "content": "Creating ordered and unordered lists, adding hyperlinks."
              }
            ]
          }
        ]
      },
      {
        "day": 6,
        "subtitle": "Изображения и мултимедия в HTML.",
        "lessons": [
          {
            "title": "Урок 6: Мултимедия",
            "sections": [
              {
                "title": "Images",
                "time": "45 minutes",
                "content": "Adding and optimizing images in web pages."
              },
              {
                "title": "Audio and Video",
                "time": "45 minutes",
                "content": "Embedding audio and video content in HTML."
              }
            ]
          }
        ]
      },
      {
        "day": 7,
        "subtitle": "Въведение в CSS - стилизиране на уеб страници.",
        "lessons": [
          {
            "title": "Урок 7: CSS основи",
            "sections": [
              {
                "title": "CSS Syntax",
                "time": "45 minutes",
                "content": "Understanding CSS selectors, properties, and values."
              },
              {
                "title": "Styling Text",
                "time": "45 minutes",
                "content": "Changing fonts, colors, and text properties with CSS."
              }
            ]
          }
        ]
      },
      {
        "day": 8,
        "subtitle": "CSS цветове, фонове и граници.",
        "lessons": [
          {
            "title": "Урок 8: CSS стилизиране",
            "sections": [
              {
                "title": "Colors and Backgrounds",
                "time": "45 minutes",
                "content": "Working with color values, gradients, and background images."
              },
              {
                "title": "Borders and Spacing",
                "time": "45 minutes",
                "content": "Adding borders, margins, and padding to elements."
              }
            ]
          }
        ]
      },
      {
        "day": 9,
        "subtitle": "CSS Layout - позициониране на елементи.",
        "lessons": [
          {
            "title": "Урок 9: CSS Layout",
            "sections": [
              {
                "title": "Box Model",
                "time": "45 minutes",
                "content": "Understanding the CSS box model and element sizing."
              },
              {
                "title": "Positioning",
                "time": "45 minutes",
                "content": "Static, relative, absolute, and fixed positioning."
              }
            ]
          }
        ]
      },
      {
        "day": 10,
        "subtitle": "Въведение в JavaScript - основи на програмирането.",
        "lessons": [
          {
            "title": "Урок 10: JavaScript основи",
            "sections": [
              {
                "title": "Variables and Data Types",
                "time": "45 minutes",
                "content": "Declaring variables and working with different data types."
              },
              {
                "title": "Basic Operations",
                "time": "45 minutes",
                "content": "Arithmetic operations and string manipulation."
              }
            ]
          }
        ]
      },
      {
        "day": 11,
        "subtitle": "JavaScript функции и условни конструкции.",
        "lessons": [
          {
            "title": "Урок 11: JavaScript логика",
            "sections": [
              {
                "title": "Functions",
                "time": "45 minutes",
                "content": "Creating and calling functions with parameters."
              },
              {
                "title": "Conditional Statements",
                "time": "45 minutes",
                "content": "Using if/else statements and comparison operators."
              }
            ]
          }
        ]
      },
      {
        "day": 12,
        "subtitle": "JavaScript цикли и масиви.",
        "lessons": [
          {
            "title": "Урок 12: Цикли и масиви",
            "sections": [
              {
                "title": "Loops",
                "time": "45 minutes",
                "content": "For and while loops for repetitive tasks."
              },
              {
                "title": "Arrays",
                "time": "45 minutes",
                "content": "Creating and manipulating arrays of data."
              }
            ]
          }
        ]
      },
      {
        "day": 13,
        "subtitle": "DOM манипулация - взаимодействие с HTML елементи.",
        "lessons": [
          {
            "title": "Урок 13: DOM основи",
            "sections": [
              {
                "title": "Selecting Elements",
                "time": "45 minutes",
                "content": "Finding and selecting HTML elements with JavaScript."
              },
              {
                "title": "Changing Content",
                "time": "45 minutes",
                "content": "Modifying text, attributes, and styles dynamically."
              }
            ]
          }
        ]
      },
      {
        "day": 14,
        "subtitle": "Събития и интерактивност в JavaScript.",
        "lessons": [
          {
            "title": "Урок 14: Събития",
            "sections": [
              {
                "title": "Event Listeners",
                "time": "45 minutes",
                "content": "Handling clicks, keyboard input, and other user interactions."
              },
              {
                "title": "Interactive Elements",
                "time": "45 minutes",
                "content": "Creating buttons, forms, and interactive components."
              }
            ]
          }
        ]
      },
      {
        "day": 15,
        "subtitle": "Създаване на интерактивна уеб страница.",
        "lessons": [
          {
            "title": "Урок 15: Проект",
            "sections": [
              {
                "title": "Project Planning",
                "time": "30 minutes",
                "content": "Planning a simple interactive web application."
              },
              {
                "title": "Implementation",
                "time": "60 minutes",
                "content": "Building the project using HTML, CSS, and JavaScript."
              }
            ]
          }
        ]
      },
      {
        "day": 16,
        "subtitle": "Финализиране на проекта и тестване.",
        "lessons": [
          {
            "title": "Урок 16: Финализиране",
            "sections": [
              {
                "title": "Testing and Debugging",
                "time": "45 minutes",
                "content": "Finding and fixing bugs in the web application."
              },
              {
                "title": "Optimization",
                "time": "45 minutes",
                "content": "Improving performance and user experience."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "advanced-411",
    "title": "Advanced - 411",
    "subtitle": "Напреднали концепции в програмирането и разработката на софтуер.",
    "category": "Programming Explorer",
    "days": [
      {
        "day": 0,
        "subtitle": "Настройка на напредна развойна среда и инструменти.",
        "lessons": [
          {
            "title": "Preparation Day",
            "sections": [
              {
                "title": "Advanced IDE Setup",
                "time": "45 minutes",
                "content": "Configure advanced development environment with VS Code, extensions, and debugging tools."
              },
              {
                "title": "Version Control Introduction",
                "time": "45 minutes",
                "content": "Introduction to Git and GitHub for code management."
              }
            ]
          }
        ]
      },
      {
        "day": 1,
        "subtitle": "Напреднали JavaScript концепции и ES6+ функции.",
        "lessons": [
          {
            "title": "Урок 1: Модерен JavaScript",
            "sections": [
              {
                "title": "ES6+ Features",
                "time": "60 minutes",
                "content": "Arrow functions, destructuring, template literals, and spread operator."
              },
              {
                "title": "Async Programming",
                "time": "30 minutes",
                "content": "Introduction to promises and async/await patterns."
              }
            ]
          }
        ]
      },
      {
        "day": 2,
        "subtitle": "Обектно-ориентирано програмиране в JavaScript.",
        "lessons": [
          {
            "title": "Урок 2: OOP концепции",
            "sections": [
              {
                "title": "Classes and Objects",
                "time": "60 minutes",
                "content": "Creating classes, constructors, and object instances."
              },
              {
                "title": "Inheritance",
                "time": "30 minutes",
                "content": "Extending classes and method overriding."
              }
            ]
          }
        ]
      },
      {
        "day": 3,
        "subtitle": "Модули и организация на код.",
        "lessons": [
          {
            "title": "Урок 3: Модули",
            "sections": [
              {
                "title": "ES6 Modules",
                "time": "45 minutes",
                "content": "Import/export statements and module organization."
              },
              {
                "title": "Code Organization",
                "time": "45 minutes",
                "content": "Best practices for structuring large applications."
              }
            ]
          }
        ]
      },
      {
        "day": 4,
        "subtitle": "Работа с API и асинхронни заявки.",
        "lessons": [
          {
            "title": "Урок 4: API интеграция",
            "sections": [
              {
                "title": "Fetch API",
                "time": "60 minutes",
                "content": "Making HTTP requests and handling responses."
              },
              {
                "title": "JSON Processing",
                "time": "30 minutes",
                "content": "Parsing and manipulating JSON data."
              }
            ]
          }
        ]
      },
      {
        "day": 5,
        "subtitle": "Въведение в React - компонентна архитектура.",
        "lessons": [
          {
            "title": "Урок 5: React основи",
            "sections": [
              {
                "title": "Components and JSX",
                "time": "60 minutes",
                "content": "Creating functional components and understanding JSX syntax."
              },
              {
                "title": "Props",
                "time": "30 minutes",
                "content": "Passing data between components using props."
              }
            ]
          }
        ]
      },
      {
        "day": 6,
        "subtitle": "React State и събития.",
        "lessons": [
          {
            "title": "Урок 6: React State",
            "sections": [
              {
                "title": "useState Hook",
                "time": "60 minutes",
                "content": "Managing component state with the useState hook."
              },
              {
                "title": "Event Handling",
                "time": "30 minutes",
                "content": "Handling user interactions in React components."
              }
            ]
          }
        ]
      },
      {
        "day": 7,
        "subtitle": "React списъци и условно рендериране.",
        "lessons": [
          {
            "title": "Урок 7: Динамично съдържание",
            "sections": [
              {
                "title": "Rendering Lists",
                "time": "45 minutes",
                "content": "Mapping over arrays to render dynamic content."
              },
              {
                "title": "Conditional Rendering",
                "time": "45 minutes",
                "content": "Showing/hiding content based on conditions."
              }
            ]
          }
        ]
      },
      {
        "day": 8,
        "subtitle": "React форми и контролирани компоненти.",
        "lessons": [
          {
            "title": "Урок 8: Форми",
            "sections": [
              {
                "title": "Controlled Components",
                "time": "60 minutes",
                "content": "Creating forms with controlled input elements."
              },
              {
                "title": "Form Validation",
                "time": "30 minutes",
                "content": "Basic form validation techniques."
              }
            ]
          }
        ]
      },
      {
        "day": 9,
        "subtitle": "React useEffect и жизнен цикъл.",
        "lessons": [
          {
            "title": "Урок 9: Side Effects",
            "sections": [
              {
                "title": "useEffect Hook",
                "time": "60 minutes",
                "content": "Managing side effects and component lifecycle."
              },
              {
                "title": "Cleanup Functions",
                "time": "30 minutes",
                "content": "Preventing memory leaks with cleanup functions."
              }
            ]
          }
        ]
      },
      {
        "day": 10,
        "subtitle": "Стилизиране в React - CSS Modules и Styled Components.",
        "lessons": [
          {
            "title": "Урок 10: React стилизиране",
            "sections": [
              {
                "title": "CSS Modules",
                "time": "45 minutes",
                "content": "Scoped CSS styling with CSS Modules."
              },
              {
                "title": "Styled Components",
                "time": "45 minutes",
                "content": "CSS-in-JS approach with styled-components library."
              }
            ]
          }
        ]
      },
      {
        "day": 11,
        "subtitle": "React Router - навигация между страници.",
        "lessons": [
          {
            "title": "Урок 11: Навигация",
            "sections": [
              {
                "title": "React Router Setup",
                "time": "45 minutes",
                "content": "Setting up client-side routing with React Router."
              },
              {
                "title": "Navigation Components",
                "time": "45 minutes",
                "content": "Creating navigation menus and route parameters."
              }
            ]
          }
        ]
      },
      {
        "day": 12,
        "subtitle": "State Management с Context API.",
        "lessons": [
          {
            "title": "Урок 12: Global State",
            "sections": [
              {
                "title": "Context API",
                "time": "60 minutes",
                "content": "Managing global state with React Context."
              },
              {
                "title": "useContext Hook",
                "time": "30 minutes",
                "content": "Consuming context in functional components."
              }
            ]
          }
        ]
      },
      {
        "day": 13,
        "subtitle": "Тестване на React приложения.",
        "lessons": [
          {
            "title": "Урок 13: Тестване",
            "sections": [
              {
                "title": "Unit Testing",
                "time": "60 minutes",
                "content": "Writing unit tests with Jest and React Testing Library."
              },
              {
                "title": "Integration Testing",
                "time": "30 minutes",
                "content": "Testing component interactions and user flows."
              }
            ]
          }
        ]
      },
      {
        "day": 14,
        "subtitle": "Оптимизация и производителност.",
        "lessons": [
          {
            "title": "Урок 14: Оптимизация",
            "sections": [
              {
                "title": "Performance Optimization",
                "time": "60 minutes",
                "content": "React.memo, useMemo, and useCallback for optimization."
              },
              {
                "title": "Code Splitting",
                "time": "30 minutes",
                "content": "Lazy loading and code splitting techniques."
              }
            ]
          }
        ]
      },
      {
        "day": 15,
        "subtitle": "Финален проект - планиране и започване.",
        "lessons": [
          {
            "title": "Урок 15: Проект старт",
            "sections": [
              {
                "title": "Project Planning",
                "time": "45 minutes",
                "content": "Planning a complex React application with multiple features."
              },
              {
                "title": "Architecture Design",
                "time": "45 minutes",
                "content": "Designing component hierarchy and data flow."
              }
            ]
          }
        ]
      },
      {
        "day": 16,
        "subtitle": "Финален проект - имплементация и представяне.",
        "lessons": [
          {
            "title": "Урок 16: Проект финализиране",
            "sections": [
              {
                "title": "Implementation",
                "time": "75 minutes",
                "content": "Building the final project with all learned concepts."
              },
              {
                "title": "Presentation",
                "time": "15 minutes",
                "content": "Presenting the completed project and discussing challenges."
              }
            ]
          }
        ]
      }
    ]
  }
];

export default courses;