import React, { useState } from 'react';
import { Download, FileText, Settings, Copy, Check } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { formatFileSize } from '../../utils/formatting';

export const TextToPdf: React.FC = () => {
  const [title, setTitle] = useState<string>('My Document');
  const [content, setContent] = useState<string>(
    'Zynovexa - 100% Client-Side Privacy\n\nThis document was generated directly inside your web browser without uploading any text to remote servers.\n\nYou can format paragraphs, create clean documentation, and print or save as PDF instantly.'
  );
  const [fontSize, setFontSize] = useState<number>(12);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pageWidth = 595.28; // A4
      const pageHeight = 841.89;
      const margin = 50;
      const maxLineWidth = pageWidth - margin * 2;

      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let currentY = pageHeight - margin;

      // Draw Title
      if (title.trim()) {
        currentPage.drawText(title, {
          x: margin,
          y: currentY - 20,
          size: 20,
          font: boldFont,
          color: rgb(0.1, 0.1, 0.2)
        });
        currentY -= 45;
      }

      // Draw horizontal divider rule
      currentPage.drawLine({
        start: { x: margin, y: currentY },
        end: { x: pageWidth - margin, y: currentY },
        thickness: 1,
        color: rgb(0.85, 0.88, 0.92)
      });
      currentY -= 20;

      // Wrap and render text lines
      const paragraphs = content.split('\n');
      const lineHeight = fontSize * 1.45;

      for (const para of paragraphs) {
        if (!para.trim()) {
          currentY -= lineHeight;
          if (currentY < margin + 30) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - margin;
          }
          continue;
        }

        const words = para.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const textWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (textWidth > maxLineWidth && currentLine) {
            currentPage.drawText(currentLine, {
              x: margin,
              y: currentY,
              size: fontSize,
              font,
              color: rgb(0.15, 0.15, 0.2)
            });
            currentY -= lineHeight;

            if (currentY < margin + 30) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              currentY = pageHeight - margin;
            }
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          currentPage.drawText(currentLine, {
            x: margin,
            y: currentY,
            size: fontSize,
            font,
            color: rgb(0.15, 0.15, 0.2)
          });
          currentY -= lineHeight;
          if (currentY < margin + 30) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - margin;
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setPdfBlob(blob);
      setIsGenerating(false);
    } catch {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-zA-Z0-9_-]/g, '_') || 'document'}.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Document Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Font Size: {fontSize}pt
          </label>
          <input
            type="range"
            min="9"
            max="20"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full mt-2 accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Text Content
        </label>
        <textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full p-4 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none leading-relaxed font-sans"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleGeneratePdf}
          disabled={isGenerating || !content.trim()}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? 'Rendering Document...' : 'Generate PDF'}
        </button>

        {pdfBlob && (
          <button
            onClick={handleDownload}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF ({formatFileSize(pdfBlob.size)})
          </button>
        )}
      </div>
    </div>
  );
};
