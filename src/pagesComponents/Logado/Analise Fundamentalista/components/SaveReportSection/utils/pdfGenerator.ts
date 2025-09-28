import jsPDF from "jspdf";

import { generateReport } from "./reportGenerator";
import { GenerateReportParams } from "./types";

export const generatePDF = async (
  params: GenerateReportParams
): Promise<Blob> => {
  const markdownContent = generateReport(params);

  // Create PDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Configure fonts
  pdf.setFont("helvetica");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Split content into lines and sections
  const lines = markdownContent.split("\n");
  let y = margin;

  for (const line of lines) {
    // Handle different markdown elements
    if (line.startsWith("# ")) {
      // Title
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text(line.substring(2), margin, y);
      y += 10;
    } else if (line.startsWith("## ")) {
      // Section header
      if (y > pdf.internal.pageSize.getHeight() - 30) {
        pdf.addPage();
        y = margin;
      }
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text(line.substring(3), margin, y);
      y += 8;
    } else if (line.startsWith("### ")) {
      // Subsection header
      if (y > pdf.internal.pageSize.getHeight() - 30) {
        pdf.addPage();
        y = margin;
      }
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(line.substring(4), margin, y);
      y += 7;
    } else if (line.startsWith("- ")) {
      // List items
      if (y > pdf.internal.pageSize.getHeight() - 30) {
        pdf.addPage();
        y = margin;
      }
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      const splitText = pdf.splitTextToSize(line, contentWidth);
      pdf.text(splitText, margin, y);
      y += 6 * splitText.length;
    } else if (line.startsWith("  >")) {
      // Description text
      if (y > pdf.internal.pageSize.getHeight() - 30) {
        pdf.addPage();
        y = margin;
      }
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "italic");
      const description = line.substring(3);
      const splitText = pdf.splitTextToSize(description, contentWidth);
      pdf.text(splitText, margin, y);
      y += 5 * splitText.length;
    } else if (line.trim() !== "") {
      // Regular text
      if (y > pdf.internal.pageSize.getHeight() - 30) {
        pdf.addPage();
        y = margin;
      }
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      const splitText = pdf.splitTextToSize(line, contentWidth);
      pdf.text(splitText, margin, y);
      y += 6 * splitText.length;
    } else {
      // Empty line
      y += 4;
    }
  }

  return pdf.output("blob");
};
