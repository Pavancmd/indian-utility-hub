
import { lazy, Suspense } from "react";

import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import PopularTools from "./components/home/PopularTools";
import Categories from "./components/home/Categories";
import ToolPacks from "./components/home/ToolPacks";
import TrustSection from "./components/home/TrustSection";
import FAQ from "./components/home/FAQ";
import Footer from "./components/layout/Footer";
import SEO from "./components/SEO";

/* Lazy-loaded tool pages */
const UnitConverter = lazy(
  () => import("./components/tools/UnitConverter")
);
const EMICalculator = lazy(
  () => import("./components/tools/EMICalculator")
);
const PercentageCalculator = lazy(
  () => import("./components/tools/PercentageCalculator")
);
const AgeCalculator = lazy(
  () => import("./components/tools/AgeCalculator")
);
const ImageCompressor = lazy(
  () => import("./components/tools/ImageCompressor")
);
const JpgToPdf = lazy(
  () => import("./components/tools/JpgToPdf")
);
const CgpaCalculator = lazy(
  () => import("./components/tools/CgpaCalculator")
);
const AttendanceCalculator = lazy(
  () => import("./components/tools/AttendanceCalculator")
);
const BmiCalculator = lazy(
  () => import("./components/tools/BmiCalculator")
);
const TimeConverter = lazy(
  () => import("./components/tools/TimeConverter")
);
const GstCalculator = lazy(
  () => import("./components/tools/GstCalculator")
);
const CategoryTools = lazy(
  () => import("./components/tools/CategoryTools")
);

/* Lazy-loaded legal pages */
const PrivacyPolicy = lazy(
  () => import("./components/legal/PrivacyPolicy")
);
const Terms = lazy(
  () => import("./components/legal/Terms")
);
const Contact = lazy(
  () => import("./components/legal/Contact")
);

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />

      <main>
        <Hero />
        <PopularTools />
        <Categories />
        <ToolPacks />
        <TrustSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

      <p className="text-sm font-medium text-slate-500">
        Loading your tool...
      </p>
    </div>
  );
}

