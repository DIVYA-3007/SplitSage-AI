import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import PDFDocument from "pdfkit";

import { getExportData } from "../services/export.service";

export const exportPDF = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const groupId =
      req.params.groupId as string;

    const { group, expenses } =
      await getExportData(groupId);

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${group.name}.pdf"`
    );

    doc.pipe(res);

    doc.fontSize(24).text(
      "SplitSage AI"
    );

    doc.moveDown();

    doc.fontSize(18).text(
      "Expense Report"
    );

    doc.moveDown();

    doc.text(
      `Group : ${group.name}`
    );

    doc.text(
      `Generated : ${new Date().toLocaleString()}`
    );

    doc.moveDown();

    let total = 0;

    expenses.forEach((expense) => {
      total += expense.amount;

      doc.text(
        `${expense.description} - ₹${expense.amount} (Paid by ${expense.paidBy.name})`
      );
    });

    doc.moveDown();

    doc.fontSize(18);

    doc.text(
      `Total Expenses : ₹${total}`
    );

    doc.end();
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};