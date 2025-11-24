// import React, { useState, useEffect } from "react";
// import { Trash2 } from "lucide-react";
// import { Button } from "react-bootstrap";
// import { useNavigate, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets";

// const InvoiceForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [invoiceNo, setInvoiceNo] = useState("");
//   const [invoiceDate, setInvoiceDate] = useState("");
//   const [billFrom, setBillFrom] = useState({
//     companyName: "",
//     phone: "",
//     gst: "",
//     address: "",
//   });
//   const [billTo, setBillTo] = useState({
//     name: "",
//     phone: "",
//     gst: "",
//     address: "",
//   });
//   const [items, setItems] = useState([
//     { name: "", qty: 1, amount: 0, total: 0 },
//   ]);
//   const [cgst, setCgst] = useState(0);
//   const [sgst, setSgst] = useState(0);

//   // Populate form when navigating back from Preview
//   useEffect(() => {
//     if (location.state?.invoiceData) {
//       const data = location.state.invoiceData;

//       setInvoiceNo(data.invoiceNo || "");
//       setInvoiceDate(data.invoiceDate || "");

//       setBillFrom({
//         companyName: data.billFrom?.companyName || "",
//         phone: data.billFrom?.phone || "",
//         gst: data.billFrom?.gst || "",
//         address: data.billFrom?.address || "",
//       });

//       setBillTo({
//         name: data.billTo?.name || "",
//         phone: data.billTo?.phone || "",
//         gst: data.billTo?.gst || "",
//         address: data.billTo?.address || "",
//       });

//       setItems(
//         data.items?.filter(
//           (item) => item.name && item.qty > 0 && item.total > 0
//         ) || [{ name: "", qty: 1, amount: 0, total: 0 }]
//       );

//       setCgst(data.cgst || 0);
//       setSgst(data.sgst || 0);
//     }
//   }, [location.state]);

//   // Handle item changes
//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = value;

//     const qty = Number(updatedItems[index].qty) || 0;
//     const amount = Number(updatedItems[index].amount) || 0;
//     updatedItems[index].total = qty * amount;

//     setItems(updatedItems);
//   };

//   // Add new item
//   const handleAdd = () => {
//     setItems([...items, { name: "", qty: 1, amount: 0, total: 0 }]);
//   };

//   // Delete item
//   const handleDelete = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   // Totals calculation
//   const subtotal = items.reduce((sum, item) => sum + item.total, 0);
//   const cgstAmount = (subtotal * cgst) / 100;
//   const sgstAmount = (subtotal * sgst) / 100;
//   const finalTotal = subtotal + cgstAmount + sgstAmount;

//   const invoiceData = {
//     invoiceNo,
//     invoiceDate,
//     billFrom,
//     billTo,
//     items,
//     subtotal,
//     cgst,
//     sgst,
//     cgstAmount,
//     sgstAmount,
//     finalTotal,
//   };

//   return (
//     <div className="invoiceform container py-4">
//       {/* Header */}
//       <div className="mb-4 d-flex align-items-center gap-3">
//         <img src={assets.logo} alt="logo" width={98} />
//         <h3 style={{ fontFamily: "serif", fontWeight: "bold" }}>
//           INVOICE DETAILS
//         </h3>
//       </div>

//       {/* Bill From */}
//       <div className="mb-4">
//         <h6>Bill From:</h6>
//         <div className="row g-3">
//           <div className="col-md-6 form-floating">
//             <input
//               type="text"
//               className="form-control"
//               id="invoiceNo"
//               value={invoiceNo}
//               onChange={(e) => setInvoiceNo(e.target.value)}
//             />
//             <label htmlFor="invoiceNo">Invoice No:</label>
//           </div>
//           <div className="col-md-6 form-floating">
//             <input
//               type="date"
//               className="form-control"
//               id="invoiceDate"
//               value={invoiceDate}
//               onChange={(e) => setInvoiceDate(e.target.value)}
//             />
//             <label htmlFor="invoiceDate">Invoice Date:</label>
//           </div>
//           <div className="col-md-12 form-floating">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Company Name"
//               value={billFrom.companyName}
//               onChange={(e) =>
//                 setBillFrom({ ...billFrom, companyName: e.target.value })
//               }
//             />
//             <label>Company Name</label>
//           </div>
//           <div className="col-md-6 form-floating">
//             <input
//               type="tel"
//               className="form-control"
//               placeholder="Phone"
//               value={billFrom.phone}
//               onChange={(e) =>
//                 setBillFrom({ ...billFrom, phone: e.target.value })
//               }
//             />
//             <label>Contact No</label>
//           </div>
//           <div className="col-md-6 form-floating">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="GSTIN/UIN"
//               value={billFrom.gst}
//               onChange={(e) =>
//                 setBillFrom({ ...billFrom, gst: e.target.value })
//               }
//             />
//             <label>GSTIN/UIN</label>
//           </div>
//           <div className="col-md-12 form-floating">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Address"
//               value={billFrom.address}
//               onChange={(e) =>
//                 setBillFrom({ ...billFrom, address: e.target.value })
//               }
//             />
//             <label>Address</label>
//           </div>
//         </div>
//       </div>

