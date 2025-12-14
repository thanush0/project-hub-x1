// Sample data for local development
import { setMockCollection } from "./mock-data";

export const initializeSampleData = () => {
  // Sample projects data
  setMockCollection("readymadeprojects", [
    {
      _id: "project_1",
      title: "E-Commerce Website",
      description: "A complete e-commerce solution with shopping cart and payment integration",
      price: 999,
      category: "Web Development",
      image: "/placeholder-project-1.jpg",
      features: ["Responsive Design", "Payment Gateway", "Admin Dashboard"],
      _createdDate: new Date("2024-01-15"),
      _updatedDate: new Date("2024-01-15"),
    },
    {
      _id: "project_2",
      title: "Portfolio Website",
      description: "Modern portfolio website for creative professionals",
      price: 499,
      category: "Web Development",
      image: "/placeholder-project-2.jpg",
      features: ["Modern Design", "Contact Form", "Gallery"],
      _createdDate: new Date("2024-01-20"),
      _updatedDate: new Date("2024-01-20"),
    },
  ]);

  // Sample FAQ data
  setMockCollection("faq", [
    {
      _id: "faq_1",
      question: "What services do you offer?",
      answer: "We offer web development, mobile app development, and custom software solutions.",
      order: 1,
      _createdDate: new Date("2024-01-10"),
      _updatedDate: new Date("2024-01-10"),
    },
    {
      _id: "faq_2",
      question: "How long does it take to complete a project?",
      answer: "Project timelines vary depending on complexity. Typically, projects take 2-8 weeks.",
      order: 2,
      _createdDate: new Date("2024-01-10"),
      _updatedDate: new Date("2024-01-10"),
    },
  ]);

  // Sample testimonials
  setMockCollection("clienttestimonials", [
    {
      _id: "testimonial_1",
      clientName: "John Doe",
      company: "Tech Solutions Inc",
      testimonial: "Excellent work! Very professional and delivered on time.",
      rating: 5,
      _createdDate: new Date("2024-01-05"),
      _updatedDate: new Date("2024-01-05"),
    },
  ]);

  // Sample how it works steps
  setMockCollection("howitworkssteps", [
    {
      _id: "step_1",
      title: "Choose a Project",
      description: "Browse our ready-made projects or request a custom solution",
      order: 1,
      icon: "search",
      _createdDate: new Date("2024-01-01"),
      _updatedDate: new Date("2024-01-01"),
    },
    {
      _id: "step_2",
      title: "Customize & Order",
      description: "Customize the project to your needs and place your order",
      order: 2,
      icon: "settings",
      _createdDate: new Date("2024-01-01"),
      _updatedDate: new Date("2024-01-01"),
    },
    {
      _id: "step_3",
      title: "Get Your Project",
      description: "Receive your completed project and launch it",
      order: 3,
      icon: "rocket",
      _createdDate: new Date("2024-01-01"),
      _updatedDate: new Date("2024-01-01"),
    },
  ]);

  // Sample developer profiles
  setMockCollection("developerprofiles", [
    {
      _id: "dev_1",
      name: "Developer Team",
      role: "Full Stack Developers",
      bio: "Experienced team of developers specializing in modern web technologies",
      skills: ["React", "Node.js", "TypeScript", "Astro"],
      _createdDate: new Date("2024-01-01"),
      _updatedDate: new Date("2024-01-01"),
    },
  ]);

  console.log("✅ Sample data initialized successfully");
};
