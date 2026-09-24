const mockMemories = [
  {
    id: 1,
    userId: 2,
    title: "Graduation Day",
    description:
      "A memorable day when I completed my BSc IT degree. I celebrated with family and friends.",
    date: "2026-08-18",
    location: "Mumbai",
    category: "Education",
    chapterId: 1,
    importance: "Special",

    media: [
      {
        id: 101,
        fileId: "memory-1-101",
        name: "graduation.jpg",
        type: "image",
        size: 2.4,
      },
      {
        id: 102,
        fileId: "memory-1-102",
        name: "graduation-video.mp4",
        type: "video",
        size: 850,
      },
    ],
  },

  {
    id: 2,
    userId: 2,
    title: "First Internship",
    description:
      "My first internship experience and the beginning of my professional journey.",
    date: "2026-06-15",
    location: "Mumbai",
    category: "Career",
    chapterId: 2,
    importance: "Major",

    media: [
      {
        id: 103,
        fileId: "memory-2-103",
        name: "internship.jpg",
        type: "image",
        size: 1.8,
      },
    ],
  },

  {
    id: 3,
    userId: 2,
    title: "Goa Trip",
    description:
      "A fun trip to Goa with friends. We explored different places and created amazing memories.",
    date: "2026-05-02",
    location: "Goa",
    category: "Travel",
    chapterId: null,
    importance: "Special",

    media: [
      {
        id: 104,
        fileId: "memory-3-104",
        name: "goa.jpg",
        type: "image",
        size: 3.2,
      },
      {
        id: 105,
        fileId: "memory-3-105",
        name: "goa-trip.mp4",
        type: "video",
        size: 920,
      },
    ],
  },

  {
    id: 4,
    userId: 2,
    title: "First React Project",
    description:
      "Completed my first React project and learned how components, props and state work.",
    date: "2025-11-20",
    location: "Mumbai",
    category: "Projects",
    chapterId: 2,
    importance: "Major",
    media: [],
  },

  {
    id: 5,
    userId: 2,
    title: "College Festival",
    description:
      "Spent an amazing day with college friends during the annual festival.",
    date: "2024-12-10",
    location: "Mumbai",
    category: "College",
    chapterId: 1,
    importance: "Normal",

    media: [
      {
        id: 106,
        fileId: "memory-5-106",
        name: "college-festival.jpg",
        type: "image",
        size: 2.1,
      },
    ],
  },

  {
    id: 6,
    userId: 2,
    title: "Started College",
    description:
      "My first day of college and the beginning of a completely new chapter.",
    date: "2023-07-15",
    location: "Mumbai",
    category: "Education",
    chapterId: 1,
    importance: "Major",
    media: [],
  },
];

export default mockMemories;