//       {/* Bill To */}
//       <div className="mb-4">
//         <h6>Bill To:</h6>
//         <div className="row g-3">
//           <div className="col-md-12 form-floating">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Customer Name"
//               value={billTo.name}
//               onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
//             />
//             <label>Name</label>
//           </div>
//           <div className="col-md-6 form-floating">
//             <input
//               type="tel"
//               className="form-control"
//               placeholder="Phone"
//               value={billTo.phone}
//               onChange={(e) => setBillTo({ ...billTo, phone: e.target.value })}
//             />
//             <label>Contact No</label>
//           </div>
//           <div className="col-md-6 form-floating">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="GSTIN/UIN"
//               value={billTo.gst}
//               onChange={(e) => setBillTo({ ...billTo, gst: e.target.value })}
//             />
//             <label>GSTIN/UIN</label>
//           </div>
//           <div className="col-md-12 form-floating">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Address"
//               value={billTo.address}
//               onChange={(e) =>
//                 setBillTo({ ...billTo, address: e.target.value })
//               }
//             />
//             <label>Address</label>
//           </div>
//         </div>
//       </div>

//       {/* Items */}
//       <div className="mb-4">
//         <h5>Items Details:</h5>
//         {items.map((item, index) => (
//           <div key={index} className="row g-3 mb-2 align-items-center">
//             <div className="col-md-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Item Name"
//                 value={item.name}
//                 onChange={(e) =>
//                   handleItemChange(index, "name", e.target.value)
//                 }
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Qty"
//                 value={item.qty}
//                 min="1"
//                 onChange={(e) =>
//                   handleItemChange(index, "qty", Number(e.target.value))
//                 }
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Amount"
//                 value={item.amount}
//                 min="0"
//                 onChange={(e) =>
//                   handleItemChange(index, "amount", Number(e.target.value))
//                 }
//               />
//             </div>
//             <div className="col-md-3">
//               <input
//                 type="number"
//                 className="form-control"
//                 value={item.total.toFixed(2)}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-2">
//               <Button
//                 variant="outline-danger"
//                 onClick={() => handleDelete(index)}
//               >
//                 <Trash2 size={18} />
//               </Button>
//             </div>
//           </div>
//         ))}
//         <Button className="mt-2" onClick={handleAdd}>
//           Add Item
//         </Button>
//       </div>

//       {/* Totals */}
//       <div className="mb-4">
//         <h5>Total Amount:</h5>
//         <div className="d-flex justify-content-end gap-3">
//           <div className="w-50">
//             <div className="d-flex justify-content-between">
//               <span>Subtotal</span>
//               <span>{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="d-flex justify-content-between align-items-center">
//               <span>CGST (%)</span>
//               <input
//                 type="number"
//                 className="form-control w-50 text-end"
//                 value={cgst}
//                 onChange={(e) => setCgst(Number(e.target.value))}
//               />
//             </div>
//             <div className="d-flex justify-content-between">
//               <span>CGST Amount</span>
//               <span>{cgstAmount.toFixed(2)}</span>
//             </div>
//             <div className="d-flex justify-content-between align-items-center">
//               <span>SGST (%)</span>
//               <input
//                 type="number"
//                 className="form-control w-50 text-end"
//                 value={sgst}
//                 onChange={(e) => setSgst(Number(e.target.value))}
//               />
//             </div>
//             <div className="d-flex justify-content-between">
//               <span>SGST Amount</span>
//               <span>{sgstAmount.toFixed(2)}</span>
//             </div>
//             <div className="d-flex justify-content-between fw-bold mt-2">
//               <span>Total</span>
//               <span>{finalTotal.toFixed(2)}</span>
//             </div>

//             <Button
//               variant="warning"
//               className="mt-3"
//               onClick={() => {
//                 // Save invoice to localStorage
//                 const existingInvoices =
//                   JSON.parse(localStorage.getItem("invoices")) || [];
//                 existingInvoices.push(invoiceData);
//                 localStorage.setItem(
//                   "invoices",
//                   JSON.stringify(existingInvoices)
//                 );

//                 // Navigate to preview
//                 navigate("/preview", { state: { invoiceData } });
//               }}
//             >
//               Preview
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceForm;

// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import { Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";

// const InvoiceForm = () => {
//   const navigate = useNavigate();

//   const [invoiceNo, setInvoiceNo] = useState("");
//   const [invoiceDate, setInvoiceDate] = useState("");
//   const [deliveryNote, setDeliveryNote] = useState("");
//   const [referenceNo, setReferenceNo] = useState("");
//   const [buyerOrderNo, setBuyerOrderNo] = useState("");
//   const [dispatchDoc, setDispatchDoc] = useState("");
//   const [dispatchThrough, setDispatchThrough] = useState("");
//   const [destination, setDestination] = useState("");
//   const [terms, setTerms] = useState("");

//   const [billFrom, setBillFrom] = useState({
//     companyName: "",
//     phone: "",
//     gst: "",
//     address: "",
//   });
//   const [billTo, setBillTo] = useState({
//     name: "",
//     phone: "",
//     gst: "",
//     address: "",
//   });