function App() {
  const path = window.location.pathname;

  let title = "Indian Utility Hub - Free Online Calculators & Utility Tools";

  let description =
    "Indian Utility Hub offers free online calculators, converters, image tools, PDF tools and student utilities for everyday tasks.";

  /* Legal Pages */

  if (path === "/privacy-policy") {
    title = "Privacy Policy | Indian Utility Hub";
    description =
      "Read the Privacy Policy of Indian Utility Hub to understand how information, cookies, analytics and advertising may be handled.";
  }

  if (path === "/terms") {
    title = "Terms & Conditions | Indian Utility Hub";
    description =
      "Read the Terms & Conditions for using Indian Utility Hub's calculators, converters, image tools, PDF tools and other utilities.";
  }

  if (path === "/contact") {
    title = "Contact Us | Indian Utility Hub";
    description =
      "Contact Indian Utility Hub for feedback, suggestions, technical issues, privacy questions and business enquiries.";
  }

  /* Individual Tools */

  if (path === "/unit-converter") {
    title = "Unit Converter | Indian Utility Hub";
    description =
      "Convert length, weight and temperature units quickly and easily with the free Unit Converter from Indian Utility Hub.";
  }

  if (path === "/emi-calculator") {
    title = "EMI Calculator | Indian Utility Hub";
    description =
      "Calculate monthly loan EMI, total interest and total payment quickly with the free EMI Calculator from Indian Utility Hub.";
  }

  if (path === "/percentage-calculator") {
    title = "Percentage Calculator | Indian Utility Hub";
    description =
      "Calculate percentages, percentage increase, decrease and percentage difference with the free Percentage Calculator.";
  }

  if (path === "/age-calculator") {
    title = "Age Calculator | Indian Utility Hub";
    description =
      "Calculate your exact age in years, months and days and find your next birthday with the free Age Calculator.";
  }

  if (path === "/image-compressor") {
    title = "Image Compressor | Indian Utility Hub";
    description =
      "Compress images directly in your browser and reduce image file size quickly with the free Image Compressor.";
  }

  if (path === "/jpg-to-pdf") {
    title = "JPG to PDF Converter | Indian Utility Hub";
    description =
      "Convert JPG and PNG images into PDF files with the free online JPG to PDF converter from Indian Utility Hub.";
  }

  if (path === "/cgpa-calculator") {
    title = "CGPA Calculator | Indian Utility Hub";
    description =
      "Calculate weighted CGPA and estimate percentage from subject credits and grade points with the free CGPA Calculator.";
  }

  if (path === "/attendance-calculator") {
    title = "Attendance Calculator | Indian Utility Hub";
    description =
      "Calculate current attendance, required classes and how many classes you can miss with the free Attendance Calculator.";
  }

  if (path === "/bmi-calculator") {
    title = "BMI Calculator | Indian Utility Hub";
    description =
      "Calculate Body Mass Index, understand your BMI category and estimate the healthy weight range with the free BMI Calculator.";
  }

  if (path === "/time-converter") {
    title = "Time Converter | Indian Utility Hub";
    description =
      "Convert seconds, minutes, hours, days, weeks, months and years quickly with the free Time Converter.";
  }

  if (path === "/gst-calculator") {
    title = "GST Calculator | Indian Utility Hub";
    description =
      "Calculate GST, CGST, SGST, tax amount and final price with the free GST Calculator from Indian Utility Hub.";
  }

  /* Categories */

  if (path === "/category/calculators") {
    title = "Calculators | Indian Utility Hub";
    description =
      "Explore free calculators for EMI, percentages, age, BMI, GST and other everyday calculations.";
  }

  if (path === "/category/image-tools") {
    title = "Image Tools | Indian Utility Hub";
    description =
      "Explore free image utilities including image compression and other practical image tools.";
  }

  if (path === "/category/pdf-tools") {
    title = "PDF Tools | Indian Utility Hub";
    description =
      "Explore simple PDF utilities for converting images and handling everyday document tasks.";
  }

  if (path === "/category/converters") {
    title = "Converters | Indian Utility Hub";
    description =
      "Explore free unit, time, weight and measurement converters for everyday calculations.";
  }

  if (path === "/category/student-tools") {
    title = "Student Tools | Indian Utility Hub";
    description =
      "Explore free student utilities including CGPA, attendance and academic calculation tools.";
  }

  const renderPage = () => {
    /* Legal Pages */

    if (path === "/privacy-policy") {
      return <PrivacyPolicy />;
    }

    if (path === "/terms") {
      return <Terms />;
    }

    if (path === "/contact") {
      return <Contact />;
    }

    /* Individual Tools */

    if (path === "/unit-converter") {
      return <UnitConverter />;
    }

    if (path === "/emi-calculator") {
      return <EMICalculator />;
    }

    if (path === "/percentage-calculator") {
      return <PercentageCalculator />;
    }

    if (path === "/age-calculator") {
      return <AgeCalculator />;
    }

    if (path === "/image-compressor") {
      return <ImageCompressor />;
    }

    if (path === "/jpg-to-pdf") {
      return <JpgToPdf />;
    }

    if (path === "/cgpa-calculator") {
      return <CgpaCalculator />;
    }

    if (path === "/attendance-calculator") {
      return <AttendanceCalculator />;
    }

    if (path === "/bmi-calculator") {
      return <BmiCalculator />;
    }

    if (path === "/time-converter") {
      return <TimeConverter />;
    }

    if (path === "/gst-calculator") {
      return <GstCalculator />;
    }

    /* Categories */

    if (path.startsWith("/category/")) {
      return <CategoryTools />;
    }

    /* Home */

    return <HomePage />;
  };

  return (
    <>
      <SEO title={title} description={description} />

      <Suspense fallback={<LoadingFallback />}>
        {renderPage()}
      </Suspense>
    </>
  );
}

export default App;
