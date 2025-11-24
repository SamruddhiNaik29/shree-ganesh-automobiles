// import React, { useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import html2pdf from "html2pdf.js";
// import { Button } from "react-bootstrap";

// const InvoicePreview = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const invoiceRef = useRef(null);

//   const invoiceData = location.state?.invoiceData;
//   if (!invoiceData) return <div>No Invoice Data</div>;

//   const handleDownloadPDF = () => {
//     if (!invoiceRef.current) return;

//     html2pdf()
//       .set({
//         margin: [10, 10, 10, 10], // mm margins
//         filename: `Invoice_${invoiceData.invoiceNo || "unnamed"}.pdf`,
//         image: { type: "jpeg", quality: 1 },
//         html2canvas: { scale: 4, useCORS: true },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       })
//       .from(invoiceRef.current)
//       .save();
//   };

//   const handleSaveExit = () => {
//     let savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
//     savedInvoices.push(invoiceData);
//     localStorage.setItem("invoices", JSON.stringify(savedInvoices));
//     alert("Invoice saved!");
//     navigate("/dashboard");
//   };

//   const handleDelete = () => {
//     if (window.confirm("Delete this invoice?")) {
//       let savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
//       savedInvoices = savedInvoices.filter(
//         (inv) => inv.invoiceNo !== invoiceData.invoiceNo
//       );
//       localStorage.setItem("invoices", JSON.stringify(savedInvoices));
//       alert("Invoice deleted!");
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <div className="mb-3 d-flex flex-wrap gap-2">
//         <Button variant="success" onClick={handleSaveExit}>
//           Save & Exit
//         </Button>
//         <Button variant="danger" onClick={handleDelete}>
//           Delete Invoice
//         </Button>
//         <Button variant="secondary" onClick={() => navigate("/generate")}>
//           Back to Invoice Form
//         </Button>
//         <Button variant="primary" onClick={handleDownloadPDF}>
//           Download PDF
//         </Button>
//       </div>

//       <div
//         ref={invoiceRef}
//         style={{
//           width: "190mm",
//           padding: "5mm",
//           margin: "auto",
//           border: "1px solid #000",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* HEADER */}
//         <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
//           {/* TAX INVOICE */} Quatation Details
//         </h2>

//         {/* Invoice Info */}
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginBottom: "10px",
//           }}
//         >
//           <tbody>
//             <tr>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Invoice No:</strong> {invoiceData.invoiceNo}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Date:</strong> {invoiceData.date}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>State:</strong> {invoiceData.state}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>GSTIN:</strong> {invoiceData.gstin}
//               </td>
//             </tr>
//             <tr>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Reference No:</strong> {invoiceData.referenceNo || "-"}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Buyer’s Order No:</strong>{" "}
//                 {invoiceData.buyerOrderNo || "-"}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Dispatch Doc No:</strong>{" "}
//                 {invoiceData.dispatchDoc || "-"}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Dispatch Through:</strong>{" "}
//                 {invoiceData.dispatchThrough || "-"}
//               </td>
//             </tr>
//             <tr>
//               <td
//                 style={{ border: "1px solid #000", padding: "4px" }}
//                 colSpan="2"
//               >
//                 <strong>Destination:</strong> {invoiceData.destination || "-"}
//               </td>
//               <td
//                 style={{ border: "1px solid #000", padding: "4px" }}
//                 colSpan="2"
//               >
//                 <strong>Terms of Delivery:</strong> {invoiceData.terms || "-"}
//               </td>
//             </tr>
//             <tr>
//               <td
//                 style={{ border: "1px solid #000", padding: "4px" }}
//                 colSpan="2"
//               >
//                 <strong>From (Seller):</strong> <br />
//                 {invoiceData.billFrom?.companyName} <br />
//                 {invoiceData.billFrom?.address} <br />
//                 GSTIN: {invoiceData.billFrom?.gst} <br />
//                 Phone: {invoiceData.billFrom?.phone}
//               </td>
//               <td
//                 style={{ border: "1px solid #000", padding: "4px" }}
//                 colSpan="2"
//               >
//                 <strong>To (Buyer):</strong> <br />
//                 {invoiceData.billTo?.name} <br />
//                 {invoiceData.billTo?.address} <br />
//                 GSTIN: {invoiceData.billTo?.gst} <br />
//                 Phone: {invoiceData.billTo?.phone}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {/* Items Table */}
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #000" }}>Sr. No</th>
//               <th style={{ border: "1px solid #000" }}>Description</th>
//               <th style={{ border: "1px solid #000" }}>HSN</th>
//               <th style={{ border: "1px solid #000" }}>Qty</th>
//               <th style={{ border: "1px solid #000" }}>Rate</th>
//               {/* <th style={{ border: "1px solid #000" }}>Disc%</th> */}
//               <th style={{ border: "1px solid #000" }}>GST%</th>
//               <th style={{ border: "1px solid #000" }}>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.items.map((item, idx) => (
//               <tr key={idx}>
//                 <td style={{ border: "1px solid #000", textAlign: "center" }}>
//                   {idx + 1}
//                 </td>
//                 <td style={{ border: "1px solid #000", padding: "4px" }}>
//                   {item.name}
//                 </td>
//                 <td style={{ border: "1px solid #000", textAlign: "center" }}>
//                   {item.hsn || "-"}
//                 </td>
//                 <td style={{ border: "1px solid #000", textAlign: "center" }}>
//                   {item.qty}
//                 </td>
//                 <td style={{ border: "1px solid #000", textAlign: "right" }}>
//                   {Number(item.rate || 0).toFixed(2)}
//                 </td>
//                 {/* <td style={{ border: "1px solid #000", textAlign: "center" }}>
//                   {item.disc || 0}%
//                 </td> */}
//                 <td style={{ border: "1px solid #000", textAlign: "center" }}>
//                   {item.gstRate || 0}%
//                 </td>
//                 <td style={{ border: "1px solid #000", textAlign: "right" }}>
//                   {Number(item.total || 0).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Footer / Totals */}
//         {/* Footer Table */}
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginTop: "20px",
//           }}
//         >
//           <tbody>
//             <tr>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Total Quantity:</strong> {invoiceData.totalQty || 0}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Subtotal:</strong>{" "}
//                 {Number(invoiceData.subtotal || 0).toFixed(2)}
//               </td>
//             </tr>
//             <tr>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Total CGST:</strong>{" "}
//                 {Number(invoiceData.totalCGST || 0).toFixed(2)}
//               </td>
//               <td style={{ border: "1px solid #000", padding: "4px" }}>
//                 <strong>Total SGST:</strong>{" "}
//                 {Number(invoiceData.totalSGST || 0).toFixed(2)}
//               </td>
//             </tr>
//             <tr>
//               <td
//                 colSpan="2"
//                 style={{ border: "1px solid #000", padding: "4px" }}
//               >
//                 <strong>Total Amount:</strong>{" "}
//                 {Number(invoiceData.totalAmount || 0).toFixed(2)}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div style={{ marginTop: "20px" }}>
//           <h5>Company Details:</h5>
//           <p>
//             <strong>PAN:</strong> {invoiceData.pan}
//           </p>
//           <p>
//             <strong>Bank:</strong> {invoiceData.bankName || "-"}, A/c:{" "}
//             {invoiceData.accountNo || "-"}
//           </p>
//           <p>
//             <strong>Declaration:</strong> {invoiceData.declaration}
//           </p>
//           <strong>Authorized Signatory</strong>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoicePreview;
// import React, { useRef } from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate, useLocation } from "react-router-dom";
// import html2pdf from "html2pdf.js";