//   const [items, setItems] = useState([
//     {
//       description: "",
//       hsn: "",
//       gstRate: 0,
//       qty: 1,
//       rate: 0,
//       discount: 0,
//       amount: 0,
//     },
//   ]);

//   const [pan, setPan] = useState("");
//   const [bank, setBank] = useState("");
//   const [declaration, setDeclaration] = useState("");
//   const [sign, setSign] = useState("");

//   // Handle item change
//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = value;

//     const qty = Number(updatedItems[index].qty) || 0;
//     const rate = Number(updatedItems[index].rate) || 0;
//     const discount = Number(updatedItems[index].discount) || 0;

//     let amount = qty * rate;
//     amount = amount - (amount * discount) / 100;
//     updatedItems[index].amount = amount;

//     setItems(updatedItems);
//   };

//   const handleAdd = () => {
//     setItems([
//       ...items,
//       {
//         description: "",
//         hsn: "",
//         gstRate: 0,
//         qty: 1,
//         rate: 0,
//         discount: 0,
//         amount: 0,
//       },
//     ]);
//   };

//   const handleDelete = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   // Totals
//   const totalQty = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
//   const subtotal = items.reduce(
//     (sum, item) => sum + Number(item.amount || 0),
//     0
//   );
//   const totalCGST = items.reduce(
//     (sum, item) => sum + ((item.amount * item.gstRate) / 200 || 0),
//     0
//   ); // Half of GST
//   const totalSGST = items.reduce(
//     (sum, item) => sum + ((item.amount * item.gstRate) / 200 || 0),
//     0
//   ); // Half of GST
//   const totalGST = totalCGST + totalSGST;
//   const finalTotal = subtotal + totalGST;

//   const invoiceData = {
//     invoiceNo,
//     invoiceDate,
//     deliveryNote,
//     referenceNo,
//     buyerOrderNo,
//     dispatchDoc,
//     dispatchThrough,
//     destination,
//     terms,
//     billFrom,
//     billTo,
//     items,
//     subtotal,
//     totalGST,
//     finalTotal,
//     pan,
//     bank,
//     declaration,
//     sign,
//   };

//   return (
//     <div className="container py-4">
//       {/* Header */}
//       <div className="d-flex align-items-center gap-3 mb-4">
//         <img src={assets.logo} alt="logo" width={98} />
//         <h3 style={{ fontFamily: "serif", fontWeight: "bold" }}>INVOICE</h3>
//       </div>

//       {/* Invoice Header Fields */}
//       <div className="row g-3 mb-3">
//         <div className="col-md-4">
//           <label>Invoice No</label>
//           <input
//             type="text"
//             className="form-control"
//             value={invoiceNo}
//             onChange={(e) => setInvoiceNo(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={invoiceDate}
//             onChange={(e) => setInvoiceDate(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Delivery Note</label>
//           <input
//             type="text"
//             className="form-control"
//             value={deliveryNote}
//             onChange={(e) => setDeliveryNote(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Reference No</label>
//           <input
//             type="text"
//             className="form-control"
//             value={referenceNo}
//             onChange={(e) => setReferenceNo(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Buyer's Order No</label>
//           <input
//             type="text"
//             className="form-control"
//             value={buyerOrderNo}
//             onChange={(e) => setBuyerOrderNo(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Dispatch Doc No</label>
//           <input
//             type="text"
//             className="form-control"
//             value={dispatchDoc}
//             onChange={(e) => setDispatchDoc(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Dispatch Through</label>
//           <input
//             type="text"
//             className="form-control"
//             value={dispatchThrough}
//             onChange={(e) => setDispatchThrough(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Destination</label>
//           <input
//             type="text"
//             className="form-control"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <label>Terms of Delivery</label>
//           <input
//             type="text"
//             className="form-control"
//             value={terms}
//             onChange={(e) => setTerms(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Bill From / Bill To */}
//       <div className="row g-3 mb-4">
//         <div className="col-md-6">
//           <h6>Bill From</h6>
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Company Name"
//             value={billFrom.companyName}
//             onChange={(e) =>
//               setBillFrom({ ...billFrom, companyName: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="GSTIN"
//             value={billFrom.gst}
//             onChange={(e) => setBillFrom({ ...billFrom, gst: e.target.value })}
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Phone"
//             value={billFrom.phone}
//             onChange={(e) =>
//               setBillFrom({ ...billFrom, phone: e.target.value })
//             }
//           />
//           <textarea
//             className="form-control"
//             placeholder="Address"
//             value={billFrom.address}
//             onChange={(e) =>
//               setBillFrom({ ...billFrom, address: e.target.value })
//             }
//           ></textarea>
//         </div>
//         <div className="col-md-6">
//           <h6>Bill To</h6>
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Customer Name"
//             value={billTo.name}
//             onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="GSTIN"
//             value={billTo.gst}
//             onChange={(e) => setBillTo({ ...billTo, gst: e.target.value })}
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Phone"
//             value={billTo.phone}
//             onChange={(e) => setBillTo({ ...billTo, phone: e.target.value })}
//           />
//           <textarea
//             className="form-control"
//             placeholder="Address"
//             value={billTo.address}
//             onChange={(e) => setBillTo({ ...billTo, address: e.target.value })}
//           ></textarea>
//         </div>
//       </div>

