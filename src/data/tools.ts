import {
  Calculator,
  FileImage,
  FileText,
  GraduationCap,
  RefreshCw,
  Percent,
  CalendarDays,
  Clock3,
  HeartPulse,
  IndianRupee,
  Scale,
  Ruler,
  ClipboardCheck,
  ReceiptIndianRupee,
} from "lucide-react";

export const popularTools = [
  {
    name: "EMI Calculator",
    description: "Calculate your monthly loan EMI",
    icon: IndianRupee,
    category: "Finance",
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages quickly",
    icon: Percent,
    category: "Math",
  },
  {
    name: "Age Calculator",
    description: "Calculate exact age from date of birth",
    icon: CalendarDays,
    category: "Everyday",
  },
  {
    name: "Image Compressor",
    description: "Reduce image size without hassle",
    icon: FileImage,
    category: "Image",
  },
  {
    name: "JPG to PDF",
    description: "Convert images into PDF files",
    icon: FileText,
    category: "PDF",
  },
  {
    name: "CGPA Calculator",
    description: "Convert marks and calculate CGPA",
    icon: GraduationCap,
    category: "Student",
  },
  {
    name: "Attendance Calculator",
    description: "Calculate attendance and required classes",
    icon: ClipboardCheck,
    category: "Student",
  },
  {
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: HeartPulse,
    category: "Health",
  },
  {
    name: "GST Calculator",
    description: "Calculate GST, CGST, SGST and final amount",
    icon: ReceiptIndianRupee,
    category: "Finance",
  },
];

export const categories = [
  {
    title: "Calculators",
    description: "Finance, math, health and everyday calculations.",
    icon: Calculator,
    count: "20+ tools",
  },
  {
    title: "Image Tools",
    description: "Compress, resize, convert and optimize images.",
    icon: FileImage,
    count: "10+ tools",
  },
  {
    title: "PDF Tools",
    description: "Simple tools for everyday PDF tasks.",
    icon: FileText,
    count: "10+ tools",
  },
  {
    title: "Converters",
    description: "Convert units, measurements, time and more.",
    icon: RefreshCw,
    count: "15+ tools",
  },
  {
    title: "Student Tools",
    description: "Marks, CGPA, attendance and academic utilities.",
    icon: GraduationCap,
    count: "10+ tools",
  },
];

export const toolPacks = [
  {
    title: "Student Pack",
    description: "Everything students need for marks, CGPA and attendance.",
    icon: GraduationCap,
  },
  {
    title: "Finance Pack",
    description: "Useful calculators for loans, savings and percentages.",
    icon: IndianRupee,
  },
  {
    title: "Document Pack",
    description: "Quick image and PDF tools for everyday documents.",
    icon: FileText,
  },
];

export const quickTools = [
  { name: "Unit Converter", icon: Ruler },
  { name: "Time Converter", icon: Clock3 },
  { name: "BMI Calculator", icon: HeartPulse },
  { name: "Weight Converter", icon: Scale },
];