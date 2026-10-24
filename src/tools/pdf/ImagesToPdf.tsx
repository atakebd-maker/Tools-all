import React, { useState } from 'react';
import { Upload, Download, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { formatFileSize } from '../../utils/formatting';

interface ImageFileItem {
  id: string;
  file: File;
  preview: string;
}

export const ImagesToPdf: React.FC = () => {
  const [images, setImages] = useState<ImageFileItem[]>([]);
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Fit'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<number>(20);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string>('');

  const handleImagesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setError('');

    const newItems: ImageFileItem[] = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages((prev) => [...prev, ...newItems]);
    setPdfBlob(null);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
    setPdfBlob(null);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setImages(updated);
    setPdfBlob(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      setError('Please add at least one image.');
      return;
    }
    setIsGenerating(true);
    setError('');

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const fileBytes = await item.file.arrayBuffer();
        let embeddedImage;

        if (item.file.type === 'image/jpeg' || item.file.name.toLowerCase().endsWith('.jpg') || item.file.name.toLowerCase().endsWith('.jpeg')) {
          embeddedImage = await pdfDoc.embedJpg(fileBytes);
        } else if (item.file.type === 'image/png' || item.file.name.toLowerCase().endsWith('.png')) {
          embeddedImage = await pdfDoc.embedPng(fileBytes);
        } else {
          // For other formats (WebP, GIF), convert via Canvas to PNG bytes first
          const canvas = document.createElement('canvas');
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = item.preview;
          });
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0);
          const pngBlob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
          if (!pngBlob) throw new Error('Image parsing failed');
          const pngBytes = await pngBlob.arrayBuffer();
          embeddedImage = await pdfDoc.embedPng(pngBytes);
        }

        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;

        let pageWidth = 595.28; // A4 standard pt
        let pageHeight = 841.89;

        if (pageSize === 'Letter') {
          pageWidth = 612;
          pageHeight = 792;
        } else if (pageSize === 'Fit') {
          pageWidth = imgWidth + margin * 2;
          pageHeight = imgHeight + margin * 2;
        }

        if (pageSize !== 'Fit' && orientation === 'landscape') {
          const temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Scale image within page bounds considering margin
        const availWidth = pageWidth - margin * 2;
        const availHeight = pageHeight - margin * 2;
        const scale = Math.min(availWidth / imgWidth, availHeight / imgHeight);

        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;
        const x = margin + (availWidth - drawWidth) / 2;
        const y = margin + (availHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setPdfBlob(blob);
      setIsGenerating(false);
    } catch (err: any) {
      setIsGenerating(false);
      setError(err.message || 'Failed to create PDF from images.');
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `images-to-pdf-${Date.now()}.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-10 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer">
        <label className="cursor-pointer block">
          <Upload className="w-10 h-10 mx-auto text-blue-600 mb-3" />
          <span className="text-base font-semibold text-slate-900 block mb-1">
            Choose Images to Convert to PDF
          </span>
          <span className="text-sm text-slate-500 block mb-3">
            PNG, JPG, WebP images will be packaged into a clean multi-page document
          </span>
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
            Select Images
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImagesSelected}
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className="space-y-5">
          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white border border-slate-200 rounded-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Page Size
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="A4">A4 (210 × 297 mm)</option>
                <option value="Letter">US Letter</option>
                <option value="Fit">Fit to Image Size</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Orientation
              </label>
              <select
                value={orientation}
                disabled={pageSize === 'Fit'}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white disabled:opacity-50"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Margin: {margin}px
              </label>
              <input
                type="range"
                min="0"
                max="60"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full mt-2 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Image List */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 uppercase">
              <span>Pages Order ({images.length} images)</span>
              <button
                onClick={() => setImages([])}
                className="text-red-600 hover:text-red-700 cursor-pointer"
              >
                Remove All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <div key={img.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <img src={img.preview} alt="" className="w-10 h-10 object-cover rounded shrink-0 border border-slate-100" />
                    <p className="text-xs font-medium text-slate-800 truncate">{img.file.name}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveImage(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveImage(idx, 'down')}
                      disabled={idx === images.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleConvert}
              disabled={isGenerating || images.length === 0}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? 'Building PDF Document...' : 'Generate PDF'}
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
      )}
    </div>
  );
};