//       {/* Items Table */}
//       <h6>Items</h6>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Description</th>
//             <th>HSN/SAC</th>
//             <th>GST %</th>
//             <th>Qty</th>
//             <th>Rate</th>
//             <th>Disc %</th>
//             <th>Amount</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>
//                 <input
//                   className="form-control"
//                   value={item.description}
//                   onChange={(e) =>
//                     handleItemChange(index, "description", e.target.value)
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   className="form-control"
//                   value={item.hsn}
//                   onChange={(e) =>
//                     handleItemChange(index, "hsn", e.target.value)
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={item.gstRate}
//                   onChange={(e) =>
//                     handleItemChange(index, "gstRate", Number(e.target.value))
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={item.qty}
//                   onChange={(e) =>
//                     handleItemChange(index, "qty", Number(e.target.value))
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={item.rate}
//                   onChange={(e) =>
//                     handleItemChange(index, "rate", Number(e.target.value))
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={item.discount}
//                   onChange={(e) =>
//                     handleItemChange(index, "discount", Number(e.target.value))
//                   }
//                 />
//               </td>
//               <td>{item.amount.toFixed(2)}</td>
//               <td>
//                 <Button
//                   variant="outline-danger"
//                   onClick={() => handleDelete(index)}
//                 >
//                   <Trash2 size={16} />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Button onClick={handleAdd}>Add Item</Button>

//       {/* Totals */}
//       <div className="mt-4 text-end">
//         <p>
//           <strong>Total Quantity:</strong> {totalQty}
//         </p>
//         <p>
//           <strong>Subtotal:</strong> {subtotal.toFixed(2)}
//         </p>
//         <p>
//           <strong>Total CGST:</strong> {totalCGST.toFixed(2)}
//         </p>
//         <p>
//           <strong>Total SGST:</strong> {totalSGST.toFixed(2)}
//         </p>
//         <p>
//           <strong>Total GST:</strong> {totalGST.toFixed(2)}
//         </p>
//         <h5>
//           <strong>Final Total:</strong> {finalTotal.toFixed(2)}
//         </h5>
//       </div>

//       {/* Footer */}
//       <div className="mt-4">
//         <h6>PAN</h6>
//         <input
//           className="form-control mb-2"
//           value={pan}
//           onChange={(e) => setPan(e.target.value)}
//         />
//         <h6>Bank Details</h6>
//         <textarea
//           className="form-control mb-2"
//           value={bank}
//           onChange={(e) => setBank(e.target.value)}
//         ></textarea>
//         <h6>Declaration</h6>
//         <textarea
//           className="form-control mb-2"
//           value={declaration}
//           onChange={(e) => setDeclaration(e.target.value)}
//         ></textarea>
//         <h6>Authorised Signatory</h6>
//         <input
//           className="form-control"
//           value={sign}
//           onChange={(e) => setSign(e.target.value)}
//         />
//       </div>

//       <Button
//         className="mt-4"
//         variant="warning"
//         onClick={() => navigate("/preview", { state: { invoiceData } })}
//       >
//         Preview
//       </Button>
//     </div>
//   );
// };

// export default InvoiceForm;

// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { Trash2 } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets";

// const InvoiceForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Header / meta fields
//   const [invoiceNo, setInvoiceNo] = useState("");
//   const [invoiceDate, setInvoiceDate] = useState("");
//   const [deliveryNote, setDeliveryNote] = useState("");
//   const [referenceNo, setReferenceNo] = useState("");
//   const [buyerOrderNo, setBuyerOrderNo] = useState("");
//   const [dispatchDoc, setDispatchDoc] = useState("");
//   const [dispatchThrough, setDispatchThrough] = useState("");
//   const [destination, setDestination] = useState("");
//   const [terms, setTerms] = useState("");

//   // Bill from / to
//   const [billFrom, setBillFrom] = useState({
//     companyName: "",
//     gst: "",
//     phone: "",
//     address: "",
//   });
//   const [billTo, setBillTo] = useState({
//     name: "",
//     gst: "",
//     phone: "",
//     address: "",
//   });

//   // Items
//   const [items, setItems] = useState([
//     { description: "", hsn: "", gstRate: 0, qty: 1, rate: 0, discount: 0, amount: 0 },
//   ]);

//   // Footer / company details
//   const [pan, setPan] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNo, setAccountNo] = useState("");
//   const [declaration, setDeclaration] = useState("");
//   const [sign, setSign] = useState("");

//   // If editing, prefill from location.state.invoiceData
//   useEffect(() => {
//     const data = location.state?.invoiceData;
//     if (!data) return;

//     // Map values safely (older saved invoices might have slightly different keys — handle both)
//     setInvoiceNo(data.invoiceNo || "");
//     setInvoiceDate(data.invoiceDate || "");
//     setDeliveryNote(data.deliveryNote || "");
//     setReferenceNo(data.referenceNo || "");
//     setBuyerOrderNo(data.buyerOrderNo || "");
//     setDispatchDoc(data.dispatchDoc || "");
//     setDispatchThrough(data.dispatchThrough || "");
//     setDestination(data.destination || "");
//     setTerms(data.terms || "");

