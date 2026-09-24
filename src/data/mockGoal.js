const mockGoals = [
    {
        id: 1,
        userId: 2,
        title: "Become Full Stack Developer",
        description:
            "Learn frontend and backend technologies and build complete applications.",
        category: "Career",
        startDate: "2026-01-01",
        targetDate: "2027-08-01",
        chapterId: 2,
        status: "active",
        completedDate: null,

        milestones: [
            {
                id: 101,
                title: "Learn HTML & CSS",
                isCompleted: true,
                completedDate: "2026-02-10",
            },
            {
                id: 102,
                title: "Learn JavaScript",
                isCompleted: true,
                completedDate: "2026-03-20",
            },
            {
                id: 103,
                title: "Learn React",
                isCompleted: true,
                completedDate: "2026-05-15",
            },
            {
                id: 104,
                title: "Learn Git & GitHub",
                isCompleted: true,
                completedDate: "2026-06-01",
            },
            {
                id: 105,
                title: "Learn Core Java",
                isCompleted: true,
                completedDate: "2026-07-10",
            },
            {
                id: 106,
                title: "Learn SQL",
                isCompleted: false,
                completedDate: null,
            },
            {
                id: 107,
                title: "Learn Spring Boot",
                isCompleted: false,
                completedDate: null,
            },
            {
                id: 108,
                title: "Build Full Stack Project",
                isCompleted: false,
                completedDate: null,
            },
        ],
    },

    {
        id: 2,
        userId: 2,
        title: "Complete 5 Projects",
        description:
            "Build and complete five meaningful development projects.",
        category: "Projects",
        startDate: "2026-01-15",
        targetDate: "2026-12-31",
        chapterId: 2,
        status: "active",
        completedDate: null,

        milestones: [
            {
                id: 201,
                title: "Project 1",
                isCompleted: true,
                completedDate: "2026-02-15",
            },
            {
                id: 202,
                title: "Project 2",
                isCompleted: true,
                completedDate: "2026-04-10",
            },
            {
                id: 203,
                title: "Project 3",
                isCompleted: true,
                completedDate: "2026-06-05",
            },
            {
                id: 204,
                title: "Project 4",
                isCompleted: false,
                completedDate: null,
            },
            {
                id: 205,
                title: "Project 5",
                isCompleted: false,
                completedDate: null,
            },
        ],
    },

    {
        id: 3,
        userId: 2,
        title: "Learn Spring Boot",
        description:
            "Understand Spring Boot and build REST APIs.",
        category: "Education",
        startDate: "2026-08-01",
        targetDate: "2027-02-28",
        chapterId: 2,
        status: "active",
        completedDate: null,

        milestones: [
            {
                id: 301,
                title: "Learn Spring Basics",
                isCompleted: true,
                completedDate: "2026-08-05",
            },
            {
                id: 302,
                title: "Create Spring Boot Project",
                isCompleted: true,
                completedDate: "2026-08-15",
            },
            {
                id: 303,
                title: "Learn REST APIs",
                isCompleted: false,
                completedDate: null,
            },
            {
                id: 304,
                title: "Connect MySQL",
                isCompleted: false,
                completedDate: null,
            },
            {
                id: 305,
                title: "Implement Authentication",
                isCompleted: false,
                completedDate: null,
            },
            {
                id: 306,
                title: "Build Final Project",
                isCompleted: false,
                completedDate: null,
            },
        ],
    },

    {
        id: 4,
        userId: 2,
        title: "Read 10 Books",
        description:
            "Read ten books during the year.",
        category: "Personal",
        startDate: "2026-01-01",
        targetDate: "2026-12-31",
        chapterId: 4,
        status: "completed",
        completedDate: "2026-08-10",

        milestones: [
            {
                id: 401,
                title: "Book 1",
                isCompleted: true,
                completedDate: "2026-01-20",
            },
            {
                id: 402,
                title: "Book 2",
                isCompleted: true,
                completedDate: "2026-02-12",
            },
            {
                id: 403,
                title: "Book 3",
                isCompleted: true,
                completedDate: "2026-03-05",
            },
            {
                id: 404,
                title: "Book 4",
                isCompleted: true,
                completedDate: "2026-04-02",
            },
            {
                id: 405,
                title: "Book 5",
                isCompleted: true,
                completedDate: "2026-04-25",
            },
            {
                id: 406,
                title: "Book 6",
                isCompleted: true,
                completedDate: "2026-05-15",
            },
            {
                id: 407,
                title: "Book 7",
                isCompleted: true,
                completedDate: "2026-06-01",
            },
            {
                id: 408,
                title: "Book 8",
                isCompleted: true,
                completedDate: "2026-06-25",
            },
            {
                id: 409,
                title: "Book 9",
                isCompleted: true,
                completedDate: "2026-07-18",
            },
            {
                id: 410,
                title: "Book 10",
                isCompleted: true,
                completedDate: "2026-08-10",
            },
        ],
    },
];

export default mockGoals;