// const InvoicePreview = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const invoiceRef = useRef(null);

//   // invoiceData MUST be passed from InvoiceForm via navigate("/preview", { state: { invoiceData } })
//   const invoiceData = location.state?.invoiceData;

//   // Fallback: if not passed, try to load last saved invoice (optional)
//   let invoice = invoiceData;
//   if (!invoice) {
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     if (saved.length > 0) invoice = saved[saved.length - 1]; // last invoice as fallback
//   }

//   if (!invoice) {
//     return (
//       <div className="container mt-4">
//         <h4>No invoice data available!</h4>
//         <Button onClick={() => navigate(-1)}>Go Back</Button>
//       </div>
//     );
//   }

//   const handleDownloadPDF = () => {
//     if (!invoiceRef.current) return;

//     const opt = {
//       margin: 0,
//       filename: `Invoice_${invoice.invoiceNo || "unnamed"}.pdf`,
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       pagebreak: { mode: ["css", "legacy"] },
//     };

//     html2pdf().set(opt).from(invoiceRef.current).save();
//   };

//   // Save or update invoice in localStorage
//   const handleSaveExit = () => {
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");

//     if (!invoice.invoiceNo) {
//       // generate invoiceNo if missing
//       invoice.invoiceNo = `INV-${Date.now()}`;
//     }

//     // update if exists
//     const idx = saved.findIndex((inv) => inv.invoiceNo === invoice.invoiceNo);
//     if (idx >= 0) {
//       saved[idx] = invoice;
//     } else {
//       saved.push(invoice);
//     }

//     localStorage.setItem("invoices", JSON.stringify(saved));
//     alert("Invoice saved successfully!");
//     navigate("/dashboard");
//   };

//   const handleDelete = () => {
//     if (!invoice.invoiceNo) {
//       alert(
//         "Invoice has no invoice number, nothing to delete from saved list."
//       );
//       return;
//     }
//     if (!window.confirm("Are you sure you want to delete this invoice?"))
//       return;
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     const updated = saved.filter((inv) => inv.invoiceNo !== invoice.invoiceNo);
//     localStorage.setItem("invoices", JSON.stringify(updated));
//     alert("Invoice deleted");
//     navigate("/dashboard");
//   };

//   const handleEdit = () => {
//     // navigate back to invoice form with invoice prefilled
//     // Ensure the route here matches the route where InvoiceForm is mounted (often "/invoice" or "/generate")
//     navigate("/invoice", { state: { invoiceData: invoice } });
//   };

//   // Pagination for items (keeps table full height per page)
//   const itemsPerPage = 12;
//   const chunked = [];
//   for (let i = 0; i < (invoice.items || []).length; i += itemsPerPage) {
//     chunked.push(invoice.items.slice(i, i + itemsPerPage));
//   }
//   if (chunked.length === 0) chunked.push([]);

//   // Helpers
//   const display = (v) => (v === undefined || v === null || v === "" ? "-" : v);

//   return (
//     <div className="container mt-4">
//       <div className="mb-3">
//         <Button variant="success" className="me-2" onClick={handleSaveExit}>
//           Save & Exit
//         </Button>
//         <Button variant="warning" className="me-2" onClick={handleEdit}>
//           Edit Invoice
//         </Button>
//         <Button variant="danger" className="me-2" onClick={handleDelete}>
//           Delete Invoice
//         </Button>
//         <Button variant="primary" onClick={handleDownloadPDF}>
//           Download PDF
//         </Button>
//       </div>