//     setBillFrom({
//       companyName: data.billFrom?.companyName || data.companyName || "",
//       gst: data.billFrom?.gst || data.billFrom?.gstin || "",
//       phone: data.billFrom?.phone || "",
//       address: data.billFrom?.address || "",
//     });

//     setBillTo({
//       name: data.billTo?.name || data.customerName || "",
//       gst: data.billTo?.gst || data.customerGSTIN || "",
//       phone: data.billTo?.phone || "",
//       address: data.billTo?.address || "",
//     });

//     // Normalize items: accept both item.description or item.name
//     const normalizedItems = (data.items || []).map((it) => ({
//       description: it.description ?? it.name ?? "",
//       hsn: it.hsn ?? it.HSN ?? "",
//       gstRate: Number(it.gstRate ?? it.gst ?? 0),
//       qty: Number(it.qty ?? it.quantity ?? 0) || 0,
//       rate: Number(it.rate ?? it.price ?? 0) || 0,
//       discount: Number(it.discount ?? it.disc ?? 0) || 0,
//       amount: Number(it.amount ?? it.total ?? 0) || 0,
//     }));

//     setItems(normalizedItems.length ? normalizedItems : [
//       { description: "", hsn: "", gstRate: 0, qty: 1, rate: 0, discount: 0, amount: 0 },
//     ]);

//     setPan(data.pan || "");
//     setBankName(data.bankName || data.bank || "");
//     setAccountNo(data.accountNo || "");
//     setDeclaration(data.declaration || "");
//     setSign(data.sign || "");
//   }, [location.state]);

//   // Helper to recalc item.amount at an index
//   const handleItemChange = (index, field, value) => {
//     const updated = [...items];
//     // cast numbers for numeric fields
//     if (["qty", "rate", "discount", "gstRate"].includes(field)) {
//       updated[index][field] = value === "" ? value : Number(value);
//     } else {
//       updated[index][field] = value;
//     }

//     const qty = Number(updated[index].qty || 0);
//     const rate = Number(updated[index].rate || 0);
//     const discount = Number(updated[index].discount || 0);

//     let amount = qty * rate;
//     if (discount) amount = amount - (amount * discount) / 100;
//     updated[index].amount = Number(amount);

//     setItems(updated);
//   };

//   const handleAddItem = () => {
//     setItems([
//       ...items,
//       { description: "", hsn: "", gstRate: 0, qty: 1, rate: 0, discount: 0, amount: 0 },
//     ]);
//   };

//   const handleRemoveItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   // Derived totals (calculated when preparing invoice object)
//   const calcTotals = (itemsList) => {
//     const subtotal = itemsList.reduce((s, it) => s + Number(it.amount || 0), 0);
//     // CGST and SGST considered half of GST% on each item
//     const totalCGST = itemsList.reduce((s, it) => s + ((Number(it.amount || 0) * Number(it.gstRate || 0)) / 200), 0);
//     const totalSGST = itemsList.reduce((s, it) => s + ((Number(it.amount || 0) * Number(it.gstRate || 0)) / 200), 0);
//     const totalGST = totalCGST + totalSGST;
//     const finalTotal = subtotal + totalGST;
//     const totalQty = itemsList.reduce((s, it) => s + Number(it.qty || 0), 0);

//     return { subtotal, totalCGST, totalSGST, totalGST, finalTotal, totalQty };
//   };

//   // Build invoiceData and navigate to preview
//   const handlePreview = () => {
//     // filter out blank rows (optional)
//     const filteredItems = items.filter((it) => it.description || it.hsn || it.qty || it.rate || it.amount);

//     if (filteredItems.length === 0) {
//       alert("Add at least one item before previewing.");
//       return;
//     }

//     const totals = calcTotals(filteredItems);

//     const invoiceData = {
//       invoiceNo,
//       invoiceDate,
//       deliveryNote,
//       referenceNo,
//       buyerOrderNo,
//       dispatchDoc,
//       dispatchThrough,
//       destination,
//       terms,
//       billFrom,
//       billTo,
//       items: filteredItems,
//       totalQty: totals.totalQty,
//       subtotal: Number(totals.subtotal),
//       totalCGST: Number(totals.totalCGST),
//       totalSGST: Number(totals.totalSGST),
//       totalGST: Number(totals.totalGST),
//       finalTotal: Number(totals.finalTotal),
//       pan,
//       bankName,
//       accountNo,
//       declaration,
//       sign,
//     };

//     navigate("/preview", { state: { invoiceData } });
//   };

//   // Prepare invoice object for saving (used by preview Save/Edit)
//   return (
//     <div className="container py-4">
//       {/* Header */}
//       <div className="d-flex align-items-center gap-3 mb-3">
//         {assets?.logo && <img src={assets.logo} alt="logo" width={98} />}
//         <h3 style={{ fontFamily: "serif", fontWeight: "bold" }}>INVOICE</h3>
//       </div>

//       {/* Header fields */}
//       <div className="row g-3 mb-3">
//         <div className="col-md-4">
//           <label>Invoice No</label>
//           <input type="text" className="form-control" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label>Date</label>
//           <input type="date" className="form-control" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label>Delivery Note</label>
//           <input type="text" className="form-control" value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} />
//         </div>

