import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState("png");
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    let mimeType = "image/png";
    if (format === "jpg") mimeType = "image/jpeg";
    else if (format === "webp") mimeType = "image/webp";
    const url = canvas.toDataURL(mimeType);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${format}`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* Header */}
      <header className="p-4 shadow-md bg-base-200 text-center text-2xl font-bold">
        QR Code Generator
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 rounded-lg">
          <div className="card-body space-y-6">
            {/* Text/URL Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Text or URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter text or URL"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* QR Code */}
            <div
              className="flex justify-center py-6 bg-base-200 rounded-lg border border-base-300 hover:shadow-lg transition-shadow"
              ref={qrRef}
            >
              <QRCodeCanvas value={text} size={200} />
            </div>

            {/* File Name Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">File Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* Format Select */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Format</span>
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>

            {/* Download Button */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={downloadQRCode}
                className="btn btn-accent btn-block transition-transform duration-150 hover:scale-105 hover:ring-2 hover:ring-accent/50"
              >
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-lg font-medium text-base-content bg-base-200">
        Made with ❤️ & ☕ in Vancity!
      </footer>
    </div>
  );
}

export default App;