//       {/* Render multi-page invoice inside one container (html2pdf will export pages) */}
//       <div ref={invoiceRef}>
//         {chunked.map((pageItems, pageIndex) => (
//           <div
//             key={pageIndex}
//             style={{
//               width: "210mm",
//               minHeight: "297mm",
//               padding: "10mm",
//               margin: "0 auto",
//               background: "#fff",
//               boxSizing: "border-box",
//               border: "1px solid #ddd",
//               pageBreakAfter:
//                 pageIndex < chunked.length - 1 ? "always" : "auto",
//             }}
//           >
//             {/* Top header table */}
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 fontSize: 12,
//               }}
//             >
//               <tbody>
//                 <tr>
//                   <td
//                     style={{
//                       textAlign: "center",
//                       fontWeight: "bold",
//                       fontSize: 14,
//                     }}
//                     colSpan={4}
//                   >
//                     TAX INVOICE
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Invoice No:</strong> {display(invoice.invoiceNo)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Date:</strong> {display(invoice.invoiceDate)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Delivery Note:</strong>{" "}
//                     {display(invoice.deliveryNote)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Reference No:</strong>{" "}
//                     {display(invoice.referenceNo)}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td
//                     style={{ border: "1px solid #000", padding: 6 }}
//                     colSpan={2}
//                   >
//                     <strong>From (Seller):</strong>
//                     <br />
//                     {display(invoice.billFrom?.companyName)}
//                     <br />
//                     {invoice.billFrom?.address && (
//                       <>
//                         {display(invoice.billFrom.address)}
//                         <br />
//                       </>
//                     )}
//                     GSTIN: {display(invoice.billFrom?.gst)}
//                     <br />
//                     Phone: {display(invoice.billFrom?.phone)}
//                   </td>
//                   <td
//                     style={{ border: "1px solid #000", padding: 6 }}
//                     colSpan={2}
//                   >
//                     <strong>To (Buyer):</strong>
//                     <br />
//                     {display(invoice.billTo?.name)}
//                     <br />
//                     {invoice.billTo?.address && (
//                       <>
//                         {display(invoice.billTo.address)}
//                         <br />
//                       </>
//                     )}
//                     GSTIN: {display(invoice.billTo?.gst)}
//                     <br />
//                     Phone: {display(invoice.billTo?.phone)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Items table */}
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: 8,
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     Sr No
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     Description
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     HSN/SAC
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>Qty</th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>Rate</th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     GST %
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     Amount
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pageItems.map((it, idx) => (
//                   <tr key={idx}>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {pageIndex * itemsPerPage + idx + 1}
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       {display(it.description)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {display(it.hsn)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {display(it.qty)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "right",
//                       }}
//                     >
//                       {Number(it.rate || 0).toFixed(2)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {Number(it.gstRate || 0)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "right",
//                       }}
//                     >
//                       {Number(it.amount || 0).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}

//                 {/* Fillers to keep table height consistent so footer sits near bottom */}
//                 {Array.from({
//                   length: Math.max(0, itemsPerPage - pageItems.length),
//                 }).map((_, i) => (
//                   <tr key={`f-${i}`}>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         height: 20,
//                       }}
//                     >
//                       &nbsp;
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       &nbsp;
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       &nbsp;
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       &nbsp;
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       &nbsp;
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       &nbsp;
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       &nbsp;
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* If last page, show totals and footer; else show continued text */}
//             {pageIndex === chunked.length - 1 ? (
//               <>
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     marginTop: 10,
//                   }}
//                 >
//                   <tbody>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                         colSpan={6}
//                       >
//                         Subtotal
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                       >
//                         ₹{Number(invoice.subtotal || 0).toFixed(2)}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                         colSpan={6}
//                       >
//                         Total CGST
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                       >
//                         ₹{Number(invoice.totalCGST || 0).toFixed(2)}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                         colSpan={6}
//                       >
//                         Total SGST
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                       >
//                         ₹{Number(invoice.totalSGST || 0).toFixed(2)}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                           fontWeight: "bold",
//                         }}
//                         colSpan={6}
//                       >
//                         Grand Total
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         ₹{Number(invoice.finalTotal || 0).toFixed(2)}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>

//                 <div style={{ marginTop: 12, fontSize: 12 }}>
//                   {invoice.amountWords && (
//                     <p>
//                       <strong>Amount in Words:</strong> {invoice.amountWords}
//                     </p>
//                   )}
//                   {invoice.pan && (
//                     <p>
//                       <strong>PAN:</strong> {invoice.pan}
//                     </p>
//                   )}
//                   {(invoice.bankName || invoice.accountNo) && (
//                     <p>
//                       <strong>Bank:</strong> {invoice.bankName || invoice.bank}{" "}
//                       A/c: {invoice.accountNo || "-"}
//                     </p>
//                   )}
//                   {invoice.declaration && (
//                     <p>
//                       <strong>Declaration:</strong> {invoice.declaration}
//                     </p>
//                   )}
//                   <div style={{ textAlign: "right", marginTop: 30 }}>
//                     <div>For {invoice.billFrom?.companyName || "-"}</div>
//                     <div style={{ marginTop: 40 }}>Authorised Signatory</div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div style={{ textAlign: "right", marginTop: 8 }}>
//                 <em>Continued on next page...</em>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InvoicePreview;

// import React, { useRef } from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate, useLocation } from "react-router-dom";
// import html2pdf from "html2pdf.js";

// const InvoicePreview = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const invoiceRef = useRef(null);

//   const invoiceData = location.state?.invoiceData;

//   let invoice = invoiceData;
//   if (!invoice) {
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     if (saved.length > 0) invoice = saved[saved.length - 1];
//   }

//   if (!invoice) {
//     return (
//       <div className="container mt-4">
//         <h4>No invoice data available!</h4>
//         <Button onClick={() => navigate(-1)}>Go Back</Button>
//       </div>
//     );
//   }

//   const handleDownloadPDF = () => {
//     if (!invoiceRef.current) return;
//     const opt = {
//       margin: 0,
//       filename: `Invoice_${invoice.invoiceNo || "unnamed"}.pdf`,
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       pagebreak: { mode: ["css", "legacy"] },
//     };
//     html2pdf().set(opt).from(invoiceRef.current).save();
//   };

//   const handleSaveExit = () => {
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     if (!invoice.invoiceNo) invoice.invoiceNo = `INV-${Date.now()}`;
//     const idx = saved.findIndex((inv) => inv.invoiceNo === invoice.invoiceNo);
//     if (idx >= 0) saved[idx] = invoice;
//     else saved.push(invoice);
//     localStorage.setItem("invoices", JSON.stringify(saved));
//     alert("Invoice saved successfully!");
//     navigate("/dashboard");
//   };

//   const handleDelete = () => {
//     if (!invoice.invoiceNo) {
//       alert("Invoice has no invoice number, nothing to delete.");
//       return;
//     }
//     if (!window.confirm("Are you sure you want to delete this invoice?"))
//       return;
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     const updated = saved.filter((inv) => inv.invoiceNo !== invoice.invoiceNo);
//     localStorage.setItem("invoices", JSON.stringify(updated));
//     alert("Invoice deleted");
//     navigate("/dashboard");
//   };

//   const handleEdit = () => {
//     navigate("/invoice", { state: { invoiceData: invoice } });
//   };

//   const itemsPerPage = 12;
//   const chunked = [];
//   for (let i = 0; i < (invoice.items || []).length; i += itemsPerPage) {
//     chunked.push(invoice.items.slice(i, i + itemsPerPage));
//   }
//   if (chunked.length === 0) chunked.push([]);

//   const display = (v) => (v === undefined || v === null || v === "" ? "-" : v);
//   const numberToWords = (num) => {
//     const a = [
//       "",
//       "One",
//       "Two",
//       "Three",
//       "Four",
//       "Five",
//       "Six",
//       "Seven",
//       "Eight",
//       "Nine",
//       "Ten",
//       "Eleven",
//       "Twelve",
//       "Thirteen",
//       "Fourteen",
//       "Fifteen",
//       "Sixteen",
//       "Seventeen",
//       "Eighteen",
//       "Nineteen",
//     ];
//     const b = [
//       "",
//       "",
//       "Twenty",
//       "Thirty",
//       "Forty",
//       "Fifty",
//       "Sixty",
//       "Seventy",
//       "Eighty",
//       "Ninety",
//     ];

//     if (num === 0) return "Zero";

//     const inWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100)
//         return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000)
//         return (
//           a[Math.floor(n / 100)] +
//           " Hundred" +
//           (n % 100 ? " " + inWords(n % 100) : "")
//         );
//       if (n < 100000)
//         return (
//           inWords(Math.floor(n / 1000)) +
//           " Thousand" +
//           (n % 1000 ? " " + inWords(n % 1000) : "")
//         );
//       if (n < 10000000)
//         return (
//           inWords(Math.floor(n / 100000)) +
//           " Lakh" +
//           (n % 100000 ? " " + inWords(n % 100000) : "")
//         );
//       return (
//         inWords(Math.floor(n / 10000000)) +
//         " Crore" +
//         (n % 10000000 ? " " + inWords(n % 10000000) : "")
//       );
//     };

//     return inWords(num);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="mb-3">
//         <Button variant="success" className="me-2" onClick={handleSaveExit}>
//           Save & Exit
//         </Button>
//         <Button variant="warning" className="me-2" onClick={handleEdit}>
//           Edit Invoice
//         </Button>
//         <Button variant="danger" className="me-2" onClick={handleDelete}>
//           Delete Invoice
//         </Button>
//         <Button variant="primary" onClick={handleDownloadPDF}>
//           Download PDF
//         </Button>
//       </div>

//       <div ref={invoiceRef}>
//         {chunked.map((pageItems, pageIndex) => (
//           <div
//             key={pageIndex}
//             style={{
//               width: "210mm",
//               minHeight: "297mm",
//               padding: "10mm",
//               margin: "0 auto",
//               background: "#fff",
//               boxSizing: "border-box",
//               border: "1px solid #ddd",
//               pageBreakAfter:
//                 pageIndex < chunked.length - 1 ? "always" : "auto",
//             }}
//           >
//             {/* Header */}
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 fontSize: 15,
//               }}
//             >
//               <tbody>
//                 <tr>
//                   <td
//                     style={{
//                       textAlign: "center",
//                       fontWeight: "bold",
//                       fontSize: 15,
//                       marginBottom: 15,
//                     }}
//                     colSpan={4}
//                   >
//                     TAX INVOICE
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     colSpan="100%"
//                     style={{ textAlign: "right", fontWeight: "bold" }}
//                   >
//                     (ORIGINAL FOR RECIPIENT)
//                   </td>
//                 </tr>

//                 <tr>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Invoice No:</strong>
//                     <br /> {display(invoice.invoiceNo)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Date:</strong> <br /> {display(invoice.invoiceDate)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Delivery Note:</strong> <br />
//                     {display(invoice.deliveryNote)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Reference No:</strong> <br />
//                     {display(invoice.referenceNo)}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Buyer’s Order No:</strong> <br />
//                     {display(invoice.buyerOrderNo)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Dispatch Doc No:</strong> <br />
//                     {display(invoice.dispatchDoc)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Dispatch Through:</strong> <br />
//                     {display(invoice.dispatchThrough)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Destination:</strong> <br />{" "}
//                     {display(invoice.destination)}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td
//                     colSpan={4}
//                     style={{ border: "1px solid #000", padding: 6 }}
//                   >
//                     <strong>Terms of Delivery:</strong> <br />
//                     {display(invoice.terms)}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ border: "1px solid #000", padding: 6 }}
//                     colSpan={2}
//                   >
//                     <strong>From (Seller):</strong>
//                     <br />
//                     {display(invoice.billFrom?.companyName)}
//                     <br />
//                     {invoice.billFrom?.address && (
//                       <>
//                         {display(invoice.billFrom.address)}
//                         <br />
//                       </>
//                     )}
//                     GSTIN: {display(invoice.billFrom?.gst)}
//                     <br />
//                     Phone: {display(invoice.billFrom?.phone)}
//                   </td>
//                   <td
//                     style={{ border: "1px solid #000", padding: 6 }}
//                     colSpan={2}
//                   >
//                     <strong>To (Buyer):</strong>
//                     <br />
//                     {display(invoice.billTo?.name)}
//                     <br />
//                     {invoice.billTo?.address && (
//                       <>
//                         {display(invoice.billTo.address)}
//                         <br />
//                       </>
//                     )}
//                     GSTIN: {display(invoice.billTo?.gst)}
//                     <br />
//                     Phone: {display(invoice.billTo?.phone)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Items */}
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: 40,
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     Sr No
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     Description
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     HSN/SAC
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>Qty</th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>Rate</th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     GST %
//                   </th>
//                   <th style={{ border: "1px solid #000", padding: 6 }}>
//                     Amount
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pageItems.map((it, idx) => (
//                   <tr key={idx}>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {pageIndex * itemsPerPage + idx + 1}
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       {display(it.description)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {display(it.hsn)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {display(it.qty)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "right",
//                       }}
//                     >
//                       {Number(it.rate ?? 0).toFixed(2)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {Number(it.gstRate ?? 0)}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "right",
//                       }}
//                     >
//                       {Number(it.amount ?? 0).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}

//                 {Array.from({
//                   length: Math.max(0, itemsPerPage - pageItems.length),
//                 }).map((_, i) => (
//                   <tr key={`f-${i}`}>
//                     {[...Array(7)].map((__, j) => (
//                       <td
//                         key={j}
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           height: 20,
//                         }}
//                       >
//                         &nbsp;
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Totals */}
//             {pageIndex === chunked.length - 1 ? (
//               <>
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     marginTop: 40,
//                   }}
//                 >
//                   <tbody>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                         colSpan={6}
//                       >
//                         Subtotal
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                       >
//                         ₹{Number(invoice.subtotal ?? 0).toFixed(2)}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                         colSpan={6}
//                       >
//                         Total CGST
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                       >
//                         ₹{Number(invoice.totalCGST ?? 0).toFixed(2)}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                         colSpan={6}
//                       >
//                         Total SGST
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                         }}
//                       >
//                         ₹{Number(invoice.totalSGST ?? 0).toFixed(2)}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                           fontWeight: "bold",
//                         }}
//                         colSpan={6}
//                       >
//                         Grand Total
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 6,
//                           textAlign: "right",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         ₹{Number(invoice.finalTotal ?? 0).toFixed(2)}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>

//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     marginTop: 150,
//                     fontSize: 15,
//                   }}
//                 >
//                   <tbody>
//                     <tr>
//                       <td
//                         style={{ border: "1px solid #000", padding: 8 }}
//                         colSpan={6}
//                       >
//                         {invoice.finalTotal !== undefined && (
//                           <p style={{ margin: 0 }}>
//                             <strong>Amount in Words:</strong> <br />
//                             {numberToWords(Math.round(invoice.finalTotal))}
//                           </p>
//                         )}
//                       </td>
//                     </tr>

//                     <tr>
//                       <td
//                         style={{ border: "1px solid #000", padding: 8 }}
//                         colSpan={3}
//                       >
//                         <strong>PAN Number:</strong> <br /> {invoice.pan ?? "-"}
//                       </td>
//                       <td
//                         style={{ border: "1px solid #000", padding: 8 }}
//                         colSpan={3}
//                       >
//                         <strong>Bank Details:</strong> <br />
//                         <strong>Bank Name:</strong> {invoice.bankName ?? "-"}{" "}
//                         <br />
//                         <strong>Account No:</strong> {invoice.accountNo ?? "-"}
//                       </td>
//                     </tr>

//                     <tr>
//                       <td
//                         style={{ border: "1px solid #000", padding: 8 }}
//                         colSpan={3}
//                       >
//                         <strong>Declaration:</strong>
//                         <br />
//                         <textarea
//                           readOnly
//                           value={
//                             (invoice.declaration ?? "") +
//                             "\n\nGoods Once Sold will not be taken back."
//                           }
//                           style={{
//                             width: "100%",
//                             height: 120,
//                             border: "none",
//                             resize: "none",
//                             outline: "none",
//                             fontSize: 15,
//                             fontWeight: "bold",
//                           }}
//                         />
//                       </td>

//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 8,
//                           textAlign: "right",
//                         }}
//                         colSpan={3}
//                       >
//                         <strong>
//                           For {invoice.billFrom?.companyName ?? "-"}
//                         </strong>
//                         <div style={{ marginTop: 60 }}>
//                           Authorised Signatory
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>

//                 {/* Footer note */}
//                 <p style={{ textAlign: "center", marginTop: 30, fontSize: 15 }}>
//                   <strong>This is a Computer Generated Invoice.</strong>
//                 </p>
//               </>
//             ) : (
//               <div style={{ textAlign: "right", marginTop: 8 }}>
//                 <em>Continued on next page...</em>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InvoicePreview;

// import React, { useRef } from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate, useLocation } from "react-router-dom";
// import html2pdf from "html2pdf.js";
// import "./InvoicePreview.css"; // <-- Add this line (we’ll add CSS below)

// const InvoicePreview = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const invoiceRef = useRef(null);

//   const invoiceData = location.state?.invoiceData;

//   let invoice = invoiceData;
//   if (!invoice) {
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     if (saved.length > 0) invoice = saved[saved.length - 1];
//   }

//   if (!invoice) {
//     return (
//       <div className="container mt-4">
//         <h4>No invoice data available!</h4>
//         <Button onClick={() => navigate(-1)}>Go Back</Button>
//       </div>
//     );
//   }

//   const handleDownloadPDF = async () => {
//     if (!invoiceRef.current) return;

//     const element = invoiceRef.current;

//     // Clean inline styles for consistency
//     element.style.margin = "0";
//     element.style.padding = "0";
//     element.style.border = "none";
//     element.style.boxShadow = "none";
//     element.style.backgroundColor = "#fff";

//     // Fix scale and size to avoid pixel overflow
//     const opt = {
//       margin: 0,
//       filename: `Invoice_${invoice.invoiceNo || "unnamed"}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         scrollX: 0,
//         scrollY: 0,
//         windowWidth: element.scrollWidth,
//         windowHeight: element.scrollHeight,
//         backgroundColor: "#ffffff",
//       },
//       jsPDF: {
//         unit: "pt",
//         format: "a4",
//         orientation: "portrait",
//       },
//       pagebreak: { mode: ["avoid-all", "css", "legacy"] },
//     };

//     const pdf = await html2pdf().set(opt).from(element).toPdf().get("pdf");

//     // ⚡ Remove trailing blank pages automatically
//     const total = pdf.internal.getNumberOfPages();
//     for (let i = total; i >= 1; i--) {
//       const pageText = pdf.internal.pages[i]?.join("") || "";
//       const isBlank = !pageText.trim();
//       if (isBlank && i === total) {
//         pdf.deletePage(i);
//       }
//     }

//     pdf.save(`Invoice_${invoice.invoiceNo || "unnamed"}.pdf`);
//   };

//   const handleSaveExit = () => {
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     if (!invoice.invoiceNo) invoice.invoiceNo = `INV-${Date.now()}`;
//     const idx = saved.findIndex((inv) => inv.invoiceNo === invoice.invoiceNo);
//     if (idx >= 0) saved[idx] = invoice;
//     else saved.push(invoice);
//     localStorage.setItem("invoices", JSON.stringify(saved));
//     alert("Invoice saved successfully!");
//     navigate("/dashboard");
//   };

//   const handleDelete = () => {
//     if (!invoice.invoiceNo) {
//       alert("Invoice has no invoice number, nothing to delete.");
//       return;
//     }
//     if (!window.confirm("Are you sure you want to delete this invoice?"))
//       return;
//     const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
//     const updated = saved.filter((inv) => inv.invoiceNo !== invoice.invoiceNo);
//     localStorage.setItem("invoices", JSON.stringify(updated));
//     alert("Invoice deleted");
//     navigate("/dashboard");
//   };

//   const handleEdit = () => {
//     navigate("/invoice", { state: { invoiceData: invoice } });
//   };

//   const itemsPerPage = 12;
//   const chunked = [];
//   for (let i = 0; i < (invoice.items || []).length; i += itemsPerPage) {
//     chunked.push(invoice.items.slice(i, i + itemsPerPage));
//   }
//   if (chunked.length === 0) chunked.push([]);

//   const display = (v) => (v === undefined || v === null || v === "" ? "-" : v);
//   const numberToWords = (num) => {
//     const a = [
//       "",
//       "One",
//       "Two",
//       "Three",
//       "Four",
//       "Five",
//       "Six",
//       "Seven",
//       "Eight",
//       "Nine",
//       "Ten",
//       "Eleven",
//       "Twelve",
//       "Thirteen",
//       "Fourteen",
//       "Fifteen",
//       "Sixteen",
//       "Seventeen",
//       "Eighteen",
//       "Nineteen",
//     ];
//     const b = [
//       "",
//       "",
//       "Twenty",
//       "Thirty",
//       "Forty",
//       "Fifty",
//       "Sixty",
//       "Seventy",
//       "Eighty",
//       "Ninety",
//     ];

//     const inWords = (n) => {
//       if (n === 0) return "Zero";
//       if (n < 20) return a[n];
//       if (n < 100)
//         return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000)
//         return (
//           a[Math.floor(n / 100)] +
//           " Hundred" +
//           (n % 100 ? " " + inWords(n % 100) : "")
//         );
//       if (n < 100000)
//         return (
//           inWords(Math.floor(n / 1000)) +
//           " Thousand" +
//           (n % 1000 ? " " + inWords(n % 1000) : "")
//         );
//       if (n < 10000000)
//         return (
//           inWords(Math.floor(n / 100000)) +
//           " Lakh" +
//           (n % 100000 ? " " + inWords(n % 100000) : "")
//         );
//       return (
//         inWords(Math.floor(n / 10000000)) +
//         " Crore" +
//         (n % 10000000 ? " " + inWords(n % 10000000) : "")
//       );
//     };

//     // ✅ Handle decimals up to 2 digits
//     const [rupees, paise] = num.toFixed(2).split(".");
//     const rupeePart = parseInt(rupees, 10);
//     const paisePart = parseInt(paise, 10);

//     let result = "";
//     if (rupeePart > 0) {
//       result += inWords(rupeePart) + " Rupees";
//     }
//     if (paisePart > 0) {
//       result += (result ? " and " : "") + inWords(paisePart) + " Paise";
//     }
//     return result + " Only";
//   };

//   return (
//     <div className="container mt-4">
//       <div className="mb-3">
//         <Button variant="success" className="me-2" onClick={handleSaveExit}>
//           Save & Exit
//         </Button>
//         <Button variant="warning" className="me-2" onClick={handleEdit}>
//           Edit Invoice
//         </Button>
//         <Button variant="danger" className="me-2" onClick={handleDelete}>
//           Delete Invoice
//         </Button>
//         <Button variant="primary" onClick={handleDownloadPDF}>
//           Download PDF
//         </Button>
//       </div>

//       <div ref={invoiceRef}>
//         {chunked.map((pageItems, pageIndex) => (
//           <div
//             key={pageIndex}
//             className="invoice-page"
//             style={{
//               width: "210mm",
//               minHeight: "297mm",
//               padding: "10mm",
//               margin: "0 auto",
//               background: "#fff",
//               boxSizing: "border-box",
//               border: "1px solid #ddd",
//             }}
//           >
//             {/* Header */}
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 fontSize: 15,
//               }}
//             >
//               <tbody>
//                 <tr>
//                   <td
//                     style={{
//                       textAlign: "center",
//                       fontWeight: "bold",
//                       fontSize: 15,
//                     }}
//                     colSpan={4}
//                   >
//                     TAX INVOICE
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     colSpan="100%"
//                     style={{ textAlign: "right", fontWeight: "bold" }}
//                   >
//                     (ORIGINAL FOR RECIPIENT)
//                   </td>
//                 </tr>

//                 <tr>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Invoice No:</strong>
//                     <br /> {display(invoice.invoiceNo)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Date:</strong> <br /> {display(invoice.invoiceDate)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Delivery Note:</strong> <br />
//                     {display(invoice.deliveryNote)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Reference No:</strong> <br />
//                     {display(invoice.referenceNo)}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Buyer’s Order No:</strong> <br />
//                     {display(invoice.buyerOrderNo)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Dispatch Doc No:</strong> <br />
//                     {display(invoice.dispatchDoc)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Dispatch Through:</strong> <br />
//                     {display(invoice.dispatchThrough)}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: 6 }}>
//                     <strong>Destination:</strong> <br />
//                     {display(invoice.destination)}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td
//                     colSpan={4}
//                     style={{ border: "1px solid #000", padding: 6 }}
//                   >
//                     <strong>Terms of Delivery:</strong> <br />
//                     {display(invoice.terms)}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td
//                     style={{ border: "1px solid #000", padding: 6 }}
//                     colSpan={2}
//                   >
//                     <strong>From (Seller):</strong>
//                     <br />
//                     {display(invoice.billFrom?.companyName)}
//                     <br />
//                     {invoice.billFrom?.address && (
//                       <>
//                         {display(invoice.billFrom.address)}
//                         <br />
//                       </>
//                     )}
//                     GSTIN: {display(invoice.billFrom?.gst)}
//                     <br />
//                     Phone: {display(invoice.billFrom?.phone)}
//                   </td>
//                   <td
//                     style={{ border: "1px solid #000", padding: 6 }}
//                     colSpan={2}
//                   >
//                     <strong>To (Buyer):</strong>
//                     <br />
//                     {display(invoice.billTo?.name)}
//                     <br />
//                     {invoice.billTo?.address && (
//                       <>
//                         {display(invoice.billTo.address)}
//                         <br />
//                       </>
//                     )}
//                     GSTIN: {display(invoice.billTo?.gst)}
//                     <br />
//                     Phone: {display(invoice.billTo?.phone)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Items Table */}
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: 40,
//               }}
//             >
//               <thead>
//                 <tr>
//                   {[
//                     "Sr No",
//                     "Description",
//                     "HSN/SAC",
//                     "Qty",
//                     "Rate",
//                     "GST %",
//                     "Amount",
//                   ].map((title, i) => (
//                     <th
//                       key={i}
//                       style={{
//                         border: "1px solid #000",
//                         padding: 6,
//                         textAlign: "center",
//                       }}
//                     >
//                       {title}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {pageItems.map((it, idx) => (
//                   <tr key={idx}>
//                     <td
//                       style={{ border: "1px solid #000", textAlign: "center" }}
//                     >
//                       {pageIndex * itemsPerPage + idx + 1}
//                     </td>
//                     <td style={{ border: "1px solid #000", padding: 6 }}>
//                       {display(it.description)}
//                     </td>
//                     <td
//                       style={{ border: "1px solid #000", textAlign: "center" }}
//                     >
//                       {display(it.hsn)}
//                     </td>
//                     <td
//                       style={{ border: "1px solid #000", textAlign: "center" }}
//                     >
//                       {display(it.qty)}
//                     </td>
//                     <td
//                       style={{ border: "1px solid #000", textAlign: "right" }}
//                     >
//                       {Number(it.rate ?? 0).toFixed(2)}
//                     </td>
//                     <td
//                       style={{ border: "1px solid #000", textAlign: "center" }}
//                     >
//                       {Number(it.gstRate ?? 0)}
//                     </td>
//                     <td
//                       style={{ border: "1px solid #000", textAlign: "right" }}
//                     >
//                       {Number(it.amount ?? 0).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}

//                 {/* Empty rows to fill page */}
//                 {Array.from({
//                   length: Math.max(0, itemsPerPage - pageItems.length),
//                 }).map((_, i) => (
//                   <tr key={`empty-${i}`}>
//                     {Array(7)
//                       .fill(null)
//                       .map((__, j) => (
//                         <td
//                           key={j}
//                           style={{ border: "1px solid #000", height: 20 }}
//                         >
//                           &nbsp;
//                         </td>
//                       ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Totals */}
//             {/* Totals */}
//             {pageIndex === chunked.length - 1 ? (
//               <>
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     marginTop: 40,
//                   }}
//                 >
//                   <tbody>
//                     {[
//                       ["Subtotal", invoice.subtotal],
//                       ["Total CGST", invoice.totalCGST],
//                       ["Total SGST", invoice.totalSGST],
//                       ["Grand Total", invoice.finalTotal],
//                       [
//                         "Round Off",
//                         Math.round(invoice.finalTotal ?? 0) -
//                           (invoice.finalTotal ?? 0),
//                       ],
//                       [
//                         "Rounded Total",
//                         Math.round(invoice.finalTotal ?? 0),
//                         true,
//                       ],
//                     ].map(([label, value, bold], i) => (
//                       <tr key={i}>
//                         <td
//                           colSpan={6}
//                           style={{
//                             border: "1px solid #000",
//                             padding: 6,
//                             textAlign: "right",
//                             fontWeight: bold ? "bold" : "normal",
//                           }}
//                         >
//                           {label}
//                         </td>
//                         <td
//                           style={{
//                             border: "1px solid #000",
//                             padding: 6,
//                             textAlign: "right",
//                             fontWeight: bold ? "bold" : "normal",
//                           }}
//                         >
//                           ₹{Number(value ?? 0).toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {/* Declaration */}
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     marginTop: 40,
//                     fontSize: 15,
//                   }}
//                 >
//                   <tbody>
//                     <tr>
//                       <td
//                         style={{ border: "1px solid #000", padding: 8 }}
//                         colSpan={6}
//                       >
//                         {invoice.finalTotal !== undefined && (
//                           <p style={{ margin: 0 }}>
//                             <strong>Amount in Words:</strong> <br />
//                             {numberToWords(Math.round(invoice.finalTotal))}
//                           </p>
//                         )}
//                       </td>
//                     </tr>

//                     <tr>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 8,
//                           height: 90,
//                         }}
//                         colSpan={3}
//                       >
//                         <strong>PAN Number:</strong> <br /> {invoice.pan ?? "-"}
//                       </td>
//                       <td
//                         style={{
//                           border: "1px solid #000",
//                           padding: 8,
//                           height: 90,
//                         }}
//                         colSpan={3}
//                       >
//                         <strong>Bank Details:</strong> <br />
//                         <strong>Bank Name:</strong> {invoice.bankName ?? "-"}{" "}
//                         <br />
//                         <strong>Account No:</strong> {invoice.accountNo ?? "-"}
//                       </td>
//                     </tr>

//                     <tr>
//                       <td
//                         colSpan={3}
//                         style={{ border: "1px solid #000", padding: 8 }}
//                       >
//                         <strong>Declaration:</strong>
//                         <br />
//                         <textarea
//                           readOnly
//                           value={
//                             (invoice.declaration ?? "") +
//                             "\n\nGoods Once Sold will not be taken back."
//                           }
//                           style={{
//                             width: "100%",
//                             height: 120,
//                             border: "none",
//                             resize: "none",
//                             outline: "none",
//                             fontSize: 15,
//                             fontWeight: "bold",
//                           }}
//                         />
//                       </td>
//                       <td
//                         colSpan={3}
//                         style={{
//                           border: "1px solid #000",
//                           padding: 5,
//                           textAlign: "center",
//                           verticalAlign: "top",
//                         }}
//                       >
//                         <strong>
//                           For {invoice.billFrom?.companyName ?? "-"}
//                         </strong>
//                         <div style={{ marginTop: 90 }}>
//                           Authorised Signatory
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 {/* Footer note */}
//                 <p style={{ textAlign: "center", marginTop: 30, fontSize: 15 }}>
//                   <strong>This is a Computer Generated Invoice.</strong>
//                 </p>
//               </>
//             ) : (
//               <div style={{ textAlign: "right", marginTop: 8 }}>
//                 <em>Continued on next page...</em>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InvoicePreview;

import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./InvoicePreview.css";

const InvoicePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const invoiceRef = useRef(null);

  const invoiceData = location.state?.invoiceData;

  let invoice = invoiceData;
  if (!invoice) {
    const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
    if (saved.length > 0) invoice = saved[saved.length - 1];
  }

  if (!invoice) {
    return (
      <div className="container mt-4">
        <h4>No invoice data available!</h4>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    const element = invoiceRef.current;

    element.style.margin = "0";
    element.style.padding = "0";
    element.style.border = "none";
    element.style.boxShadow = "none";
    element.style.backgroundColor = "#fff";

    const opt = {
      margin: 0,
      filename: `Invoice_${invoice.invoiceNo || "unnamed"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    const pdf = await html2pdf().set(opt).from(element).toPdf().get("pdf");

    const total = pdf.internal.getNumberOfPages();
    for (let i = total; i >= 1; i--) {
      const pageText = pdf.internal.pages[i]?.join("") || "";
      const isBlank = !pageText.trim();
      if (isBlank && i === total) pdf.deletePage(i);
    }

    pdf.save(`Invoice_${invoice.invoiceNo || "unnamed"}.pdf`);
  };

  const handleSaveExit = () => {
    const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
    if (!invoice.invoiceNo) invoice.invoiceNo = `INV-${Date.now()}`;
    const idx = saved.findIndex((inv) => inv.invoiceNo === invoice.invoiceNo);
    if (idx >= 0) saved[idx] = invoice;
    else saved.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(saved));
    alert("Invoice saved successfully!");
    navigate("/dashboard");
  };

  const handleDelete = () => {
    if (!invoice.invoiceNo) {
      alert("Invoice has no invoice number, nothing to delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;
    const saved = JSON.parse(localStorage.getItem("invoices") || "[]");
    const updated = saved.filter((inv) => inv.invoiceNo !== invoice.invoiceNo);
    localStorage.setItem("invoices", JSON.stringify(updated));
    alert("Invoice deleted");
    navigate("/dashboard");
  };

  const handleEdit = () => {
    navigate("/invoice", { state: { invoiceData: invoice } });
  };

  const itemsPerPage = 12;
  const chunked = [];
  for (let i = 0; i < (invoice.items || []).length; i += itemsPerPage) {
    chunked.push(invoice.items.slice(i, i + itemsPerPage));
  }
  if (chunked.length === 0) chunked.push([]);

  const display = (v) => (v === undefined || v === null || v === "" ? "-" : v);

  const numberToWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const inWords = (n) => {
      if (n === 0) return "Zero";
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + inWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + inWords(n % 100000) : "")
        );
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    };

    const rupeePart = Math.floor(num);
    const paisePart = Math.round((num - rupeePart) * 100);

    let result = "";
    if (rupeePart > 0) result += inWords(rupeePart) + " Rupees";
    if (paisePart > 0)
      result += (result ? " and " : "") + inWords(paisePart) + " Paise";
    return result + " Only";
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <Button variant="success" className="me-2" onClick={handleSaveExit}>
          Save & Exit
        </Button>
        <Button variant="warning" className="me-2" onClick={handleEdit}>
          Edit Invoice
        </Button>
        <Button variant="danger" className="me-2" onClick={handleDelete}>
          Delete Invoice
        </Button>
        <Button variant="primary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </div>

      <div ref={invoiceRef}>
        {chunked.map((pageItems, pageIndex) => (
          <div
            key={pageIndex}
            className="invoice-page"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "10mm",
              margin: "0 auto",
              background: "#fff",
              boxSizing: "border-box",
              border: "1px solid #ddd",
            }}
          >
            {/* Header */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 15,
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                    colSpan={4}
                  >
                    TAX INVOICE
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="100%"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    (ORIGINAL FOR RECIPIENT)
                  </td>
                </tr>

                <tr>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Invoice No:</strong>
                    <br /> {display(invoice.invoiceNo)}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Date:</strong> <br /> {display(invoice.invoiceDate)}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Delivery Note:</strong> <br />
                    {display(invoice.deliveryNote)}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Reference No:</strong> <br />
                    {display(invoice.referenceNo)}
                  </td>
                </tr>

                <tr>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Buyer’s Order No:</strong> <br />
                    {display(invoice.buyerOrderNo)}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Dispatch Doc No:</strong> <br />
                    {display(invoice.dispatchDoc)}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Dispatch Through:</strong> <br />
                    {display(invoice.dispatchThrough)}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 6 }}>
                    <strong>Destination:</strong> <br />
                    {display(invoice.destination)}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan={4}
                    style={{ border: "1px solid #000", padding: 6 }}
                  >
                    <strong>Terms of Delivery:</strong> <br />
                    {display(invoice.terms)}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ border: "1px solid #000", padding: 6 }}
                    colSpan={2}
                  >
                    <strong>From (Seller):</strong>
                    <br />
                    {display(invoice.billFrom?.companyName)}
                    <br />
                    {invoice.billFrom?.address && (
                      <>
                        {display(invoice.billFrom.address)}
                        <br />
                      </>
                    )}
                    GSTIN: {display(invoice.billFrom?.gst)}
                    <br />
                    Phone: {display(invoice.billFrom?.phone)}
                  </td>
                  <td
                    style={{ border: "1px solid #000", padding: 6 }}
                    colSpan={2}
                  >
                    <strong>To (Buyer):</strong>
                    <br />
                    {display(invoice.billTo?.name)}
                    <br />
                    {invoice.billTo?.address && (
                      <>
                        {display(invoice.billTo.address)}
                        <br />
                      </>
                    )}
                    GSTIN: {display(invoice.billTo?.gst)}
                    <br />
                    Phone: {display(invoice.billTo?.phone)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Items Table */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 40,
              }}
            >
              <thead>
                <tr>
                  {[
                    "Sr No",
                    "Description",
                    "HSN/SAC",
                    "Qty",
                    "Rate",
                    "GST %",
                    "Amount",
                  ].map((title, i) => (
                    <th
                      key={i}
                      style={{
                        border: "1px solid #000",
                        padding: 6,
                        textAlign: "center",
                      }}
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageItems.map((it, idx) => (
                  <tr key={idx}>
                    <td
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      {pageIndex * itemsPerPage + idx + 1}
                    </td>
                    <td style={{ border: "1px solid #000", padding: 6 }}>
                      {display(it.description)}
                    </td>
                    <td
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      {display(it.hsn)}
                    </td>
                    <td
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      {display(it.qty)}
                    </td>
                    <td
                      style={{ border: "1px solid #000", textAlign: "right" }}
                    >
                      {Number(it.rate ?? 0).toFixed(2)}
                    </td>
                    <td
                      style={{ border: "1px solid #000", textAlign: "center" }}
                    >
                      {Number(it.gstRate ?? 0)}
                    </td>
                    <td
                      style={{ border: "1px solid #000", textAlign: "right" }}
                    >
                      {Number(it.amount ?? 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            {pageIndex === chunked.length - 1 ? (
              <>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: 40,
                  }}
                >
                  <tbody>
                    {[
                      ["Subtotal", invoice.subtotal],
                      ["Total CGST", invoice.totalCGST],
                      ["Total SGST", invoice.totalSGST],
                      ["Grand Total", invoice.finalTotal],
                      [
                        "Round Off",
                        Math.round(invoice.finalTotal ?? 0) -
                          (invoice.finalTotal ?? 0),
                      ],
                      [
                        "Rounded Total",
                        Math.round(invoice.finalTotal ?? 0),
                        true,
                      ],
                    ].map(([label, value, bold], i) => (
                      <tr key={i}>
                        <td
                          colSpan={6}
                          style={{
                            border: "1px solid #000",
                            padding: 6,
                            textAlign: "right",
                            fontWeight: bold ? "bold" : "normal",
                          }}
                        >
                          {label}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 6,
                            textAlign: "right",
                            fontWeight: bold ? "bold" : "normal",
                          }}
                        >
                          ₹{Number(value ?? 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Amount in Words */}
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: 40,
                    fontSize: 15,
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{ border: "1px solid #000", padding: 8 }}
                        colSpan={6}
                      >
                        {invoice.finalTotal !== undefined && (
                          <p style={{ margin: 0 }}>
                            <strong>Amount in Words:</strong> <br />
                            {numberToWords(Math.round(invoice.finalTotal))}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: 8,
                          height: 90,
                        }}
                        colSpan={3}
                      >
                        <strong>PAN Number:</strong> <br /> {invoice.pan ?? "-"}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: 8,
                          height: 90,
                        }}
                        colSpan={3}
                      >
                        <strong>Bank Details:</strong> <br />
                        <strong>Bank Name:</strong> {invoice.bankName ?? "-"}{" "}
                        <br />
                        <strong>Account No:</strong> {invoice.accountNo ?? "-"}
                      </td>
                    </tr>

                    <tr>
                      <td
                        colSpan={3}
                        style={{ border: "1px solid #000", padding: 8 }}
                      >
                        <strong>Declaration:</strong>
                        <br />
                        <textarea
                          readOnly
                          value={
                            (invoice.declaration ?? "") +
                            "\n\nGoods Once Sold will not be taken back."
                          }
                          style={{
                            width: "100%",
                            height: 120,
                            border: "none",
                            resize: "none",
                            outline: "none",
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        />
                      </td>
                      <td
                        colSpan={3}
                        style={{
                          border: "1px solid #000",
                          padding: 5,
                          textAlign: "center",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>
                          For {invoice.billFrom?.companyName ?? "-"}
                        </strong>
                        <div style={{ marginTop: 90 }}>
                          Authorised Signatory
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Footer note */}
                <p style={{ textAlign: "center", marginTop: 30, fontSize: 15 }}>
                  <strong>This is a Computer Generated Invoice.</strong>
                </p>
              </>
            ) : (
              <div style={{ textAlign: "right", marginTop: 8 }}>
                <em>Continued on next page...</em>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoicePreview;