//         <div className="col-md-4">
//           <label>Reference No</label>
//           <input type="text" className="form-control" value={referenceNo} onChange={(e) => setReferenceNo(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label>Buyer&apos;s Order No</label>
//           <input type="text" className="form-control" value={buyerOrderNo} onChange={(e) => setBuyerOrderNo(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label>Dispatch Doc No</label>
//           <input type="text" className="form-control" value={dispatchDoc} onChange={(e) => setDispatchDoc(e.target.value)} />
//         </div>

//         <div className="col-md-4">
//           <label>Dispatch Through</label>
//           <input type="text" className="form-control" value={dispatchThrough} onChange={(e) => setDispatchThrough(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label>Destination</label>
//           <input type="text" className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label>Terms of Delivery</label>
//           <input type="text" className="form-control" value={terms} onChange={(e) => setTerms(e.target.value)} />
//         </div>
//       </div>

//       {/* Bill From / Bill To */}
//       <div className="row g-3 mb-4">
//         <div className="col-md-6">
//           <h6>Bill From</h6>
//           <input className="form-control mb-2" placeholder="Company Name" value={billFrom.companyName} onChange={(e) => setBillFrom({ ...billFrom, companyName: e.target.value })} />
//           <input className="form-control mb-2" placeholder="GSTIN" value={billFrom.gst} onChange={(e) => setBillFrom({ ...billFrom, gst: e.target.value })} />
//           <input className="form-control mb-2" placeholder="Phone" value={billFrom.phone} onChange={(e) => setBillFrom({ ...billFrom, phone: e.target.value })} />
//           <textarea className="form-control" placeholder="Address" value={billFrom.address} onChange={(e) => setBillFrom({ ...billFrom, address: e.target.value })}></textarea>
//         </div>
//         <div className="col-md-6">
//           <h6>Bill To</h6>
//           <input className="form-control mb-2" placeholder="Customer Name" value={billTo.name} onChange={(e) => setBillTo({ ...billTo, name: e.target.value })} />
//           <input className="form-control mb-2" placeholder="GSTIN" value={billTo.gst} onChange={(e) => setBillTo({ ...billTo, gst: e.target.value })} />
//           <input className="form-control mb-2" placeholder="Phone" value={billTo.phone} onChange={(e) => setBillTo({ ...billTo, phone: e.target.value })} />
//           <textarea className="form-control" placeholder="Address" value={billTo.address} onChange={(e) => setBillTo({ ...billTo, address: e.target.value })}></textarea>
//         </div>
//       </div>

//       {/* Items table */}
//       <h6>Items</h6>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Description</th>
//             <th>HSN/SAC</th>
//             <th>GST %</th>
//             <th>Qty</th>
//             <th>Rate</th>
//             <th>Disc %</th>
//             <th>Amount</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((it, i) => (
//             <tr key={i}>
//               <td>{i + 1}</td>
//               <td>
//                 <input className="form-control" value={it.description} onChange={(e) => handleItemChange(i, "description", e.target.value)} />
//               </td>
//               <td>
//                 <input className="form-control" value={it.hsn} onChange={(e) => handleItemChange(i, "hsn", e.target.value)} />
//               </td>
//               <td>
//                 <input type="number" className="form-control" value={it.gstRate} onChange={(e) => handleItemChange(i, "gstRate", e.target.value)} />
//               </td>
//               <td>
//                 <input type="number" className="form-control" value={it.qty} onChange={(e) => handleItemChange(i, "qty", e.target.value)} />
//               </td>
//               <td>
//                 <input type="number" className="form-control" value={it.rate} onChange={(e) => handleItemChange(i, "rate", e.target.value)} />
//               </td>
//               <td>
//                 <input type="number" className="form-control" value={it.discount} onChange={(e) => handleItemChange(i, "discount", e.target.value)} />
//               </td>
//               <td>{Number(it.amount || 0).toFixed(2)}</td>
//               <td>
//                 <Button variant="outline-danger" onClick={() => handleRemoveItem(i)}><Trash2 size={14} /></Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Button onClick={handleAddItem} className="mb-3">Add Item</Button>

//       {/* Totals area (preview-only will recalc too) */}
//       <div className="mt-3 text-end">
//         <small className="d-block">Subtotal: ₹{Number(items.reduce((s, it) => s + Number(it.amount || 0), 0)).toFixed(2)}</small>
//       </div>

//       {/* Footer fields */}
//       <div className="mt-4">
//         <h6>PAN</h6>
//         <input className="form-control mb-2" value={pan} onChange={(e) => setPan(e.target.value)} />
//         <h6>Bank Name</h6>
//         <input className="form-control mb-2" value={bankName} onChange={(e) => setBankName(e.target.value)} />
//         <h6>Account No</h6>
//         <input className="form-control mb-2" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
//         <h6>Declaration</h6>
//         <textarea className="form-control mb-2" value={declaration} onChange={(e) => setDeclaration(e.target.value)}></textarea>
//         <h6>Authorised Signatory</h6>
//         <input className="form-control" value={sign} onChange={(e) => setSign(e.target.value)} />
//       </div>

