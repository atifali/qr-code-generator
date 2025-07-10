import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState("png");
  const [showOptions, setShowOptions] = useState(false);

  // Customization states
  const [qrTitle, setQrTitle] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const qrRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

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
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 rounded-lg relative">
          {/* Dropdown menu button */}
          <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
            <button
              tabIndex={0}
              className="btn btn-sm btn-ghost"
              onClick={() => setShowOptions((v) => !v)}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="inline-block"
              >
                <circle cx="10" cy="4" r="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="10" cy="16" r="1.5" />
              </svg>
            </button>
            {showOptions && (
              <ul
                tabIndex={0}
                className="absolute right-0 mt-2 menu p-4 shadow bg-base-100 rounded-box w-72 space-y-3 z-50"
              >
                <li>
                  <label className="label">
                    <span className="label-text font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="QR Title"
                    value={qrTitle}
                    onChange={(e) => setQrTitle(e.target.value)}
                  />
                </li>
                <li>
                  <label className="label">
                    <span className="label-text font-semibold">Logo URL</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                  />
                </li>
                <li>
                  <label className="label">
                    <span className="label-text font-semibold">Marker Color</span>
                  </label>
                  <input
                    type="color"
                    className="w-10 h-8 p-0 border-none bg-transparent"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                  />
                </li>
                <li>
                  <label className="label">
                    <span className="label-text font-semibold">Background Color</span>
                  </label>
                  <input
                    type="color"
                    className="w-10 h-8 p-0 border-none bg-transparent"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </li>
              </ul>
            )}
          </div>

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
            <div className="flex flex-col items-center">
              {qrTitle && (
                <div className="mb-2 text-lg font-semibold text-center">
                  {qrTitle}
                </div>
              )}
              <div
                className="flex justify-center py-6 bg-base-200 rounded-lg border border-base-300 hover:shadow-lg transition-shadow"
                ref={qrRef}
              >
                <QRCodeCanvas
                  value={text}
                  size={200}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  imageSettings={
                    logoUrl
                      ? {
                        src: logoUrl,
                        height: 40,
                        width: 40,
                        excavate: true,
                      }
                      : undefined
                  }
                />
              </div>
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