//       <div className="mt-4">
//         <Button variant="warning" onClick={handlePreview}>Preview</Button>
//       </div>
//     </div>
//   );
// };

// export default InvoiceForm;

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Place this at the top of InvoiceForm.jsx, above the component
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

    if (num === 0) return "Zero";

    const inWords = (n) => {
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

    return inWords(num);
  };

  // Header / meta fields
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [buyerOrderNo, setBuyerOrderNo] = useState("");
  const [dispatchDoc, setDispatchDoc] = useState("");
  const [dispatchThrough, setDispatchThrough] = useState("");
  const [destination, setDestination] = useState("");
  const [terms, setTerms] = useState("");

  // Bill from / to
  const [billFrom, setBillFrom] = useState({
    companyName: "",
    gst: "",
    phone: "",
    address: "",
  });
  const [billTo, setBillTo] = useState({
    name: "",
    gst: "",
    phone: "",
    address: "",
  });

  // Items
  const [items, setItems] = useState([
    {
      description: "",
      hsn: "",
      gstRate: 0,
      qty: 1,
      rate: 0,
      discount: 0,
      amount: 0,
    },
  ]);

  // Footer / company details
  const [pan, setPan] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  // const [declaration, setDeclaration] = useState("");
  const [sign, setSign] = useState("");

  // Manual CGST / SGST inputs
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);

  // Prefill if editing
  useEffect(() => {
    const data = location.state?.invoiceData;
    if (!data) return;

    setInvoiceNo(data.invoiceNo || "");
    setInvoiceDate(data.invoiceDate || "");
    setDeliveryNote(data.deliveryNote || "");
    setReferenceNo(data.referenceNo || "");
    setBuyerOrderNo(data.buyerOrderNo || "");
    setDispatchDoc(data.dispatchDoc || "");
    setDispatchThrough(data.dispatchThrough || "");
    setDestination(data.destination || "");
    setTerms(data.terms || "");

    setBillFrom({
      companyName: data.billFrom?.companyName || "",
      gst: data.billFrom?.gst || "",
      phone: data.billFrom?.phone || "",
      address: data.billFrom?.address || "",
    });

    setBillTo({
      name: data.billTo?.name || "",
      gst: data.billTo?.gst || "",
      phone: data.billTo?.phone || "",
      address: data.billTo?.address || "",
    });

    const normalizedItems = (data.items || []).map((it) => ({
      description: it.description ?? "",
      hsn: it.hsn ?? "",
      gstRate: Number(it.gstRate ?? 0),
      qty: Number(it.qty ?? 0),
      rate: Number(it.rate ?? 0),
      discount: Number(it.discount ?? 0),
      amount: Number(it.amount ?? 0),
    }));

    setItems(
      normalizedItems.length
        ? normalizedItems
        : [
            {
              description: "",
              hsn: "",
              gstRate: 0,
              qty: 1,
              rate: 0,
              discount: 0,
              amount: 0,
            },
          ]
    );
    setPan(data.pan || "");
    setBankName(data.bankName || "");
    setAccountNo(data.accountNo || "");
    //setDeclaration(data.declaration || "");
    setSign(data.sign || "");

    setCgst(data.cgst || 0);
    setSgst(data.sgst || 0);
  }, [location.state]);

  // Update item
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    if (["qty", "rate", "discount", "gstRate"].includes(field)) {
      updated[index][field] = value === "" ? value : Number(value);
    } else {
      updated[index][field] = value;
    }

    const qty = Number(updated[index].qty || 0);
    const rate = Number(updated[index].rate || 0);
    const discount = Number(updated[index].discount || 0);

    let amount = qty * rate;
    if (discount) amount = amount - (amount * discount) / 100;
    updated[index].amount = Number(amount);

    setItems(updated);
  };

  const handleAddItem = () =>
    setItems([
      ...items,
      {
        description: "",
        hsn: "",
        gstRate: 0,
        qty: 1,
        rate: 0,
        discount: 0,
        amount: 0,
      },
    ]);
  const handleRemoveItem = (index) =>
    setItems(items.filter((_, i) => i !== index));

  // Calculate totals including manual CGST/SGST
  const subtotal = items.reduce((s, it) => s + Number(it.amount || 0), 0);
  const totalCGST = (subtotal * cgst) / 100;
  const totalSGST = (subtotal * sgst) / 100;

  const finalTotal = subtotal + totalCGST + totalSGST;
  const roundedTotal = Math.round(finalTotal);

  // Preview invoice
  const handlePreview = () => {
    const filteredItems = items.filter(
      (it) => it.description || it.hsn || it.qty || it.rate || it.amount
    );
    if (!filteredItems.length) {
      alert("Add at least one item before previewing.");
      return;
    }

    const invoiceData = {
      invoiceNo,
      invoiceDate,
      deliveryNote,
      referenceNo,
      buyerOrderNo,
      dispatchDoc,
      dispatchThrough,
      destination,
      terms,
      billFrom,
      billTo,
      items: filteredItems,
      subtotal,
      cgst,
      sgst,
      totalCGST,
      totalSGST,
      finalTotal,
      pan,
      bankName,
      accountNo,
      //declaration,
      sign,
    };

    navigate("/preview", { state: { invoiceData } });
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-3">
        {assets?.logo && <img src={assets.logo} alt="logo" width={98} />}
        <h3 style={{ fontFamily: "serif", fontWeight: "bold" }}>INVOICE</h3>
      </div>

      {/* Header fields */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label>Invoice No</label>
          <input
            type="text"
            className="form-control"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Delivery Note</label>
          <input
            type="text"
            className="form-control"
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Reference No</label>
          <input
            type="text"
            className="form-control"
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Buyer&apos;s Order No</label>
          <input
            type="text"
            className="form-control"
            value={buyerOrderNo}
            onChange={(e) => setBuyerOrderNo(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Dispatch Doc No</label>
          <input
            type="text"
            className="form-control"
            value={dispatchDoc}
            onChange={(e) => setDispatchDoc(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Dispatch Through</label>
          <input
            type="text"
            className="form-control"
            value={dispatchThrough}
            onChange={(e) => setDispatchThrough(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Destination</label>
          <input
            type="text"
            className="form-control"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Terms of Delivery</label>
          <input
            type="text"
            className="form-control"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>
      </div>

      {/* Bill From / Bill To */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <h6>Bill From</h6>
          <input
            className="form-control mb-2"
            placeholder="Company Name"
            value={billFrom.companyName}
            onChange={(e) =>
              setBillFrom({ ...billFrom, companyName: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            placeholder="GSTIN"
            value={billFrom.gst}
            onChange={(e) => setBillFrom({ ...billFrom, gst: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Phone"
            value={billFrom.phone}
            onChange={(e) =>
              setBillFrom({ ...billFrom, phone: e.target.value })
            }
          />
          <textarea
            className="form-control"
            placeholder="Address"
            value={billFrom.address}
            onChange={(e) =>
              setBillFrom({ ...billFrom, address: e.target.value })
            }
          ></textarea>
        </div>
        <div className="col-md-6">
          <h6>Bill To</h6>
          <input
            className="form-control mb-2"
            placeholder="Customer Name"
            value={billTo.name}
            onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="GSTIN"
            value={billTo.gst}
            onChange={(e) => setBillTo({ ...billTo, gst: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Phone"
            value={billTo.phone}
            onChange={(e) => setBillTo({ ...billTo, phone: e.target.value })}
          />
          <textarea
            className="form-control"
            placeholder="Address"
            value={billTo.address}
            onChange={(e) => setBillTo({ ...billTo, address: e.target.value })}
          ></textarea>
        </div>
      </div>

      {/* Items table */}
      <h6>Items</h6>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>HSN/SAC</th>
            <th>GST %</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Disc %</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <input
                  className="form-control"
                  value={it.description}
                  onChange={(e) =>
                    handleItemChange(i, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={it.hsn}
                  onChange={(e) => handleItemChange(i, "hsn", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={it.gstRate}
                  onChange={(e) =>
                    handleItemChange(i, "gstRate", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={it.qty}
                  onChange={(e) => handleItemChange(i, "qty", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={it.rate}
                  onChange={(e) => handleItemChange(i, "rate", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={it.discount}
                  onChange={(e) =>
                    handleItemChange(i, "discount", e.target.value)
                  }
                />
              </td>
              <td>{Number(it.amount || 0).toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveItem(i)}
                >
                  <Trash2 size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={handleAddItem} className="mb-3">
        Add Item
      </Button>

      {/* Totals & manual CGST/SGST */}
      <div className="mt-3">
        <div className="text-end">
          <small className="d-block">Subtotal: ₹{subtotal.toFixed(2)}</small>
        </div>
        <div className="row g-2 mt-2">
          <div className="col-md-6">
            <label>CGST %</label>
            <input
              type="number"
              className="form-control"
              value={cgst}
              onChange={(e) => setCgst(Number(e.target.value) || 0)}
            />
          </div>
          <div className="col-md-6">
            <label>SGST %</label>
            <input
              type="number"
              className="form-control"
              value={sgst}
              onChange={(e) => setSgst(Number(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="text-end mt-2">
          <small className="d-block">Total CGST: ₹{totalCGST.toFixed(2)}</small>
          <small className="d-block">Total SGST: ₹{totalSGST.toFixed(2)}</small>
          <strong className="d-block">Grand Total: ₹{roundedTotal}</strong>
        </div>

        {finalTotal > 0 && (
          <p>
            <strong>Amount in Words:</strong>{" "}
            {numberToWords(Math.round(roundedTotal))} Only
          </p>
        )}
      </div>

      {/* Footer fields */}
      <div className="mt-4">
        <h6>PAN</h6>
        <input
          className="form-control mb-2"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
        />
        <h6>Bank Name</h6>
        <input
          className="form-control mb-2"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <h6>Account No</h6>
        <input
          className="form-control mb-2"
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
        />
        {/* <h6>Declaration</h6>
        <textarea
          className="form-control mb-2"
          value={declaration}
          onChange={(e) => setDeclaration(e.target.value)}
        ></textarea> */}
        <h6>Authorised Signatory</h6>
        <input
          className="form-control"
          value={sign}
          onChange={(e) => setSign(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <Button variant="warning" onClick={handlePreview}>
          Preview
        </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
